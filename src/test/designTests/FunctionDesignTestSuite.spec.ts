import {  } from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("FunctionDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let functionArr = null;

    beforeAll(() => {
        const jsonObj = JSONTools.fetchJSON("CloseWrapper/metadata.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "Function");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        functionArr = HTMLTools.filterByType(viDOM, "Function");
    });

    it("Given Function model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < functionArr.length; i++) {
            expect(functionArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(functionArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given Function model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < functionArr.length; i++) {
            expect(functionArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(functionArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given Function model when div is created then div must have corresponding id and type", () => {
        for (let i = 0; i < functionArr.length; i++) {
            expect(functionArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });

});
