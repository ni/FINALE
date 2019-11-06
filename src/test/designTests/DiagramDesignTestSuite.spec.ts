import {} from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { ImageTools } from "../../../testAssets/tools/ImageTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterModelByType, generateModel } from "../../../testAssets/tools/ModelTools";

describe("DiagramDesignTestSuite", () => {
    let viModel = null;
    let viDOM = null;
    let modelArr = null;
    let diagramArr = null;
    beforeAll( () => {
        const jsonObj = JSONTools.fetchJSON("NestedCaseStructure/NestedCaseStructure.json");
        expect(jsonObj).toBeDefined();
        viModel = generateModel(jsonObj, "testAssets\\json");
        expect(viModel).not.toBeNull();
        modelArr = filterModelByType(viModel, "Diagram");
        viDOM = HTMLTools.getHTMLDOM(viModel);
        diagramArr = HTMLTools.filterByType(viDOM, "Diagram");
    });
    it("Given diagram model when div is created then div must have corresponding background image", () => {
        for (let i = 0; i < diagramArr.length; i++) {
            const pathArr = diagramArr[i].style.backgroundImage.slice(27, -2).split("/");
            const modelPathArr = modelArr[i].imagePath.split("\\");
            for (let j = 0; j < pathArr.length; j++) {
                expect(pathArr[j]).toBe(modelPathArr[j]);
            }
        }
    });

    it("Given diagram model when div is created then div must have corresponding position", () => {
        for (let i = 0; i < diagramArr.length; i++) {
            expect(diagramArr[i].style.left.slice(0, -2)).toBe(modelArr[i].bounds.x.toString());
            expect(diagramArr[i].style.top.slice(0, -2)).toBe(modelArr[i].bounds.y.toString());
        }
    });

    it("Given diagram model when div is created then div must have corresponding size", () => {
        for (let i = 0; i < diagramArr.length; i++) {
            expect(diagramArr[i].style.width.slice(0, -2)).toBe(modelArr[i].bounds.w.toString());
            expect(diagramArr[i].style.height.slice(0, -2)).toBe(modelArr[i].bounds.h.toString());
        }
    });

    it("Given diagram model when div is created then div must have corresponding id and type", () => {
        for (let i = 0; i < diagramArr.length; i++) {
            expect(diagramArr[i].className).toBe(modelArr[i].id + " " + modelArr[i].type);
        }
    });

    it("Given diagram model when div is created then div must have corresponding similar components", () => {
        for (let i = 0; i < diagramArr.length; i++) {
            const subDiagramArr = diagramArr[i].childNodes;
            const componentArr = modelArr[i].componentArr;
            for (let j = 0; j < subDiagramArr.length; j++) {
                expect(subDiagramArr[j].className).toBe(componentArr[j].id + " " + componentArr[j].type);
            }
        }
    });
});
