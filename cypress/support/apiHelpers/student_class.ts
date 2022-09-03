import faker from 'faker';

export class Student {
    id?: number
    firstName: string
    lastName: string
    studentClass: string
    nationality: string
}

export class StudentGenerator {
    static GenerateStudent = () => {
        const student: Student = {
            id: faker.datatype.number({max: 999999 }),
            firstName: faker.name.firstName(),
            lastName: faker.name.firstName(),
            studentClass: faker.random.alpha(2),
            nationality: faker.address.country()
        }
        return student;
    }
}