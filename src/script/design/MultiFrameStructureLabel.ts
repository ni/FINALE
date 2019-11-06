import { IRect, MultiFrameStructure } from "../model/Model";
import { ElementView } from "./Element";

export class MultiFrameStructureLabel {
    public elementArr: HTMLElement[];
    public caseNameArr: string[];
    public currIdx: number;
    public modelObj: MultiFrameStructure;
    constructor(elementArr: HTMLElement[], modelObj: MultiFrameStructure, caseNameArr: string[]) {
        this.elementArr = elementArr;
        this.modelObj = modelObj;
        this.currIdx = modelObj.visibleFrame;
        this.caseNameArr = caseNameArr;
        ElementView.toggleVisibility(this.elementArr[this.currIdx]);
    }
    public toggleRight(event, obj: MultiFrameStructureLabel) {
        ElementView.toggleVisibility(obj.elementArr[obj.currIdx]);
        obj.currIdx = (obj.currIdx + 1 + obj.elementArr.length) % obj.elementArr.length;
        obj.modelObj.visibleFrame = obj.currIdx;
        ElementView.toggleVisibility(obj.elementArr[obj.currIdx]);
        const selectorLabel = event.target.parentElement;
        const selectTag = selectorLabel.getElementsByTagName("select")[0];
        selectTag.selectedIndex = obj.currIdx;
    }
    public toggleLeft(event, obj: MultiFrameStructureLabel) {
        ElementView.toggleVisibility(obj.elementArr[obj.currIdx]);
        obj.currIdx = (obj.currIdx - 1 + obj.elementArr.length) % obj.elementArr.length;
        obj.modelObj.visibleFrame = obj.currIdx;
        ElementView.toggleVisibility(obj.elementArr[obj.currIdx]);
        const selectorLabel = event.target.parentElement;
        const selectTag = selectorLabel.getElementsByTagName("select")[0];
        selectTag.selectedIndex = obj.currIdx;
    }
    public toggleToIdx(event, obj: MultiFrameStructureLabel) {
        ElementView.toggleVisibility(obj.elementArr[obj.currIdx]);
        obj.currIdx = parseInt(event.target.value, 10);
        obj.modelObj.visibleFrame = obj.currIdx;
        ElementView.toggleVisibility(obj.elementArr[obj.currIdx]);
    }
    public createSwitcher(id: string, switcherFn: any, offsetX: number, hoverIcon: string): HTMLElement {
        const switcherBounds: IRect = {x: offsetX, y: 0, w: 9, h: 16};
        const switcherElem = ElementView.createElement(switcherBounds, id);
        ElementView.addEvent(switcherElem, "click", switcherFn, this);
        switcherElem.style.cursor = "url('" +  hoverIcon + "'), auto";
        return switcherElem;
    }
    public createSelector(id: string, selectorFn: any, offsetX: number, sizeWidth: number): HTMLElement {
        const selectorBounds: IRect = {x: offsetX, y: 0, w: sizeWidth, h: 16};
        const selectorElem = ElementView.createElement(selectorBounds, id, "select");
        selectorElem.style.fontSize = "9px";
        ElementView.addEvent(selectorElem, "click", selectorFn, this);
        for (let i = 0 ; i  < this.elementArr.length; i++) {
            const condOpt = document.createElement("option");
            condOpt.value = "" + i;
            condOpt.innerHTML = this.caseNameArr[i];
            selectorElem.appendChild(condOpt);
        }
        (selectorElem as HTMLSelectElement).value = "" + this.modelObj.visibleFrame;
        selectorElem.style.cursor = "pointer";
        return selectorElem;
    }
    public generate(obj: MultiFrameStructure): HTMLElement {
        const componentElement: HTMLElement = ElementView.createElement(obj.selectorBounds, obj.id + "Selector");
        const leftT = this.createSwitcher("LeftToggle", this.toggleLeft, 0, "./images/leftToggle.png");
        const dropD = this.createSelector("CaseSelector", this.toggleToIdx, 8, obj.selectorBounds.w - 16);
        const rightT = this.createSwitcher(
            "RightToggle", this.toggleRight, obj.selectorBounds.w - 8, "./images/rightToggle.png");
        ElementView.toggleVisibility(leftT);
        ElementView.toggleVisibility(dropD);
        ElementView.toggleVisibility(rightT);
        ElementView.addElement(componentElement, leftT);
        ElementView.addElement(componentElement, dropD);
        ElementView.addElement(componentElement, rightT);
        return componentElement;
    }
}
