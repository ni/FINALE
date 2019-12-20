import { DiagramView } from "./design/View";
import * as view from "./design/View";
import { VirtualInstrument } from "./model/Model";

export class ViewFactory {
    public generate(viModel: any): HTMLElement {
        let viObj = null;
        switch (viModel.type) {
            case "LVClass": viObj = new view.LVClassView(); break;
            case "Control": viObj = new view.VirtualInstrumentView(); break;
            case "VirtualInstrument": viObj = new view.VirtualInstrumentView(); break;
            case "Polymorphic VI": viObj = new view.PolymorphicVIView(); break;
            case "GType": viObj = new view.GTypeView(); break;
        }
        return viObj.generate(viModel);
    }
}
