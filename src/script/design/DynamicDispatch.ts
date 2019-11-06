import { Main } from "../main";
import { DynamicDispatchImplementation } from "../model/DynamicDispatchImplementation";
import { DynamicDispatch } from "../model/Model";
import { ComponentView } from "./View";

export class DynamicDispatchView extends ComponentView {
    public static selectedVIPath: string = "";
    public static selectedClassPath: string = "";
    public static toggleSelectedNode(jsonPath): string {
        const focusNode = document.getElementById(jsonPath);
        if (focusNode == null) {
            return "";
        }
        document.getElementsByClassName("node_selected")[0].className = "node";
        const nodeToSelect = document.getElementById(jsonPath).parentNode;
        (nodeToSelect.childNodes[1] as HTMLSpanElement).className = "node_selected";
        return document.getElementById(jsonPath).className;
    }

    public static openVI(event, viPath) {
        if (viPath) {
            Main.LoadFile(viPath);
        } else {
            alert("Sub VI Reference not found!");
        }
    }
    private static dataAttributeName: string = "data-implementation";
    private static dialogClassName: string = "implementation-selector";
    private nearestImplementation = "";

    public openWindow(model) {
        // tslint:disable-next-line:max-line-length
        const queryString = `dialog.${DynamicDispatchView.dialogClassName}[${DynamicDispatchView.dataAttributeName}='${model.id}']`;
        const dialog = document.querySelectorAll(queryString)[0] as HTMLDialogElement;
        dialog.showModal();
    }

    public setValue(value) {
        (document.getElementById("value") as HTMLInputElement).value = value;
    }

    public generate(obj) {
        const componentElement = super.generate(obj);
        this.createModalDialog(obj);
        componentElement.addEventListener("dblclick", (e) => { this.openWindow(obj); });
        return componentElement;
    }

    private createModalDialog(model) {
        document.body.appendChild(this.createModalBody(model));
    }
    private createModalHeader() {
        const headerDiv = document.createElement("div");
        headerDiv.className = "dialog-header";
        const title = document.createElement("h5");
        title.className = "dialog-title";
        title.innerHTML = "Choose implementation";
        headerDiv.appendChild(title);
        return headerDiv;
    }
    private createModalBody(model: DynamicDispatch) {
        const dialog = document.createElement("dialog") as HTMLDialogElement;
        dialog.appendChild(this.createModalHeader());
        dialog.className = DynamicDispatchView.dialogClassName;
        dialog.setAttribute(DynamicDispatchView.dataAttributeName, model.id);

        dialog.addEventListener("cancel", () => {
            dialog.close(undefined);
        });

        dialog.addEventListener("close", () => {
            const selectedVI = dialog.returnValue;
            if (selectedVI) {
                DynamicDispatchView.openVI(null, selectedVI);
            }
        });

        // close when clicking on backdrop
        dialog.addEventListener("click", (event) => {
            const target = event.target as HTMLDivElement;
            if (!target.classList.contains("dialog-body")) {
                dialog.close(undefined);
            }
        });

        this.nearestImplementation = model.NearestImplementation;
        const tree = this.createTree(model.Hierarchy, dialog);
        tree.className = "dialog-body";
        dialog.appendChild(tree);
        return dialog;
    }

    private createTree(model: DynamicDispatchImplementation[], dialog: HTMLDialogElement) {
        const listElement = document.createElement("ul");
        for (const node of model) {
            const listItem = document.createElement("li");
            listElement.appendChild(listItem);
            listItem.appendChild(this.createTreeRecursive(node, dialog));
        }
        return listElement;
    }

    private createTreeRecursive(model: DynamicDispatchImplementation, dialog: HTMLDialogElement) {
        const listItem = document.createElement("li");
        const spanElement = this.createSpanElement(model, dialog);
        listItem.appendChild(spanElement);
        const nestedListElement = document.createElement("ul");
        for (const child of model.Children) {
            nestedListElement.appendChild(this.createTreeRecursive(child, dialog));
        }
        listItem.appendChild(nestedListElement);
        return listItem;
    }

    private createSpanElement(model: DynamicDispatchImplementation, dialog: HTMLDialogElement) {
        const spanElement = document.createElement("span");
        spanElement.className = "dialog-item";
        spanElement.innerHTML = model.VIName;
        spanElement.id = model.Path;
        if (model.Disabled) {
            spanElement.classList.add("disabled");
        }
        spanElement.addEventListener("click", (event) => {
            if (!model.Disabled) {
                dialog.close(spanElement.id);
            }
            event.stopPropagation();
        });
        if (model.Path === this.nearestImplementation) {
            spanElement.classList.add("nearestImplementation");
        }
        return spanElement;
    }
}
