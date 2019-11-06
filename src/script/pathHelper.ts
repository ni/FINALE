export class PathHelper {
    public static prefix = "";
    public static metadataFileName = "/metadata.json";
    public static getMetadataFilePath(filePath: string) {
        return this.prefix + filePath + this.metadataFileName;
    }
    public static getSourcePath(filePath: string) {
        return this.prefix + filePath;
    }
}
