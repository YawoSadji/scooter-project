const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const Scooter = require('../src/Scooter');

// ScooterApp tests here

// register user
describe('registerUser method tests', () => {
  const scooterApp = new ScooterApp();
  test('Should return instance of User', () => {
    const response = scooterApp.registerUser('Joe Bloggs', 'test123', 21)
    expect(response).toBeInstanceOf(User)
  })
})
test('registerUser adds user', () => {
  const scapp = new ScooterApp();
  const user = scapp.registerUser('BenJames', 'pw567', 35);
  expect (user.username).toBe('BenJames');
  expect(scapp.registeredUsers['BenJames']).toBe(user);
});
test('registerUser throws error when age < 18', () => {
  const scapp = new ScooterApp();
  expect(()=>{scapp.registerUser('BenJames', 'pw567', 13)}).toThrow('Too young to register');
});
test('registerUser throws error when user is already registered',()=>{
  const scapp = new ScooterApp();
  scapp.registerUser('BenJames', 'pw567', 44);
  expect(()=>{scapp.registerUser('BenJames', 'pw123', 29)}).toThrow('User already registered');
});
// log in
test('loginUser logs in user',()=>{
  const scapp =  new ScooterApp();
  scapp.registerUser('BenJames', 'pw567', 44);
  scapp.loginUser('BenJames', 'pw567');
  expect(scapp.registeredUsers['BenJames'].loggedIn).toBe(true);
});
test('loginUser throws error when username or pw is incorrect',()=>{
  const scapp =  new ScooterApp();
  scapp.registerUser('BenJames', 'pw567', 44);
  expect(()=>{scapp.loginUser('BenJames', 'pw500')}).toThrow('Username or password is incorrect');
  expect(()=>{scapp.loginUser('Bennnn James', 'pw567')}).toThrow('Username or password is incorrect');
});
test('loginUser throws error when username does not exist',()=>{
  const scapp =  new ScooterApp();
  expect(()=>{scapp.loginUser('Buju12', 'pw500')}).toThrow('Username or password is incorrect');
});
// log out
test('logout throws error when username does not exist',()=>{
  const scapp =  new ScooterApp();
  expect(()=>{scapp.logoutUser('Bambino12')}).toThrow('no such user is logged in');
});
test('logout logs out user',()=>{
  const scapp =  new ScooterApp();
  scapp.registerUser('Neymar843', 'pw12345', 19);
  scapp.loginUser('Neymar843', 'pw12345');
  scapp.logoutUser('Neymar843');
  expect(scapp.registeredUsers['Neymar843'].loggedIn).toBe(false);
});
// create scooter
test('createScooter throws error when station does not exist',()=>{
  const scapp = new ScooterApp();
  expect(()=>{scapp.createScooter('st5')}).toThrow('no such station');
});
test('createScooter adds new scooter to station',()=>{
  const scapp = new ScooterApp();
  const scooter = scapp.createScooter('st1');
  expect(scapp.stations['st1']).toContain(scooter);
});
// dock scooter
test('dockScooter throws error when station does not exist',()=>{
  const scapp = new ScooterApp();
  const scooter = new Scooter('st1');
  expect(()=>{scapp.dockScooter(scooter, 'stq')}).toThrow('no such station');
});
test('dockScooter throws error when scooter already exists at station',()=>{
  const scapp = new ScooterApp();
  const scooter = new Scooter('st1');
  scapp.dockScooter(scooter, 'st1');
  expect(()=>{scapp.dockScooter(scooter, 'st1')}).toThrow('scooter already at station');
});
test('dockScooter docks scooter',()=>{
  const scapp = new ScooterApp();
  const scooter = new Scooter('st1');
  scapp.dockScooter(scooter, 'st1');
  expect(scapp.stations['st1']).toContain(scooter);
});
// rent scooter
test('rentScooter rents to user',()=>{
  const scapp = new ScooterApp();
  const scooter = scapp.createScooter('st1');
  const user = scapp.registerUser('BenJames12', '1234', 21);
  
  scapp.rentScooter(scooter, user);
  
  expect(scooter.user).toBe(user);
  expect(scapp.stations['st1']).not.toContain(scooter);
});
test('rentScooter throws error when scooter is already rented',()=>{
  const scapp = new ScooterApp();
  const scooter = scapp.createScooter('st1');
  const user = scapp.registerUser('BenJames12', '1234', 21);
  scapp.rentScooter(scooter, user);

  expect(()=>{scapp.rentScooter(scooter, user)}).toThrow('scooter already rented');
 
});
