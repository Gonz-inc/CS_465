/* GET Homepage */
const travel = (req, res) => {
    console.log("at app_server controllers travel index function")
    res.render('travel', {title: "Travlr Getaways"});
};
module.exports = {
    travel
};