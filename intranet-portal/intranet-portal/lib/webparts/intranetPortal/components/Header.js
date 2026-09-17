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
import { useState, useEffect } from 'react';
import { SearchBox, Icon, Persona, PersonaSize } from '@fluentui/react';
import styles from './Header.module.scss';
import { NavigationService } from './NavigationService';
var NavMenuItem = function (_a) {
    var item = _a.item;
    var _b = useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var hasSubNav = item.subNav && item.subNav.length > 0;
    var handleMouseEnter = function () { return setIsOpen(true); };
    var handleMouseLeave = function () { return setIsOpen(false); };
    var renderLink = function (navItem, className) {
        if (navItem.url) {
            // Ensure URL is absolute if it starts with 'sites/'
            var href = navItem.url.startsWith('sites/')
                ? "".concat(window.location.origin, "/").concat(navItem.url)
                : navItem.url;
            return (React.createElement("a", { href: href, className: className, target: navItem.openInNewTab ? "_blank" : "_self", rel: "noopener noreferrer" },
                navItem.title,
                hasSubNav && React.createElement(Icon, { iconName: "ChevronDown", style: { marginLeft: 4, fontSize: 10 } })));
        }
        return (React.createElement("div", { className: className },
            navItem.title,
            hasSubNav && React.createElement(Icon, { iconName: "ChevronDown", style: { marginLeft: 4, fontSize: 10 } })));
    };
    return (React.createElement("div", { className: styles.navItem, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
        renderLink(item, ''),
        hasSubNav && (React.createElement("div", { className: "".concat(styles.dropdownMenu, " ").concat(isOpen ? styles.show : '') }, item.subNav.map(function (subItem, index) { return (React.createElement("div", { key: index, style: { position: 'relative' }, className: styles.dropdownItemWrapper },
            subItem.url ? (React.createElement("a", { href: subItem.url.startsWith('sites/') ? "".concat(window.location.origin, "/").concat(subItem.url) : subItem.url, className: styles.dropdownItem, target: subItem.openInNewTab ? "_blank" : "_self" },
                subItem.title,
                subItem.subNav && subItem.subNav.length > 0 && React.createElement(Icon, { iconName: "ChevronRight", style: { fontSize: 10 } }))) : (React.createElement("div", { className: styles.dropdownItem },
                subItem.title,
                subItem.subNav && subItem.subNav.length > 0 && React.createElement(Icon, { iconName: "ChevronRight", style: { fontSize: 10 } }))),
            subItem.subNav && subItem.subNav.length > 0 && (React.createElement("div", { className: styles.subDropdownMenu }, subItem.subNav.map(function (nestedItem, nestedIndex) { return (nestedItem.url ? (React.createElement("a", { key: nestedIndex, href: nestedItem.url.startsWith('sites/') ? "".concat(window.location.origin, "/").concat(nestedItem.url) : nestedItem.url, className: styles.dropdownItem, target: nestedItem.openInNewTab ? "_blank" : "_self" }, nestedItem.title)) : (React.createElement("div", { key: nestedIndex, className: styles.dropdownItem }, nestedItem.title))); }))))); })))));
};
export var Header = function (_a) {
    var context = _a.context, userDisplayName = _a.userDisplayName;
    var _b = useState([]), navItems = _b[0], setNavItems = _b[1];
    useEffect(function () {
        var initNav = function () { return __awaiter(void 0, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NavigationService.ensureNavigationList(context)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, NavigationService.getNavigationItems(context)];
                    case 2:
                        items = _a.sent();
                        setNavItems(items);
                        return [2 /*return*/];
                }
            });
        }); };
        initNav();
    }, [context]);
    return (React.createElement("div", { className: styles.headerContainer },
        React.createElement("div", { className: styles.searchSection },
            React.createElement(SearchBox, { placeholder: "Search The Source...", onSearch: function (newValue) { return console.log('Search for', newValue); } })),
        React.createElement("div", { className: styles.navSection }, navItems.map(function (item, index) { return (React.createElement(NavMenuItem, { key: index, item: item })); })),
        React.createElement("div", { className: styles.rightSection },
            React.createElement(Icon, { iconName: "Ringer", className: styles.notificationIcon }),
            React.createElement(Persona, { text: userDisplayName, size: PersonaSize.size32, hidePersonaDetails: true, title: userDisplayName }))));
};
//# sourceMappingURL=Header.js.map