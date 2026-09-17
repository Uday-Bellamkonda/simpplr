import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/sites";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/search";
import "@pnp/sp/site-groups";
var _sp;
export var getSP = function (context) {
    if (context != null) {
        _sp = spfi().using(SPFx(context));
    }
    return _sp;
};
//# sourceMappingURL=pnpjsConfig.js.map