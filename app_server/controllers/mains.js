/* GET Homepage */
const index = (req, res) => {
    console.log("at app_server controllers main index function")
    res.render('index', {title: "Travlr Getaways"});
};
module.exports = {
    index
};