import {} from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("TabControlModelTestSuite", () => {
    let jsonObj = null;
    let tabControlArr = null;
    let jsonTabControlArr = null;

    beforeAll(() => {
        jsonObj = JSONTools.fetchJSON("tabTest\\metadata.json");
        const nidocObj = generateModel(jsonObj, "testAssets\\json");
        tabControlArr = filterModelByType(nidocObj, "TabControl");
        jsonTabControlArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "TabControl");
    });

    it("Given key id in tabControl array must match ID of jsonTabControl array", () => {
        for (let i = 0; i < tabControlArr.length; i++) {
            expect(tabControlArr[i].id).toEqual(jsonTabControlArr[i].ID);
        }
    });

    it("Given key type in tabControl array must match Type of jsonTabControl array", () => {
        for (let i = 0; i < tabControlArr.length; i++) {
            expect(tabControlArr[i].type).toEqual(jsonTabControlArr[i].Type);
        }
    });

    it("Given key bounds in tabControl array must match Bounds of jsonTabControl array", () => {
        for (let i = 0; i < tabControlArr.length; i++) {
            expect(tabControlArr[i].bounds).toEqual(jsonTabControlArr[i].Bounds);
        }
    });

    it("Given key tabLocation in tabControl array must match TabLocation of jsonTabControl array", () => {
        for (let i = 0; i < tabControlArr.length; i++) {
            expect(tabControlArr[i].tabLocation).toEqual(jsonTabControlArr[i].TabLocation);
        }
    });

    it("Given key pageSelectorNameArr in tabControl array must match pageLabels of jsonTabControl Components", () => {
        const pageLabelArr = [];
        for (const jsonTabComponent of jsonTabControlArr) {
            const pages = jsonTabComponent.Components;
            const tabSelectorArr = [];
            for (const page of pages) {
                tabSelectorArr.push(page.pageLabel);
            }
            pageLabelArr.push(tabSelectorArr);
        }
        for (let i = 0; i < tabControlArr.length; i++) {
            for (let j = 0; j < pageLabelArr.length; j++) {
                expect(tabControlArr[i].pageSelectorNameArr[j]).toEqual(pageLabelArr[i][j]);
            }
        }
    });

    it("Given key pageSelectorBounds in tabControl array must match selectorBounds of json Components", () => {
        const selectorBoundsArr = [];
        for (const jsonTabComponent of jsonTabControlArr) {
            const pages = jsonTabComponent.Components;
            const tabSelectorBoundsArr = [];
            for (const page of pages) {
                tabSelectorBoundsArr.push(page.selectorBounds);
            }
            selectorBoundsArr.push(tabSelectorBoundsArr);
        }
        for (let i = 0; i < tabControlArr.length; i++) {
            for (let j = 0; j < tabControlArr[i].pageSelectorBounds.length; j++) {
                expect(tabControlArr[i].pageSelectorBounds[j].w).toEqual(selectorBoundsArr[i][j].Width);
                expect(tabControlArr[i].pageSelectorBounds[j].h).toEqual(selectorBoundsArr[i][j].Height);
            }
        }
    });
});
