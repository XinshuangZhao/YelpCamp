const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
// sample is a function, sample(array) returns a random value in this array Math.floor(Math.random() * 1000);
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = i;
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60dd1b57d610c1488074e19e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dkau5hicd/image/upload/v1625241718/YelpCamp/zejueezxbein4rwgmfuz.jpg',
                    filename: 'YelpCamp/zejueezxbein4rwgmfuz'
                },
                {
                    url: 'https://res.cloudinary.com/dkau5hicd/image/upload/v1625241719/YelpCamp/tzxoihgwrq9pl3qtq0m2.jpg',
                    filename: 'YelpCamp/tzxoihgwrq9pl3qtq0m2'
                }

            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus veniam facilis ipsa laudantium sit fuga. Facere earum, sunt voluptates vitae sit officiis, omnis harum necessitatibus atque fugiat error, quae praesentium.',
            price: price
        })
        await camp.save();
    }
    // for (let i = 0; i < 300; i++) {
    //     const random1000 = Math.floor(Math.random() * 1000);
    //     const price = Math.floor(Math.random() * 20) + 10;
    //     const camp = new Campground({
    //         //YOUR USER ID
    //         author: '5f5c330c2cd79d538f2c66d9',
    //         location: `${ cities[random1000].city }, ${ cities[random1000].state } `,
    //         title: `${ sample(descriptors) } ${ sample(places) } `,
    //         description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
    //         price,
    //         geometry: {
    //             type: "Point",
    //             coordinates: [
    //                 cities[random1000].longitude,
    //                 cities[random1000].latitude,
    //             ]
    //         },
    //         images: [
    //             {
    //                 url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
    //                 filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
    //             },
    //             {
    //                 url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
    //                 filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
    //             }
    //         ]
    //     })
    //     await camp.save();
    // }
}

seedDB().then(() => {
    mongoose.connection.close();
})