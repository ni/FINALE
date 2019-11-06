import {  } from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("EnumDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let enumArr = null;

    beforeAll(() => {
        const jsonObj = JSONTools.fetchJSON("BlockDigramToJson/metadata.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "\\testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "Enum");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        enumArr = HTMLTools.filterByType(viDOM, "Enum");
    });

    it("Given Enum model when select is created then select must have corresponding position", () => {
        for (let i = 0; i < enumArr.length; i++) {
            expect(enumArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(enumArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given enum model when select is created then select must have corresponding size", () => {
        for (let i = 0; i < enumArr.length; i++) {
            expect(enumArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(enumArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given enum model when select is created then select must have corresponding id", () => {
        for (let i = 0; i < enumArr.length; i++) {
            expect(enumArr[i].className).toBe(modelArr[i].id);
        }
    });

    it("Given enum model when options are created then options must have corresponding values", () => {
        for (let i = 0; i < enumArr.length; i++) {
            const optionsArr = enumArr[i].options;
            for (let j = 0; j < optionsArr.length; j++) {
                expect(optionsArr[j].text).toEqual(modelArr[i].values[j]);
            }
        }
    });
});
