import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { INavItem } from "./navigationConfig";
export declare const NavigationService: {
    ensureNavigationList: (context: WebPartContext) => Promise<void>;
    getNavigationItems: (context: WebPartContext) => Promise<INavItem[]>;
};
//# sourceMappingURL=NavigationService.d.ts.map