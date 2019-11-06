import {IRect, MultiFrameStructure} from "../model/Model";
import { MultiFrameStructureLabel } from "./MultiFrameStructureLabel";
import {ComponentView, DiagramView, ElementView} from "./View";

export class MultiFrameStructureView extends ComponentView {
    public diagramElemArr: HTMLElement[];
    public generate(obj: MultiFrameStructure): HTMLElement {
        let componentElement: HTMLElement = super.generate(obj);
        this.diagramElemArr = [];
        for (let i = 0; i < obj.caseLength; i++) {
            const diagramObj: DiagramView = new DiagramView();
            const subDiagElement = diagramObj.generate(obj.diagramArr[i]);
            ElementView.toggleVisibility(subDiagElement);
            this.diagramElemArr.push(subDiagElement);
            ElementView.addElement(componentElement, subDiagElement);
        }
        const label = new MultiFrameStructureLabel(this.diagramElemArr, obj, obj.caseNameArr);
        let selectorLabel = label.generate(obj);
        selectorLabel = ElementView.toggleVisibility(selectorLabel);
        componentElement = ElementView.addElement(componentElement, selectorLabel);
        return componentElement;
    }
}
