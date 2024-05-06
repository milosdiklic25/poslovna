// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the import list
// - the code between BEGIN USER CODE and END USER CODE
// - the code between BEGIN EXTRA CODE and END EXTRA CODE
// Other code you write will be lost the next time you deploy the project.
import { Big } from "big.js";

// BEGIN EXTRA CODE
// END EXTRA CODE

/**
 * Take a picture using the device's camera.
 * @param {MxObject} picture - This is required.
 * @param {boolean} showConfirmationScreen
 * @param {"WebActions.PictureQuality.original"|"WebActions.PictureQuality.low"|"WebActions.PictureQuality.medium"|"WebActions.PictureQuality.high"|"WebActions.PictureQuality.custom"} pictureQuality - The default picture quality is 'Medium'.
 * @param {Big} maximumWidth - The picture will be scaled to this maximum pixel width, while maintaining the aspect ratio.
 * @param {Big} maximumHeight - The picture will be scaled to this maximum pixel height, while maintaining the aspect ratio.
 * @returns {Promise.<boolean>}
 */
export async function TakePicture(picture, showConfirmationScreen, pictureQuality, maximumWidth, maximumHeight) {
	// BEGIN USER CODE
    const CAMERA_POSITION = {
        BACK_CAMERA: "environment",
        FRONT_CAMERA: "user"
    };
    const getUserText = prepareLanguage();
    if (!picture) {
        return Promise.reject(new Error("Input parameter 'Picture' is required."));
    }
    if (!picture.inheritsFrom("System.Image")) {
        return Promise.reject(new Error(`Entity ${picture.getEntity()} does not inherit from 'System.Image'.`));
    }
    if (!("mediaDevices" in navigator) || !("getUserMedia" in navigator.mediaDevices)) {
        return Promise.reject(new Error("Media devices are not supported."));
    }
    if (pictureQuality === "custom" && !maximumHeight && !maximumWidth) {
        return Promise.reject(
            new Error("Picture quality is set to 'Custom', but no maximum width or height was provided")
        );
    }
    // TODO: WC-463 rollup has a bug where comments are removed from the top of files, disallowing imports between "extra code" comments. Until this is fixed, SVGs are manually encoded and added here.
    const closeSVG =
        "PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOC4yMjIyIDE2LjAwMDNMMjYuNTM5NyA3LjY4MjhDMjcuMTU0MSA3LjA2ODM4IDI3LjE1NDEgNi4wNzUyNCAyNi41Mzk3IDUuNDYwODJDMjUuOTI1MyA0Ljg0NjM5IDI0LjkzMjEgNC44NDYzOSAyNC4zMTc3IDUuNDYwODJMMTYuMDAwMiAxMy43NzgzTDcuNjgyNzkgNS40NjA4MkM3LjA2ODM3IDQuODQ2MzkgNi4wNzUyNCA0Ljg0NjM5IDUuNDYwODIgNS40NjA4MkM0Ljg0NjM5IDYuMDc1MjQgNC44NDYzOSA3LjA2ODM4IDUuNDYwODIgNy42ODI4TDEzLjc3ODMgMTYuMDAwM0w1LjQ2MDgyIDI0LjMxNzhDNC44NDYzOSAyNC45MzIzIDQuODQ2MzkgMjUuOTI1NCA1LjQ2MDgyIDI2LjUzOThDNS43NjcyNCAyNi44NDYzIDYuMTY5NTIgMjcuMDAwMyA2LjU3MTggMjcuMDAwM0M2Ljk3NDA4IDI3LjAwMDMgNy4zNzYzNiAyNi44NDYzIDcuNjgyNzkgMjYuNTM5OEwxNi4wMDAyIDE4LjIyMjNMMjQuMzE3NyAyNi41Mzk4QzI0LjYyNDEgMjYuODQ2MyAyNS4wMjY0IDI3LjAwMDMgMjUuNDI4NyAyNy4wMDAzQzI1LjgzMSAyNy4wMDAzIDI2LjIzMzMgMjYuODQ2MyAyNi41Mzk3IDI2LjUzOThDMjcuMTU0MSAyNS45MjU0IDI3LjE1NDEgMjQuOTMyMyAyNi41Mzk3IDI0LjMxNzhMMTguMjIyMiAxNi4wMDAzWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
    const syncSVG =
        "PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS45OTk5IDVDMTIuNzA5MyA1IDkuNzU0NzQgNi40NDQ1NCA3LjczNzY2IDguNzM3NjJMMTAuMTQ2NCAxMS4xNDY0QzEwLjQ2MTQgMTEuNDYxNCAxMC4yMzgzIDEyIDkuNzkyOSAxMkgyLjVDMi4yMjM4NiAxMiAyIDExLjc3NjEgMiAxMS41VjQuMjA3MDZDMiAzLjc2MTYgMi41Mzg1OCAzLjUzODUyIDIuODUzNTYgMy44NTM1TDUuNjEzMiA2LjYxMzE2QzguMTczOTIgMy43ODE1IDExLjg3ODIgMiAxNS45OTk5IDJDMjMuMTY0NCAyIDI5LjA3MDIgNy4zODA0MiAyOS45MDAyIDE0LjMyMTlDMjkuOTk4NiAxNS4xNDQ0IDI5LjQxMTYgMTUuODkxIDI4LjU4OSAxNS45ODk0QzI3Ljc2NjQgMTYuMDg3OCAyNy4wMTk4IDE1LjUwMDcgMjYuOTIxNCAxNC42NzgxQzI2LjI2OTYgOS4yMjY5IDIxLjYyNzIgNSAxNS45OTk5IDVaTTMuNDEwOSAxNi4wMTA2QzQuMjMzNDYgMTUuOTEyMiA0Ljk4MDAyIDE2LjQ5OTMgNS4wNzg0IDE3LjMyMTlDNS43MzAzMiAyMi43NzMgMTAuMzcyNiAyNyAxNS45OTk5IDI3QzE5LjI5MDYgMjcgMjIuMjQ1MiAyNS41NTU0IDI0LjI2MjIgMjMuMjYyNEwyMS44NTM2IDIwLjg1MzZDMjEuNTM4NiAyMC41Mzg2IDIxLjc2MTYgMjAgMjIuMjA3MiAyMEgyOS41QzI5Ljc3NjIgMjAgMzAgMjAuMjI0IDMwIDIwLjVWMjcuNzkzQzMwIDI4LjIzODQgMjkuNDYxNCAyOC40NjE0IDI5LjE0NjQgMjguMTQ2NEwyNi4zODY4IDI1LjM4NjhDMjMuODI2IDI4LjIxODQgMjAuMTIxNiAzMCAxNS45OTk5IDMwQzguODM1NDIgMzAgMi45Mjk3OCAyNC42MTk2IDIuMDk5NjIgMTcuNjc4MUMyLjAwMTI2IDE2Ljg1NTYgMi41ODgzNCAxNi4xMDkgMy40MTA5IDE2LjAxMDZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";
    const cameraButtonSVG =
        "PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIHZpZXdCb3g9IjAgMCA3MCA3MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzUiIGN5PSIzNSIgcj0iMzUiIGZpbGw9IndoaXRlIi8+CjxjaXJjbGUgY3g9IjM1IiBjeT0iMzUiIHI9IjI4IiBmaWxsPSJ3aGl0ZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=";
    const saveSVG =
        "PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI5Ljc1ODMgNS4zOTY5NEMzMC40MDY5IDUuOTczNTMgMzAuNDY1NCA2Ljk2Njc5IDI5Ljg4ODggNy42MTU0NEwxMy4xMjY5IDI2LjQ3MjZDMTIuODI4NyAyNi44MDgxIDEyLjQwMTIgMjcgMTEuOTUyNCAyN0MxMS41MDM1IDI3IDExLjA3NjEgMjYuODA4MSAxMC43Nzc5IDI2LjQ3MjZMMi4zOTY5NCAxNy4wNDRDMS44MjAzNiAxNi4zOTUzIDEuODc4NzkgMTUuNDAyMSAyLjUyNzQ0IDE0LjgyNTVDMy4xNzYxIDE0LjI0ODkgNC4xNjkzNiAxNC4zMDc0IDQuNzQ1OTQgMTQuOTU2TDExLjk1MjQgMjMuMDYzM0wyNy41Mzk4IDUuNTI3NDRDMjguMTE2NCA0Ljg3ODc5IDI5LjEwOTYgNC44MjAzNiAyOS43NTgzIDUuMzk2OTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        let error;
        let stream;
        let videoIsReady = false;
        let shouldFaceEnvironment = true;
        const {
            video,
            wrapper,
            actionControl,
            switchControl,
            closeControl,
            createAction,
            controlsWrapper,
            createActionAndSwitch,
            addAllControlButtons,
            removeAllControlButtons
        } = createFirstScreenElements();
        document.body.appendChild(wrapper);
        await startCamera(CAMERA_POSITION.BACK_CAMERA);
        const { handler: takePictureHandler, cleanup: secondScreenCleanup } = prepareSecondScreen();
        if (await hasMultipleCameras()) {
            controlsWrapper.classList.add("take-picture-action-switch-control-wrapper");
            createActionAndSwitch();
        } else {
            controlsWrapper.classList.add("take-picture-action-control-wrapper");
            createAction();
        }
        closeControl.addEventListener("click", () => {
            closeControlHandler();
            secondScreenCleanup();
            resolve(false);
        });
        switchControl.addEventListener("click", switchControlHandler);
        actionControl.addEventListener("click", () => {
            removeAllControlButtons();
            if (showConfirmationScreen) {
                // Delay the `takePictureHandler` to the next cycle so the UI preparations can go first. Otherwise, the control-buttons are not removed while the second screen is being set up.
                setTimeout(() => {
                    takePictureHandler(() => {
                        addAllControlButtons();
                        video.play();
                    });
                }, 0);
            } else {
                video.pause();
                const videoCanvas = getVideoCanvas();
                savePicture(videoCanvas, () => {
                    videoCanvas.remove();
                    closeControlHandler();
                });
            }
        });
        video.addEventListener("loadedmetadata", () => (videoIsReady = true));
        function getVideoCanvas() {
            const videoCanvas = document.createElement("canvas");
            videoCanvas.height = video.videoHeight;
            videoCanvas.width = video.videoWidth;
            const videoContext = videoCanvas.getContext("2d");
            videoContext === null || videoContext === void 0 ? void 0 : videoContext.drawImage(video, 0, 0);
            return videoCanvas;
        }
        function createFirstScreenElements() {
            const wrapper = document.createElement("div");
            wrapper.setAttribute("role", "dialog");
            wrapper.setAttribute("aria-labelledby", "take-picture-modal-label");
            wrapper.classList.add("take-picture-wrapper");
            const video = document.createElement("video");
            video.classList.add("take-picture-video-element");
            video.setAttribute("autoplay", "");
            video.setAttribute("muted", "");
            video.setAttribute("playsinline", "");
            const controlsWrapper = document.createElement("div");
            const closeControlWrapper = document.createElement("div");
            closeControlWrapper.classList.add("take-picture-close-control-wrapper");
            const actionControl = document.createElement("button");
            actionControl.setAttribute("aria-label", getUserText("Take picture", "Foto nemen"));
            actionControl.classList.add("take-picture-action-control");
            const actionControlWrapper = document.createElement("div");
            actionControlWrapper.classList.add("take-picture-action-spacing");
            const switchControl = document.createElement("button");
            switchControl.setAttribute("aria-label", getUserText("Switch camera", "Van camera wisselen"));
            switchControl.classList.add("take-picture-switch-control");
            const switchControlWrapper = document.createElement("div");
            switchControlWrapper.classList.add("take-picture-switch-spacing");
            const closeControl = document.createElement("button");
            closeControl.setAttribute("aria-label", getUserText("Close", "Afsluiten"));
            closeControl.classList.add("take-picture-close-control");
            const closeImg = document.createElement("img");
            closeImg.src = `data:image/svg+xml;base64,${closeSVG}`;
            const switchImg = document.createElement("img");
            switchImg.src = `data:image/svg+xml;base64,${syncSVG}`;
            const takePictureImg = document.createElement("img");
            takePictureImg.src = `data:image/svg+xml;base64,${cameraButtonSVG}`;
            closeControl.appendChild(closeImg);
            switchControl.appendChild(switchImg);
            actionControl.appendChild(takePictureImg);
            function createActionAndSwitch() {
                const spacingDiv = document.createElement("div");
                spacingDiv.classList.add("take-picture-spacing-div");
                actionControlWrapper.appendChild(actionControl);
                switchControlWrapper.appendChild(switchControl);
                controlsWrapper.appendChild(spacingDiv);
                controlsWrapper.appendChild(actionControlWrapper);
                controlsWrapper.appendChild(switchControlWrapper);
            }
            closeControlWrapper.appendChild(closeControl);
            function addAllControlButtons() {
                wrapper.appendChild(controlsWrapper);
                wrapper.appendChild(closeControlWrapper);
            }
            function removeAllControlButtons() {
                wrapper.removeChild(controlsWrapper);
                wrapper.removeChild(closeControlWrapper);
            }
            addAllControlButtons();
            wrapper.appendChild(video);
            return {
                video,
                wrapper,
                controlsWrapper,
                actionControl,
                switchControl,
                closeControl,
                createActionAndSwitch,
                createAction: () => controlsWrapper.appendChild(actionControl),
                addAllControlButtons,
                removeAllControlButtons
            };
        }
        function prepareSecondScreen() {
            let confirmationWrapper;
            return {
                handler: onResumeFirstScreen => {
                    if (videoIsReady) {
                        confirmationWrapper = document.createElement("div");
                        confirmationWrapper.classList.add("take-picture-confirm-wrapper");
                        video.pause();
                        // Element to retrieve the blob from mediaStream (not rendered on the screen)
                        const videoCanvas = getVideoCanvas();
                        const pictureImg = document.createElement("img");
                        pictureImg.classList.add("take-picture-image");
                        pictureImg.src = videoCanvas.toDataURL();
                        const buttonWrapper = document.createElement("div");
                        buttonWrapper.classList.add("take-picture-button-wrapper");
                        const saveBtn = document.createElement("button");
                        saveBtn.setAttribute("aria-label", getUserText("Save", "Opslaan"));
                        saveBtn.classList.add("take-picture-save-control");
                        const saveImg = document.createElement("img");
                        saveImg.src = `data:image/svg+xml;base64,${saveSVG}`;
                        saveBtn.appendChild(saveImg);
                        const closeBtn = document.createElement("button");
                        closeBtn.setAttribute("aria-label", getUserText("Close", "Afsluiten"));
                        closeBtn.classList.add("take-picture-close-control");
                        const closeImg = document.createElement("img");
                        closeImg.src = `data:image/svg+xml;base64,${closeSVG}`;
                        closeBtn.appendChild(closeImg);
                        buttonWrapper.appendChild(closeBtn);
                        buttonWrapper.appendChild(saveBtn);
                        confirmationWrapper.appendChild(buttonWrapper);
                        confirmationWrapper.appendChild(pictureImg);
                        document.body.appendChild(confirmationWrapper);
                        saveBtn.addEventListener("click", () => {
                            confirmationWrapper.removeChild(buttonWrapper);
                            savePicture(videoCanvas, () => {
                                closeControlHandler();
                                cleanupConfirmationElements();
                            });
                        });
                        closeBtn.addEventListener("click", () => {
                            cleanupConfirmationElements();
                            onResumeFirstScreen();
                        });
                        // eslint-disable-next-line no-inner-declarations
                        function cleanupConfirmationElements() {
                            document.body.removeChild(confirmationWrapper);
                            videoCanvas.remove();
                        }
                    }
                },
                cleanup: () => {
                    try {
                        document.body.removeChild(confirmationWrapper);
                    } catch (e) {
                        // silently handle case where node already removed.
                    }
                }
            };
        }
        async function switchControlHandler() {
            if (!stream) {
                return;
            }
            stopCamera();
            if (await hasMultipleCameras()) {
                shouldFaceEnvironment = !shouldFaceEnvironment;
            }
            await startCamera(shouldFaceEnvironment ? CAMERA_POSITION.BACK_CAMERA : CAMERA_POSITION.FRONT_CAMERA);
        }
        function closeControlHandler() {
            stopCamera();
            document.body.removeChild(wrapper);
        }
        async function startCamera(facingMode) {
            var _a;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: Object.assign({ facingMode }, getCameraQuality())
                });
                (_a = stream === null || stream === void 0 ? void 0 : stream.getTracks()) === null || _a === void 0
                    ? void 0
                    : _a.forEach(track => {
                          track.addEventListener("ended", () => {
                              closeControlHandler();
                              reject(new Error("Video stream unexpectedly ended."));
                          });
                      });
            } catch (e) {
                if (e instanceof Error) {
                    switch (e.name) {
                        case "NotAllowedError":
                            error = getUserText("Permission denied.", "Geen toestemming.");
                            break;
                        case "NotFoundError":
                            error = getUserText("Media not available.", "Media niet beschikbaar.");
                            break;
                        case "NotReadableError":
                            error = getUserText(
                                "Media not available, is it already in use elsewhere?",
                                "Media niet beschikbaar, wordt deze al ergens anders gebruikt?"
                            );
                            break;
                        default:
                            error = e.message;
                            break;
                    }
                }
            }
            if (error) {
                closeControlHandler();
                mx.ui.error(error);
                resolve(false);
            }
            if (stream) {
                video.srcObject = stream;
            }
        }
        function stopCamera() {
            videoIsReady = false;
            const tracks = stream === null || stream === void 0 ? void 0 : stream.getTracks();
            tracks === null || tracks === void 0
                ? void 0
                : tracks.forEach(track => {
                      track.stop();
                  });
            stream = undefined;
        }
        function savePicture(videoCanvas, onSuccess) {
            const progressId = mx.ui.showProgress();
            const filename = `device-camera-picture-${new Date().getTime()}.png`; // `toBlob` defaults to PNG.
            new Promise((resolve, reject) => {
                videoCanvas.toBlob(blob => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        mx.ui.hideProgress(progressId);
                        reject(new Error("Couldn't save picture, please try again."));
                    }
                });
            })
                .then(blob => {
                    mx.data.saveDocument(
                        picture.getGuid(),
                        filename,
                        {},
                        blob,
                        () => {
                            picture.set("Name", filename);
                            mx.data.commit({
                                mxobj: picture,
                                callback: () => {
                                    mx.ui.hideProgress(progressId);
                                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                                    resolve(true);
                                },
                                error: error => {
                                    mx.ui.hideProgress(progressId);
                                    reject(
                                        new Error(
                                            `An error occurred while trying to save the file${
                                                error.message ? `: ${error.message}` : ""
                                            }. Please try again.`
                                        )
                                    );
                                }
                            });
                        },
                        error => {
                            mx.ui.hideProgress(progressId);
                            reject(
                                new Error(
                                    `An error occurred while trying to save the file${
                                        error.message ? `: ${error.message}` : ""
                                    }. Please try again.`
                                )
                            );
                        }
                    );
                })
                .catch(message => {
                    mx.ui.hideProgress(progressId);
                    reject(new Error(message));
                });
        }
        function getCameraQuality() {
            switch (pictureQuality) {
                case "low":
                    return {
                        width: { ideal: 1024 },
                        height: { ideal: 1024 }
                    };
                case "medium":
                default:
                    return {
                        width: { ideal: 2048 },
                        height: { ideal: 2048 }
                    };
                case "high":
                    return {
                        width: { ideal: 4096 },
                        height: { ideal: 4096 }
                    };
                case "custom":
                    return {
                        width: { ideal: Number(maximumWidth) },
                        height: { ideal: Number(maximumHeight) }
                    };
            }
        }
    });
    function prepareLanguage() {
        const englishFn = english => english;
        try {
            return mx.session.sessionData.locale.code.toLowerCase().includes("en")
                ? englishFn
                : (_english, dutch) => dutch;
        } catch (_) {
            return englishFn;
        }
    }
    async function hasMultipleCameras() {
        const videoDevices = (await navigator.mediaDevices.enumerateDevices()).filter(
            deviceInfo => deviceInfo.kind === "videoinput"
        );
        if (!videoDevices.length) {
            return Promise.reject(new Error("Your device does not have a camera."));
        }
        return videoDevices.length > 1;
    }
	// END USER CODE
}
