const users = [];
const addUser = ( id, Name, Room ) => {
    // console.log("abababbabbabab")
    // console.log(id,Name,Room)
    const user = { id, Name, Room }
    users.push(user);
    return user ;
}
function getUser(id) { 
    // console.log(users,id)
 return users.find((user) => user.id === id);
}


// const getUsersInRoom = (Room) => users.filter((user) => user.Room === Room);
module.exports = { addUser, getUser }