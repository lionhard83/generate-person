"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = exports.Sex = exports.Nationality = void 0;
const ts_gaussian_1 = require("ts-gaussian");
const dayjs_1 = __importDefault(require("dayjs"));
const latinize_1 = __importDefault(require("latinize"));
const repo = __importStar(require("./repo.json"));
const DEAFULT_DATE_MEAN = '01/01/1992';
const DEAFULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEAFULT_DATE_VARIANCE = 10; // years
const DEAFULT_HEIGHT_MEAN_MALE = 182;
const DEAFULT_HEIGHT_MEAN_FEMALE = 167;
const DEAFULT_HEIGHT_VARIANCE = 50;
const DEAFULT_WEIGHT_VARIANCE = 70;
var Nationality;
(function (Nationality) {
    Nationality[Nationality["Albania"] = 0] = "Albania";
    Nationality[Nationality["Argentina"] = 1] = "Argentina";
    Nationality[Nationality["Armenia"] = 2] = "Armenia";
    Nationality[Nationality["Australia"] = 3] = "Australia";
    Nationality[Nationality["Austria"] = 4] = "Austria";
    Nationality[Nationality["Azerbaijan"] = 5] = "Azerbaijan";
    Nationality[Nationality["Bangladesh"] = 6] = "Bangladesh";
    Nationality[Nationality["Belgium"] = 7] = "Belgium";
    Nationality[Nationality["BosniaandHerzegovina"] = 8] = "BosniaandHerzegovina";
    Nationality[Nationality["Brazil"] = 9] = "Brazil";
    Nationality[Nationality["Bulgaria"] = 10] = "Bulgaria";
    Nationality[Nationality["Canada"] = 11] = "Canada";
    Nationality[Nationality["China"] = 12] = "China";
    Nationality[Nationality["Colombia"] = 13] = "Colombia";
    Nationality[Nationality["CostaRica"] = 14] = "CostaRica";
    Nationality[Nationality["Croatia"] = 15] = "Croatia";
    Nationality[Nationality["CzechRepublic"] = 16] = "CzechRepublic";
    Nationality[Nationality["Denmark"] = 17] = "Denmark";
    Nationality[Nationality["Egypt"] = 18] = "Egypt";
    Nationality[Nationality["England"] = 19] = "England";
    Nationality[Nationality["Estonia"] = 20] = "Estonia";
    Nationality[Nationality["Finland"] = 21] = "Finland";
    Nationality[Nationality["France"] = 22] = "France";
    Nationality[Nationality["Georgia"] = 23] = "Georgia";
    Nationality[Nationality["Germany"] = 24] = "Germany";
    Nationality[Nationality["Greece"] = 25] = "Greece";
    Nationality[Nationality["Hungary"] = 26] = "Hungary";
    Nationality[Nationality["India"] = 27] = "India";
    Nationality[Nationality["Indonesia"] = 28] = "Indonesia";
    Nationality[Nationality["Iran"] = 29] = "Iran";
    Nationality[Nationality["Ireland"] = 30] = "Ireland";
    Nationality[Nationality["Israel"] = 31] = "Israel";
    Nationality[Nationality["Italy"] = 32] = "Italy";
    Nationality[Nationality["Japan"] = 33] = "Japan";
    Nationality[Nationality["Korea"] = 34] = "Korea";
    Nationality[Nationality["KyrgyzRepublic"] = 35] = "KyrgyzRepublic";
    Nationality[Nationality["Mexico"] = 36] = "Mexico";
    Nationality[Nationality["Morocco"] = 37] = "Morocco";
    Nationality[Nationality["Nepal"] = 38] = "Nepal";
    Nationality[Nationality["Netherlands"] = 39] = "Netherlands";
    Nationality[Nationality["NewZealand"] = 40] = "NewZealand";
    Nationality[Nationality["Nigeria"] = 41] = "Nigeria";
    Nationality[Nationality["Norway"] = 42] = "Norway";
    Nationality[Nationality["Pakistan"] = 43] = "Pakistan";
    Nationality[Nationality["Poland"] = 44] = "Poland";
    Nationality[Nationality["Portugal"] = 45] = "Portugal";
    Nationality[Nationality["Romania"] = 46] = "Romania";
    Nationality[Nationality["Russia"] = 47] = "Russia";
    Nationality[Nationality["SaudiArabia"] = 48] = "SaudiArabia";
    Nationality[Nationality["Slovakia"] = 49] = "Slovakia";
    Nationality[Nationality["Slovenia"] = 50] = "Slovenia";
    Nationality[Nationality["Spain"] = 51] = "Spain";
    Nationality[Nationality["Sweden"] = 52] = "Sweden";
    Nationality[Nationality["Switzerland"] = 53] = "Switzerland";
    Nationality[Nationality["Tunisia"] = 54] = "Tunisia";
    Nationality[Nationality["Turkey"] = 55] = "Turkey";
    Nationality[Nationality["Ukraine"] = 56] = "Ukraine";
    Nationality[Nationality["UnitedStates"] = 57] = "UnitedStates";
    Nationality[Nationality["Vietnam"] = 58] = "Vietnam";
})(Nationality = exports.Nationality || (exports.Nationality = {}));
var Sex;
(function (Sex) {
    Sex[Sex["Male"] = 0] = "Male";
    Sex[Sex["Female"] = 1] = "Female";
})(Sex = exports.Sex || (exports.Sex = {}));
exports.Person = (options) => {
    const namespace = repo[options && options.nationality || Math.floor(Math.random() * Object.keys(Nationality).length / 2)];
    const sex = options && options.sex ? options.sex : Math.random() > 0.5 ? 'male' : 'female';
    const name = namespace[sex][Math.floor(Math.random() * namespace[sex].length)];
    const surname = namespace.surnames[Math.floor(Math.random() * namespace.surnames.length)];
    const email = `${convertString(latinize_1.default(name))}.${convertString(latinize_1.default(surname))}@generateperson.com`;
    let date = generateAge(Object.assign({ near: DEAFULT_DATE_MEAN, variance: DEAFULT_DATE_VARIANCE, format: DEAFULT_DATE_FORMAT }, options === null || options === void 0 ? void 0 : options.birthdayOptions));
    let height = (options && options.heightOptions) ?
        generateHeight(options.heightOptions.near, options.heightOptions.variance) :
        generateHeight(sex === 'male' ? DEAFULT_HEIGHT_MEAN_MALE : DEAFULT_HEIGHT_MEAN_FEMALE, DEAFULT_HEIGHT_VARIANCE);
    let weight = (options && options.weightOptions) ?
        generateWeight(options.weightOptions.near, options.weightOptions.variance) :
        generateHeight(height - 100, DEAFULT_WEIGHT_VARIANCE);
    return {
        birthday: date,
        height,
        name,
        nationality: namespace.region,
        sex,
        surname,
        weight,
        email
    };
};
const generateAge = ({ near, variance, format }) => {
    const mean = Math.round(dayjs_1.default().diff(dayjs_1.default(near, format), 'days'));
    const distribution = new ts_gaussian_1.Gaussian(mean, variance * 100000);
    const days = Math.round(distribution.ppf(Math.random()));
    return dayjs_1.default().subtract(days, 'days').format(format);
};
const generateHeight = (near, variance) => {
    const distribution = new ts_gaussian_1.Gaussian(near, variance);
    return Math.round(distribution.ppf(Math.random()));
};
const generateWeight = (near, variance) => {
    const distribution = new ts_gaussian_1.Gaussian(near, variance);
    return Math.round(distribution.ppf(Math.random()));
};
const convertString = (phrase) => {
    let maxLength = 100;
    let returnString = phrase.toLowerCase();
    //Convert Characters
    returnString = returnString.replace(/\s/g, '');
    returnString = returnString.replace(/ö/g, 'o');
    returnString = returnString.replace(/ç/g, 'c');
    returnString = returnString.replace(/ş/g, 's');
    returnString = returnString.replace(/ı/g, 'i');
    returnString = returnString.replace(/ğ/g, 'g');
    returnString = returnString.replace(/ü/g, 'u');
    // if there are other invalid chars, convert them into blank spaces
    returnString = returnString.replace(/[^a-z0-9\s-]/g, "");
    // convert multiple spaces and hyphens into one space       
    returnString = returnString.replace(/[\s-]+/g, " ");
    // // trims current string
    returnString = returnString.replace(/^\s+|\s+$/g, "");
    // cuts string (if too long)
    if (returnString.length > maxLength)
        returnString = returnString.substring(0, maxLength);
    if (returnString.length === 0) {
        return 'mail';
    }
    return returnString;
};
