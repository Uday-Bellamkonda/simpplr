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
import { getSP } from './pnpjsConfig';
import { Web } from "@pnp/sp/webs";
import { ROOT_SITE_URL } from './Constant';
var SPService = /** @class */ (function () {
    function SPService() {
    }
    /**
     * Fetches all subsites recursively starting from the root site.
     */
    SPService.getAllSubSites = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sp, allSites, rootWebObj, rootWeb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sp = getSP();
                        allSites = [];
                        rootWebObj = Web([sp.web, ROOT_SITE_URL]);
                        return [4 /*yield*/, rootWebObj.select("Title", "Url", "Id")()];
                    case 1:
                        rootWeb = _a.sent();
                        allSites.push({
                            Title: rootWeb.Title,
                            Url: rootWeb.Url,
                            Id: rootWeb.Id
                        });
                        // Recursively get subsites starting from the configured root web
                        return [4 /*yield*/, this._getSubWebs(rootWebObj, allSites)];
                    case 2:
                        // Recursively get subsites starting from the configured root web
                        _a.sent();
                        return [2 /*return*/, allSites];
                }
            });
        });
    };
    SPService._getSubWebs = function (parentWeb, allSites) {
        return __awaiter(this, void 0, void 0, function () {
            var webs, _i, webs_1, web, sp, currentWeb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, parentWeb.webs()];
                    case 1:
                        webs = _a.sent();
                        _i = 0, webs_1 = webs;
                        _a.label = 2;
                    case 2:
                        if (!(_i < webs_1.length)) return [3 /*break*/, 5];
                        web = webs_1[_i];
                        allSites.push({
                            Title: web.Title,
                            Url: web.Url,
                            Id: web.Id
                        });
                        sp = getSP();
                        currentWeb = Web([sp.web, web.Url]);
                        return [4 /*yield*/, this._getSubWebs(currentWeb, allSites)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetch site pages based on promoted states
     */
    SPService.getSitePages = function (siteUrls, promotedStates, maxCount) {
        return __awaiter(this, void 0, void 0, function () {
            var allPages, sp, _loop_1, _i, siteUrls_1, siteUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allPages = [];
                        sp = getSP();
                        _loop_1 = function (siteUrl) {
                            var web, webData, siteTitle_1, pages, e_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        web = Web([sp.web, siteUrl]);
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 4, , 5]);
                                        return [4 /*yield*/, web.select("Title")()];
                                    case 2:
                                        webData = _b.sent();
                                        siteTitle_1 = webData.Title;
                                        return [4 /*yield*/, web.lists.getByTitle("Site Pages").items
                                                .select("Id", "Title", "FileRef", "BannerImageUrl", "FirstPublishedDate", "Modified", "Author/Title")
                                                .expand("Author")
                                                .filter(promotedStates.map(function (state) { return "PromotedState eq ".concat(state); }).join(' or '))
                                                .orderBy("Modified", false)
                                                .top(maxCount)()];
                                    case 3:
                                        pages = _b.sent();
                                        pages.forEach(function (page) {
                                            var bannerUrl = '';
                                            if (page.BannerImageUrl) {
                                                bannerUrl = typeof page.BannerImageUrl === 'string' ? page.BannerImageUrl : (page.BannerImageUrl.Url || '');
                                            }
                                            allPages.push({
                                                Id: page.Id,
                                                Title: page.Title,
                                                Url: page.FileRef,
                                                BannerImageUrl: bannerUrl,
                                                PublishedDate: page.FirstPublishedDate || page.Modified,
                                                Author: page.Author ? page.Author.Title : '',
                                                SiteName: siteTitle_1
                                            });
                                        });
                                        return [3 /*break*/, 5];
                                    case 4:
                                        e_1 = _b.sent();
                                        console.error("Error fetching pages from ".concat(siteUrl, ": "), e_1);
                                        return [3 /*break*/, 5];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        };
                        _i = 0, siteUrls_1 = siteUrls;
                        _a.label = 1;
                    case 1:
                        if (!(_i < siteUrls_1.length)) return [3 /*break*/, 4];
                        siteUrl = siteUrls_1[_i];
                        return [5 /*yield**/, _loop_1(siteUrl)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        // Sort the combined list (Latest first)
                        allPages.sort(function (a, b) { return new Date(b.PublishedDate).getTime() - new Date(a.PublishedDate).getTime(); });
                        return [2 /*return*/, allPages.slice(0, maxCount)];
                }
            });
        });
    };
    return SPService;
}());
export { SPService };
//# sourceMappingURL=SPService.js.map