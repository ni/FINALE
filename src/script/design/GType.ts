import { Main } from "../main";
import { GType } from "../model/Model";
import { HistoryManager } from "./HistoryManager";
import { InputHelper } from "./inputHelper";
import { DiagramView, ElementView } from "./View";

export class GTypeView {
    private static createTable(): HTMLTableElement {
        const tableElem: HTMLTableElement = document.createElement("table");
        tableElem.classList.add("table");
        tableElem.classList.add("table-hover");
        tableElem.classList.add("table-striped");
        tableElem.classList.add("table-condensed");
        tableElem.classList.add("table-bordered");
        return tableElem;
    }
    private static createTableHeader(tableElement: HTMLTableElement) {
        const head = tableElement.createTHead();
        const headerRow = head.insertRow();
        headerRow.insertCell().innerHTML = "Member Name";
        headerRow.insertCell().innerHTML = "Access scope";
    }

    private static createNavigationContent(
        parent: HTMLElement,
        gtypeModel: GType,
        visibleComponentId: string) {
        const workArea: HTMLElement = document.createElement("div");
        workArea.className = "tab-content card";
        workArea.appendChild(this.createDataView(gtypeModel, visibleComponentId));
        if (gtypeModel.classMembers.length > 0) {
            workArea.appendChild(this.createMembersView(gtypeModel, visibleComponentId));
        }
        parent.appendChild(workArea);
    }
    private static createMembersView(gtypeModel: GType, visibleComponentId: string): any {
        const tabPane: HTMLElement = document.createElement("div");
        tabPane.id = "main-screen";
        tabPane.style.width = "100%";
        tabPane.style.height = "100%";
        tabPane.className = visibleComponentId === gtypeModel.memberComponentId ? "tab-pane active" : "tab-pane";
        tabPane.id = gtypeModel.memberComponentId;
        tabPane.setAttribute("role", "tabpanel");
        const tableElem = this.createTable();
        this.createTableHeader(tableElem);
        const body = tableElem.createTBody();
        for (const row of gtypeModel.classMembers) {
            const currRow: HTMLTableRowElement = body.insertRow();
            currRow.id = row.path;
            currRow.ondblclick = (evt: any) => {
                const rowElem = evt.target.parentNode;
                Main.LoadFile(rowElem.id);
            };
            currRow.insertCell().innerHTML = row.id;
            currRow.insertCell().innerHTML = row.scope;
        }
        tabPane.appendChild(tableElem);
        return tabPane;
    }
    private static createDataView(gtypeModel: GType, visibleComponentId: string): HTMLElement {
        const tabPane: HTMLElement = document.createElement("div");
        tabPane.style.width = "100%";
        tabPane.style.height = "100%";
        tabPane.className = visibleComponentId === gtypeModel.data.id ? "tab-pane active" : "tab-pane";
        tabPane.id = gtypeModel.data.id;
        tabPane.setAttribute("role", "tabpanel");
        const htmlView: DiagramView = new DiagramView();
        const panelDOM = htmlView.generate(gtypeModel.data);
        panelDOM.style.position = "relative";
        tabPane.appendChild(panelDOM);
        return tabPane;
    }

    private static createNavigationTabs(
        parent: HTMLElement,
        gtypeModel: GType,
        visibleComponentId: string): string[] {
        const tabs: HTMLElement = document.createElement("ul");
        const componentIds: string[] = [];
        tabs.className = "nav nav-tabs";
        tabs.appendChild(this.AddNavigationTab(gtypeModel, visibleComponentId, gtypeModel.data.id));
        componentIds.push(gtypeModel.data.id);
        if (gtypeModel.classMembers.length > 0) {
            tabs.appendChild(this.AddNavigationTab(gtypeModel, visibleComponentId, gtypeModel.memberComponentId));
            componentIds.push(gtypeModel.memberComponentId);
        }
        parent.appendChild(tabs);
        return componentIds;
    }

    private static AddNavigationTab(
        gtypeModel: GType,
        visibleComponentId: string,
        componentId: string): HTMLElement {
        const tabItem: HTMLElement = document.createElement("li");
        tabItem.className = "nav-item";
        const linkElem: HTMLElement = document.createElement("a");
        linkElem.classList.add("nav-link");
        if (visibleComponentId === componentId) {
            linkElem.classList.add("active");
        }
        linkElem.id = componentId;
        linkElem.setAttribute("data-toggle", "tab");
        linkElem.setAttribute("role", "tab");
        linkElem.setAttribute("href", "#" + componentId);
        linkElem.innerHTML = componentId;
        ElementView.addEvent(
            tabItem,
            "click",
            (e) => {
                GTypeView.UpdateHistory(window.location, gtypeModel, componentId);
            },
            null);
        tabItem.appendChild(linkElem);
        return tabItem;
    }

    private static UpdateHistory(location, parsedComponent, elementId) {
        const baseURL = location.search;
        const changedURL = baseURL + "#" + elementId;
        document.location.hash = elementId;
        HistoryManager.UpdateHistory(changedURL, parsedComponent);
    }
    private static hashChangeHandler() {
        const navLinks = document.body.getElementsByClassName("nav-link");
        const tabPanes = document.body.getElementsByClassName("tab-pane");
        const tabId = document.location.hash.slice(1);
        for (const link of navLinks) {
            link.className = link.id === tabId ? "nav-link active" : "nav-link";
        }
        for (const pane of tabPanes) {
            pane.className = pane.id === tabId ? "tab-pane active" : "tab-pane";
        }
    }

    public generate(gtypeModel: GType): HTMLElement {
        const mainScreen: HTMLElement = document.createElement("div");
        mainScreen.id = "main-screen";
        mainScreen.style.width = "100%";
        mainScreen.style.height = "100%";
        const visibleComponentId = gtypeModel.data.id;

        window.addEventListener("hashchange", GTypeView.hashChangeHandler, false);

        GTypeView.UpdateHistory(window.location, gtypeModel, visibleComponentId);
        const componentIds = GTypeView.createNavigationTabs(mainScreen, gtypeModel, visibleComponentId);
        GTypeView.createNavigationContent(mainScreen, gtypeModel, visibleComponentId);
        document.body.onkeyup = (e) => {
            if (InputHelper.IsSwitcherKeyBinding(e)) {
                const navLinks = document.body.getElementsByClassName("nav-link");
                let activeIdx = navLinks.length - 1;
                for (let i = 0; i < navLinks.length; i++) {
                    if (navLinks[i].className === "nav-link active") {
                        activeIdx = i;
                    }
                }
                const nextIdx = (activeIdx + 1) % navLinks.length;
                const activeNav = navLinks[activeIdx];
                const dormantNav = navLinks[nextIdx];
                activeNav.className = "nav-link";
                dormantNav.className = "nav-link active";
                GTypeView.UpdateHistory(window.location, gtypeModel, componentIds[nextIdx]);
            }
        };
        return mainScreen;
    }
}
