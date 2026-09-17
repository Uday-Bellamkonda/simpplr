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
import * as React from 'react';
import styles from './IntranetPortal.module.scss';
import { SalesforceMigration } from './SalesforceMigration';
import { Header } from './Header';
import { Home } from './Home';
var IntranetPortal = /** @class */ (function (_super) {
    __extends(IntranetPortal, _super);
    function IntranetPortal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntranetPortal.prototype.componentDidMount = function () {
        // Apply edit mode class to body if isEdit=true
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('isEdit') === 'true') {
            document.body.classList.add('is-edit-mode');
        }
    };
    IntranetPortal.prototype.render = function () {
        var _a = this.props, hasTeamsContext = _a.hasTeamsContext, context = _a.context, userDisplayName = _a.userDisplayName;
        var urlParams = new URLSearchParams(window.location.search);
        var screen = urlParams.get('screen');
        return (React.createElement("section", { className: "".concat(styles.intranetPortal, " ").concat(hasTeamsContext ? styles.teams : '') },
            React.createElement(Header, { context: context, userDisplayName: userDisplayName }),
            screen === 'migration' ? (React.createElement(SalesforceMigration, { context: context })) : (React.createElement(Home, null))));
    };
    return IntranetPortal;
}(React.Component));
export default IntranetPortal;
//# sourceMappingURL=IntranetPortal.js.map