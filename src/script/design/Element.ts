import { IRect } from "../model/Model";

export class ElementView {
    public static createElement(
        bounds: IRect, id: string, elementType: string = "div", positionType: string = "absolute"): HTMLElement {
        const component: HTMLElement = document.createElement(elementType);
        component.className = id;
        component.style.position = positionType;
        component.style.left = bounds.x + "px";
        component.style.top = bounds.y + "px";
        component.style.width = bounds.w + "px";
        component.style.height = bounds.h + "px";
        component.style.display = "none";
        component.style.filter = "alpha(opacity=90)"; // IE fallback
        return component;
    }
    public static toggleVisibility(domObj: HTMLElement): HTMLElement {
        domObj.style.display = domObj.style.display === "none" ? "inline-block" : "none";
        return domObj;
    }
    public static setVisible(domObj: HTMLElement, visibility: boolean): HTMLElement {
        if (visibility) {
            if (domObj.style.display === "inline-block") {
                return;
            } else {
                domObj.style.display = "inline-block";
            }
        } else {
            domObj.style.display = "none";
        }
        return domObj;
    }
    public static addImage(domObj: HTMLElement, imagePath: string): HTMLElement {
        const bgImg = new Image();
        bgImg.src = imagePath;
        domObj.appendChild(bgImg);
        return bgImg;
    }
    public static addElement(domObj: HTMLElement, addedObj: HTMLElement): HTMLElement {
        domObj.appendChild(addedObj);
        return domObj;
    }
    public static addEvent(domObj: HTMLElement, eventType: string, eventCallback: any, param?: any) {
        domObj.addEventListener(eventType, (e) => { eventCallback(e, param); });
        return domObj;
    }
}
