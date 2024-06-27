import { readdir } from 'fs';

readdir("./Images", (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(file => {
    console.log(file);
  });
});
