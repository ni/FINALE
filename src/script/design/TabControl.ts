import { IRect } from "../model/Model";
import { TabControl } from "../model/TabControl";
import { PageLabel } from "./PageLabel";
import { ComponentView, DiagramView, ElementView } from "./View";

export class TabControlView extends ComponentView {
    public diagramElemArr: HTMLElement[];
    public pageSelectorElemArr: HTMLElement[];
    public generate(obj: TabControl): HTMLElement {
        let componentElement: HTMLElement = super.generate(obj);
        this.diagramElemArr = [];
        this.pageSelectorElemArr = [];
        for (let i = 0; i < obj.tabLength; i++) {
            const diagramObj: DiagramView = new DiagramView();
            const subDiagElement = diagramObj.generate(obj.diagramArr[i]);
            ElementView.toggleVisibility(subDiagElement);
            this.diagramElemArr.push(subDiagElement);
            ElementView.addElement(componentElement, subDiagElement);

            const pageSelector = new PageLabel(
                this.diagramElemArr, subDiagElement, obj, obj.pageSelectorNameArr[i], obj.pageSelectorBounds[i]);
            const selectorLabel = pageSelector.generate(obj.pageSelectorBounds[i], obj.id);
            ElementView.toggleVisibility(selectorLabel);
            ElementView.addElement(componentElement, selectorLabel);
            this.pageSelectorElemArr.push(selectorLabel);
        }
        for (let i = 0; i < obj.tabLength; i++) {
            componentElement = ElementView.addElement(componentElement, this.pageSelectorElemArr[i]);
        }
        ElementView.toggleVisibility(this.diagramElemArr[obj.visiblePage]);
        return componentElement;
    }
}
