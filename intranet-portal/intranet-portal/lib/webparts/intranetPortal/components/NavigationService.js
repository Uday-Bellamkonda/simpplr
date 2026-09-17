var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/views";
var LIST_NAME = "GlobalNavigationConfig";
export var NavigationService = {
    ensureNavigationList: function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var sp, list, e_1, newList, view, sampleItems, _i, sampleItems_1, item, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sp = spfi().using(SPFx(context));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 19]);
                    list = sp.web.lists.getByTitle(LIST_NAME);
                    return [4 /*yield*/, list.select("Title")()];
                case 2:
                    _a.sent();
                    console.log("".concat(LIST_NAME, " list exists."));
                    return [3 /*break*/, 19];
                case 3:
                    e_1 = _a.sent();
                    console.log("".concat(LIST_NAME, " does not exist. Creating..."));
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 17, , 18]);
                    return [4 /*yield*/, sp.web.lists.add(LIST_NAME, "Stores global navigation configuration.", 100)];
                case 5:
                    _a.sent();
                    newList = sp.web.lists.getByTitle(LIST_NAME);
                    // Add columns
                    return [4 /*yield*/, newList.fields.addText("NavUrl", { MaxLength: 255 })];
                case 6:
                    // Add columns
                    _a.sent();
                    return [4 /*yield*/, newList.fields.addText("ParentTitle", { MaxLength: 255 })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, newList.fields.addBoolean("OpenInNewTab")];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, newList.defaultView];
                case 9:
                    view = _a.sent();
                    return [4 /*yield*/, view.fields.add("NavUrl")];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, view.fields.add("ParentTitle")];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, view.fields.add("OpenInNewTab")];
                case 12:
                    _a.sent();
                    sampleItems = [
                        { Title: "Home", NavUrl: "sites/sitename#home", ParentTitle: null, OpenInNewTab: false },
                        { Title: "Feed", NavUrl: "sites/sitename#feed", ParentTitle: null, OpenInNewTab: false },
                        { Title: "Sites", NavUrl: null, ParentTitle: null, OpenInNewTab: false },
                        { Title: "People", NavUrl: "sites/sitename#people", ParentTitle: null, OpenInNewTab: false },
                        { Title: "Apps", NavUrl: "sites/sitename#apps", ParentTitle: null, OpenInNewTab: false },
                        // Sites Submenu
                        { Title: "Resources Library", NavUrl: "sites/sitename#resources", ParentTitle: "Sites", OpenInNewTab: false },
                        { Title: "Employee Engagement", NavUrl: "sites/sitename#engagement", ParentTitle: "Sites", OpenInNewTab: false },
                        { Title: "Marketing", NavUrl: "sites/sitename#marketing", ParentTitle: "Sites", OpenInNewTab: false },
                        { Title: "All sites", NavUrl: "sites/sitename#allsites", ParentTitle: "Sites", OpenInNewTab: false },
                        // Department Submenu
                        { Title: "Department", NavUrl: null, ParentTitle: "Sites", OpenInNewTab: false },
                        { Title: "Human Resources (HR)", NavUrl: "sites/sitename#hr", ParentTitle: "Department", OpenInNewTab: false },
                        { Title: "IT", NavUrl: "sites/sitename#it", ParentTitle: "Department", OpenInNewTab: false },
                        { Title: "Project Management", NavUrl: "sites/sitename#pm", ParentTitle: "Department", OpenInNewTab: false },
                        { Title: "Training", NavUrl: "sites/sitename#training", ParentTitle: "Department", OpenInNewTab: false }
                    ];
                    _i = 0, sampleItems_1 = sampleItems;
                    _a.label = 13;
                case 13:
                    if (!(_i < sampleItems_1.length)) return [3 /*break*/, 16];
                    item = sampleItems_1[_i];
                    return [4 /*yield*/, newList.items.add(item)];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    _i++;
                    return [3 /*break*/, 13];
                case 16:
                    console.log("Successfully seeded ".concat(LIST_NAME, " list."));
                    return [3 /*break*/, 18];
                case 17:
                    err_1 = _a.sent();
                    console.error("Error creating navigation list", err_1);
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 19];
                case 19: return [2 /*return*/];
            }
        });
    }); },
    getNavigationItems: function (context) { return __awaiter(void 0, void 0, void 0, function () {
        var sp, items, navMap_1, rootItems_1, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sp = spfi().using(SPFx(context));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, sp.web.lists.getByTitle(LIST_NAME).items.select("Id", "Title", "NavUrl", "ParentTitle", "OpenInNewTab")()];
                case 2:
                    items = _a.sent();
                    navMap_1 = new Map();
                    rootItems_1 = [];
                    // First pass: create all objects
                    items.forEach(function (item) {
                        navMap_1.set(item.Title, {
                            title: item.Title,
                            url: item.NavUrl,
                            openInNewTab: item.OpenInNewTab,
                            subNav: []
                        });
                    });
                    // Second pass: link parents to children
                    items.forEach(function (item) {
                        var navItem = navMap_1.get(item.Title);
                        if (item.ParentTitle && navMap_1.has(item.ParentTitle)) {
                            var parent_1 = navMap_1.get(item.ParentTitle);
                            parent_1.subNav.push(navItem);
                        }
                        else {
                            rootItems_1.push(navItem);
                        }
                    });
                    return [2 /*return*/, rootItems_1];
                case 3:
                    e_2 = _a.sent();
                    console.error("Error fetching navigation items", e_2);
                    return [2 /*return*/, []];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
//# sourceMappingURL=NavigationService.js.map