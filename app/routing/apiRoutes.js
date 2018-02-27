
var path = require("path");

var Friends = require("../data/friends");
var totalDifference = [];
var differences = [];

// console.log(Friends.friends);

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
        var newFriendDataScores = [];
        newFriendDataScores.push(Number(newFriendData.q1));
        newFriendDataScores.push(Number(newFriendData.q2));
        newFriendDataScores.push(Number(newFriendData.q3));
        newFriendDataScores.push(Number(newFriendData.q4));
        newFriendDataScores.push(Number(newFriendData.q5));
        newFriendDataScores.push(Number(newFriendData.q6));
        newFriendDataScores.push(Number(newFriendData.q7));
        newFriendDataScores.push(Number(newFriendData.q8));
        newFriendDataScores.push(Number(newFriendData.q9));
        newFriendDataScores.push(Number(newFriendData.q10));
        console.log(`new firdac scores dawg ${newFriendDataScores}`);
    
        // var newFriendDataScores = newFriendData.scores.map(x => Number(x));
        // console.log(newFriendData.scores);
        // console.log(`frinds array ${Friends.friends[0].scores}`);
        if (Friends.friends.length === 0) {
            console.log(Math.abs(0));
            Friends.friends.push(new Friends.NewFriend(newFriendData.name,newFriendData.photo, newFriendDataScores));
            res.send("Data added");
        }else {  

        Friends.friends.forEach(function(element){
            totalDifference = [];
            for (var i = 0; i < newFriendDataScores.length; i++) {
                 // push the absolute value of each element into Totaldifference array   
                totalDifference.push(Math.abs(newFriendDataScores[i] - element.scores[i]))
            }
            //push the sum of the differences into the differences array
            differences.push(totalDifference.reduce((prev,curr) => prev + curr));
        })           
        // find the index of the minimum value in the difference array, and find the friend at that index to be matching friend.
        var matchedFriend = Friends.friends[differences.indexOf(Math.min(...differences))]
        console.log(`your match is ${matchedFriend.name}, you two only had ${Math.min(...differences)} differences!`);


        //add friends to list
        Friends.friends.push(new Friends.NewFriend(newFriendData.name,newFriendData.photo,newFriendDataScores));
        res.send(`your match is ${matchedFriend}`);
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
