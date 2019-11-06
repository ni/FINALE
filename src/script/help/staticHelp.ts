import { HelpContent } from "./helpContent";

export class StaticHelp extends HelpContent {
    protected generateTooltip(): HTMLElement {
        const frameElem = document.createElement("iframe");
        frameElem.src = this.Content;
        return frameElem;
    }
}
