"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayerPageURL = exports.nameCheck = exports.trimWhitespace = exports.rowsToArray = exports.cellToKeyValPair = exports.getFile = void 0;
var fs_1 = require("fs");
var getFile = function (filename) { return "" + (0, fs_1.readFileSync)(filename); };
exports.getFile = getFile;
var cellToKeyValPair = function (output, cell) {
    var statHeader = cell.getAttribute('data-stat');
    var hasStatHeader = statHeader !== null;
    if (!hasStatHeader) {
        throw new Error('The "data-stat" attribute does not exist in this table');
    }
    var statText = cell.textContent;
    var statValue = Number(statText);
    var statTextIsANumber = !isNaN(statValue);
    if (!statTextIsANumber) {
        output[statHeader] = statText;
    }
    if (statTextIsANumber) {
        output[statHeader] = statValue;
    }
    return output;
};
exports.cellToKeyValPair = cellToKeyValPair;
var rowsToArray = function (row) {
    var cells = Array.from(row.children);
    var seasonStats = cells.reduce(exports.cellToKeyValPair, {});
    return seasonStats;
};
exports.rowsToArray = rowsToArray;
var trimWhitespace = function (str) {
    var wsRemovalRegExp = /\s{2,}/g;
    var trimmedStr = str.replace(wsRemovalRegExp, ' ');
    return trimmedStr;
};
exports.trimWhitespace = trimWhitespace;
function nameCheck(normalizedQuery) {
    function callback(playerItem) {
        var _a;
        var playerName = playerItem.textContent;
        var normalizedPlayerName = (_a = playerName === null || playerName === void 0 ? void 0 : playerName.toLowerCase()) !== null && _a !== void 0 ? _a : '';
        var isMatch = normalizedPlayerName.includes(normalizedQuery);
        if (!isMatch) {
            return false;
        }
        return true;
    }
    return callback;
}
exports.nameCheck = nameCheck;
var getPlayerPageURL = function (isActive, children) {
    if (!isActive) {
        return children[0].getAttribute('href');
    }
    return children[0].children[0].getAttribute('href');
};
exports.getPlayerPageURL = getPlayerPageURL;
//# sourceMappingURL=Utils.js.map