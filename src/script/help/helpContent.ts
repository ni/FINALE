export abstract class HelpContent {
    public Content: string;
    public render(left: string, top: string, parentDiv: HTMLElement) {
        const tooltip = this.createTooltipContainer(left, top);
        tooltip.appendChild(this.generateTooltip());
        parentDiv.appendChild(tooltip);
    }
    protected abstract generateTooltip();
    protected createTooltipContainer(left: string, top: string) {
        const tooltip = document.createElement("div");
        tooltip.id = "tooltip";
        tooltip.style.backgroundColor = "white";
        tooltip.style.color = "black";
        tooltip.style.left = "" + left + "px";
        tooltip.style.top = "" + top + "px";
        tooltip.style.position = "absolute";
        tooltip.style.zIndex = "1";
        return tooltip;
    }
}
