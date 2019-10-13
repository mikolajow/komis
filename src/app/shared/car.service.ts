import {Car} from './car.model';

export class CarService {

  private carList: Car[] = [
    new Car('Ferrari', 'california 2', 2019, 0, 'benzyna', 999, 'czerwony',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Nemo%C5%A1ice_15.jpg/1920px-Nemo%C5%A1ice_15.jpg',
      9000000, 'super samochoddzik, polecam, niemiec płakał jak sprzedawał, tylko babuszka do kościołą co ' +
      'niedzielę jeździła...'),
    new Car('Audi', 'r8', 2000, 1000, 'benzyna', 500, 'niebieski',
      'https://upload.wikimedia.org/wikipedia/commons/4/40/Audi_R8_Eissilber.JPG',
      5000000, 'mana mana wdwdwd asauidshh tralalala'),

    new Car('Volwo', 'xc90', 2009, 999, 'ropa', 300, 'zielony',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/2004_Volvo_XC90_%28P28_MY04%29_2.5_T_wagon_%282011-11-18%29_01.jpg/1920px-2004_Volvo_XC90_%28P28_MY04%29_2.5_T_wagon_%282011-11-18%29_01.jpg',
      600000, 'ruski czołg co to jechał na berlin i nie dojechał...'),

    new Car('Lamborghini ', 'urus', 2005, 2414, 'gaz', 50, 'czarny',
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Urusfront.jpg',
      1402, 'idealny jak ktoś sie lubi ścigać rowerem'),
  ];

  getCarList() {
    return this.carList.slice();
  }

  getCar(carId: number) {
    return this.carList[carId];
  }
}
