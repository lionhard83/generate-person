import { Nationality, Person } from '../index';

test('Person', () => {
    const person = Person({
        birthdayOptions: {
            near: '01/01/1980',
            variance: 500000
        },
        nationality: Nationality.Germany
    })
    expect(person).toHaveProperty('name');
    expect(person).toHaveProperty('surname');
    expect(person).toHaveProperty('birthday');
    expect(person).toHaveProperty('sex');
    expect(person).toHaveProperty('height');
    expect(person).toHaveProperty('weight');
});
