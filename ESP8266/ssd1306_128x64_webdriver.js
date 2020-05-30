const ssd1306 = require('SSD1306');
const wifi = require('Wifi');
const mqtt = require('tinyMQTT');
const http = require('http');

const config = {
  wifi: {
    ssid: "Caffrey",
    password: "neal is a ci"
  },
  oledPins: {
    scl:NodeMCU.D1,
    sda:NodeMCU.D2
  },
  mqtt: {
    host: 'test.mosquitto.org',
    port: 1883,
    subTopic: "bd0a66104e/data"
  },
  imageEndPoint: "http://192.168.0.47:8000/bd0a66104e"
};

let mqttClient = null;
let g = null;

function createImage(imageString) {
  let buffer = null;
  try {
    buffer = E.toArrayBuffer(atob(imageString));
  }
  catch(e) {
    buffer = E.toArrayBuffer(atob(errorImage));
  }
  return {
  width : 128, height : 64, bpp : 1,
  transparent : 0,
  buffer: buffer
};

}
function draw(opt) {
  const image = opt.image;
  const data = opt.data;

  g.clear();
  if (image) {
    g.drawImage(createImage(data), 0,0);
  }
  else {
    g.setFont('4x6', 2);
    g.drawString(data, 0, 0);
  }
  g.flip();
}

function setupMQTTClient() {
  mqttClient = mqtt.create(config.mqtt.host, {port: config.mqtt.port});

  mqttClient.on("disconnected", ()=>{
    draw({data: "Disconnected from MQTT Broker"});
    mqttClient.connect();
  });

  mqttClient.on('connected', ()=> {
    draw({data: "Connected to\nMQTT broker"});
    mqttClient.subscribe(config.mqtt.subTopic);
    fetchImage();
  });

  mqttClient.on('message', (msg)=>{
    fetchImage();
  });

  mqttClient.connect();
}

function fetchImage() {
  http.get(config.imageEndPoint, (res) => {
      let content = "";
      res.on('data', (data)=>{
        content += data;
      });
      res.on('close', () => {
        draw({image: true, data: content});
      });
    });
}

function connectToWifi() {
  wifi.connect(config.wifi.ssid, {password: config.wifi.password}, (err) => {
    if (err) {
      draw({data: "Could not connect\nto Wi-Fi\n\nWill retry in\n 5 seconds"});
      setTimeout(connectToWifi, 5000);
    }
    else {
      draw({data: "Connected to\nWi-Fi"});
      setupMQTTClient();
    }
  });
}

function onInit() {
  I2C1.setup(config.oledPins);
  g = ssd1306.connect(I2C1, ()=>{}, {width: 128, height: 64});

  connectToWifi();
}
