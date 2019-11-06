import * as view from "./design/View";
import * as model from "./model/Model";

export class Model {
    public static parseJSON(xhr: XMLHttpRequest, originPath) {
        const jsonObj = JSON.parse(xhr.responseText);
        let viObj = null;
        switch (jsonObj.NIDocument.Type) {
            case "LVClass": viObj = new model.LVClass(); break;
            case "LVLibp": viObj = new model.LVClass(); break;
            case "Control": viObj = new model.VirtualInstrument(); break;
            case "VirtualInstrument": viObj = new model.VirtualInstrument(); break;
            case "Polymorphic VI": viObj = new model.PolymorphicVI(); break;
        }
        model.VirtualInstrument.originPath = originPath;
        viObj.parse(jsonObj.NIDocument);
        return viObj;
    }
}
