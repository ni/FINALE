import { VirtualInstrument } from "../../src/script/model/Model";
import { ViewFactory } from "./../../src/script/viewFactory";

export class HTMLTools {
    public static getHTMLDOM(modelObj: VirtualInstrument) {
        const viewObj = new ViewFactory();
        return viewObj.generate(modelObj);
    }

    public static filterByType(htmlDOM: HTMLDivElement, type: string) {
        return htmlDOM.getElementsByClassName(type);
    }
}
