import * as React from 'react';
import type { ILatestPopularArticleProps } from './ILatestPopularArticleProps';
export interface ILatestPopularArticleState {
    pages: any[];
    loading: boolean;
    sortingOption: string;
}
export default class LatestPopularArticle extends React.Component<ILatestPopularArticleProps, ILatestPopularArticleState> {
    constructor(props: ILatestPopularArticleProps);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: ILatestPopularArticleProps, prevState: ILatestPopularArticleState): Promise<void>;
    private fetchData;
    private setSorting;
    render(): React.ReactElement<ILatestPopularArticleProps>;
}
//# sourceMappingURL=LatestPopularArticle.d.ts.map