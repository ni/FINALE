// This code is based on aimaraJS - Pure Javascript TreeView Component (https://github.com/rafaelthca/aimaraJS).

import { TreeHelper } from "./aimaratree";

export class Node {
    public id: string;
    public path: string;
    public icon: string;
    public parent: TreeHelper;
    public expanded: boolean;
    public childNodes: Node[];
    public tag: string;
    public elementLi: HTMLElement;

    constructor(
        id: string,
        path: string,
        icon: string,
        parent: TreeHelper,
        expanded: boolean,
        childNodes: Node[],
        tag: string,
        elementLi: HTMLElement) {
        this.id = id;
        this.path = path;
        this.icon = icon;
        this.parent = parent;
        this.expanded = expanded;
        this.childNodes = childNodes;
        this.tag = tag;
        this.elementLi = elementLi;
    }

    // Expanding the node
    public expandNode(pTree: TreeHelper, pEvent: Node): void { pTree.expandNode(this); }

    // Expanding the node and its children recursively
    public expandSubtree(pTree: TreeHelper, pEvent: Node): void { pTree.expandSubtree(this); }

    // Collapsing the node
    public collapseNode(pTree: TreeHelper, pEvent: Node): void { pTree.collapseNode(this); }

    // Collapsing the node and its children recursively
    public collapseSubtree(pTree: TreeHelper, pEvent: Node): void { pTree.collapseSubtree(this); }

    ///// Creating a new child node;
    // pPath : Text displayed;
    // pExpanded: True or false, indicating wether the node starts expanded or not;
    // pIcon: Icon;
    // pTag: Tag;
    // pContextmenu: Context Menu;
    public createChildNode(
        pId: string,
        pTree: TreeHelper,
        pPath: string,
        pExpanded: boolean,
        pIcon: string,
        pTag: string): Node {
        return this.createNode(pId, pTree, pPath, pExpanded, pIcon, this, pTag);
    }

    public createNode(
        pId: string,
        pTree: TreeHelper,
        pPath: string,
        pExpanded: boolean,
        pIcon: string,
        pParentNode,
        pTag: string): Node {
        const nodeObj: Node = new Node(
            pId, pPath, pIcon, pParentNode, pExpanded, [], pTag, null,
        );

        if (pTree.rendered) {
            if (pParentNode === undefined) {
                pTree.drawNode(pTree.ulElement, nodeObj);
                pTree.adjustLines(pTree.ulElement, false);
            } else {
                const vUL: HTMLElement = pParentNode.elementLi.getElementsByTagName("ul")[0];
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
                pTree.drawNode(vUL, nodeObj);
                pTree.adjustLines(vUL, false);
            }
        }

        if (pParentNode === undefined) {
            pTree.childNodes.push(nodeObj);
            nodeObj.parent = pTree;
        } else {
            pParentNode.childNodes.push(nodeObj);
        }

        return nodeObj;
    }
}

export default Node;
