import { FlatSequenceFrame, FlatSequenceStructure } from "../model/Model";
import { ComponentView, DiagramView, ElementView, FlatSequenceFrameView} from "./View";

export class FlatSequenceStructureView extends ComponentView {
    public generate(obj: FlatSequenceStructure): HTMLElement {
        const componentElement = super.generate(obj);
        for (const componentObj of obj.frameArr) {
            if (componentObj) {
                const subComponent: FlatSequenceFrameView = super.createObject(componentObj.type);
                const subElem = subComponent.generate(componentObj);
                ElementView.toggleVisibility(subElem);
                ElementView.addElement(componentElement, subElem);
            }
        }
        return componentElement;
    }
}
