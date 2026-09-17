export declare class SPService {
    /**
     * Fetches all subsites recursively starting from the root site.
     */
    static getAllSubSites(): Promise<any[]>;
    private static _getSubWebs;
    /**
     * Fetch site pages based on promoted states
     */
    static getSitePages(siteUrls: string[], promotedStates: number[], maxCount: number): Promise<any[]>;
}
//# sourceMappingURL=SPService.d.ts.map