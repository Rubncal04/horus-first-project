export default class Sensor {
  constructor(name, quantity = 0) {
    this.name = name
    this.quantity = quantity
  }

  increaseQuantity(quantity = 1){
    this.quantity += quantity
  }
}
