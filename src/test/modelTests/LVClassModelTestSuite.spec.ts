import {  } from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { filterLVClassFiles, filterModelByType } from "../../../testAssets/tools/ModelTools";
import { LVClass } from "../../script/model/LVClass";

describe("LVClassModelTestSuite", () => {
    let jsonObj = null;
    let lvClass = null;
    let folderArr = null;
    let jsonFolderArr = null;
    let fileArr = null;
    let jsonFileArr = null;

    beforeAll( () => {
        jsonObj = JSONTools.fetchJSON("DATSGenericTestInstance\\DATSGenericTestInstance.json");
        expect(jsonObj).toBeDefined();
        lvClass = new LVClass();
        lvClass.parse(jsonObj.NIDocument);
        folderArr = filterModelByType(lvClass, "Folder");
        jsonFolderArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "Folder");
        jsonFolderArr = jsonFolderArr.concat(JSONTools.filterJSONByType(jsonObj.NIDocument, "Property Definition"));
        fileArr = filterLVClassFiles(lvClass);
        jsonFileArr = JSONTools.filterLVClassFiles(jsonObj.NIDocument);
        // console.log(jsonFileArr);
        // fileArr = filterModelByType(lvClass, "File");
        // jsonFileArr = JSONTools.filterJSONByType(jsonObj.NIDocument, "File");
        // console.log(fileArr);
        // console.log(jsonFileArr);
    });

    it("Given key id in folder array when opened must match JSON ID", () => {
        for (let i = 0; i < folderArr.length; i++) {
            expect(folderArr[i].ID).toEqual(jsonFolderArr[i].ID);
        }
    });

    it("Given key type in folder array must match Type of jsonFolder array", () => {
        for (let i = 0; i < folderArr.length; i++) {
            expect(folderArr[i].type).toEqual("Folder");
        }
    });

    it("Given key path in folder array must match path of jsonFolder array", () => {
        for (let i = 0; i < folderArr.length; i++) {
            expect(folderArr[i].path).toEqual(jsonFolderArr[i].Path);
        }
    });

    it("Given key components in folder array must match Components of jsonFolder array", () => {
        for (let i = 0; i < folderArr.length; i++) {
            expect(typeof(folderArr[i].components)).toBe("object");
        }
    });

    it("Given key id in file array must match ID of jsonFile array", () => {
        for (let i = 0; i < fileArr.length; i++) {
            expect(fileArr[i].ID).toEqual(jsonFileArr[i].ID);
        }
    });

    it("Given key type in file array must match Type of jsonFile array", () => {
        for (let i = 0; i < fileArr.length; i++) {
            expect(fileArr[i].type).toEqual(jsonFileArr[i].Type);
        }
    });

    it("Given key path in file array must match Path of jsonFile array", () => {
        for (let i = 0; i < fileArr.length; i++) {
            expect(fileArr[i].path).toEqual(jsonFileArr[i].Path);
        }
    });
});
