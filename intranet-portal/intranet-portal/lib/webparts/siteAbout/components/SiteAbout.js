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
import styles from './SiteAbout.module.scss';
import { getSP } from '../../../shared/pnpjsConfig';
import "@pnp/sp/site-groups";
var SiteAbout = /** @class */ (function (_super) {
    __extends(SiteAbout, _super);
    function SiteAbout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            siteTitle: '',
            siteDescription: '',
            owners: [],
            members: [],
            visitors: [],
            loading: true
        };
        return _this;
    }
    SiteAbout.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchSiteData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SiteAbout.prototype.componentDidUpdate = function (prevProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(prevProps.customOwners !== this.props.customOwners ||
                            prevProps.customMembers !== this.props.customMembers ||
                            prevProps.customVisitors !== this.props.customVisitors)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchSiteData()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SiteAbout.prototype.fetchSiteData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var sp, web, webData, owners, members, visitors, e_1, e_2, e_3, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ loading: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 15, , 16]);
                        sp = getSP(this.props.context);
                        web = sp.web;
                        return [4 /*yield*/, web.select("Title", "Description")()];
                    case 2:
                        webData = _a.sent();
                        owners = [];
                        members = [];
                        visitors = [];
                        if (!(this.props.customOwners && this.props.customOwners.length > 0)) return [3 /*break*/, 3];
                        owners = this.props.customOwners;
                        return [3 /*break*/, 6];
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, web.associatedOwnerGroup.users()];
                    case 4:
                        owners = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        console.warn("Could not fetch associatedOwnerGroup", e_1);
                        return [3 /*break*/, 6];
                    case 6:
                        if (!(this.props.customMembers && this.props.customMembers.length > 0)) return [3 /*break*/, 7];
                        members = this.props.customMembers;
                        return [3 /*break*/, 10];
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, web.associatedMemberGroup.users()];
                    case 8:
                        members = _a.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        e_2 = _a.sent();
                        console.warn("Could not fetch associatedMemberGroup", e_2);
                        return [3 /*break*/, 10];
                    case 10:
                        if (!(this.props.customVisitors && this.props.customVisitors.length > 0)) return [3 /*break*/, 11];
                        visitors = this.props.customVisitors;
                        return [3 /*break*/, 14];
                    case 11:
                        _a.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, web.associatedVisitorGroup.users()];
                    case 12:
                        visitors = _a.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_3 = _a.sent();
                        console.warn("Could not fetch associatedVisitorGroup", e_3);
                        return [3 /*break*/, 14];
                    case 14:
                        this.setState({
                            siteTitle: webData.Title,
                            siteDescription: webData.Description,
                            owners: owners,
                            members: members,
                            visitors: visitors,
                            loading: false
                        });
                        return [3 /*break*/, 16];
                    case 15:
                        err_1 = _a.sent();
                        console.error("Error fetching site about info: ", err_1);
                        this.setState({ loading: false });
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    SiteAbout.prototype.renderUserAvatar = function (user) {
        var name = user.Title || user.text || user.fullName || "User";
        var email = user.Email || user.secondaryText || user.email || "";
        // For PropertyFieldPeoplePicker, it might have a slightly different object structure
        var loginName = user.loginName || user.LoginName || email;
        var avatarUrl = email ? "/_layouts/15/userphoto.aspx?size=S&username=".concat(email) : '';
        var initials = name.split(' ').map(function (n) { return n[0]; }).join('').substring(0, 2).toUpperCase();
        return (React.createElement("div", { className: styles.userCard, key: loginName },
            avatarUrl ? (React.createElement("img", { className: styles.avatar, src: avatarUrl, alt: name, onError: function (e) { e.target.style.display = 'none'; } })) : (React.createElement("div", { className: styles.avatar }, initials)),
            React.createElement("div", { className: styles.userInfo },
                React.createElement("span", { className: styles.userName, title: name }, name),
                React.createElement("span", { className: styles.userEmail, title: email }, email))));
    };
    SiteAbout.prototype.render = function () {
        var _this = this;
        var _a = this.state, siteTitle = _a.siteTitle, siteDescription = _a.siteDescription, owners = _a.owners, members = _a.members, visitors = _a.visitors, loading = _a.loading;
        return (React.createElement("section", { className: "".concat(styles.siteAbout, " ").concat(this.props.hasTeamsContext ? styles.teams : '') }, loading ? (React.createElement("div", null, "Loading site information...")) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.header },
                React.createElement("h2", { className: styles.title }, siteTitle),
                siteDescription && React.createElement("p", { className: styles.description }, siteDescription)),
            React.createElement("div", { className: styles.personnelSection },
                owners.length > 0 && (React.createElement("div", { className: styles.group },
                    React.createElement("h3", { className: styles.groupTitle }, "Owners"),
                    React.createElement("div", { className: styles.userList }, owners.map(function (user) { return _this.renderUserAvatar(user); })))),
                members.length > 0 && (React.createElement("div", { className: styles.group },
                    React.createElement("h3", { className: styles.groupTitle }, "Members"),
                    React.createElement("div", { className: styles.userList }, members.map(function (user) { return _this.renderUserAvatar(user); })))),
                visitors.length > 0 && (React.createElement("div", { className: styles.group },
                    React.createElement("h3", { className: styles.groupTitle }, "Visitors"),
                    React.createElement("div", { className: styles.userList }, visitors.map(function (user) { return _this.renderUserAvatar(user); })))))))));
    };
    return SiteAbout;
}(React.Component));
export default SiteAbout;
//# sourceMappingURL=SiteAbout.js.map