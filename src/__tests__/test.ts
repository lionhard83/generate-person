import { Nationality, Person } from '../index';

test('Person', () => {
    expect(Person()).toHaveProperty('name');
    expect(Person({nationality: Nationality.Germany})).toHaveProperty('surname');
    expect(Person({birthdayOptions: {
        near: '01/01/1980',
        variance: 500000
    }})).toHaveProperty('age');
    expect(Person({})).toHaveProperty('birthday');
    expect(Person({})).toHaveProperty('sex');
});