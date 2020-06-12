import { stat } from "fs";
import { isNullOrUndefined } from "util";

export class Main {
    public static viPath;
    public static viModel;

    public static LoadFile(filePath: string) {
        const currentState = top.history.state;
        const search = "?q=" + filePath;
        if (currentState !== null) {
            /* As a few file types (like LVClass/ PolyVI) do not have # values,
            we store an empty string in the session storage instead of storing an undefined value. */
            const hash = isNullOrUndefined(currentState.filePath.split("#")[1]) ?
                                                "" : currentState.filePath.split("#")[1];
            const stateObj = {hashValue : hash, sourceModel : currentState.parsedContent};
            sessionStorage.setItem(currentState.filePath.split("#")[0], JSON.stringify(stateObj));

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
    }
});

top.onmessage = (e) => {
    top.frames[1].postMessage(e.data, "*");
};
