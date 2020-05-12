import { HistoryManager } from "./design/HistoryManager";
import { InputHelper } from "./design/inputHelper";
import { HelpProvider } from "./help/helpProvider";
import { Model } from "./modelParser";
import { PathHelper } from "./pathHelper";
import { ViewFactory } from "./viewFactory";
import { isNullOrUndefined } from "util";
import { Main } from "./main";

document.addEventListener("DOMContentLoaded", () => {
    if (isNullOrUndefined(sessionStorage.getItem(document.location.search))) {
        generateDocument(document.location.search);
        } else {
            Main.viModel = JSON.parse(sessionStorage.getItem(document.location.search));
            LoadDOM(document.location.search);
        } 
    document.onkeyup = (e) => {
        if (InputHelper.IsHelpKeyBinding(e)) {
            HelpProvider.toggleVisibility();
        }
    };
}, false);

let originPath = "";

function LoadDOM(query : string) {
    const viewObj = new ViewFactory();
    const htmlDOM = viewObj.generate(Main.viModel);
    if (htmlDOM) {
        const url = document.location.search + document.location.hash;
        HistoryManager.UpdateHistory(url, Main.viModel);
        const finale = document.getElementById("divLog");
        while (finale.hasChildNodes()) {
            finale.removeChild(finale.lastChild);
        }
    finale.appendChild(htmlDOM);
    top.postMessage({ highlight: true, id: query.slice(3).trim() }, "*");
    }                                 
}

function generateDocument(query: string) {
    if (query && query.slice(0, 3) === "?q=") {
        originPath = PathHelper.getMetadataFilePath(query.slice(3).trim());
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (xhr.responseText) {
                        Main.viModel = Model.parseJSON(xhr, originPath);
                        //sessionStorage.setItem(document.location.search.slice(4), JSON.stringify(parsedContent));
                        LoadDOM(query);
                    }
                } else {
                    alert("Invalid json file: " + query);
                    return;
                }
            }
        };
        xhr.open("GET", originPath);
        xhr.send();
    }
}
