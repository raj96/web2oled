const jimp = require("jimp");

const target = {
  width: 128,
  height: 64,
};

const binaryArray = [128, 64, 32, 16, 8, 4, 2, 1];

const Img2B64 = (bufferData, callback) => {
  jimp
    .read(bufferData)
    .then((img) => {
      let localImg = img;
      if (localImg.bitmap.width < localImg.bitmap.height) {
        localImg = localImg.rotate(90);
      }
      if (
        localImg.bitmap.width != target.width ||
        localImg.bitmap.height != target.height
      ) {
        localImg = localImg.resize(target.width, target.height);
      }
      localImg.grayscale();
      let pixelData = [...localImg.bitmap.data];
      //   console.log(pixelData);

      let binaryCounter = 0;
      let dataArray = [];
      let data = 0;

      for (let i = 0; i < pixelData.length; i += 4) {
        if (pixelData[i] > 150) data += binaryArray[binaryCounter];
        if (binaryCounter == 7) {
          dataArray.push(data);
          binaryCounter = -1;
          data = 0;
        }
        binaryCounter += 1;
      }
      //   console.log(JSON.stringify(dataArray));
      //   console.log(dataArray.length);
      const b64Img = Buffer.from(dataArray, "binary").toString("base64");
      callback({
        error: false,
        data: b64Img,
      });
    })
    .catch((err) => {
      callback({ error: true, data: err });
    });
};

module.exports = Img2B64;
