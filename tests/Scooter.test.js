const Scooter = require('../src/Scooter')
const User = require('../src/User');
// typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter()
    expect(scooter).toBeInstanceOf(Scooter)
  })
})

// Method tests
describe('scooter methods', () => {
  // tests here!
  
  // rent method
  it('rent throws error when scooter needs repair',()=>{
  const scooter = new Scooter('st1');
  const user = new User('BobJames56', '43671abc', 39);
  scooter.isBroken = true;
  expect(()=>{scooter.rent(user)}).toThrowError('scooter needs repair.');
  });
  it('rent throws error when scooter needs to be charged',()=>{
    const scooter = new Scooter('st2');
    scooter.charge = 13;
    const user = new User('BobJames56', '43671abc', 39);
    expect(()=>{scooter.rent(user)}).toThrowError('scooter needs to charge.');
  });
  it('rents to user and removes from station',()=>{
    const scooter = new Scooter('st2');
    scooter.isBroken = false;
    const user = new User('BobJames56', '43671abc', 39);
    scooter.rent(user);
    expect(scooter.user).toBe(user);
    expect(scooter.station).toBe(null);
  });

  // dock method
  it('returns scooter to station and clears user',()=>{
    const scooter = new Scooter('st2');
    const user = new User('BobJames56', '43671abc', 39);
    scooter.rent(user);
    scooter.dock('st3');
    expect(scooter.station).toBe('st3');
    expect(scooter.user).toBe(null);
  });
  // requestRepair method
  test("requestRepair", async () => {
    const scooter = new Scooter();
    scooter.isBroken = true;
    await scooter.requestRepair(); // we need to wait for the repair!
    expect(scooter.isBroken).toBe(false);
  });
  // charge method
  test("charge", async () => {
    const scooter = new Scooter('st3');
    scooter.charge = 80;
    await scooter.recharge(); // we need to wait for the charge!
    expect(scooter.charge).toBe(100);
  });
});
