function NewFriend (name,photo,scores) {
    this.name = name,
    this.photo = photo,
    this.scores = scores;
}

// NewFriend.prototype.compare = function(newUser) {
//     for(var i = 0; i < 11; i++){ 
//         let difference = newUser.scores[i] - this.scores[i];
//         difference = difference+difference; 
//     }
// }

var friends = [];

// var Troy = new NewFriend("troy","testphoto", [1,2,3,5,4,6,5,2]);

// console.log(Troy);

module.exports = {
    NewFriend: NewFriend,
    friends: friends
};