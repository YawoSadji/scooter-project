class Scooter {
  // scooter code here
  static nextSerial = 1;
  constructor(station){
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }
  rent(user){
    if(this.charge > 20 && !this.isBroken){
      this.station = null;
      this.user = user;
    }
      else if(this.isBroken){
        throw new Error('scooter needs repair.');
      }
      else if(this.charge < 20){
        throw new Error('scooter needs to charge.');
      }
    }
    dock(station){
      if(this.user !== null){
      this.station = station;
      this.user = null;
    }
    }
    async recharge() {
        console.log('Starting charge');
        while(this.charge < 100){
        await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
        this.charge += 10; 
        if(this.charge > 100){
            this.charge = 100;
        }
          console.log(`Charging...${this.charge}%`);
        } 
          console.log('Charge complete');
    }
    async requestRepair(){
      console.log('Request repair');
      await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds
      this.isBroken = false;
      console.log('repair completed');
    }

  }

module.exports = Scooter
