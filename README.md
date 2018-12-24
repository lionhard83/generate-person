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
      nationality: 'France',
      birthday: '10/9/1994',
      sex: 'male' }*/
const p2 = Person({nationality: Nationality.Germany, sex: 'male'});
/* { name: 'John',
      surname: 'Baumann',
      nationality: 'Germany',
      birthday: '2/27/1999',
      sex: 'male' } */
const p3 = Person({birthdayOptions: {
        near: '01/01/1980',
        variance: 500000
    }}
/*
{ name: 'Սոնա',
      surname: 'Մովսեսյան',
      nationality: 'Armenia',
      birthday: '9/14/1980',
      sex: 'female' }*/
```
