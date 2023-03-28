import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./data.json").data;

//Function that returns an int value of the quantity of light sensor type
function countLightSensor() {
  let lightSensor = []
  for (let i in data) {
    if (data[i].type === "sensor-de-luz") {
      lightSensor.push(data[i])
    }
  }
  return lightSensor.length
}

//Function that returns an int value of the quantity of project id 3
function countProjectIdThree() {
  let projectIdThree = []
  for (let i in data) {
    if (data[i].idProyect === 3) {
      projectIdThree.push(data[i])
    }
  }
  return projectIdThree.length
}

//Function to get the most used device
function theMostUsedDevice() {
  let devices = devicesEnabled();
  let mostUsedDevice = devices[0];

  for (let i in devices) {
    if (mostUsedDevice.quantity < devices[i].quantity) {
      mostUsedDevice = devices[i]
    }
  }

  return mostUsedDevice.name
}

//Function to get all devices that are enabled
function devicesEnabled() {
  let devices = []
  let lightSensor = {};
  let energySensor = {};
  let carbonSensor = {};
  let tempSensor = {};
  let airQualitySensor = {};
  let light = 0
  let carbon = 0
  let energy = 0
  let temp = 0
  let airQuality = 0
  
  for (let i in data) {
    if (data[i].estate === "enabled") {

      switch (data[i].type) {
        case "sensor-de-luz":
          light += 1
          lightSensor = {
            name: "sensor-de-luz",
            quantity: light
          };
        case "sensor-de-energia":
          energy += 1;
          energySensor = {
            name: "sensor-de-energia",
            quantity: energy
          };
        case "sensor-de-carbono":
          carbon += 1
          carbonSensor = {
            name: "sensor-de-carbono",
            quantity: carbon
          };
        case "sensor-de-temperatura":
          temp += 1;
          tempSensor = {
            name: "sensor-de-temperatura",
            quantity: temp
          };
        default:
          airQuality += 1;
          airQualitySensor = {
            name: "sensor-calidad-aire",
            quantity: airQuality
          };
      }
    }
  }

  devices.push(lightSensor, energySensor, carbonSensor, airQualitySensor, tempSensor)

  return devices
}

export default {
  countLightSensor, countProjectIdThree, theMostUsedDevice
}
