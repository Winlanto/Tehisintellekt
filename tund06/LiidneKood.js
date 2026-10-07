const fs = require('fs');
// const path = require('path');
// const sisendFile = path.join(__dirname, 'sisend.txt');



// function getSisendFromFile(input) {
//     const data = fs.readFileSync(input, 'utf8');
//     const lines = data.split(/\r?\n/);
//     const result = lines.map(line => {
//         const parts = line.split(',');
//         return parts[0].trim();
//     });
//     return result;
// }


function KontrolliSisend(arv) {
    for (let i = 0; i < 100; i++) {
        if (arv !== 1) {
            arv = arv % 2 === 0 ? arv / 2 : arv * 3 - 1;
            // console.log('Arv on ' + arv);
        }
        else {
            // console.log('Arv on 1');
            return i + 1;
        }
    }
    return -1;
}

// console.log(KontrolliSisend(getSisendFromFile(sisendFile)));


// console.log('Sisesta arv:');

const data = fs.readFileSync(0, 'utf-8');
const sisend = parseInt(data.trim(), 10);
console.log(KontrolliSisend(sisend));