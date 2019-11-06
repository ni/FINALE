export class VIInstance {
    public id: string;
    public type: string;
    public path: string;
    public menu: string;
    public selector: string;
    constructor() {
        this.type = "VI Instance";
    }
    public parse(jsonObj) {
        this.id = jsonObj.ID;
        this.path = jsonObj.Path;
        this.menu = jsonObj.Menu;
        this.selector = jsonObj.Selector;
    }
}
