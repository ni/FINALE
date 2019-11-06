import { Main } from "../../main";
import { PathHelper } from "../../pathHelper";
import { TreeHelper } from "./aimaratree";
import { File } from "./file";

export let tree: TreeHelper;
export let rootNode;
export let preDefinedHelp = null;
export let userDefinedHelp = null;
let filteredSubset = null;
let searchStrOldValue = "";
window.onload = () => {
    loadFile();
    window.onmessage = (event) => {
        if (event.data.highlight) {
            toggleSelectedNode(event.data.id);
        } else {
            updateTreeViewAndSearchResults(event.data);
        }
    };
};

function loadFile() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", PathHelper.getSourcePath("/src/file.json"));
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                File.jsonObj = JSON.parse(xhr.responseText);
                filteredSubset = File.getJSON();
                tree = new TreeHelper("divTree", "white", null, "tree");

                rootNode = tree.directoryTreeView(File.getJSON());

                // Rendering the tree
                tree.drawTree();
                tree.givenTreeExpandAtTopLevel("divTree");
                const getParams = window.location.href.split(/=|#/);
                if (getParams.length >= 2) {
                    const fixedStr = decodeURIComponent(getParams[1]);
                    openVI(fixedStr);
                }
            } else {
                alert("No source LabVIEW files found. Please run the converter before launching this tool.");
            }
        }
    };

}

window.onpopstate = () => {
    const currentState = history.state;
    if (currentState) {
        Main.LoadFile(currentState.openedVI);
        // [TODO](Rajneesh): Fix the scroll position.
    }
};

export function filterJson(directoryJson, searchString) {
    let arr = [];
    for (const key in directoryJson) {
        if (typeof (directoryJson[key]) === "object" && directoryJson[key] != null) {
            if (directoryJson.Path === undefined || ((directoryJson.Path.substring(
                directoryJson.Path.lastIndexOf("\\"))).toLowerCase()).indexOf(searchString) <= -1) {
                for (const child of directoryJson.Components) {
                    if (child) {
                        const newArr = filterJson(child, searchString);
                        if (newArr) {
                            arr = arr.concat(newArr);
                        }
                    }
                }
                return arr;
            }
        } else {
            if (((directoryJson.Path.substring(
                directoryJson.Path.lastIndexOf("\\"))).toLowerCase()).indexOf(searchString) > -1) {
                arr = arr.concat(directoryJson);
                return arr;
            }
        }
    }
}

function updateTreeViewAndSearchResults(searchStr: string) {
    if (searchStr.length === 0) {
        document.getElementById("filteredTree").style.display = "none";
        document.getElementById("divTree").style.display = "inline-block";
        filteredSubset = File.getJSON();
    } else {
        let filteredFoldersArr = [];
        if (searchStr.indexOf(searchStrOldValue) > -1) {
            filteredFoldersArr = filterJson(filteredSubset, searchStr.toLowerCase()); // , false);
        } else {
            filteredFoldersArr = filterJson(File.getJSON(), searchStr.toLowerCase()); // , false);
            searchStrOldValue = "";
        }
        if (filteredFoldersArr.length) {
            filteredSubset = {
                Components: filteredFoldersArr,
                ID: "Results",
                Type: "search",
            };
            tree.directoryTreeView(filteredSubset);
        } else {
            document.getElementById("filteredTree").innerHTML = "0 results";
            document.getElementById("filteredTree").style.display = "inline-block";
            document.getElementById("divTree").style.display = "none";
        }
    }
    searchStrOldValue = searchStr;
}

export function toggleSelectedNode(jsonPath) {
    const focusNode = document.getElementById(jsonPath);
    if (focusNode == null) {
        return "";
    }
    const selectedNode = document.getElementsByClassName("node_selected");
    if (selectedNode.length > 0) {
        selectedNode[0].className = "node";
    }
    const nodeToSelect = document.getElementById(jsonPath).parentNode;
    (nodeToSelect.childNodes[1] as HTMLSpanElement).className = "node_selected";
    let nodeToExpand = document.getElementById(jsonPath);
    while (nodeToExpand.id !== escape(rootNode.path)) {
        nodeToExpand = (nodeToExpand.parentNode.parentNode) as HTMLUListElement;
        (nodeToExpand as HTMLUListElement).style.display = "block";
        const nodeExpColImg = nodeToExpand.getElementsByTagName("img")[0];
        nodeExpColImg.id = "toggle_off";
        nodeExpColImg.src = "images/collapse.png";
    }
    document.getElementById("filteredTree").style.display = "none";
    document.getElementById("divTree").style.display = "block";
}

export function openVI(viPath) {
    if (viPath) {
        Main.viPath = viPath;
        Main.LoadFile(viPath);
    } else {
        alert("Sub VI Reference not found!");
    }
}
