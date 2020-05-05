import { getCookie } from "./cookies";

export class Main {
    public static viPath;

    public static LoadFile(filePath: string) {
        const currentState = history.state;
        const search = "?q=" + filePath;
        const hashValue =  getCookie(filePath.slice(1));
        if (currentState !== null) {
            const bdDiv: HTMLElement = document.getElementById("BlockDiagram");
            if (bdDiv != null) {
                currentState.xPos = bdDiv.scrollLeft;
                currentState.yPos = bdDiv.scrollTop;
            }
        }
        if (hashValue == null) {
            this.RedirectFinale(search);
        } else {
            this.RedirectFinale(search + "#" + hashValue);
        }
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
