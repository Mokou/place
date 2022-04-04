// ==UserScript==
// @name         [AUTO UPDATING] Touhou r/Place Hijack 2022 overlay
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  try to take over the canvas! modified from r/OsuPlace's script
// @author       oralekin, LittleEndu, ekgame, Mokou
// @match        https://hot-potato.reddit.com/embed*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @downloadURL  https://2hu-rplace.mokou.io/2hu-overlay.user.js
// @updateURL    https://2hu-rplace.mokou.io/2hu-overlay.user.js
// @connect      2hu-rplace.mokou.io
// @grant        GM_xmlhttpRequest
// ==/UserScript==
if (window.top !== window.self) {
    window.addEventListener('load', () => {
        const camera = document.querySelector("mona-lisa-embed").shadowRoot.querySelector("mona-lisa-camera");
        const canvas = camera.querySelector("mona-lisa-canvas");

        GM_xmlhttpRequest({
            method: "GET",
            url: "https://2hu-rplace.mokou.io/overlays/overlays.txt",
            onload: function(r) {
                const lines = r.responseText.split('\n');
                for (let line of lines) {
                    if (!line) continue;
                    const vals = line.split(' ');
                    const x = parseInt(vals[0]);
                    const y = parseInt(vals[1]);
                    const url = vals[2];

                    // Load the image
                    const image = document.createElement("img");
                    image.src = url;
                    image.onload = () => {
                        image.style = `position: absolute; left: ${x}px; top: ${y}px; width: ${image.width/3}px; height: ${image.height/3}px; image-rendering: pixelated; z-index: 1`;
                        console.log(image.style);
                    };

                    // Add the image as overlay
                    canvas.shadowRoot.querySelector('.container').appendChild(image);
                }
            }
        });

        // Add a style to put a hole in the pixel preview (to see the current or desired color)
        const waitForPreview = setInterval(() => {
            const preview = camera.querySelector("mona-lisa-pixel-preview");
            if (preview) {
              clearInterval(waitForPreview);
              const style = document.createElement('style')
              style.innerHTML = '.pixel { clip-path: polygon(-20% -20%, -20% 120%, 37% 120%, 37% 37%, 62% 37%, 62% 62%, 37% 62%, 37% 120%, 120% 120%, 120% -20%); }'
              preview.shadowRoot.appendChild(style);
            }
        }, 100);
    }, false);
}
