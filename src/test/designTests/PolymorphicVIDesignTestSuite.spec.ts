import {  } from "jasmine";
import { HTMLTools } from "../../../testAssets/tools/HTMLTools";
import { JSONTools } from "../../../testAssets/tools/JSONTools";
import { PolymorphicVIView } from "../../script/design/PolymorphicVI";
import * as view from "../../script/design/View";
import { Component } from "../../script/model/Component";
import { PolymorphicVI } from "../../script/model/PolymorphicVI";

describe("PolymorphicVIDesignTestSuite", () => {
    let viModel = null;
    let jsonObj = null;
    let htmlDom = null;
    beforeAll(() => {
        jsonObj = JSONTools.fetchJSON("PolyType/PolyType.json");
        expect(jsonObj).toBeDefined();
        viModel = new PolymorphicVI();
        viModel.parse(jsonObj);
        htmlDom = new view.PolymorphicVIView();
        htmlDom = htmlDom.generate(viModel);
    });

    it("Given PolymorphicVI model when table is created then table must have corresponding rows", () => {
        const viInstanceTable = htmlDom.getElementsByTagName("table");
        const rows = viInstanceTable[0].getElementsByTagName("tr");
        for (let i = 0; i < viModel.components.length; i++) {
            expect(rows[i + 1].id).toEqual(viModel.components[i].path);
            const columns = rows[i + 1].getElementsByTagName("td");
            expect(columns[0].innerHTML).toEqual(viModel.components[i].id);
            expect(columns[1].innerHTML).toEqual(viModel.components[i].menu);
            expect(columns[2].innerHTML).toEqual(viModel.components[i].selector);
        }
    });
});
