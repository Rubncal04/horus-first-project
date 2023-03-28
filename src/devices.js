import Sensor from './sensor.js'
import * as constants from "./constants.js";

//I decided to mock a real life API that serves the JSON data
let api_url = "https://mocki.io/v1/65d9cd7b-379a-44b7-97cc-e8d5b60e1ac5"
let data;

const fetchData = () => {
  return new Promise((resolve, reject) => {
    fetch(api_url)
      .then((response) => response.json())
      .then((jsonData) => {
        data = jsonData.data;
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//Function that returns an int value of the quantity of light sensor type
function countLightSensor() {
  return data.filter(item => item.type === constants.SENSOR_DE_LUZ).length;
}

//Function that returns an int value of the quantity of project id 3
function countProjectIdThree() {
  return data.filter(item => item.idProyect === 3).length;
}

//Function to get the most used device
function mostUsedDevice() {
  let devices = devicesEnabled();
  let mostUsedDevice = devices[0];

  for (let device of devices) {
    if (mostUsedDevice.quantity < device.quantity) {
      mostUsedDevice = device
    }
  }

  return mostUsedDevice
}

function devicesEnabled() {
  let lightSensor = new Sensor(constants.SENSOR_DE_LUZ)
  let energySensor = new Sensor(constants.SENSOR_DE_ENERGIA)
  let carbonSensor = new Sensor(constants.SENSOR_DE_CARBONO)
  let tempSensor = new Sensor(constants.SENSOR_DE_TEMPERATURA)
  let airQualitySensor = new Sensor(constants.SENSOR_DE_CALIDAD_DE_AIRE)
  let devices = []

  for (let item of data) {
    // Not sure if disabled devices should be considered as "used",
    // therefore, I'm considering enabled devices only.
    if (item.estate === "enabled"){
      eval(`${constants.sensorsMap[item.type]}`).increaseQuantity();
    }
  }
  devices.push(lightSensor, energySensor, carbonSensor, airQualitySensor, tempSensor)

  return devices
}

export default {
  countLightSensor, countProjectIdThree, mostUsedDevice, fetchData
}
