
var path = require("path");

var Friends = require("../data/friends");
var totalDifference = [];
var differences = [];


// var Troy = new Friends.NewFriend("troy","testphoto", [1,2,3,5,4,6,5,2]);

// Friends.friends.push(Troy);

console.log(Friends.friends);

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
        differences = [];
        var newFriendData = req.body;
        newFriendData.scores = newFriendData.scores.map(x => Number(x));
        // console.log(newFriendData);
        // console.log(`frinds array ${Friends.friends[0].scores}`);
        if (Friends.friends.length === 0) {
            console.log(Math.abs(0));
            Friends.friends.push(new Friends.NewFriend(newFriendData.name,newFriendData.photo, newFriendData.scores));
            res.send("Data added");
        }else {  
        Friends.friends.forEach(function(element){
            totalDifference = [];
            for (var i = 0; i < newFriendData.scores.length; i++) {

                totalDifference.push(Math.abs(newFriendData.scores[i] - element.scores[i]))
            }

            // newFriendData.scores.forEach(function(element2){
            //     // console.log(`${element.name}:${element.scores[element2]}`);
            //     // console.log(`new friend scores${newFriendData.scores[element2]}`);
            //     // differences.push(Math.abs(newFriendData.scores[element2] - element.scores[element2]));

            //     console.log(element2)
            //     console.log(element.scores[element2]);
            //     // console.log( element2)
            //     // console.log(newFriendData.scores[0])
            //     differences.push(Math.abs(element2 - element.scores[element2]));
            //     console.log(Math.abs(element2 - element.scores[element2]));
            //     console.log(typeof(Math.abs(element2 - element.scores[element2])));

            //     // console.log(newFriendData.scores[element2] - element.scores[element2]);scores
            // })
            // console.log(`reduced${totalDifference.reduce((prev,curr) => prev + curr)}`);
            differences.push(totalDifference.reduce((prev,curr) => prev + curr));
        })
        console.log(Friends.friends);
        console.log(`differences baby - ${differences}`);
        // var getIndex = Math.min(...differences);
        console.log(differences.indexOf(Math.min(...differences)));
        
        var matchedFriend = Friends.friends[differences.indexOf(Math.min(...differences))]
        console.log(matchedFriend);

        //add friends to list
        Friends.friends.push(new Friends.NewFriend(newFriendData.name,newFriendData.photo,newFriendData.scores));
        res.send(matchedFriend);
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
