import { FunctionNode } from "../model/Model";
import { ComponentView } from "./View";

export class FunctionView extends ComponentView {
    public generate(obj: FunctionNode): HTMLElement {
        const componentElement = super.generate(obj);
        return componentElement;
    }
}
