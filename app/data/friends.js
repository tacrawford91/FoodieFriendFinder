function NewFriend (name,photo,scores) {
    this.name = name,
    this.photo = photo,
    this.scores = scores;
}


var friends = [];

// var Troy = new NewFriend("troy","testphoto", [1,2,3,5,4,6,5,2]);

// console.log(Troy);

module.exports = {
    NewFriend: NewFriend,
    friends: friends
};