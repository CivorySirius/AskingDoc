const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/askingdoc2-camp', {
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '634f0a5dda8728b7b4f2a5ef',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'It mesmerizes the eyes to gaze at the beautiful creatures that hover all over the beach and on the deep-sea waters. There are sights of beautiful birds that fly all over the dry shore land and over the seawaters. ',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfji4wzve/image/upload/v1666283704/askingdoc2/photo-1553570739-330b8db8a925_qx1iyg.jpg',
                    filename: 'askingdoc2/photo-1553570739-330b8db8a925_qx1iyg'
                },
                {
                    url: 'https://res.cloudinary.com/dfji4wzve/image/upload/v1666137099/askingdoc2/photo-1548883151-3b92dbd284dc_ch7fhn.jpg',
                    filename: 'askingdoc2/photo-1548883151-3b92dbd284dc_ch7fhn'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})