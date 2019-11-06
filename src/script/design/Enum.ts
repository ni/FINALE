import { Enum, Structure } from "../model/Model";
import { ComponentView, DiagramView, ElementView } from "./View";

export class EnumView {
    public generate(obj: Enum): HTMLElement {
        const enumElem = ElementView.createElement(obj.bounds, obj.id, "select");
        enumElem.style.fontSize = "9px";
        for (let i = 0 ; i  < obj.values.length; i++) {
            const condOpt = document.createElement("option");
            condOpt.value = "" + i;
            condOpt.innerHTML = obj.values[i];
            enumElem.appendChild(condOpt);
        }
        (enumElem as HTMLElement).style.opacity = "0";
        enumElem.style.cursor = "pointer";
        return enumElem;
    }
}
