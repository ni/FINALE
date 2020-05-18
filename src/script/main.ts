import { stat } from "fs";
import { isNullOrUndefined } from "util";

export class Main {
    public static viPath;
    public static viModel;

    public static LoadFile(filePath: string) {
        const currentState = top.history.state;
        const search = "?q=" + filePath;
        if (currentState !== null) {
            /* As few file models(like LVClass/ PolyVi) donot have # values.
            So, we store a empty string instead of an undefined value.*/
            if (isNullOrUndefined(currentState.filePath.split("#")[1])) {
                const stateObj = {hashValue: "", sourceModel: currentState.parsedContent};
                sessionStorage.setItem(currentState.filePath.split("#")[0], JSON.stringify(stateObj));
            } else {
                const stateObj = {hashValue: currentState.filePath.split("#")[1],
                                  sourceModel: currentState.parsedContent};
                sessionStorage.setItem(currentState.filePath.split("#")[0], JSON.stringify(stateObj));
            }

            const bdDiv: HTMLElement = document.getElementById("BlockDiagram");
            if (bdDiv != null) {
                currentState.xPos = bdDiv.scrollLeft;
                currentState.yPos = bdDiv.scrollTop;
            }
        }
        this.RedirectFinale(search);
    }

    public static RedirectFinale(search: string) {
        let finaleFrame = window.top.frames[2];
        if (!finaleFrame) {
            finaleFrame = window;
        }
        if (finaleFrame) {
            finaleFrame.location = "finale.html" + search;
        }
    }
}
top.addEventListener("DOMContentLoaded", () => {
    if (document.location.search && top.frames.length === 3) {
        Main.RedirectFinale(document.location.search);
        top.onmessage = (e) => {
            top.frames[1].postMessage(e.data, "*");
        };
    }
});
