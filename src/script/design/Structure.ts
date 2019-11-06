import { Structure } from "../model/Model";
import { ComponentView, DiagramView, ElementView } from "./View";

export class StructureView extends ComponentView {
    public generate(obj: Structure): HTMLElement {
        let componentElement = super.generate(obj);
        const subDiagram = new DiagramView();
        const subElement = subDiagram.generate(obj.diagram);
        componentElement = ElementView.addElement(componentElement, subElement);
        return componentElement;
    }
}
