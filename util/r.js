
const fs = require('fs');
const path = require('path');
const newList = [];
fs.readFile(path.join(__dirname, './apijson'), 'utf8', function (err, data) {
    if (err) throw err;
    let list = JSON.parse(data);

    for (let i = 0; i < list.length; i++) {
        let result = {};
        let value = list[i].properties;
        result.ID = i + 1;
        result.TYPE = value.FLAG_A;
        result.X = value.X;
        result.Y = value.Y;
        newList.push(result);
    }
 
    // let newContent = JSON.stringify(newList, null, 4);
    // fs.writeFile('result.json', newContent, 'utf8', (err) => {
    //     if (err) throw err;
    //     console.log('success done');
    // });
})