import { Gaussian } from 'ts-gaussian';
import dayjs from 'dayjs';
import latinize from 'latinize';
import * as repo from './repo.json';
const DEAFULT_DATE_MEAN = '01/01/1992';
const DEAFULT_DATE_FORMAT = 'MM/DD/YYYY';
const DEAFULT_DATE_VARIANCE = 10; // years
const DEAFULT_HEIGHT_MEAN_MALE = 182;
const DEAFULT_HEIGHT_MEAN_FEMALE = 167;
const DEAFULT_HEIGHT_VARIANCE = 50;
const DEAFULT_WEIGHT_VARIANCE = 70;

export enum Nationality {
    Albania = 0,
    Argentina = 1,
    Armenia = 2,
    Australia = 3,
    Austria = 4,
    Azerbaijan = 5,
    Bangladesh = 6,
    Belgium = 7,
    BosniaandHerzegovina = 8,
    Brazil = 9,
    Bulgaria = 10,
    Canada = 11,
    China = 12,
    Colombia = 13,
    CostaRica = 14,
    Croatia = 15,
    CzechRepublic = 16,
    Denmark = 17,
    Egypt = 18,
    England = 19,
    Estonia = 20,
    Finland = 21,
    France = 22,
    Georgia = 23,
    Germany = 24,
    Greece = 25,
    Hungary = 26,
    India = 27,
    Indonesia = 28,
    Iran = 29,
    Ireland = 30,
    Israel = 31,
    Italy = 32,
    Japan = 33,
    Korea = 34,
    KyrgyzRepublic = 35,
    Mexico = 36,
    Morocco = 37,
    Nepal = 38,
    Netherlands = 39,
    NewZealand = 40,
    Nigeria = 41,
    Norway = 42,
    Pakistan = 43,
    Poland = 44,
    Portugal = 45,
    Romania = 46,
    Russia = 47,
    SaudiArabia = 48,
    Slovakia = 49,
    Slovenia = 50,
    Spain = 51,
    Sweden = 52,
    Switzerland = 53,
    Tunisia = 54,
    Turkey = 55,
    Ukraine = 56,
    UnitedStates = 57,
    Vietnam = 58,
}

export interface IBirthdayOptions {
    near?: string;
    variance?: number;
    format?: string;
}

export enum Sex {
    Male = 0,
    Female = 1,
}

export interface IHeightOptions {
    near: number;
    variance: number;
}

export interface IWeightOptions {
    near: number;
    variance: number;
}

export interface IOptions {
    birthdayOptions?: IBirthdayOptions;
    heightOptions?: IHeightOptions;
    nationality?: Nationality;
    sex?: 'male' | 'female';
    weightOptions?: IWeightOptions
}

export interface IPerson {
    age?: number,
    birthday?: string
    name: string;
    nationality?: string;
    sex?: 'male' | 'female';    
    surname: string;
    height: number;
    weight: number;
    email: string;
}

export interface INamespace {
    female: string[],
    male: string[],
    surnames: string[],
}

export const Person = (options?: IOptions): IPerson => {
    const namespace = repo[options && options.nationality || Math.floor(Math.random() * Object.keys(Nationality).length / 2)];
    const sex = options && options.sex ? options.sex : Math.random() > 0.5 ? 'male' : 'female';
    const name = namespace[sex][Math.floor(Math.random() * namespace[sex].length)];
    const surname = namespace.surnames[Math.floor(Math.random() * namespace.surnames.length)];
    const email = `${convertString(latinize(name))}.${convertString(latinize(surname))}@generateperson.com`;
    let date = generateAge({   
        near: DEAFULT_DATE_MEAN, 
        variance: DEAFULT_DATE_VARIANCE, 
        format: DEAFULT_DATE_FORMAT,
        ...options?.birthdayOptions
    });
    let height = (options && options.heightOptions) ?
        generateHeight(options.heightOptions.near, options.heightOptions.variance) :
        generateHeight(sex === 'male' ? DEAFULT_HEIGHT_MEAN_MALE: DEAFULT_HEIGHT_MEAN_FEMALE, DEAFULT_HEIGHT_VARIANCE)
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
    }
}

const generateAge = ({near, variance, format}: Required<IBirthdayOptions>) => {
    const mean = Math.round(dayjs().diff(dayjs(near, format), 'days'));
    const distribution = new Gaussian(mean, variance * 100000);
    const days = Math.round(distribution.ppf(Math.random()));
    return dayjs().subtract(days, 'days').format(format);
}
const generateHeight = (near: number, variance: number): number => {
    const distribution = new Gaussian(near, variance);
    return Math.round(distribution.ppf(Math.random()));
}

const generateWeight = (near: number, variance: number): number => {
    const distribution = new Gaussian(near, variance);
    return Math.round(distribution.ppf(Math.random()));
}

const convertString = (phrase: string) => {
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
    returnString = returnString.replace(/^\s+|\s+$/g,"");
    // cuts string (if too long)
    if(returnString.length > maxLength)
        returnString = returnString.substring(0, maxLength);
    if (returnString.length === 0) {
        return 'mail'
    }

    return returnString;
}