import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
var _sp;
export var getSP = function (context) {
    if (context != null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};
//# sourceMappingURL=pnpjsConfig.js.map