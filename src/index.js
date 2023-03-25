import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("./data.json").data;

//Function that returns an int value of the quantity of light sensor type
function count_light_sensor() {
  let light_sensor = []
  for (let i in data) {
    if (data[i].type === "sensor-de-luz") {
      light_sensor.push(data[i])
    }
  }
  return light_sensor.length
}

//Function that returns an int value of the quantity of project id 3
function count_project_id_three() {
  let project_id_three = []
  for (let i in data) {
    if (data[i].idProyect === 3) {
      project_id_three.push(data[i])
    }
  }
  return project_id_three.length
}

//Function to get the device more used
function device_more_used() {
  let devices = devices_enabled();
  let device_more_used = devices[0];

  for (let i in devices) {
    if (device_more_used.quantity < devices[i].quantity) {
      device_more_used = devices[i]
    }
  }

  return device_more_used.name
}

//Function to get all devices those are enabled
function devices_enabled() {
  let devices = []
  let light_sensor = {};
  let energy_sensor = {};
  let carbon_sensor = {};
  let temp_sensor = {};
  let air_quality_sensor = {};
  let light = 0
  let carbon = 0
  let energy = 0
  let temp = 0
  let air_quality = 0
  
  for (let i in data) {
    if (data[i].estate === "enabled") {

      switch (data[i].type) {
        case "sensor-de-luz":
          light += 1
          light_sensor = {
            name: "sensor-de-luz",
            quantity: light
          };
        case "sensor-de-energia":
          energy += 1;
          energy_sensor = {
            name: "sensor-de-energia",
            quantity: energy
          };
        case "sensor-de-carbono":
          carbon += 1
          carbon_sensor = {
            name: "sensor-de-carbono",
            quantity: carbon
          };
        case "sensor-de-temperatura":
          temp += 1;
          temp_sensor = {
            name: "sensor-de-temperatura",
            quantity: temp
          };
        default:
          air_quality += 1;
          air_quality_sensor = {
            name: "sensor-calidad-aire",
            quantity: air_quality
          };
      }
    }
  }

  devices.push(light_sensor, energy_sensor, carbon_sensor, air_quality_sensor, temp_sensor)

  return devices
}
