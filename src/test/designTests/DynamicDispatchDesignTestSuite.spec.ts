import {  } from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("DynamicDispatchDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let dynamicDispatchArr = null;

    beforeAll(() => {
        const jsonObj = JSONTools.fetchJSON("Dynamic Dispatching/Dynamic Dispatching.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "\\testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "DynamicDispatchSubVI");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        dynamicDispatchArr = HTMLTools.filterByType(viDOM, "DynamicDispatchSubVI");
    });

    it("Given DynamicDispatchSubVI model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(dynamicDispatchArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given DynamicDispatchSubVI model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(dynamicDispatchArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given DynamicDispatchSubVI model when div is created then div must have corresponding id and type", () => {
        for (let i = 0; i < dynamicDispatchArr.length; i++) {
            expect(dynamicDispatchArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });
});
