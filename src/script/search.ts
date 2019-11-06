document.addEventListener("DOMContentLoaded", () => SearchBox.onHeaderLoad(), false);
export class SearchBox {
    public static onHeaderLoad() {
        SearchBox.ensureSearchBox();
        SearchBox.searchTimerID = -1;
        SearchBox.lastQuery = null;

        // Place the cursor at the end of the search box by default
        SearchBox.searchBox.focus();

        SearchBox.searchBox.onkeyup = (event) => {
            if (event && (event.keyCode === 13 || !SearchBox.searchBox.value)) {
                SearchBox.onSearchChange();
            }
        };
    }
    private static searchBox;
    private static searchTimerID: any = -1;
    private static lastQuery: string = "";

    private static ensureSearchBox() {
        if (typeof SearchBox.searchBox === "object" && SearchBox.searchBox != null) {
            return;
        }
        SearchBox.searchBox = document.getElementById("search-box");
    }

    private static loadSearchResults() {
        SearchBox.searchTimerID = -1;
        const resultsFrame: Window = window.top.frames[1];
        if (resultsFrame) {
            resultsFrame.postMessage(SearchBox.searchBox.value, "*");
        }
    }

    private static onSearchChange() {
        SearchBox.ensureSearchBox();
        if (SearchBox.searchTimerID === -1) {
            SearchBox.searchTimerID = setTimeout(SearchBox.loadSearchResults, 200);
        }
    }
}
