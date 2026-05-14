const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const Product = require('./models/Product');

mongoose.connect(process.env.MONGO_URI);

const products = [

    {
        title: 'Premium Watch',
        price: 2999,
        image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200',
        description: 'Luxury premium watch'
    },

    {
        title: 'Running Shoes',
        price: 4599,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200',
        description: 'Comfortable sports shoes'
    },

    {
        title: 'Wireless Headphones',
        price: 7999,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200',
        description: 'Noise cancellation headphones'
    },

    {
        title: 'Gaming Laptop',
        price: 75999,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200',
        description: 'High performance gaming laptop'
    }

];

async function seedData() {

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log('Products Seeded Successfully');

    process.exit();
}

seedData();