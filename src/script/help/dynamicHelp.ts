import { PathHelper } from "../pathHelper";
import { HelpContent } from "./helpContent";

export class DynamicHelp extends HelpContent {
    protected generateTooltip(): HTMLElement {
        const title: HTMLParagraphElement = document.createElement("p");
        title.innerHTML = this.Content.split("/").slice(-1)[0];
        title.style.textAlign = "center";
        title.style.fontWeight = "bold";
        const img = this.createImage();
        const description = this.createDescription();
        const helpDiv = document.createElement("div");
        helpDiv.appendChild(title);
        helpDiv.appendChild(img);
        helpDiv.appendChild(description);
        helpDiv.style.border = "1px solid black";
        const finaleDiv = document.getElementById("divLog");
        const existingTip = document.getElementById("tooltip");
        if (existingTip) {
            finaleDiv.removeChild(document.getElementById("tooltip"));
        }
        return helpDiv;
    }
    private createImage(): HTMLImageElement {
        const img = new Image();
        const imgSrc = PathHelper.getSourcePath(this.Content) + "/connPane.png";
        img.src = imgSrc;
        return img;
    }
    private createDescription(): HTMLParagraphElement {
        const desc: HTMLParagraphElement = document.createElement("p");

        const xhr = new XMLHttpRequest();
        const filePath = PathHelper.getSourcePath(this.Content) + "/description.txt";
        xhr.open("GET", filePath);
        xhr.send();
        xhr.onreadystatechange = () => {
            desc.innerHTML = xhr.responseText;
        };
        return desc;
    }
}
