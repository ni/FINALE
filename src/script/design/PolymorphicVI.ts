import { Main } from "../main";
import { PolymorphicVI } from "../model/Model";

export class PolymorphicVIView {
    public generate(obj: PolymorphicVI): HTMLElement {
        const mainScreen: HTMLElement = document.createElement("div");
        mainScreen.id = "main-screen";
        mainScreen.style.width = "100%";
        mainScreen.style.height = "100%";
        const tableElem = this.createTable();
        this.createTableHeader(tableElem);
        const body = tableElem.createTBody();
        for (const row of obj.components) {
            const currRow: HTMLTableRowElement = body.insertRow();
            currRow.id = row.path;
            currRow.onclick = (evt: any) => {
                const rowElem = evt.target.parentNode;
                const table = rowElem.parentNode;
                if (table.getElementsByClassName("selectedRow")[0]) {
                    const prevRow = table.getElementsByClassName("selectedRow")[0];
                    prevRow.className = "unselectedRow";
                }
                rowElem.className = "selectedRow";
            };

            currRow.ondblclick = (evt: any) => {
                const rowElem = evt.target.parentNode;
                Main.LoadFile(rowElem.id);
            };
            currRow.insertCell().innerHTML = row.id;
            currRow.insertCell().innerHTML = row.menu;
            currRow.insertCell().innerHTML = row.selector;
        }
        mainScreen.appendChild(tableElem);
        return mainScreen;
    }

    private createTable(): HTMLTableElement {
        const tableElem: HTMLTableElement = document.createElement("table");
        tableElem.classList.add("table");
        tableElem.classList.add("table-hover");
        tableElem.classList.add("table-striped");
        tableElem.classList.add("table-condensed");
        tableElem.classList.add("table-bordered");
        return tableElem;
    }
    private createTableHeader(tableElement: HTMLTableElement) {
        const head = tableElement.createTHead();
        const headerRow = head.insertRow();
        headerRow.insertCell().innerHTML = "VI Name";
        headerRow.insertCell().innerHTML = "Menu Name";
        headerRow.insertCell().innerHTML = "Selector Name";
    }
}
