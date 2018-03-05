
var path = require("path");

var Friends = require("../data/friends");
var totalDifference = [];
var differences = [];

// console.log(Friends.friends);

// generate new friends 

Friends.friends.push(new Friends.NewFriend("Troy","http://taverninthesquare.com/content/2-locations/7-salem/1-half-price-burgers/half-price-burgers.jpg", [1,5,1,5,5,4,3,4,1,5]));
Friends.friends.push(new Friends.NewFriend("Alyssa","https://purewows3.imgix.net/images/articles/2016_12/kin_khao_san_francisco_union_square_restaurants.jpg?auto=format,compress&cs=strip", [2,3,1,5,2,5,3,1,3,2]));
Friends.friends.push(new Friends.NewFriend("Jane","http://nacocentral.com/wp-content/uploads/2017/12/New-Website-Photos-5-of-21-600x300.jpg", [5,2,3,1,4,5,1,1,3,1]));
Friends.friends.push(new Friends.NewFriend("Andy","http://dining.savannahnow.com/sites/dining.savannahnow.com/files/styles/flexslider_enhanced/public/field/photos/andaz_savannah-swine_and_fowl.jpg?itok=v2_k5RbM", [2,3,1,4,2,2,2,1,5,4]));
Friends.friends.push(new Friends.NewFriend("Heather","http://taverninthesquare.com/content/5-brunch/brunch-home.jpg", [2,1,2,4,1,1,2,5,5,5]));
Friends.friends.push(new Friends.NewFriend("John","https://www.yummyhealthyeasy.com/wp-content/uploads/2012/07/skinny-cheesy-pasta-bake-square.jpg", [4,4,2,3,5,5,5,2,1,1]));


module.exports = function(app) {
    //listen for get request to survey
    app.get("/api/friends", (req,res) => {
        console.log(' friends api hit');
        // res.sendFile(path.join(__dirname, "../public/survey.html"));
        res.send(Friends.friends);
    })
    //if not survey, send to home
    app.post('/api/friends', function(req,res){
        console.log('friednds post route');
        // console.log(req.body.scores.split(",").map(x => Number(x)));
        differences = [];
        var newFriendData = req.body;
        newFriendData.scores = newFriendData.scores.map(x => Number(x));
        console.log(`scores bra: ${typeof(newFriendData.scores[0])}`);

        if (Friends.friends.length === 0) {
            console.log(Math.abs(0));
            Friends.friends.push(new Friends.NewFriend(newFriendData.name,newFriendData.photo, newFriendData.scores));
            res.send("Data added");
        }else {  

        Friends.friends.forEach(function(element){
            totalDifference = [];
            for (var i = 0; i < newFriendData.scores.length; i++) {
                 // push the absolute value of each element into Totaldifference array   
                totalDifference.push(Math.abs(newFriendData.scores[i] - element.scores[i]))
            }
            //push the sum of the differences into the differences array
            differences.push(totalDifference.reduce((prev,curr) => prev + curr));
        })           
        // find the index of the minimum value in the difference array, and find the friend at that index to be matching friend.
        var matchedFriend = Friends.friends[differences.indexOf(Math.min(...differences))]
        var diffDisplay = Math.min(...differences);
        matchedFriend.diffDisplay = diffDisplay;

        console.log(`your match is ${matchedFriend.name}, you two only had ${Math.min(...differences)} differences!`);

        //add friends to list
        Friends.friends.push(new Friends.NewFriend(newFriendData.name,newFriendData.photo,newFriendData.scores));
        console.log(`matched name - - - - - ${matchedFriend}`);
        console.log(matchedFriend.scores);
        res.send(`${JSON.stringify(matchedFriend)}`);
    }
    });
};


//data compare 
// friends.forEach(function(element){
//     newFriendData.scores.forEach(function(element2){
//         console.log(newFriendData.scores[element2] - friends[element].scores[element2]);
//     })
// })

//compare current user to each friend

//find differences in each
//sum these differences
//once all friends are checked against, show the one with the leat differences
