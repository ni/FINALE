export class Main {
    public static viPath;

    public static LoadFile(filePath: string) {
        const currentState = history.state;
        const search = "?q=" + filePath;
        if (currentState !== null) {
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
