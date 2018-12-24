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
    const p1 = Person(); 
/*  { name: 'Jérémy',
      surname: 'Julien',
      nationality: 'France',
      birthday: '10/9/1994',
      age: 24,
      sex: 'male' }*/
    const p2 = Person({nationality: Nationality.Germany, sex: 'male'});
    const p3 = Person({birthdayOptions: {
            near: '01/01/1980',
            variance: 500000,
        }});
    console.log(p1);
    console.log(p2);
    console.log(p3);

});