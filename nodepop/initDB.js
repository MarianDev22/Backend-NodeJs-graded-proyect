import { connectMongoose } from './lib/connectMongoose.js'
import { User } from './models/User.js';
import { Product } from './models/Product.js';
import redline from 'node:readline/promises'

const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

const answer = await ask('Estas seguro que deseas eliminar toda la información de la base de datos? [y/N] ');
if (answer.toLowerCase() !== 'y') {
    console.log('Script abortado');
    process.exit(0);
}


await initUsers();
await initProducts();

await connection.close();
process.exit(0);

async function initUsers() {


    const USERS = [
    {email:"espeQF@example.com", password: await User.hashPassword('1234')},
    {email: "juanMF@example.com", password: await User.hashPassword('2345')},
    {email: "claraM@example.com", password: await User.hashPassword('3456')},
    {email:"davidR@example.com", password: await User.hashPassword('4567')}

];
    const delResult = await User.deleteMany();
    console.log (`Delted ${delResult.deletedCount} users`);

    const insResult = await User.insertMany(USERS);
    console.log(`Inserted ${insResult.length} users`);

};

async function initProducts() {

    const delProducts = await Product.deleteMany();
    console.log (`Delted ${delProducts.deletedCount} products`);

    const [user1, user2] =  await Promise.all([
        User.findOne({ email: 'juanMF@example.com' }),
        User.findOne({ email: 'claraM@example.com' })
    ]);

    const PRODUCTS = [
        { name: 'Samsung Galaxy S20', price: 235, tags:['mobile', 'work'], owner:user1._id },
        { name: 'earbuds', price: 123, tags:['lifestyle', 'mobile'], owner: user2._id},
        { name: 'vespa', price: 5457, tags:['motor','lifestyle'], owner: user2._id},
        { name: 'Stand up desk', price: 879, tags:['work'], owner: user1._id},
    ];
    
    console.table(PRODUCTS);

    const insProducts = await Product.insertMany(PRODUCTS);
    console.log(`Inserted ${insProducts.length} users`);

}


async function ask(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const result = await rl.question(question);
    rl.close();
    return result;
}
