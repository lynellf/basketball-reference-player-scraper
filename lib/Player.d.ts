export declare const getPlayerHonors: (document: Document) => {
    label: string;
    results: {
        honor: string;
        rank: string | number;
    }[];
}[];
export declare const getPlayerPage: (query: string) => Promise<Document>;
export declare const getPlayerStats: (document: Document, tableID: string) => {
    [x: string]: string | number | null;
}[] | null;
export declare const getPlayerContract: (document: Document) => Record<string, unknown> | null;
export declare const getPlayerAccolades: (document: Document) => (string | null)[];
export declare const getPlayerAge: (str: string) => string;
export declare const getPlayerName: (document: Document) => string;
export declare const getPlayerBirthplace: (str: string) => string;
export declare const getPlayerHighSchool: (str: string) => string[] | null;
export declare const altGetPlayerCollege: (str: string) => string[] | null;
export declare const getPlayerCollege: (str: string) => string[] | null;
export declare const getPlayerPosition: (str: string) => string[] | null;
export declare const getPlayerAttributes: (str: string) => {
    hand: string;
    height: string;
    weight: string;
} | null;
export declare const getPlayerNicknames: (str: string) => string[];
export declare const getPlayerDraft: (str: string) => {
    team: string;
    year: number;
    position: {
        round: number;
        position: string | number;
    };
} | null;
export declare const getPlayerBirthdate: (str: string) => string;
export declare const getPlayerBio: (document: Document) => {
    accolades: (string | null)[];
    attributes: {
        hand: string;
        height: string;
        weight: string;
    } | null;
    age: string;
    birthplace: string;
    draft: {
        team: string;
        year: number;
        position: {
            round: number;
            position: string | number;
        };
    } | null;
    education: {
        college: string[] | null;
        highSchool: string[] | null;
    };
    name: string;
    nicknames: string[];
    position: string[] | null;
    dob: string;
};
export declare const playerStatTableToObject: (tableIDs: string[]) => string[];
declare type Options = {
    tableIDs?: string[];
    bio?: boolean;
    contract?: boolean;
    honors?: boolean;
};
export declare const getPlayer: (query: string, options?: Options) => Promise<Record<string, unknown>>;
export {};
//# sourceMappingURL=Player.d.ts.map