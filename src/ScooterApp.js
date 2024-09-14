// require the User and Scooter classes - see where they can be used in ScooterApp.js
const Scooter = require('./Scooter');
const User = require('./User');
class ScooterApp {
  // ScooterApp code here
  constructor(){
    this.stations = {
      "st1": [],
      "st2": [],
      "st3": []
    }
    this.registeredUsers = {};
  }
  registerUser(username, password, age){
    if(this.registeredUsers[username]){
      throw new Error('User already registered');
    }
    if(age < 18){
      throw new Error('Too young to register');
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log(`You have been registered as ${username}`);
    return user;
  }
  loginUser(username, password){
    const user = this.registeredUsers[username];
    if(!user){
      throw new Error('Username or password is incorrect');
    }
    user.login(password);
    console.log(`user ${username} has been logged in`);
  }
  logoutUser(username){
    const user = this.registeredUsers[username];
    if(!user){
      throw new Error('no such user is logged in');
    }
    user.logout();
    console.log(`user ${username} is logged out`);
  }
  createScooter(station){
    if(!this.stations[station]){
      throw new Error('no such station');
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log(`created new scooter, serial ${scooter.serial}`);
    return scooter;
  }
  dockScooter(scooter, station){
    if(!this.stations[station]){
      throw new Error('no such station');
    }
    if(this.stations[station].includes(scooter)){
      throw new Error('scooter already at station');
    }
    scooter.dock(station);
    this.stations[station].push(scooter);
  }
  rentScooter(scooter, user){
    const station = Object.keys(this.stations).find(station=>this.stations[station].includes(scooter));
    if(!station){
      throw new Error('scooter already rented');
    }
    const scooterIndex = this.stations[station].indexOf(scooter);
    this.stations[station].splice(scooterIndex, 1);
    scooter.rent(user);
    console.log('scooter is rented');
  }
  print(){
    for(const username in this.registeredUsers){
      console.log(`user: ${username}`);
    }
    for(const station in this.stations){
      console.log(`station ${station} has ${this.stations[station].length} scooters`);
    }
  
  }
}

module.exports = ScooterApp
