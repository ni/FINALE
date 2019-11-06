import { LVClass } from "./LVClass";
import * as model from "./Model";

export class File {
    public ID: string;
    public type: string = "File";
    public path: string;
    constructor(type) {
        this.type = type;
    }
    public parse(jsonObj) {
        this.ID = jsonObj.ID;
        this.path = jsonObj.Path;
    }
    protected createObject(type: string) {
        switch (type) {
            case "Folder":
            case "Property Definition": return new model.Folder();
            default: return new model.File(type);
        }
    }
}
