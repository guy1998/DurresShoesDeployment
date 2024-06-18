import { faker } from '@faker-js/faker';

function generateRandomWorker() {
    return {
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      costPerDay: faker.datatype.number({ min: 100, max: 1000 })
    };
}

export const getEmployees = async ()=>{
    const workers = [];
    for (let i = 0; i < 20; i++) {
        workers.push(generateRandomWorker());
    }
    return workers;
}