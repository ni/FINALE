import * as model from "./Model";
export class Component {
    public bounds: model.IRect;
    public id: string;
    public type: string;
    public path: string;
    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
        this.bounds = { x: 0, y: 0, w: 0, h: 0 };
    }
    public setBounds(bounds: model.IRect): void {
        this.bounds.x = bounds.x;
        this.bounds.y = bounds.y;
        this.bounds.w = bounds.w;
        this.bounds.h = bounds.h;
    }
    public parse(jsonObj: any) {
        this.setBounds(jsonObj.Bounds);
        if (jsonObj.Path) {
            this.path = jsonObj.Path;
        } else {
            this.path = this.id;
        }
    }
    protected createObject(id: string, type: string) {
        switch (type) {
            case "MultiFrameStructure": return new model.MultiFrameStructure(id);
            case "SubVI": return new model.SubVI(id);
            case "Structure": return new model.Structure(id);
            case "Diagram": return new model.Diagram(id);
            case "DynamicDispatchSubVI": return new model.DynamicDispatch(id);
            case "TabControl": return new model.TabControl(id);
            default: return new Component(id, type);
        }
    }
}
