import { Diagram } from "../model/Model";
import { ComponentView, ElementView } from "./View";

export class DiagramView extends ComponentView {
    protected isHelpTarget: boolean = false;
    public generate(obj: Diagram): HTMLElement {
        let componentElement = super.generate(obj);
        componentElement.style.width = "100%";
        componentElement.style.height = "100%";
        if (obj.imagePath !== "") {
            ElementView.addImage(componentElement, obj.imagePath);
        }
        componentElement = ElementView.toggleVisibility(componentElement);
        for (const componentObj of obj.componentArr) {
            if (componentObj) {
                const subComponent: ComponentView = super.createObject(componentObj.type);
                let subElem = subComponent.generate(componentObj);
                subElem = ElementView.toggleVisibility(subElem);
                componentElement = ElementView.addElement(componentElement, subElem);
            }
        }
        return componentElement;
    }
}
