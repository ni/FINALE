export class  ImageTools {
    public static fetchImage(ImagePath: string) {
        const img = new Image();
        const timeOut = 5 * 1000;
        const start = new Date().getTime();
        img.src = "http://localhost:9876/base/testAssets/json" + ImagePath;
        while (1) {
           if (img.complete || img.naturalWidth || new Date().getTime() - start > timeOut) {
               break;
           }
        }
        return img;
    }
}
