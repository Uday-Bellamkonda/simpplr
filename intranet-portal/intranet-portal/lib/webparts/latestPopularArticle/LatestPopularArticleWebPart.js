var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { PropertyPaneDropdown, PropertyPaneSlider, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'LatestPopularArticleWebPartStrings';
import LatestPopularArticle from './components/LatestPopularArticle';
import { getSP } from '../../shared/pnpjsConfig';
import { SPService } from '../../shared/SPService';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
var LatestPopularArticleWebPart = /** @class */ (function (_super) {
    __extends(LatestPopularArticleWebPart, _super);
    function LatestPopularArticleWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._isDarkTheme = false;
        _this._environmentMessage = '';
        _this._siteOptions = [];
        return _this;
    }
    LatestPopularArticleWebPart.prototype.render = function () {
        var element = React.createElement(LatestPopularArticle, {
            description: this.properties.description,
            isDarkTheme: this._isDarkTheme,
            environmentMessage: this._environmentMessage,
            hasTeamsContext: !!this.context.sdks.microsoftTeams,
            userDisplayName: this.context.pageContext.user.displayName,
            maxSitePageCount: this.properties.maxSitePageCount,
            siteSelection: this.properties.siteSelection,
            layoutView: this.properties.layoutView || 'List',
            showBanner: this.properties.showBanner !== undefined ? this.properties.showBanner : true,
            showSiteName: this.properties.showSiteName !== undefined ? this.properties.showSiteName : true,
            showTitle: this.properties.showTitle !== undefined ? this.properties.showTitle : true,
            showPublishedAt: this.properties.showPublishedAt !== undefined ? this.properties.showPublishedAt : true,
            showPostedBy: this.properties.showPostedBy !== undefined ? this.properties.showPostedBy : true,
            showSites: Array.isArray(this.properties.showSites) ? this.properties.showSites : (this.properties.showSites ? [this.properties.showSites] : []),
            context: this.context
        });
        ReactDom.render(element, this.domElement);
    };
    LatestPopularArticleWebPart.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        getSP(this.context);
                        return [4 /*yield*/, this._fetchSitesForPropertyPane()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this._getEnvironmentMessage().then(function (message) {
                                _this._environmentMessage = message;
                            })];
                }
            });
        });
    };
    LatestPopularArticleWebPart.prototype._fetchSitesForPropertyPane = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sites, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, SPService.getAllSubSites()];
                    case 1:
                        sites = _a.sent();
                        this._siteOptions = sites.map(function (site) {
                            return { key: site.Url, text: site.Title };
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.error("Error fetching sites", e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LatestPopularArticleWebPart.prototype._getEnvironmentMessage = function () {
        var _this = this;
        if (!!this.context.sdks.microsoftTeams) {
            return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
                .then(function (context) {
                var environmentMessage = '';
                switch (context.app.host.name) {
                    case 'Office':
                        environmentMessage = _this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
                        break;
                    case 'Outlook':
                        environmentMessage = _this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
                        break;
                    case 'Teams':
                    case 'TeamsModern':
                        environmentMessage = _this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
                        break;
                    default:
                        environmentMessage = strings.UnknownEnvironment;
                }
                return environmentMessage;
            });
        }
        return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
    };
    LatestPopularArticleWebPart.prototype.onThemeChanged = function (currentTheme) {
        if (!currentTheme) {
            return;
        }
        this._isDarkTheme = !!currentTheme.isInverted;
        var semanticColors = currentTheme.semanticColors;
        if (semanticColors) {
            this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
            this.domElement.style.setProperty('--link', semanticColors.link || null);
            this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
        }
    };
    LatestPopularArticleWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(LatestPopularArticleWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: false,
        configurable: true
    });
    LatestPopularArticleWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: "Configure Latest & Popular Articles"
                    },
                    groups: [
                        {
                            groupName: "Layout Settings",
                            groupFields: [
                                PropertyPaneDropdown('layoutView', {
                                    label: "View Layout",
                                    options: [
                                        { key: 'List', text: 'List View' },
                                        { key: 'Row', text: 'Row View' }
                                    ],
                                    selectedKey: 'List'
                                }),
                                PropertyPaneSlider('maxSitePageCount', {
                                    label: "Max SitePage Count",
                                    min: 3, max: 20, step: 1, value: 5
                                })
                            ]
                        },
                        {
                            groupName: "Data Fetching",
                            groupFields: [
                                PropertyPaneDropdown('siteSelection', {
                                    label: "Site Selection",
                                    options: [
                                        { key: 'All', text: 'All sites' },
                                        { key: 'Selected', text: 'Selected sites' }
                                    ],
                                    selectedKey: 'All'
                                }),
                                PropertyFieldMultiSelect('showSites', {
                                    key: 'showSites',
                                    label: "Show Sites",
                                    options: this._siteOptions,
                                    selectedKeys: Array.isArray(this.properties.showSites) ? this.properties.showSites : (this.properties.showSites ? [this.properties.showSites] : []),
                                    disabled: this.properties.siteSelection !== 'Selected'
                                })
                            ]
                        },
                        {
                            groupName: "UI Display Toggles",
                            groupFields: [
                                PropertyPaneToggle('showBanner', { label: "Show Banner Image", checked: true }),
                                PropertyPaneToggle('showSiteName', { label: "Show Site Name", checked: true }),
                                PropertyPaneToggle('showTitle', { label: "Show Title", checked: true }),
                                PropertyPaneToggle('showPublishedAt', { label: "Show Published At", checked: true }),
                                PropertyPaneToggle('showPostedBy', { label: "Show Posted By", checked: true })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return LatestPopularArticleWebPart;
}(BaseClientSideWebPart));
export default LatestPopularArticleWebPart;
//# sourceMappingURL=LatestPopularArticleWebPart.js.map