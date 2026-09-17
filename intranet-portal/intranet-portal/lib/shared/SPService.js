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
    SPService.getSitePages = function (siteUrls, promotedStates, maxCount, sortingOption) {
        if (sortingOption === void 0) { sortingOption = 'Latest'; }
        return __awaiter(this, void 0, void 0, function () {
            var allPages, sp, pathFilter, promotedFilter, queryText, searchResults, pagesBySite_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allPages = [];
                        sp = getSP();
                        pathFilter = siteUrls.map(function (url) { return "Path:\"".concat(url, "/SitePages\""); }).join(" OR ");
                        promotedFilter = promotedStates.map(function (state) { return "PromotedState:".concat(state); }).join(" OR ");
                        queryText = "(".concat(pathFilter, ") AND (").concat(promotedFilter, ") AND IsDocument:True AND FileExtension:aspx");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, sp.search({
                                Querytext: queryText,
                                SelectProperties: ["ListItemID", "Title", "Path", "BannerImageUrl", "PictureThumbnailURL", "FirstPublishedDate", "Modified", "Created", "Author", "SiteTitle", "ViewsLifeTime", "SPWebUrl"],
                                RowLimit: 50,
                                SortList: sortingOption === 'Popular'
                                    ? [{ Property: "ViewsLifeTime", Direction: 1 }] // 1 = descending
                                    : [{ Property: "FirstPublishedDate", Direction: 1 }]
                            })];
                    case 2:
                        searchResults = _a.sent();
                        if (!(searchResults && searchResults.PrimarySearchResults)) return [3 /*break*/, 4];
                        pagesBySite_1 = {};
                        searchResults.PrimarySearchResults.forEach(function (p) {
                            // Fallback to substring if SPWebUrl is not populated
                            var webUrl = p.SPWebUrl || p.Path.substring(0, p.Path.toLowerCase().indexOf('/sitepages'));
                            if (!pagesBySite_1[webUrl])
                                pagesBySite_1[webUrl] = [];
                            pagesBySite_1[webUrl].push(p);
                        });
                        // Fetch Likes and Comments concurrently per site
                        return [4 /*yield*/, Promise.all(Object.keys(pagesBySite_1).map(function (webUrl) { return __awaiter(_this, void 0, void 0, function () {
                                var web, sitePages_1, ids, viewXml, result, err_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            web = Web([sp.web, webUrl]);
                                            sitePages_1 = pagesBySite_1[webUrl];
                                            ids = sitePages_1.map(function (p) { return "<Value Type=\"Number\">".concat(p.ListItemID, "</Value>"); }).join('');
                                            viewXml = "<View><ViewFields><FieldRef Name=\"ID\"/><FieldRef Name=\"_CommentCount\"/><FieldRef Name=\"_LikeCount\"/></ViewFields><Query><Where><In><FieldRef Name=\"ID\"/><Values>".concat(ids, "</Values></In></Where></Query><RowLimit>50</RowLimit></View>");
                                            return [4 /*yield*/, web.lists.getByTitle("Site Pages").renderListDataAsStream({
                                                    RenderOptions: 2,
                                                    ViewXml: viewXml
                                                })];
                                        case 1:
                                            result = _a.sent();
                                            if (result && result.Row) {
                                                result.Row.forEach(function (r) {
                                                    var match = sitePages_1.find(function (p) { return p.ListItemID == r.ID; });
                                                    if (match) {
                                                        match.LikesCount = r._LikeCount ? parseInt(r._LikeCount, 10) : 0;
                                                        match.CommentsCount = r._CommentCount ? parseInt(r._CommentCount, 10) : 0;
                                                    }
                                                });
                                            }
                                            return [3 /*break*/, 3];
                                        case 2:
                                            err_1 = _a.sent();
                                            console.error("Error fetching likes/comments for site ".concat(webUrl, ": "), err_1);
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        // Fetch Likes and Comments concurrently per site
                        _a.sent();
                        // Map final properties
                        searchResults.PrimarySearchResults.forEach(function (page) {
                            var bannerUrl = page.BannerImageUrl || page.PictureThumbnailURL || '';
                            allPages.push({
                                Id: page.ListItemID,
                                Title: page.Title,
                                Url: page.Path,
                                BannerImageUrl: bannerUrl,
                                PublishedDate: page.FirstPublishedDate || page.Modified || page.Created,
                                Author: page.Author || '',
                                SiteName: page.SiteTitle || '',
                                Views: page.ViewsLifeTime ? parseInt(page.ViewsLifeTime, 10) : 0,
                                Comments: page.CommentsCount || 0,
                                Likes: page.LikesCount || 0
                            });
                        });
                        _a.label = 4;
                    case 4:
                        // Re-apply custom sorting logic for Popular (combining Views, Likes, and Comments weight)
                        if (sortingOption === 'Popular') {
                            allPages.sort(function (a, b) {
                                var scoreA = a.Views + a.Comments * 5 + a.Likes * 3;
                                var scoreB = b.Views + b.Comments * 5 + b.Likes * 3;
                                if (scoreB === scoreA) {
                                    return new Date(b.PublishedDate).getTime() - new Date(a.PublishedDate).getTime();
                                }
                                return scoreB - scoreA;
                            });
                        }
                        else {
                            // Latest
                            allPages.sort(function (a, b) { return new Date(b.PublishedDate).getTime() - new Date(a.PublishedDate).getTime(); });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.error("Error fetching pages via Search API: ", e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/, allPages.slice(0, maxCount)];
                }
            });
        });
    };
    return SPService;
}());
export { SPService };
//# sourceMappingURL=SPService.js.map