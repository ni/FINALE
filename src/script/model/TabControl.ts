import { Component, Diagram, IRect } from "./Model";
import { ModelFactory } from "./ModelFactory";

export class TabControl extends Component {
    public pageSelectorNameArr: string[];
    public diagramArr: Diagram[];
    public tabLength: number;
    public pageSelectorBounds: IRect[];
    public tabLocation: string;
    public visiblePage: number = 0;
    constructor(id: string) {
        super(id, "TabControl");
        this.pageSelectorNameArr = [];
        this.diagramArr = [];
        this.tabLength = 0;
        this.pageSelectorBounds = [];
        this.tabLocation = "";
    }
    public addPage(
        pageName: string, location: string, selectorBounds: any, pageBounds: IRect, diagramObj: Diagram): void {
        if (pageName) {
            this.pageSelectorNameArr.push(pageName);
        } else {
            this.pageSelectorNameArr.push("Default");
        }
        this.tabLocation = location;
        let bounds: IRect;
        let leftOffset = 0;
        let topOffset = 0;
        switch (location) {
            case "Top": leftOffset = 0;
                        for (let i = 0; i < this.tabLength; i++) {
                            leftOffset += this.pageSelectorBounds[i].w;
                        }
                        bounds = {
                            h: selectorBounds.Height,
                            w: selectorBounds.Width,
                            x: leftOffset,
                            y: pageBounds.y - selectorBounds.Height,
                        };
                        break;
            case "Left": topOffset = 0;
                         for (let i = 0; i < this.tabLength; i++) {
                             topOffset += this.pageSelectorBounds[i].h;
                         }
                         bounds = {
                            h: selectorBounds.Width,
                            w: selectorBounds.Height,
                            x: pageBounds.x - selectorBounds.Height,
                            y: topOffset,
                        };
                         break;
            case "Bottom": leftOffset = 0;
                           for (let i = 0; i < this.tabLength; i++) {
                                leftOffset += this.pageSelectorBounds[i].w;
                           }
                           bounds = {
                                h: selectorBounds.Height,
                                w: selectorBounds.Width,
                                x: leftOffset,
                                y: pageBounds.y + pageBounds.h,
                            };
                           break;
            case "Right": topOffset = 0;
                          for (let i = 0; i < this.tabLength; i++) {
                             topOffset += this.pageSelectorBounds[i].h;
                          }
                          bounds = {
                            h: selectorBounds.Width,
                            w: selectorBounds.Height,
                            x: pageBounds.x + pageBounds.w,
                            y: topOffset,
                          };
                          break;
        }
        this.pageSelectorBounds.push(bounds);

        this.diagramArr.push(diagramObj);
        this.tabLength++;
    }
    public parse(jsonObj) {
        super.parse(jsonObj);
        const tabLocation = jsonObj.TabLocation;
        const jsonObjArr = jsonObj.Components;
        for (jsonObj of jsonObjArr) {
            if (jsonObj) {
                const compObj = ModelFactory.createObject(jsonObj.ID, jsonObj.Type);
                compObj.parse(jsonObj);
                this.addPage(jsonObj.pageLabel, tabLocation, jsonObj.selectorBounds, jsonObj.Bounds, compObj);
            }
        }
    }
}
