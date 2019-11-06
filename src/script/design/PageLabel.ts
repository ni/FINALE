import { IRect } from "../model/Model";
import { TabControl } from "../model/TabControl";
import { ElementView } from "./Element";

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
        ElementView.setVisible(obj.page, true);
        owningTab.visiblePage = owningTab.pageSelectorNameArr.indexOf(obj.pageSelectorName);
        for (let i = 0; i < owningTab.tabLength; i++) {
            if (i !== owningTab.visiblePage) {
                ElementView.setVisible(obj.pageArr[i], false);
            }
        }
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
