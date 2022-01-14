import {fileURLToPath} from 'url';
import {dirname} from 'path';
import faker from 'faker';

const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

export default __dirname;

//Generar productos test con Faker
export const generate = (n) => {
    let products = [];
    for (let i = 0; i<n; i++) {
        products.push({
            id: i+1,
            nombre: faker.commerce.product(),
            price: faker.commerce.price(500, 4500, 2, '$'),
            image: faker.random.image()
        })
    }
    return products;
}