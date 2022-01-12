# generate-person

## to install

```
npm install generate-person
```

### A simple use to generate People by Nationality, age and sex.

```typescript
import { Nationality, Person } from 'generate-person';
const p1 = Person();
/*  { name: 'Jérémy',
      surname: 'Julien',
      height: 195,
      nationality: 'France',
      birthday: '10/9/1994',
      sex: 'male',
      email: 'jeremy.julien@generateperson.com',
      weight: 109 }*/
const p2 = Person({nationality: Nationality.Germany, sex: 'male'});
/* { name: 'John',
      surname: 'Baumann',
      height: 185,
      nationality: 'Germany',
      birthday: '2/27/1999',
      email: 'john.baumann@generateperson.com',
      sex: 'male',
      weight: 88 } */
const p3 = Person({birthdayOptions: {
        near: '1980-MM-DD',
        variance: 5, // years
        format: 'YYYY-MM-DD' //dayjs format
    }}
/*{ name: 'Սոնա',
      surname: 'Մովսեսյան',
      height: 177,
      nationality: 'Armenia',
      birthday: '1980/10/08',
      sex: 'female',
      email: 'test.test@generateperson.com',
      weight: 67 }*/


const people = People(10, {nationality: Nationality.Germany});
/* generate people by number */
```
