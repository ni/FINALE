import { Main } from "../../main";
import { Node } from "./node";

export class TreeHelper {
    public name: string;
    public div: string;
    public ulElement: HTMLElement;
    public childNodes: Node[];
    public backcolor: string;
    public contextMenu: object;
    public selectedNode: Node;
    public contextMenuDiv: object;
    public rendered: boolean;

    ///// Creating the tree component
    // p_div: ID of the div where the tree will be rendered;
    // p_backColor: Background color of the region where the tree is being rendered;
    // p_contextMenu: Object containing all the context menus. Set null for no context menu;
    constructor(pDiv: string, pBackColor: string, pContextMenu: object, pName: string) {
        this.name = pName;
        this.div = pDiv;
        this.ulElement = null;
        this.childNodes = [];
        this.backcolor = pBackColor;
        this.contextMenu = pContextMenu;
        this.selectedNode = null;
        this.contextMenuDiv = null;
        this.rendered = false;
    }

    // Helper Functions

    // Create an HTML element specified by parameter 'eleType'
    public createSimpleElement(eleType: string, eleID: string, eleClass: string): HTMLElement {
        const element: HTMLElement = document.createElement(eleType);
        if (eleID !== undefined) {
            element.id = eleID;
        }
        if (eleClass !== undefined) {
            element.className = eleClass;
        }
        return element;
    }

    // Create img element
    public createImgElement(imgID: string, imgClass: string, imgSrc: string): HTMLImageElement {
        const element: HTMLImageElement = document.createElement("img");
        if (imgID !== undefined) {
            element.id = imgID;
        }
        if (imgClass !== undefined) {
            element.className = imgClass;
        }
        if (imgSrc !== undefined) {
            element.src = imgSrc;
        }
        element.onerror = () => {
            element.src = "images/bin.png";
        };
        return element;
    }

    public adjustLines(ul: any, isRecursive: boolean): void {
        const tree: any = ul;

        let lists = [];

        if (tree.childNodes.length > 0) {
            lists = [tree];

            if (isRecursive) {
                for (const child of tree.getElementsByTagName("ul")) {
                    const checkUL = child;
                    if (checkUL.childNodes.length !== 0) {
                        lists[lists.length] = checkUL;
                    }
                }
            }
        }

        for (const child of lists) {
            let item = child.lastChild;

            while (!item.tagName || item.tagName.toLowerCase() !== "li") {
                item = item.previousSibling;
            }

            item.className = "last";
            item.style.backgroundColor = this.backcolor;

            item = item.previousSibling;

            if (item != null) {
                if (item.tagName.toLowerCase() === "li") {
                    item.className = "";
                    item.style.backgroundColor = "transparent";
                }
            }
        }
    }

    ///// Changing node text
    // pNode: Reference to the node that will have its text updated;
    // pText: New text;
    public setText(pNode, pText: string): void {
        pNode.elementLi.getElementsByTagName("span")[0].lastChild.innerHTML = pText;
        pNode.text = pText;
    }

    ///// Collapsing node
    // pNode: Reference to the node;
    public collapseNode(pNode: Node): void {
        if (pNode.childNodes.length > 0 && pNode.expanded === true) {
            const img: HTMLImageElement = pNode.elementLi.getElementsByTagName("img")[0];
            pNode.expanded = false;
            if (this.nodeBeforeCloseEvent !== undefined) {
                this.nodeBeforeCloseEvent(pNode);
            }

            img.id = "toggle_on";
            img.src = "images/expand.png";
            const elemUL: HTMLUListElement = img.parentElement.getElementsByTagName("ul")[0];
            elemUL.style.display = "none";
        }
    }

    ///// Collapsing all nodes inside the subtree that have parameter 'p_node' as root
    // pNode: Subtree root;
    public collapseSubtree(pNode: Node): void {
        this.collapseNode(pNode);
        for (const child of pNode.childNodes) {
            if (child.childNodes.length > 0) {
                this.collapseSubtree(child);
            }
        }
    }

    ///// Collapsing all tree nodes
    public collapseTree(): void {
        for (const child of this.childNodes) {
            if (child.childNodes.length > 0) {
                this.collapseSubtree(child);
            }
        }
    }

    // Expanding node
    // pNode: Reference to the node;
    public expandNode(pNode: Node): void {
        if (pNode.childNodes.length > 0 && pNode.expanded === false) {
            if (this.nodeBeforeOpenEvent !== undefined) {
                this.nodeBeforeOpenEvent(pNode);
            }
            const img: HTMLImageElement = pNode.elementLi.getElementsByTagName("img")[0];
            pNode.expanded = true;
            img.id = "toggle_off";
            img.src = "images/collapse.png";
            const elemUL: HTMLUListElement = img.parentElement.getElementsByTagName("ul")[0];
            elemUL.style.display = "block";
            if (this.nodeAfterOpenEvent !== undefined) {
                this.nodeAfterOpenEvent(pNode);
            }
        }
    }

    ///// Expanding all nodes inside the subtree that have parameter 'p_node' as root
    // pNode: Subtree root;
    public expandSubtree(pNode: Node): void {
        this.expandNode(pNode);
        for (const child of pNode.childNodes) {
            if (child.childNodes.length > 0) {
                this.expandSubtree(child);
            }
        }
    }

    ///// Expanding all tree nodes
    public expandTree(): void {
        for (const child of this.childNodes) {
            if (child.childNodes.length > 0) {
                this.expandSubtree(child);
            }
        }
    }

    ///// Toggling node
    // p_node: Reference to the node;
    public toggleNode(pNode: Node): void {
        if (pNode.childNodes.length > 0) {
            if (pNode.expanded) {
                pNode.collapseNode(this, pNode);
            } else {
                pNode.expandNode(this, pNode);
            }
        }
    }

    public getFileExtension(pathName: string) {
        const foldersArr = pathName.split("\\");
        const fileName = foldersArr[foldersArr.length - 1];
        const idx = fileName.lastIndexOf(".");
        return fileName.substring(idx + 1, fileName.length);
    }

    public getFileWOExtension(pathName: string) {
        const foldersArr = pathName.split("\\");
        const fileName = foldersArr[foldersArr.length - 1];
        const idx = fileName.lastIndexOf(".");
        return fileName.substring(0, idx);
    }

    ///// Selecting node
    public selectNode(pNode: Node): void {
        const supportedExt = ["vi", "ctl", "lvclass", "lvlibp"];
        if (document.getElementsByClassName("node_selected")[0]) {
            document.getElementsByClassName("node_selected")[0].className = "node";
        }
        const span: HTMLSpanElement = pNode.elementLi.getElementsByTagName("span")[0];
        span.className = "node_selected";
        if (this.selectedNode != null && this.selectedNode !== pNode) {
            this.selectedNode.elementLi.getElementsByTagName("span")[0].className = "node";
        }
        this.selectedNode = pNode;
        const fileName = pNode.id;
        const fileType = this.getFileExtension(fileName);
        if (this.IsFileTypeSupported(fileType)) {
            Main.LoadFile(pNode.path);
        }
    }

    public drawNode(ulElement: HTMLElement, pNode: Node) {
        const vTree: TreeHelper = this;

        let vIcon: HTMLImageElement = null;

        if (pNode.icon != null) {
            vIcon = this.createImgElement(null, "icon_tree", pNode.icon);
        }

        const vLI: HTMLLIElement = document.createElement("li");
        vLI.id = pNode.path;
        pNode.elementLi = vLI;

        const vSpan: HTMLSpanElement = this.createSimpleElement("span", null, "node");

        let vExpCol: HTMLImageElement = null;

        if (pNode.childNodes.length === 0) {
            vExpCol = this.createImgElement("toggle_off", "exp_col", "images/collapse.png");
            vExpCol.style.visibility = "hidden";
        } else {
            if (pNode.expanded) {
                vExpCol = this.createImgElement("toggle_off", "exp_col", "images/collapse.png");
            } else {
                vExpCol = this.createImgElement("toggle_on", "exp_col", "images/expand.png");
            }
        }
        const currElement = this;
        const lazyLoad = () => {
            const vUL: HTMLElement = currElement.createSimpleElement("ul", "", "");
            vLI.appendChild(vUL);
            if (pNode.childNodes.length > 0) {
                if (!pNode.expanded) {
                    vUL.style.display = "none";
                }
                for (const child of pNode.childNodes) {
                    currElement.drawNode(vUL, child);
                }
            }
        };
        vExpCol.onclick = () => {
            if (!vSpan.nextSibling) {
                lazyLoad();
            }
            vTree.toggleNode(pNode);
            currElement.adjustLines(ulElement, true);

        };

        vSpan.onclick = () => {
            vTree.selectNode(pNode);
        };

        if (vIcon !== undefined) {
            vSpan.appendChild(vIcon);
        }

        const vA: HTMLElement = this.createSimpleElement("a", null, null);
        let htmlText = pNode.id;
        if (pNode.parent == null) {
            htmlText = pNode.id;
        }

        // highlight for search string
        // const searchStr = (document.getElementById("filterInput") as HTMLInputElement).value;
        // if (searchStr !== "") {
        //     const startIndex = (pNode.path.toLowerCase()).indexOf(searchStr.toLowerCase());
        //     if (startIndex > -1) {
        //         htmlText =
        //             pNode.id.substring(0, startIndex) +
        //             "<span style = 'background-color: #afb4bc;'>" +
        //             pNode.id.substring(startIndex, startIndex + searchStr.length) +
        //             "</span>" + pNode.id.substring(startIndex + searchStr.length);
        //     }
        // }

        vA.innerHTML = htmlText;
        vSpan.appendChild(vA);
        vLI.appendChild(vExpCol);
        vLI.appendChild(vSpan);

        ulElement.appendChild(vLI);
        const path = escape(pNode.path);
        vSpan.addEventListener("dblclick", () => {
            if (!vSpan.nextSibling) {
                lazyLoad();
            }
            currElement.toggleNode(pNode);
            currElement.adjustLines(ulElement, true);
        });

    }

    // Render the tree;
    public drawTree(): void {

        this.rendered = false;

        const divTree: HTMLElement = document.getElementById(this.div);
        divTree.innerHTML = "";

        const ulElement: HTMLElement = this.createSimpleElement("ul", this.name, "tree");
        this.ulElement = ulElement;

        for (const child of this.childNodes) {
            this.drawNode(ulElement, child);
        }

        divTree.appendChild(ulElement);
        this.adjustLines(document.getElementById(this.name), true);
    }

    public nodeBeforeOpenEvent(nodeClicked: Node): void {
        // document.getElementById("divLog").innerHTML += nodeClicked.text + ": Before expand event<br/>";
    }

    public nodeAfterOpenEvent(nodeClicked: Node): void {
        // document.getElementById("divLog").innerHTML += nodeClicked.text + ": After expand event<br/>";
    }

    public nodeBeforeCloseEvent(nodeClicked: Node): void {
        // document.getElementById("divLog").innerHTML += nodeClicked.text + ": Before collapse event<br/>";
    }

    // Creating a new node
    // pText: Text displayed on the node;
    // pExpanded: True or false, indicating wether the node starts expanded or not;
    // pIcon: Relative path to the icon displayed with the node. Set null if the node has no icon;
    // pParentNode: Reference to the parent node. Set null to create the node on the root;
    // pTag: Tag is used to store additional information on the node. All node attributes
    // are visible when programming events and context menu actions;
    // pContextmenu: Name of the context menu, which is one of the attributes of the
    // pContextMenu object created with the tree;
    public createNode(
        pId: string,
        pPath: string,
        pExpanded: boolean,
        pIcon: string,
        pParentNode: any,
        pTag: string): Node {
        const vTree = this;
        const nodeObj = new Node(pId, pPath, pIcon, pParentNode, pExpanded, [], pTag, null);

        // this.nodeCounter++;

        if (this.rendered) {
            if (pParentNode === undefined) {
                this.drawNode(this.ulElement, nodeObj);
                this.adjustLines(this.ulElement, false);
            } else {
                const vUL = pParentNode.elementLi.getElementsByTagName("ul")[0];
                if (pParentNode.childNodes.length === 0) {
                    if (pParentNode.expanded) {
                        pParentNode.elementLi.getElementsByTagName("ul")[0].style.display = "block";
                        const vImg = pParentNode.elementLi.getElementsByTagName("img")[0];
                        vImg.style.visibility = "visible";
                        vImg.src = "images/collapse.png";
                        vImg.id = "toggle_off";
                    } else {
                        pParentNode.elementLi.getElementsByTagName("ul")[0].style.display = "none";
                        const vImg = pParentNode.elementLi.getElementsByTagName("img")[0];
                        vImg.style.visibility = "visible";
                        vImg.src = "images/expand.png";
                        vImg.id = "toggle_on";
                    }
                }
                this.drawNode(vUL, nodeObj);
                this.adjustLines(vUL, false);
            }
        }

        if (pParentNode === null) {
            this.childNodes.push(nodeObj);
            nodeObj.parent = this;
        } else {
            pParentNode.childNodes.push(nodeObj);
        }

        return nodeObj;
    }

    public populateTree(dirTree: TreeHelper, parentObj: Node, child: any) {
        for (const item of child) {
            const fileType: string = item.Type;
            if (!this.IsDirectory(fileType) && !this.IsFileTypeSupported(fileType)) {
                continue;
            }
            const imageType = item.Type === "" ? "bin" : item.Type;
            const icon = "images/" + imageType + ".png";
            const newParent = parentObj.createChildNode(
                item.ID,
                dirTree,
                item.Path,
                false,
                icon,
                null,
            );
            if (this.IsDirectory(item.Type)) {
                this.populateTree(dirTree, newParent, item.Components);
            }
        }
        return parentObj;
    }

    public getTreeAndCallDblEvent(treeType) {
            const searchTree = document.getElementById(treeType).getElementsByClassName("tree");
            const lastElement = searchTree[0].getElementsByClassName("last");
            const spanElement = lastElement[0].getElementsByTagName("span");

            const evt = new Event("dblclick");
            // simulate double click event at the first level of the tree
            spanElement[0].dispatchEvent(evt);
    }
    // create tree view
    public directoryTreeView(topDirectory) {
        let rootNode = null;
        if (topDirectory.Type === "search") {
            const newTree = new TreeHelper("filteredTree", "white", null, "searchTree");
            document.getElementById("divTree").style.display = "none";
            document.getElementById("filteredTree").style.display = "inline-block";
            const searchNode = newTree.createNode(
                topDirectory.ID,
                topDirectory.ID,
                false,
                "images/dir.png",
                null,
                null,
            );
            rootNode = this.populateTree(newTree, searchNode, topDirectory.Components);
            newTree.drawTree();
            this.getTreeAndCallDblEvent("filteredTree");
        } else {
            let icon = "";
            if (topDirectory.Type === "dir") {
                icon = "images/dir.png";
            } else if (topDirectory.Type === "llb") {
                icon = "images/llb.png";
            }
            const rootdir = this.createNode(
                topDirectory.ID,
                topDirectory.Path,
                false,
                icon,
                null,
                null,
            );
            rootNode = this.populateTree(this, rootdir, topDirectory.Components);
        }
        return rootNode;
    }

    private IsDirectory(itemType: string): boolean {
        return (itemType === "dir" || itemType === "llb");
    }
    private IsFileTypeSupported(itemType: string): boolean {
        const supportedExt = ["vi", "ctl", "lvclass", "lvlibp"];
        return supportedExt.indexOf(itemType.toLowerCase()) > -1;
    }
}
export default TreeHelper;
