import { setCookie } from "../cookies";

export class HistoryManager {

    public static UpdateHistory(currentUrl: string, parsedContent: any) {
        const updatedPath = currentUrl;
        if (currentUrl.slice(0, 3) !== this.queryHeader) {
            updatedPath.replace(this.metadataFileName, "");
        }
        const stateObj = { filePath: updatedPath, parsedContent };
        top.history.replaceState(stateObj, updatedPath, updatedPath);
        setCookie(document.location.search.slice(4), document.location.hash.slice(1));
    }
    private static queryHeader: string = "?q=";
    private static metadataFileName: string = "/metadata.json";
}
