import { Component } from "./Component";
import * as model from "./Model";

export class ModelFactory {
    public static createObject(id: string, type: string): any {
        switch (type) {
            case "MultiFrameStructure": return new model.MultiFrameStructure(id);
            case "SubVI": return new model.SubVI(id);
            case "Structure": return new model.Structure(id);
            case "Diagram": return new model.Diagram(id);
            case "FlatSequence": return new model.FlatSequenceStructure(id);
            case "FlatSequenceFrame": return new model.FlatSequenceFrame(id);
            case "DynamicDispatchSubVI": return new model.DynamicDispatch(id);
            case "LVClass": return new model.LVClass();
            case "Enum": return new model.Enum(id);
            case "TabControl": return new model.TabControl(id);
            case "Function": return new model.FunctionNode(id);
            case "Node": return new model.Node(id);
            case "GType": return new model.GType();
            default: return new model.Component(id, type);
        }
    }
}
