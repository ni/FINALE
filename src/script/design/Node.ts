import { Node } from "../model/Model";
import { ComponentView, ElementView } from "./View";

export class NodeView extends ComponentView {

    public generate(obj) {
        // ElementView.addEvent(componentElement, "dblclick", this.openVI, obj.path);
        const anchor = ElementView.createElement(obj.bounds, obj.id + " " + obj.type, "a");
        const componentElement = super.generate(obj);
        anchor.setAttribute("href", "http://www.ni.com/documentation/en/labview-comms/4.0/node-ref/" + (obj.path).toLowerCase());
        anchor.appendChild(componentElement);
        return anchor;
    }
}
