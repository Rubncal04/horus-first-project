import devices from './devices.js'

devices.fetchData().then(() => {
  console.log(devices.countLightSensor() + " registros provienen de dispositivos de tipo sensor-de-luz");
  console.log(devices.countProjectIdThree() + " dispositivos corresponden al proyecto con ID 3");
  console.log("El dispositivo más usado es: " + devices.mostUsedDevice().name);
})
