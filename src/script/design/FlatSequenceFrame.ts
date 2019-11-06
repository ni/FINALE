import { FlatSequenceFrame } from "../model/Model";
import { ComponentView, DiagramView, ElementView } from "./View";

export class FlatSequenceFrameView extends ComponentView {
    public generate(obj: FlatSequenceFrame): HTMLElement {
        const componentElement = super.generate(obj);
        const subDiagram = new DiagramView();
        const subElement = subDiagram.generate(obj.diagram);
        ElementView.addElement(componentElement, subElement);
        return componentElement;
    }
}
