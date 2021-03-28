//Importing jimp module
var Jimp = require('jimp');
// Importing filesystem module
var fs = require('fs');
// Importing qrcode-reader module
var qrCode = require('qrcode-reader');
var http = require('http');
const rp = require('request-promise');
const cheerio = require('cheerio');

// Read the image and create a buffer
// (Here image.png is our QR code)
var buffer = fs.readFileSync(__dirname + '/image.jpg');

// Parse the image using Jimp.read() method
Jimp.read(buffer, function (err, image) {
  if (err) {
    console.error(err);
  }
  // Creating an instance of qrcode-reader module
  let qrcode = new qrCode();
  qrcode.callback = function (err, value) {
    if (err) {
      console.error(err);
    }
    // Printing the decrypted value
    console.log(value.result);
    parser(value.result);
  };
  // Decoding the QR code
  qrcode.decode(image.bitmap);
});

const parser = url => {
  rp(url)
    .then(function (html) {
      //success!
      const $ = cheerio.load(html);
      // console.log($('table.table', html));
      console.log($('table[class=table]').html());
      // console.log(html);
    })
    .catch(function (err) {
      //handle error
    });
};
