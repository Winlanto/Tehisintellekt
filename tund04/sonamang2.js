let words = ["kala", "aabits", "Salk", "kaiser", "rula"];


function checkWords(aWords, uWords = [], matches = []) {
    if(aWords.length === 0) {
        console.log("No available words to check.");
        matches.push([...uWords]);
        return matches;
    }
    let usedWords = Array.from(uWords);
    for (let i = 0; i < aWords.length; i++) {
        let currentWord = aWords[i];
        let cFirstChar = currentWord.charAt(0).toLowerCase();
        let lastWord = usedWords.length > 0 ? usedWords[usedWords.length - 1] : null;
        if (lastWord) {
            let lLastChar = lastWord.charAt(lastWord.length - 1).toLowerCase();
            if (lLastChar !== cFirstChar) {
                continue;
            }
        }
        usedWords.push(currentWord);
        if(usedWords.length > 1) {
            matches.push([...usedWords]);
        }
        let remainingWords = aWords.filter((word) => word !== currentWord);
        checkWords(remainingWords, usedWords, matches);
        usedWords.pop();
    }
    
    return matches;
}

console.log("Available word chains:", checkWords(words));