import { Node } from "../model/Model";
import { ComponentView, ElementView } from "./View";

export class NodeView extends ComponentView {

    public generate(obj) {
        // ElementView.addEvent(componentElement, "dblclick", this.openVI, obj.path);
        const anchor = ElementView.createElement(obj.bounds, obj.id + " " + obj.type, "a");
        const componentElement = super.generate(obj);
        const helpUrl = "http://www.ni.com/documentation/en/labview-comms/4.0/node-ref/" + (obj.path).toLowerCase();
        anchor.setAttribute(
            "href",
            helpUrl,
        );
        anchor.appendChild(componentElement);
        return anchor;
    }
}
