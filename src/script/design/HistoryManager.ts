export class HistoryManager {

    public static UpdateHistory(currentUrl: string, parsedContent: any) {
        const updatedPath = currentUrl;
        if (currentUrl.slice(0, 3) !== this.queryHeader) {
            updatedPath.replace(this.metadataFileName, "");
        }
        const stateObj = { filePath: updatedPath, parsedContent };
        top.history.replaceState(stateObj, updatedPath, updatedPath);
        if (document.referrer === "http://127.0.0.1:8081/results.html") {
            sessionStorage.setItem(document.location.search, JSON.stringify(parsedContent));
        } else {
        sessionStorage.setItem(document.referrer.substring(document.referrer.indexOf("?")),
                        JSON.stringify(parsedContent));
        }
    }
    private static queryHeader: string = "?q=";
    private static metadataFileName: string = "/metadata.json";
}
