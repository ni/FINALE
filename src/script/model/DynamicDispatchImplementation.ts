export class DynamicDispatchImplementation {
    public static Create(jsonObj) {
        const isDisabled = jsonObj.Disabled.toLowerCase() === "true";
        const node = new DynamicDispatchImplementation(jsonObj.VIName, jsonObj.Path, isDisabled);
        for (const child of jsonObj.Children) {
            node.Children.push(DynamicDispatchImplementation.Create(child));
        }
        return node;
    }

    public VIName: string;
    public Path: string;
    public Children: DynamicDispatchImplementation[];
    public Disabled: boolean;

    constructor(name, path, disabled) {
        this.VIName = name;
        this.Path = path;
        this.Children = [];
        this.Disabled = disabled;
    }
}
