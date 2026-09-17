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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import styles from './CarouselArticle.module.scss';
import { SPService } from '../../../shared/SPService';
import { Constants, ROOT_SITE_URL } from '../../../shared/Constant';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
var CarouselArticle = /** @class */ (function (_super) {
    __extends(CarouselArticle, _super);
    function CarouselArticle(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            pages: [],
            loading: true
        };
        return _this;
    }
    CarouselArticle.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchData()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CarouselArticle.prototype.componentDidUpdate = function (prevProps) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(prevProps.siteSelection !== this.props.siteSelection ||
                            prevProps.showSites !== this.props.showSites ||
                            prevProps.maxSitePageCount !== this.props.maxSitePageCount ||
                            prevProps.sortingOption !== this.props.sortingOption)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchData()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    CarouselArticle.prototype.fetchData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var siteUrls, allSites, maxCount, pages, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ loading: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        siteUrls = [];
                        if (!(this.props.siteSelection === 'All')) return [3 /*break*/, 3];
                        return [4 /*yield*/, SPService.getAllSubSites()];
                    case 2:
                        allSites = _a.sent();
                        siteUrls = allSites.map(function (s) { return s.Url; });
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.props.showSites && this.props.showSites.length > 0) {
                            siteUrls = __spreadArray([], this.props.showSites, true);
                        }
                        else {
                            // Default to root if no input added
                            siteUrls = [ROOT_SITE_URL];
                        }
                        _a.label = 4;
                    case 4:
                        maxCount = this.props.maxSitePageCount || 5;
                        return [4 /*yield*/, SPService.getSitePages(siteUrls, Constants.PromotedState, maxCount, this.props.sortingOption)];
                    case 5:
                        pages = _a.sent();
                        this.setState({ pages: pages, loading: false });
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.error(err_1);
                        this.setState({ loading: false });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    CarouselArticle.prototype.render = function () {
        var _this = this;
        var _a = this.props, slideShowCount = _a.slideShowCount, autoScrollTime = _a.autoScrollTime, showBanner = _a.showBanner, showSiteName = _a.showSiteName, showTitle = _a.showTitle, showPublishedAt = _a.showPublishedAt, showPostedBy = _a.showPostedBy;
        if (this.state.loading) {
            return React.createElement("div", null, "Loading articles...");
        }
        if (this.state.pages.length === 0) {
            return React.createElement("div", null, "No articles found.");
        }
        var delay = (autoScrollTime || 3) * 1000;
        var slidesView = slideShowCount || 3;
        return (React.createElement("section", { className: styles.carouselArticle },
            React.createElement(Swiper, { slidesPerView: slidesView, spaceBetween: 20, loop: true, autoplay: {
                    delay: delay,
                    disableOnInteraction: false,
                }, pagination: { clickable: true }, navigation: true, modules: [Autoplay, Pagination, Navigation], className: styles.mySwiper }, this.state.pages.map(function (page, idx) {
                var dateStr = new Date(page.PublishedDate).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                });
                // Build the metadata string dynamically based on toggles
                var metaString = '';
                if (showSiteName && page.SiteName) {
                    metaString += "In ".concat(page.SiteName);
                }
                if (showPostedBy && page.Author) {
                    metaString += "".concat(metaString ? ' ' : '', "by ").concat(page.Author);
                }
                if (showPublishedAt && page.PublishedDate) {
                    metaString += "".concat(metaString ? ' ' : '', "on ").concat(dateStr);
                }
                return (React.createElement(SwiperSlide, { key: idx, className: styles.swiperSlide },
                    React.createElement("a", { href: page.Url, target: "_blank", rel: "noopener noreferrer", className: styles.card },
                        showBanner && (React.createElement("div", { className: styles.imageContainer, style: { minHeight: "".concat(_this.props.carouselItemHeight || 150, "px") } },
                            React.createElement("img", { src: page.BannerImageUrl || 'https://via.placeholder.com/400x200?text=No+Image', alt: "Banner" }))),
                        React.createElement("div", { className: styles.cardContent, style: { backgroundColor: '#e4dede' } },
                            showTitle && React.createElement("h3", { className: styles.title, title: page.Title }, page.Title),
                            React.createElement("div", { className: styles.metaData, title: metaString },
                                showSiteName && page.SiteName && (React.createElement("span", null,
                                    "In ",
                                    React.createElement("strong", { style: { color: 'var(--link, #0078d4)' } }, page.SiteName))),
                                (showPostedBy || showPublishedAt) && (React.createElement("span", null,
                                    showSiteName && page.SiteName ? ' ' : '',
                                    showPostedBy && page.Author ? "by ".concat(page.Author, " ") : '',
                                    showPublishedAt && page.PublishedDate ? "on ".concat(dateStr) : '')))))));
            }))));
    };
    return CarouselArticle;
}(React.Component));
export default CarouselArticle;
//# sourceMappingURL=CarouselArticle.js.map