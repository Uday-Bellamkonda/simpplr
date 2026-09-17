import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface ILatestPopularArticleWebPartProps {
    description: string;
    maxSitePageCount: number;
    siteSelection: string;
    layoutView: string;
    showBanner: boolean;
    showSiteName: boolean;
    showTitle: boolean;
    showPublishedAt: boolean;
    showPostedBy: boolean;
    showSites: string[];
}
export default class LatestPopularArticleWebPart extends BaseClientSideWebPart<ILatestPopularArticleWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    private _siteOptions;
    render(): void;
    protected onInit(): Promise<void>;
    private _fetchSitesForPropertyPane;
    private _getEnvironmentMessage;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=LatestPopularArticleWebPart.d.ts.map