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
exports.__esModule = true;
exports.mine = exports.warp = exports.wait = exports.failRevert = exports.fail = exports.send = exports.apy = exports.rad = exports.ray = exports.wad = exports.U256_MAX = exports.RAD = exports.RAY = exports.WAD = exports.BANKYEAR = exports.N = exports.want = exports.chai = void 0;
var ethers = require("ethers");
var ethers_1 = require("ethers");
var bigdecimal_1 = require("bigdecimal");
var _chai = require("chai");
var chaipromise = require("chai-as-promised");
_chai.use(chaipromise);
exports.chai = _chai;
exports.want = exports.chai.expect;
function N(n) {
    return ethers.BigNumber.from(n);
}
exports.N = N;
exports.BANKYEAR = ((365 * 24) + 6) * 3600;
exports.WAD = N(10).pow(N(18));
exports.RAY = N(10).pow(N(27));
exports.RAD = N(10).pow(N(45));
exports.U256_MAX = N(2).pow(N(256)).sub(N(1));
function wad(n) {
    var bd = new bigdecimal_1.BigDecimal(n);
    var WAD_ = new bigdecimal_1.BigDecimal(exports.WAD.toString());
    var scaled = bd.multiply(WAD_);
    var rounded = scaled.toBigInteger();
    return ethers_1.BigNumber.from(rounded.toString());
}
exports.wad = wad;
function ray(n) {
    var bd = new bigdecimal_1.BigDecimal(n);
    var RAY_ = new bigdecimal_1.BigDecimal(exports.RAY.toString());
    var scaled = bd.multiply(RAY_);
    var rounded = scaled.toBigInteger();
    return ethers_1.BigNumber.from(rounded.toString());
}
exports.ray = ray;
function rad(n) {
    var bd = new bigdecimal_1.BigDecimal(n);
    var RAD_ = new bigdecimal_1.BigDecimal(exports.RAD.toString());
    var scaled = bd.multiply(RAD_);
    var rounded = scaled.toBigInteger();
    return ethers_1.BigNumber.from(rounded.toString());
}
exports.rad = rad;
// Annualized rate, as a ray
function apy(n) {
    // apy = spy^YEAR  ==>  spy = root_{BANKYEAR}(apy)
    //                 ==>  spy = apy ^ (1 / YEAR)
    return ray(Math.pow(n, 1 / exports.BANKYEAR));
}
exports.apy = apy;
function send() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var f, fargs, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    f = args[0];
                    fargs = args.slice(1);
                    return [4 /*yield*/, f.apply(void 0, fargs)];
                case 1:
                    tx = _a.sent();
                    return [4 /*yield*/, tx.wait()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.send = send;
function fail() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var err, sargs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    err = args[0];
                    sargs = args.slice(1);
                    return [4 /*yield*/, (0, exports.want)(send.apply(void 0, sargs)).rejectedWith(err)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.fail = fail;
function failRevert() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return __awaiter(this, void 0, void 0, function () {
        var err, sargs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    err = args[0];
                    sargs = args.slice(1);
                    return [4 /*yield*/, (0, exports.want)(send.apply(void 0, sargs)).rejectedWith("VM Exception while processing transaction: reverted with custom error '" + err + "'")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.failRevert = failRevert;
function wait(hre, t) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hre.network.provider.request({
                        method: 'evm_increaseTime',
                        params: [t]
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.wait = wait;
function warp(hre, t) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hre.network.provider.request({
                        method: 'evm_setNextBlockTimestamp',
                        params: [t]
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.warp = warp;
function mine(hre, t) {
    if (t === void 0) { t = undefined; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(t !== undefined)) return [3 /*break*/, 2];
                    return [4 /*yield*/, wait(hre, t)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [4 /*yield*/, hre.network.provider.request({
                        method: 'evm_mine'
                    })];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.mine = mine;
