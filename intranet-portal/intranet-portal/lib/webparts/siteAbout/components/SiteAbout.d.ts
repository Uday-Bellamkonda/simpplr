import * as React from 'react';
import type { ISiteAboutProps } from './ISiteAboutProps';
import "@pnp/sp/site-groups";
export interface ISiteAboutState {
    siteTitle: string;
    siteDescription: string;
    owners: any[];
    members: any[];
    visitors: any[];
    loading: boolean;
}
export default class SiteAbout extends React.Component<ISiteAboutProps, ISiteAboutState> {
    constructor(props: ISiteAboutProps);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: ISiteAboutProps): Promise<void>;
    private fetchSiteData;
    private renderUserAvatar;
    render(): React.ReactElement<ISiteAboutProps>;
}
//# sourceMappingURL=SiteAbout.d.ts.map