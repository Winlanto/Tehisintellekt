const fs = require('fs');
let M =null; // mangijate arv
let Q = null; // plaanide arv
let N = []; // mangijate vanused
let AP = []; // plaanid

function readFile(){
    try {
        const data = fs.readFileSync('sisend.txt', 'utf8');
        const lines = data.split(/\r?\n/);
        const [header, ages, ...plans] = lines;
        header.split(' ').forEach((value, index) => {
            if (index === 0) {
                M = parseInt(value);
            } if (index === 1) {
                Q = parseInt(value);
            }
        });
        N.push(...ages.split(' ').map(Number));
        AP.push(...plans.map(plan => plan.split(' ').map(Number)));
        return 1;
       
    } catch (error) {
        console.error('Error reading file:', error);
        return 0;
    }
}

function chooseOldest(){
    let planAges = [];
    for(plan of AP){
        let currentAges = N.slice(plan[0], plan[1]);
        planAges.push(currentAges);
    }
    return planAges;
}






readFile();
console.log(chooseOldest());