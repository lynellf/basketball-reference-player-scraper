"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayer = exports.playerStatTableToObject = exports.getPlayerBio = exports.getPlayerBirthdate = exports.getPlayerDraft = exports.getPlayerNicknames = exports.getPlayerAttributes = exports.getPlayerPosition = exports.getPlayerCollege = exports.altGetPlayerCollege = exports.getPlayerHighSchool = exports.getPlayerBirthplace = exports.getPlayerName = exports.getPlayerAge = exports.getPlayerAccolades = exports.getPlayerContract = exports.getPlayerStats = exports.getPlayerPage = exports.getPlayerHonors = void 0;
var Puppet_1 = require("./Puppet");
var Utils_1 = require("./Utils");
var Search_1 = require("./Search");
var BASE_URL = 'https://www.basketball-reference.com/';
var CONTRACT_SELECTOR = 'table[id^="contracts_"]';
var BIO_SELECTOR = 'div[itemtype="https://schema.org/Person"]';
var PLAYER_NAME_SELECTOR = 'h1[itemprop="name"]';
var LEADERBOARD_SELECTOR = 'div_leaderboard';
var VALID_TABLE_IDS = [
    'advanced',
    'all_college_stats',
    'all_salaries',
    'all_star',
    'pbp',
    'per_game',
    'per_minute',
    'per_poss',
    'playoffs_advanced',
    'playoffs_pbp',
    'playoffs_per_game',
    'playoffs_per_minute',
    'playoffs_per_poss',
    'playoffs_shooting',
    'playoffs_totals',
    'shooting',
    'sim_career',
    'sim_thru',
    'totals',
    'year-and-career-highs-po',
    'year-and-career-highs'
];
var getPlayerHonors = function (document) {
    var leaderboard = document.getElementById(LEADERBOARD_SELECTOR);
    if (leaderboard) {
        var sections = Array.from(leaderboard.children);
        var tables = sections.map(function (section) { return section.children[0]; });
        var honors = tables.map(function (table) {
            var children = Array.from(table.children);
            var label = children[0].textContent.trim();
            var results = Array.from(children[1].children).map(function (row) {
                var _a, _b, _c;
                var nodes = row.children[0].childNodes;
                var honor = nodes[0].textContent.trim();
                var rank = (_c = (_b = (_a = nodes[nodes.length - 1]) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : -1;
                return { honor: honor, rank: rank };
            });
            return { label: label, results: results };
        });
        return honors;
    }
    return [];
};
exports.getPlayerHonors = getPlayerHonors;
var getPlayerPage = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, Puppet_1.getDocument)(BASE_URL + "/players/" + query)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getPlayerPage = getPlayerPage;
var getPlayerStats = function (document, tableID) {
    var table = document.querySelector("#" + tableID);
    var hasTable = table !== null;
    if (!hasTable) {
        return null;
    }
    var tableChildren = Array.from(table.children);
    var tableBody = tableChildren.find(function (node) { return node.tagName === 'TBODY'; });
    var hasTableBody = tableBody !== undefined;
    if (!hasTableBody) {
        throw new Error('Table does not have a table body element');
    }
    var tableRows = Array.from(tableBody.children);
    var stats = tableRows.map(Utils_1.rowsToArray);
    return stats;
};
exports.getPlayerStats = getPlayerStats;
var getPlayerContract = function (document) {
    var contractTable = document.querySelector(CONTRACT_SELECTOR);
    var hasContractTable = contractTable !== null;
    if (!hasContractTable) {
        return null;
    }
    var tableChildren = Array.from(contractTable.children);
    var tableBody = tableChildren.find(function (element) { return element.tagName === 'TBODY'; });
    var tableHead = tableChildren.find(function (element) { return element.tagName === 'THEAD'; });
    var hasTableBody = tableBody !== undefined;
    var hasTableHead = tableHead !== undefined;
    var hasTableContents = hasTableBody && hasTableHead;
    if (!hasTableContents) {
        throw new Error('Table Body does not exist for player contract');
    }
    var headerRow = tableHead.children[0];
    var headerCells = Array.from(headerRow.children);
    var contractKeys = headerCells.map(function (cell, index) { var _a; return (_a = cell.textContent) !== null && _a !== void 0 ? _a : "unknownCell_" + (index + 1); });
    var bodyRow = tableBody.children[0];
    var bodyRowCells = Array.from(bodyRow.children);
    var results = bodyRowCells.reduce(function (output, cell, index) {
        var key = contractKeys[index];
        output[key] = cell.textContent;
        return output;
    }, {});
    return results;
};
exports.getPlayerContract = getPlayerContract;
var getPlayerAccolades = function (document) {
    var _a;
    var accoladesList = document.querySelector('#bling');
    var accoladesItems = Array.from((_a = accoladesList === null || accoladesList === void 0 ? void 0 : accoladesList.children) !== null && _a !== void 0 ? _a : []);
    var accolades = accoladesItems.map(function (item) { return item.textContent; });
    return accolades;
};
exports.getPlayerAccolades = getPlayerAccolades;
var getPlayerAge = function (str) {
    var _a, _b;
    var ageRegExp = /([0-9]+-[0-9]+d)/g;
    var age = (_b = (_a = str.match(ageRegExp)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
    return age;
};
exports.getPlayerAge = getPlayerAge;
var getPlayerName = function (document) {
    var _a, _b;
    return (_b = (_a = document.querySelector(PLAYER_NAME_SELECTOR)) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
};
exports.getPlayerName = getPlayerName;
var getPlayerBirthplace = function (str) {
    var endAtRelativesExp = /(?=Born:)(.*)(?=Relatives:)/;
    var endAtCollegeExp = /(?=Born:)(.*)(?=College:)/;
    var endAtHSExp = /(?=Born:)(.*)(?=High School:)/;
    var endAtDraft = /(?=Born:)(.*)(?=College:)/;
    var potentialMatchA = str.match(endAtRelativesExp);
    var potentialMatchB = str.match(endAtCollegeExp);
    var potentialMatchC = str.match(endAtHSExp);
    var potentialMatchD = str.match(endAtDraft);
    var matchResults = potentialMatchA || potentialMatchB || potentialMatchC || potentialMatchD;
    var hasMatch = matchResults !== null;
    if (!hasMatch) {
        return '';
    }
    var birthLocation = matchResults[0].split('in')[1];
    var trimmedOutput = birthLocation.trim();
    return trimmedOutput;
};
exports.getPlayerBirthplace = getPlayerBirthplace;
var getPlayerHighSchool = function (str) {
    var _a, _b, _c, _d;
    var regExps = [
        /(?=High School:)(.*)(?=Recruiting Rank)/,
        /(?=High School:)(.*)(?=Draft:)/,
        /(?=High Schools:)(.*)(?=Recruiting Rank:)/,
        /(?=High Schools:)(.*)(?=Draft:)/
    ];
    var matchedString = (_a = regExps
        .map(function (regExp) { return str.match(regExp); })
        .find(function (match) { return match !== null; })) !== null && _a !== void 0 ? _a : [];
    var hasMatch = matchedString.length > 0;
    if (!hasMatch) {
        return null;
    }
    var matches = matchedString[0];
    var strsToSplitby = ['High School: ', 'High Schools: '];
    var highSchool = strsToSplitby.map(function (str) { return matches.split(str)[1]; });
    var results = (_d = (_c = (_b = highSchool === null || highSchool === void 0 ? void 0 : highSchool[1]) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.reduce(function (output, str, index, input) {
        var isOdd = index % 2 === 1;
        var prevVal = input[index - 1];
        var canJoin = isOdd;
        if (canJoin) {
            output[index - 1] = (prevVal + "," + str).trim();
            return output;
        }
        return output;
    }, []).filter(function (val) { return val; })) !== null && _d !== void 0 ? _d : [highSchool[0].trim()];
    return results;
};
exports.getPlayerHighSchool = getPlayerHighSchool;
// why? some players have a slightly different description
// thus, we need a slightly different regular expression
var altGetPlayerCollege = function (str) {
    var collegeRegExp = /(?=College:)(.*)(?=High Schools:)/;
    var matchedString = str.match(collegeRegExp);
    var hasMatch = matchedString !== null;
    if (!hasMatch) {
        return null;
    }
    var matches = matchedString[0];
    var college = matches.split('College: ')[1];
    return [college.trim()];
};
exports.altGetPlayerCollege = altGetPlayerCollege;
var getPlayerCollege = function (str) {
    var collegeRegExp = /(?=College:)(.*)(?=High School:)/;
    var matchedString = str.match(collegeRegExp);
    var hasMatch = matchedString !== null;
    if (!hasMatch) {
        return null;
    }
    var matches = matchedString[0];
    var college = matches.split('College: ')[1];
    return [college.trim()];
};
exports.getPlayerCollege = getPlayerCollege;
var getPlayerPosition = function (str) {
    var positionRegExp = /(?=Position:).*(?=▪)/;
    var matchedStr = str.match(positionRegExp);
    var hasMatch = matchedStr !== null;
    if (!hasMatch) {
        return null;
    }
    var parsedPositionA = matchedStr[0].split('Position: ')[1];
    var positions = parsedPositionA.split(' and ');
    var trimmedPositions = positions.map(function (position) { return position.trim(); });
    return trimmedPositions;
};
exports.getPlayerPosition = getPlayerPosition;
var getPlayerAttributes = function (str) {
    var attrRegExp = /(?=Shoots).*(?=\) [BT])/;
    var heightRegExp = /\d*(?=cm)/;
    var weightRegExp = /\d*(?=kg)/;
    var handRegExp = /(?=Shoots: ).*(?=[0-9]-)/;
    var matchedStr = str.match(attrRegExp);
    var hasMatch = matchedStr !== null;
    if (!hasMatch) {
        return null;
    }
    var parsedAttributes = matchedStr[0];
    var weight = parsedAttributes.match(weightRegExp)[0];
    var height = parsedAttributes.match(heightRegExp)[0];
    var handStr = parsedAttributes.match(handRegExp)[0];
    var hand = handStr.split('Shoots: ')[1].trim();
    return { hand: hand, height: height, weight: weight };
};
exports.getPlayerAttributes = getPlayerAttributes;
var getPlayerNicknames = function (str) {
    var nicknameRegExp = /\(((?!born)(?!Age:)(?![0-9])(?!Full)[^)]+)\)/;
    var noParensRegExp = /([^(^)])/g;
    var nicknameStr = str.match(nicknameRegExp);
    var hasNickname = nicknameStr !== null;
    var parsedNickname = hasNickname
        ? nicknameStr[0].match(noParensRegExp).join('')
        : '';
    var nicknameArr = hasNickname ? parsedNickname.split(',') : [];
    return nicknameArr;
};
exports.getPlayerNicknames = getPlayerNicknames;
var getPlayerDraft = function (str) {
    var draftRegExp = /(?=Draft:)(.*)(?=NBA Debut:)/;
    var draftPosRegExp = /(?=\().*(?=pick)/;
    var draftStr = str.match(draftRegExp);
    var wasDrafted = draftStr !== null;
    if (!wasDrafted) {
        return null;
    }
    var splitStr = wasDrafted ? draftStr[0].split(',') : [];
    var draftClass = splitStr[3].trim();
    var draftYear = parseInt(draftClass, 0);
    var draftTeam = splitStr[0].split('Draft: ')[1].trim();
    var draftRound = parseInt(splitStr[1].trim(), 0);
    var draftPos = splitStr.length > 0
        ? parseInt(splitStr[1].match(draftPosRegExp)[0][1].trim(), 0)
        : '';
    return {
        team: draftTeam,
        year: draftYear,
        position: { round: draftRound, position: draftPos }
    };
};
exports.getPlayerDraft = getPlayerDraft;
var getPlayerBirthdate = function (str) {
    var _a, _b;
    var dateRegExp = /([A-Z][a-z]+ +[0-9]+, +[0-9]+)/;
    var dateOfBirth = (_b = (_a = str.match(dateRegExp)) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : '';
    return dateOfBirth;
};
exports.getPlayerBirthdate = getPlayerBirthdate;
var getPlayerBio = function (document) {
    var _a;
    var bioElement = document.querySelector(BIO_SELECTOR);
    var bioString = (_a = bioElement === null || bioElement === void 0 ? void 0 : bioElement.textContent) !== null && _a !== void 0 ? _a : '';
    var trimmedBioString = (0, Utils_1.trimWhitespace)(bioString);
    var accolades = (0, exports.getPlayerAccolades)(document);
    var age = (0, exports.getPlayerAge)(trimmedBioString);
    var name = (0, exports.getPlayerName)(document);
    var birthplace = (0, exports.getPlayerBirthplace)(trimmedBioString);
    var highSchool = (0, exports.getPlayerHighSchool)(trimmedBioString);
    var college = (0, exports.getPlayerCollege)(trimmedBioString) || (0, exports.altGetPlayerCollege)(trimmedBioString);
    var position = (0, exports.getPlayerPosition)(trimmedBioString);
    var attributes = (0, exports.getPlayerAttributes)(trimmedBioString);
    var nicknames = (0, exports.getPlayerNicknames)(bioString);
    var draft = (0, exports.getPlayerDraft)(trimmedBioString);
    var dob = (0, exports.getPlayerBirthdate)(trimmedBioString);
    var education = { college: college, highSchool: highSchool };
    return {
        accolades: accolades,
        attributes: attributes,
        age: age,
        birthplace: birthplace,
        draft: draft,
        education: education,
        name: name,
        nicknames: nicknames,
        position: position,
        dob: dob
    };
};
exports.getPlayerBio = getPlayerBio;
var playerStatTableToObject = function (tableIDs) {
    var ids = tableIDs.reduce(function (output, id) {
        var matchedID = VALID_TABLE_IDS.find(function (validID) { return validID === id; });
        var hasMatch = matchedID !== undefined;
        if (!hasMatch) {
            return output;
        }
        return __spreadArray(__spreadArray([], output, true), [id], false);
    }, []);
    return ids;
};
exports.playerStatTableToObject = playerStatTableToObject;
var getPlayer = function (query, options) {
    if (options === void 0) { options = {
        tableIDs: ['per_game'],
        bio: true,
        contract: false,
        honors: true
    }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var document, baseOutput, results;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, Search_1.findPlayer)(query)];
                case 1:
                    document = _b.sent();
                    baseOutput = {
                        bio: options.bio ? (0, exports.getPlayerBio)(document) : null,
                        contract: options.contract ? (0, exports.getPlayerContract)(document) : null,
                        honors: (0, exports.getPlayerHonors)(document)
                    };
                    results = ((_a = options === null || options === void 0 ? void 0 : options.tableIDs) !== null && _a !== void 0 ? _a : []).reduce(function (output, category) {
                        output[category] = (0, exports.getPlayerStats)(document, category);
                        return output;
                    }, baseOutput);
                    return [2 /*return*/, results];
            }
        });
    });
};
exports.getPlayer = getPlayer;
//# sourceMappingURL=Player.js.map