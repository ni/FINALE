import { File } from "./File";
import { LVClass } from "./LVClass";

export class Folder extends File {
    public components: File[];
    constructor() {
        super("Folder");
        this.components = [];
    }

    public parse(jsonObj) {
        super.parse(jsonObj);
        const jsonComponents = jsonObj.Components;
        for (const elem of jsonComponents) {
            const node = this.createObject(elem.Type);
            node.parse(elem);
            this.components.push(node);
        }
    }
}
