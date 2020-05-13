export class HistoryManager {

    public static UpdateHistory(currentUrl: string, parsedContent: any) {
        const updatedPath = currentUrl;
        if (currentUrl.slice(0, 3) !== this.queryHeader) {
            updatedPath.replace(this.metadataFileName, "");
        }
        const stateObj = { filePath: updatedPath, parsedContent };
        top.history.replaceState(stateObj, updatedPath, updatedPath);
    }
    private static queryHeader: string = "?q=";
    private static metadataFileName: string = "/metadata.json";
}
