import { Gaussian } from 'ts-gaussian';
import * as moment from 'moment';
import * as repo from './repo.json';

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
    near: string;
    variance: number;
}

export interface IOptions {
    birthdayOptions?: IBirthdayOptions
    nationality?: Nationality;
    sex?: 'male' | 'female';
}

export interface IPerson {
    age?: number,
    birthday?: string
    name: string;
    nationality?: string;
    sex?: 'male' | 'female';    
    surname: string;
}

export interface INamespace {
    female: string[],
    male: string[],
    surnames: string[],
}

export const Person = (options?: IOptions): IPerson => {
    const namespace = repo[options && options.nationality || Math.floor(Math.random() * Object.keys(Nationality).length / 2)];
    const sex = options && options.sex ? options.sex : Math.random() > 0.5 ? 'male' : 'female';
    let date;
    if (options && options.birthdayOptions) {
        date = generateAge(options.birthdayOptions.near, options.birthdayOptions.variance)
    } else {
        date = generateAge('01/01/1997', 500000);
    }
    return {
        age: moment().diff(date, 'years'),
        birthday: date,
        name: namespace[sex][Math.floor(Math.random() * namespace[sex].length)],
        nationality: namespace.region,
        sex,
        surname: namespace.surnames[Math.floor(Math.random() * namespace.surnames.length)],
    }
}

const generateAge = (near: string, variance: number) => {
    const mean = moment().diff(moment(near), 'days');
    const distribution = new Gaussian(mean, variance);
    const days = distribution.ppf(Math.random());
    return moment().subtract(days, 'days').format('l');
}