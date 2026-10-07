const prices = [0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

let otsitavSum = 0.99;

function findCombination(prices, otsitavSum) {
    const result = [];
    let remainingSum = Math.round(otsitavSum * 100);
    const centPrices = prices.map(price => price * 100);

    for (let i = 0; i < prices.length; i++) {
        while (remainingSum >= centPrices[i]) {
            result.push(centPrices[i]);
            remainingSum -= centPrices[i];
        }
    }
    return result.map(price => price / 100);
}

function leiaKogus(prices, otsitavSum, maxInt = Infinity) {
    let kogusCents;
    if (prices[0] < 1) {
        kogusCents = prices.map(price => Math.round(price * 100));
    } else {
        kogusCents = prices;
    }
    otsitavSum < 0 ? otsitavSum = Math.round(otsitavSum * 100) : otsitavSum = otsitavSum;
    if (otsitavSum < 0) {
        return maxInt;
    } if (otsitavSum === 0) {
        return 0;
    } else {
        let vastus = maxInt;
        for (let i = 0; i < kogusCents.length; i++) {
            if (kogusCents[i] > Math.round(otsitavSum * 100)) {
                continue;
            }
            const kogus = leiaKogus(kogusCents, otsitavSum - kogusCents[i], maxInt);
            if (kogus < maxInt) {
                vastus = Math.min(vastus, kogus + 1);
            }
        }
        return vastus;
    }
}



console.log(findCombination(prices, otsitavSum));

const kogus = leiaKogus(prices, otsitavSum);
console.log(`Vajalik kogus: ${kogus}`);