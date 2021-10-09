export declare const getFile: (filename: string) => string;
declare type Dict = Record<string, string | number | null>;
export declare const cellToKeyValPair: (output: Dict, cell: Element) => Dict;
export declare const rowsToArray: (row: Element) => Dict;
export declare const trimWhitespace: (str: string) => string;
export declare function nameCheck(normalizedQuery: string): (playerItem: Element) => boolean;
export declare const getPlayerPageURL: (isActive: boolean, children: HTMLCollection) => string | null;
export {};
//# sourceMappingURL=Utils.d.ts.map