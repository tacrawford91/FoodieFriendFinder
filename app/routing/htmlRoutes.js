
var path = require("path");


// var app = express();

module.exports = function(app) {
    //listen for get request to survey
    app.get("/survey", (req,res) => {
        console.log(' i hear the request2');
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    })
    //if not survey, send to home
    app.get('/*', function(req,res){
        console.log(' i hear the request1');
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};
