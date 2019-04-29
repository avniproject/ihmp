const json = require('/tmp/out.json');

Object.keys(json).forEach((key) => {
    console.log(key,'\n\n', json[key], '\n\n');
});