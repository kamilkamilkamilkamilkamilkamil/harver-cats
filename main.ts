const { writeFile } = require('fs');
const { join } = require('path');
const axios = require('axios');
const mergeImages = require('merge-images');
const { Canvas, Image: imageCanvas } = require('canvas');

const argv = require('minimist')(process.argv.slice(2));

// bad - preferred would be a set of defaults and maybe loop based on amount of args and overwrite.
// type safety
const {
  greeting = argv.a ?? 'Hello',
  who = argv.b ?? 'You',
  width = argv.c ?? 400,
  height = argv.d ?? 500,
  color = argv.e ?? 'Pink',
  size = argv.f ?? 100,
} = argv;

const URLs = [
  `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color${color}&s=${size}`,
  `https://cataas.com/cat/says/${who}?width=${width}&height=${height}&color${color}&s=${size}`,
];

const promises = URLs.map(async (url) => {
  const resp = await axios.get(url, { responseEncoding: 'binary' });
  if (!resp.data) throw new Error(`No response data present from url ${url}!`); // guard
  return resp.data;
});

Promise.all(promises).then((images) => {
  try {
    mergeImages(
      [
        {
          src: Buffer.from(images[0], 'binary'),
          x: 400,
          y: 400,
        },
        {
          src: Buffer.from(images[1], 'binary'),
          x: width,
          y: 400,
        },
      ],
      { Canvas, Image: imageCanvas, format: 'image/jpeg', height: 400, width: 400 },
    ).then((b64) => {
      console.log('merge success');
      const fileOut = join(process.cwd(), `/cat-card.jpg`);
      writeFile(fileOut, b64, 'binary', (err) => {
        if (err) {
          throw new Error(`Error during writefile, ${err}`);
        }
        console.log('The file was saved!');
      });
    });
  } catch (err) {
    // Handle Error Here fast-fail
    throw new Error(err);
  }
  return null;
});
