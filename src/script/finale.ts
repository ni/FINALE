import { HistoryManager } from "./design/HistoryManager";
import { InputHelper } from "./design/inputHelper";
import { HelpProvider } from "./help/helpProvider";
import { Model } from "./modelParser";
import { PathHelper } from "./pathHelper";
import { ViewFactory } from "./viewFactory";

document.addEventListener("DOMContentLoaded", () => {
    generateDocument(document.location.search);
    document.onkeyup = (e) => {
        if (InputHelper.IsHelpKeyBinding(e)) {
            HelpProvider.toggleVisibility();
        }
    };
}, false);

let originPath = "";
function generateDocument(query: string) {
    if (query && query.slice(0, 3) === "?q=") {
        originPath = PathHelper.getMetadataFilePath(query.slice(3).trim());
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (xhr.responseText) {
                        const parsedContent = Model.parseJSON(xhr, originPath);
                        const viewObj = new ViewFactory();
                        const htmlDOM = viewObj.generate(parsedContent);
                        if (htmlDOM) {
                            const url = document.location.search + document.location.hash;
                            HistoryManager.UpdateHistory(url, parsedContent);
                            const finale = document.getElementById("divLog");
                            while (finale.hasChildNodes()) {
                                finale.removeChild(finale.lastChild);
                            }
                            finale.appendChild(htmlDOM);
                            top.postMessage({ highlight: true, id: query.slice(3).trim() }, "*");
                        }
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
