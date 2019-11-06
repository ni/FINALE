import { HelpProvider } from "../help/helpProvider";
import { Component } from "../model/Model";
import { ElementView } from "./Element";
import * as view from "./View";

export class ComponentView {
    protected isHelpTarget: boolean = true;
    public generate(obj: Component): HTMLElement {
        const componentElement: HTMLElement = view.ElementView.createElement(obj.bounds, obj.id + " " + obj.type);
        ElementView.addEvent(
            componentElement,
            "mouseover",
            (event, modelObj) => {
                const timeObj = window.setTimeout(
                    () => {
                        HelpProvider.showContextHelp(event, modelObj);
                    },
                    1000,
                    event,
                    modelObj);
                ElementView.addEvent(
                    event.target,
                    "mouseout",
                    (ev, timerObj) => {
                        window.clearTimeout(timerObj);
                    },
                    timeObj);
                event.stopPropagation();
            },
            obj);
        return componentElement;
    }

    protected createObject(type: string) {
        switch (type) {
            case "MultiFrameStructure": return new view.MultiFrameStructureView();
            case "SubVI": return new view.SubVIView();
            case "Structure": return new view.StructureView();
            case "Diagram": return new view.DiagramView();
            case "FlatSequence": return new view.FlatSequenceStructureView();
            case "FlatSequenceFrame": return new view.FlatSequenceFrameView();
            case "DynamicDispatchSubVI": return new view.DynamicDispatchView();
            case "Enum": return new view.EnumView();
            case "TabControl": return new view.TabControlView();
            case "Function": return new view.FunctionView();
            default: return new ComponentView();
        }
    }
}
