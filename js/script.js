const videoControlsContainer = document.querySelector(".ytp-chrome-controls");
const rightControls = videoControlsContainer.querySelector(".ytp-right-controls");
let videoEl = document.querySelector("#movie_player > div.html5-video-container > video");
let popoutButton, infoText;

const SVGIcons = {
	popout: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 -35 90 180">
			<g>
				<path d="M90.7,12.5v-.7l-.2-.4-.2-.3-.5-.6h0L89,9.9l-.3-.2-.4-.2H65.1a4,4,0,1,0,0,8H77.1L41.2,53.1a4,4,0,1,0,5.7,5.7L82.8,22.9V34.9a4,4,0,0,0,8,0V13.2h0A4,4,0,0,0,90.7,12.5Z" fill="#fff"/>
				<path d="M21.2,90.8H68.6a12,12,0,0,0,12-12V50.5a4,4,0,1,0-8,0V78.8a4,4,0,0,1-4,4H21.2a4,4,0,0,1-4-4V31.4a4,4,0,0,1,4-4H49.5a4,4,0,0,0,0-8H21.2a12,12,0,0,0-12,12V78.8A12,12,0,0,0,21.2,90.8Z" fill="#fff"/>
			</g>
		</svg>`,
	popin: `
         <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 -35 90 180">
			<g>
				<path d="m 40.119055,56.980945 v 0.7 l 0.2,0.4 0.2,0.3 0.5,0.6 v 0 l 0.8,0.6 0.3,0.2 0.4,0.2 23.2,0 a 4,4 0 1 0 0,-8 l -12,0 35.9,-35.6 a 4.0305087,4.0305087 0 1 0 -5.7,-5.7 l -35.9,35.9 v -12 a 4,4 0 0 0 -8,0 v 21.7 0 a 4,4 0 0 0 0.1,0.7 z" fill="#fff"/>
				<path d="m 21.2,90.8 h 47.4 a 12,12 0 0 0 12,-12 V 50.5 a 4,4 0 1 0 -8,0 v 28.3 a 4,4 0 0 1 -4,4 H 21.2 a 4,4 0 0 1 -4,-4 V 31.4 a 4,4 0 0 1 4,-4 h 28.3 a 4,4 0 0 0 0,-8 H 21.2 a 12,12 0 0 0 -12,12 v 47.4 a 12,12 0 0 0 12,12 z"  fill="#fff"/>	
			</g>
		</svg>`
};

if ("pictureInPictureEnabled" in document) {
	insertButtonAndInfo();

	popoutButton.addEventListener("click", () => {
		togglePIPMode();
	});

	document.addEventListener("fullscreenchange", e => {
		togglePIPMode();
	});
}

function createButton() {
	let button = document.createElement("button");
	button.classList.add("pop-button", "ytp-button");
	button.style.overflow = "visible";
	button.setAttribute("aria-label", "Pop out");
	button.setAttribute("aria-pressed", "false");
	button.innerHTML = SVGIcons.popout;
	return button;
}

function insertButton() {
	popoutButton = createButton();
	rightControls.insertAdjacentElement("afterbegin", popoutButton);
}

function insertButtonInfo(btn) {
	infoText = document.createElement("span");
	infoText.classList.add("info-text");
	infoText.innerHTML = `${btn.getAttribute("aria-label")}`;
	btn.appendChild(infoText);
}

function insertButtonAndInfo() {
	insertButton();
	insertButtonInfo(popoutButton);
}

function toggleButtonSVG(btn, pipMode = "closed") {
	if (pipMode == "closed") {
		btn.innerHTML = SVGIcons.popout;
	} else if (pipMode == "open") {
		btn.innerHTML = SVGIcons.popin;
	}
	insertButtonInfo(popoutButton);
}

function togglePIPMode() {
	if (videoEl !== document.pictureInPictureElement) {
		videoEl.requestPictureInPicture();
	} else {
		document.exitPictureInPicture();
	}
}

videoEl.addEventListener("enterpictureinpicture", () => {
	popoutButton.setAttribute("aria-pressed", "true");
	toggleButtonSVG(popoutButton, "open");
	infoText.innerHTML = "Pop in";
});

videoEl.addEventListener("leavepictureinpicture", () => {
	popoutButton.setAttribute("aria-pressed", "false");
	toggleButtonSVG(popoutButton, "closed");
	infoText.innerHTML = "Pop out";
});
