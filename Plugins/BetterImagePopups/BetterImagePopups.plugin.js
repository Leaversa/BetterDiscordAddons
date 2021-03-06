//META{"name":"BetterImagePopups"}*//

/* global BdApi */

class BetterImagePopups {
	getName() {return "Better Image Popups";}
	getShortName() {return "BetterImagePopups";}
	getDescription() {return "Show full sized images in image popup";}
	getVersion() {return "1.0.2";}
	getAuthor() {return "Orrie";}

	load() {}
	start(){
		BdApi.injectCSS(this.getShortName(), `
.modal-image.bip-scroller {margin: 0 5px; overflow: auto;}
.modal-image img {max-width: calc(100vw - 160px); left: 50%; transform: translateX(-50%);}
.modal-image img.bip-center {max-height: calc(100vh - 120px); max-width: calc(100vw - 160px);}
.modal-image .download-button {display: block; position: absolute; right: 10px; bottom: 6px; pointer-events: auto; text-transform: capitalize;}
.modal-image .image.image-loading {opacity: 0.9;}
.modal-image .image.image-loading::before {background: transparent;}
/* ImageToClipboard Compatibility*/
.modal-image span.download-button {right: 100px;}
.modal-image a:nth-of-type(2) {right: 115px;}
		`);
	}
	stop(){
		BdApi.clearCSS(this.getShortName());
	}

	observer({target}) {
		if (target.classList.contains("modal-image") && !target.classList.contains("bip-scroller")) {
			const img = target.firstElementChild;
			if (img.tagName == "IMG" && img.src) {
				target.classList.add("bip-scroller");
				img.classList.add("bip-center");
				img.src = img.src.split("?")[0];
				img.removeAttribute("width");
				img.removeAttribute("height");
				img.onload = function(){
					if (this.naturalHeight > window.innerHeight*1.35) {
						this.addEventListener("click", function() {
							this.classList.toggle("bip-center");
						}, false);
					}
				};
			}
		}
	}
}
