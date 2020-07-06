import { Main } from "../main";
import { IRect } from "../model/Model";
import { TabControl } from "../model/TabControl";
import { ElementView } from "./Element";
import { HistoryManager } from "./HistoryManager";

export class PageLabel {
    public pageArr: HTMLElement[];
    public page: HTMLElement;
    public pageSelectorName: string;
    public pageSelectorBounds: IRect;
    public modelObj: TabControl;
    constructor(
        pageDivArr: HTMLElement[], page: HTMLElement, modelObj: TabControl,
        pageSelectorName: string, pageSelectorBounds: IRect) {
        this.pageArr = pageDivArr;
        this.page = page;
        this.modelObj = modelObj;
        this.pageSelectorName = pageSelectorName;
        this.pageSelectorBounds = pageSelectorBounds;
    }
    public selectPage(event, obj: PageLabel) {
        const owningTab: TabControl = obj.modelObj;
        const selectedPage: number = owningTab.visiblePage;
        for (let i = 0; i < owningTab.tabLength; i++) {
            ElementView.setVisible(obj.pageArr[i], false);
        }
        owningTab.visiblePage = owningTab.pageSelectorNameArr.indexOf(obj.pageSelectorName);
        ElementView.toggleVisibility(obj.page);
    }
    public deselectPage(event) {
        const btnDeselect: HTMLButtonElement = event.target;
        btnDeselect.style.borderBottomWidth = "0px";

    }
    public generate(pageSelectorBounds: IRect, ID): HTMLElement {
        const selectorElem: HTMLElement = ElementView.createElement(
            this.pageSelectorBounds, ID + "Selector", "button");
        selectorElem.style.backgroundColor = "#aaaaaa";
        selectorElem.innerHTML = this.pageSelectorName;
        selectorElem.style.bottom = pageSelectorBounds.y + "";
        ElementView.addEvent(selectorElem, "click", this.selectPage, this);
        return selectorElem;
    }
}
