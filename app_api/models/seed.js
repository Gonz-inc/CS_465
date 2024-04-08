/*  Here the variables require (file directeres) 
    from the database file and travlr file. 
    this servers as a way to link the two. 
*/
const Mongoose = require('./db');
const Trip = require('./travlr');

// At this section we read the data from the json file
// located in the trips.json 
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

// delete any existing recorsursion and insert data.
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

seedDB().then(async() => {
    await Mongoose.connection.close();
    process.exit(0);
});

 