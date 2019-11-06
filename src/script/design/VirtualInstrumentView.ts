import { VirtualInstrument } from "../model/Model";
import { HistoryManager } from "./HistoryManager";
import { InputHelper } from "./inputHelper";
import { DiagramView, ElementView } from "./View";

export class VirtualInstrumentView {
    public static showHelp: boolean = true;
    private static createNavigationContent(
        parent: HTMLElement,
        viModel: VirtualInstrument,
        visibleComponentId: string) {
        const workArea: HTMLElement = document.createElement("div");
        workArea.className = "tab-content card";
        for (const viComponent of viModel.components) {
            if (viComponent) {
                const tabPane: HTMLElement = document.createElement("div");
                tabPane.style.width = "100%";
                tabPane.style.height = "100%";
                tabPane.className = visibleComponentId === viComponent.id ? "tab-pane active" : "tab-pane";
                tabPane.id = viComponent.id;
                tabPane.setAttribute("role", "tabpanel");
                const htmlView: DiagramView = new DiagramView();
                const panelDOM = htmlView.generate(viComponent);
                panelDOM.style.position = "relative";
                tabPane.appendChild(panelDOM);
                workArea.appendChild(tabPane);
            }
        }
        parent.appendChild(workArea);
    }
    private static createNavigationTabs(
        parent: HTMLElement,
        viModel: VirtualInstrument,
        visibleComponentId: string): string[] {
        const tabs: HTMLElement = document.createElement("ul");
        const componentIds: string[] = [];
        tabs.className = "nav nav-tabs";
        for (const viComponent of viModel.components) {
            if (viComponent) {
                const tabItem: HTMLElement = document.createElement("li");
                tabItem.className = "nav-item";
                const linkElem: HTMLElement = document.createElement("a");
                linkElem.classList.add("nav-link");
                if (visibleComponentId === viComponent.id) {
                    linkElem.classList.add("active");
                }
                linkElem.id = viComponent.id;
                linkElem.setAttribute("data-toggle", "tab");
                linkElem.setAttribute("role", "tab");
                linkElem.setAttribute("href", "#" + viComponent.id);
                linkElem.innerHTML = viComponent.id;
                ElementView.addEvent(
                    tabItem,
                    "click",
                    (e) => {
                        VirtualInstrumentView.UpdateHistory(window.location, viModel, viComponent.id);
                    },
                    null);
                componentIds.push(viComponent.id);
                tabItem.appendChild(linkElem);
                tabs.appendChild(tabItem);
            }
        }
        parent.appendChild(tabs);
        return componentIds;
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

    public generate(viModel: VirtualInstrument): HTMLElement {
        const mainScreen: HTMLElement = document.createElement("div");
        mainScreen.id = "main-screen";
        mainScreen.style.width = "100%";
        mainScreen.style.height = "100%";
        const url = window.location.href;
        const visibleParams = url.split("#");
        let visibleComponentId = "";

        window.addEventListener("hashchange", VirtualInstrumentView.hashChangeHandler, false);

        if (visibleParams.length === 2) {
            visibleComponentId = visibleParams[1];
        } else {
            visibleComponentId = viModel.components[1 % viModel.components.length].id;
            VirtualInstrumentView.UpdateHistory(window.location, viModel, visibleComponentId);
        }
        const componentIds = VirtualInstrumentView.createNavigationTabs(mainScreen, viModel, visibleComponentId);
        VirtualInstrumentView.createNavigationContent(mainScreen, viModel, visibleComponentId);
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
                VirtualInstrumentView.UpdateHistory(window.location, viModel, componentIds[nextIdx]);
            }
        };
        return mainScreen;
    }
}
