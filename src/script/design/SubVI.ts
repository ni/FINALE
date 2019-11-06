import { Main } from "../main";
import { ComponentView, ElementView } from "./View";

export class SubVIView extends ComponentView {
    public openVI(event, viPath) {
        if (viPath) {
            Main.LoadFile(viPath);
        } else {
            alert("Sub VI Reference not found!");
        }
    }

    public generate(obj) {
        const componentElement = super.generate(obj);
        componentElement.style.cursor = "pointer";
        ElementView.addEvent(componentElement, "dblclick", this.openVI, obj.path);
        return componentElement;
    }
}
