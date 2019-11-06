import { Component } from "../model/Model";
import { DynamicHelp } from "./dynamicHelp";
import { HelpContent } from "./helpContent";
import { StaticHelp } from "./staticHelp";

export class HelpProvider {
    public static enabled: boolean = false;
    public static initialize() {
        HelpProvider.enabled = true;
        this.initializeProductHelp();
    }
    public static toggleVisibility() {
        if (HelpProvider.enabled) {
            this.closeContextHelp();
        } else {
            this.initialize();
        }
    }
    public static showContextHelp(event, obj: Component) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const objType = event.target.className.split(" ").slice(-1)[0];
        const content = HelpProvider.getHelp(objType, obj.path);

        const finaleDiv = document.getElementById("divLog");
        const existingTip = document.getElementById("tooltip");
        if (existingTip) {
            finaleDiv.removeChild(document.getElementById("tooltip"));
        }
        if (content) {
            content.render(mouseX, mouseY, finaleDiv);
        }
        event.stopPropagation();
    }

    public static closeContextHelp() {
        HelpProvider.enabled = false;
        const tooltip = document.getElementById("tooltip");
        if (tooltip) {
            const rightDiv = document.getElementById("divLog");
            rightDiv.removeChild(tooltip);
        }
    }

    private static productHelp = null;
    private static get ready(): boolean {
        return HelpProvider.enabled && this.productHelp;
    }
    private static initializeProductHelp() {
        if (this.productHelp === null) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "/assets/productHelp.json");
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        HelpProvider.productHelp = JSON.parse(xhr.responseText);
                    }
                }
            };
        }
    }
    private static getHelp(nodeType: string, nodePath: string): HelpContent {
        if (!this.ready) {
            return;
        }
        let helpId = "";
        let help: HelpContent;
        if (nodeType === "Function") {
            help = new StaticHelp();
            helpId = nodePath + " Function";
            help.Content = "/assets/help/" + HelpProvider.productHelp[helpId];
        } else if (nodeType === "SubVI" || nodeType === "DynamicDispatchSubVI") {
            const viName = nodePath.split("/").slice(-1)[0];
            helpId = viName.replace(/.vi/g, " VI");
            if (HelpProvider.productHelp[helpId]) {
                help = new StaticHelp();
                help.Content = "/assets/help/" + HelpProvider.productHelp[helpId];
            } else {
                help = new DynamicHelp();
                help.Content = nodePath;
            }
        }
        return help;
    }
}
