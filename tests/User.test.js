const User = require('../src/User')

// User tests here
describe('User property tests', () => {
  // test username
  test('username should be a string', () => {
    const user = new User('Joe Bloggs', 'test123', 21);
    expect(typeof user.username).toBe('string');
  });
  // test password
  test('password should return correct value', () => {
    const user = new User('Joe Bloggs', 'test123', 21);
    expect(user.password).toBe('test123');
  });
  // test age
  test('age should return correct value', () => {
    const user = new User('Joe Bloggs', 'test123', 21);
    expect(user.age).toBe(21);
});

// test login with right pw
test('right pw sets loggedIn to true with right pw', () => {
  const user = new User('Joe Bloggs', 'test123', 21);
  user.login('test123');
  expect(user.loggedIn).toBe(true);
});
//test login with wrong pw
test('login method with wrong pw throws error', () => {
  const user = new User('Joe Bloggs', 'test123', 21);
  expect(()=>{user.login('test    123').toThrowError('Incorrect password')});
});
// test logout
test('logout method sets loggedIn to false', () => {
  const user = new User('Joe Bloggs', 'test123', 21);
  user.login('test123');
  user.logout();
  expect(user.loggedIn).toBe(false);
});
});
