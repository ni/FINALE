import { Main } from "../main";
import { LVClass } from "../model/Model";

export class LVClassView {
    public drawNode(ulElement, nodeElement) {
        const liElement = document.createElement("li");
        if (nodeElement.components) {
            const label = document.createElement("label");
            label.setAttribute("for", nodeElement.ID);
            label.innerHTML = nodeElement.ID;
            liElement.appendChild(label);
            const owner = document.createElement("input");
            owner.setAttribute("type", "checkbox");
            owner.setAttribute("checked", "true");
            owner.id = nodeElement.ID;
            liElement.appendChild(owner);
            const newList = document.createElement("ul");
            liElement.appendChild(newList);
            for (const node of nodeElement.components) {
                this.drawNode(newList, node);
            }
        } else {
            const fileItem = document.createElement("li");
            fileItem.classList.add("file");
            fileItem.classList.add(nodeElement.ID.split(".").splice(-1)[0]);
            const anchorItem = document.createElement("a");
            anchorItem.innerHTML = nodeElement.ID;
            fileItem.appendChild(anchorItem);
            liElement.appendChild(fileItem);
            liElement.addEventListener("click", (event) => {
                Main.LoadFile(nodeElement.path);
                event.stopPropagation();
            });
        }
        ulElement.appendChild(liElement);
    }

    public generate(classModel: LVClass) {
        const ul = document.createElement("ul");
        ul.className = "tree";
        this.drawNode(ul, classModel);
        return ul;
    }
}
