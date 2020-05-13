import { isNullOrUndefined } from "util";
import { HistoryManager } from "./design/HistoryManager";
import { InputHelper } from "./design/inputHelper";
import { HelpProvider } from "./help/helpProvider";
import { Main } from "./main";
import { Model } from "./modelParser";
import { PathHelper } from "./pathHelper";
import { ViewFactory } from "./viewFactory";

document.addEventListener("DOMContentLoaded", () => {
    if (isNullOrUndefined(sessionStorage.getItem(document.location.search))) {
        generateDocument(document.location.search);
        } else {
            document.location.hash = JSON.parse(sessionStorage.getItem(document.location.search)).hashValue;
            Main.viModel = JSON.parse(sessionStorage.getItem(document.location.search)).sourceModel;
            GenerateDOMForModel(document.location.search);
        }
    document.onkeyup = (e) => {
        if (InputHelper.IsHelpKeyBinding(e)) {
            HelpProvider.toggleVisibility();
        }
    };
}, false);

let originPath = "";

function GenerateDOMForModel(query: string) {
    const viewObj = new ViewFactory();
    const htmlDOM = viewObj.generate(Main.viModel);
    if (htmlDOM) {
        const url = document.location.search + document.location.hash;
        // TODO:Look at removing UpdateHistroy from here as updating history from LoadFile() in main.ts might suffice.
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
                        GenerateDOMForModel(query);
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
