import {} from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("StructureDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let structureArr = null;
    beforeAll( () => {
        const jsonObj = JSONTools.fetchJSON("fibonacci/fibonacci.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "\\testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "Structure");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        structureArr = HTMLTools.filterByType(viDOM, "Structure");
    });

    it("Given structure model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < structureArr.length; i++) {
            expect(structureArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(structureArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given structure model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < structureArr.length; i++) {
            expect(structureArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(structureArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given structure model when div is created then div must have corresponding id and type", () => {
        for (let i = 0; i < structureArr.length; i++) {
            expect(structureArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });

    it("Given structure model when div is created then div must have corresponding similar components", () => {
        for (let i = 0; i < structureArr.length; i++) {
            const subDiagramArr = structureArr[i].childNodes;
            const componentArr = [modelArr[i].diagram];
            for (let j = 0; j < subDiagramArr.length; j++) {
                expect(subDiagramArr[j].className).toBe(componentArr[j].id + " " + componentArr[j].type);
            }
        }
    });
});
