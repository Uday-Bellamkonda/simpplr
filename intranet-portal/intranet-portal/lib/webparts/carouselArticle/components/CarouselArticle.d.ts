import * as React from 'react';
import type { ICarouselArticleProps } from './ICarouselArticleProps';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
export interface ICarouselArticleState {
    pages: any[];
    loading: boolean;
}
export default class CarouselArticle extends React.Component<ICarouselArticleProps, ICarouselArticleState> {
    constructor(props: ICarouselArticleProps);
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: ICarouselArticleProps): Promise<void>;
    private fetchData;
    render(): React.ReactElement<ICarouselArticleProps>;
}
//# sourceMappingURL=CarouselArticle.d.ts.map