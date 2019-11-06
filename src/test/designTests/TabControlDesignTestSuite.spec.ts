import { } from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("TabControlDesignTestSuite", () => {
    let viModel = null;
    let modelArr = null;
    let viDOM = null;
    let tabControlArr = null;

    beforeAll(() => {
        const jsonObj = JSONTools.fetchJSON("tabTest/metadata.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "\\testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "TabControl");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        tabControlArr = HTMLTools.filterByType(viDOM, "TabControl");
    });

    it("Given tabControl model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < tabControlArr.length; i++) {
            expect(tabControlArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(tabControlArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given structure model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < tabControlArr.length; i++) {
            expect(tabControlArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(tabControlArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given structure model when div is created then div must have corresponding id and type", () => {
        for (let i = 0; i < tabControlArr.length; i++) {
            expect(tabControlArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });
});
