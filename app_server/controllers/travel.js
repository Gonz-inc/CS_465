var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));

/* GET Homepage */
const travel = (req, res) => {
    console.log("at app_server controllers travel index function")
    res.render('travel', {title: "Travlr Getaways", trips});
};
module.exports = {
    travel
};