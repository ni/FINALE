import {} from "jasmine";
import { JSONTools } from "../../../testAssets/tools/JSONTools";

describe("fileStructureTestSuite", () => {
    let fileArr = [];
    let directoryArr = [];
    let llbArr = [];
    let JSONTypes = [];
    let JSONNames = [];
    let JSONChildren = [];

    beforeAll(() => {
        const json = JSONTools.fetchJSON("file.json");
        expect(json).toBeDefined();
        fileArr = fileArr.concat(JSONTools.filterFiles(json));
        directoryArr = directoryArr.concat(JSONTools.filterFolders(json, "dir"));
        llbArr = llbArr.concat(JSONTools.filterFolders(json, "llb"));
        JSONTypes = JSONTypes.concat(JSONTools.filterByKeys(json, "type"));
        JSONNames = JSONNames.concat(JSONTools.filterByKeys(json, "name"));
        JSONChildren = JSONChildren.concat(JSONTools.filterChildren(json));
    });

    it("given JSON when parsed must have required keys for each file", () => {
        const  keys = ["type", "name", "filetype"];
        for (const child of fileArr) {
            for (const keyName of keys) {
                expect(child[keyName]).toBeDefined();
            }
        }
    });

    it("given JSON when parsed must have values of type string for all keys for each file", () => {
        const keys = ["type", "name", "filetype"];
        for (const child of fileArr) {
            for (const keyName of keys) {
                expect(typeof(child[keyName])).toBe("string");
            }
        }
    });

    it("given JSON when parsed must contain required keys for each directory or llb", () => {
        const keys = ["type", "name", "children"];
        if (directoryArr) {
            for (const child of directoryArr) {
                for (const keyName of keys) {
                    expect(child[keyName]).toBeDefined();
                }
            }
        }
        if (llbArr) {
            for (const child of llbArr) {
                for (const keyName of keys) {
                    expect(typeof(child[keyName])).toBeDefined();
                }
            }
        }
    });

    it("given JSON when parsed must have values of type string for each JSON object's 'type'", () => {
        for (const item of JSONTypes) {
            expect(typeof(item)).toBe("string");
        }
    });

    it("given JSON when parsed must have values of type string for each JSON object's 'name'", () => {
        for (const item of JSONNames) {
            expect(typeof(item)).toBe("string");
        }
    });

    it("given JSON when parsed must have values of type object for each JSON object's 'children'", () => {
        for (const item of JSONChildren) {
            expect(typeof(item)).toBe("object");
        }
    });
});
