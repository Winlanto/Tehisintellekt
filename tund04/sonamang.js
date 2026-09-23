// 1.k s / 

let words = ["kala", "aabits", "Salk", "kaiser", "rula"];

function compareWords() {
    let matches = [];
    let jada = [];
    for (let i = 0; i < words.length; i++) {
        let currentWord = words[i]; 
        let firstChar = currentWord.charAt(0).toLowerCase();
        let lastChar = currentWord.charAt(currentWord.length - 1).toLowerCase(); 
        if (!jada[i]) {
            jada[i] = [words[i]];
        }
        for (let j = 0; j < words.length; j++) {
            if (i !== j) {
                let nextWord = words[j];
                let nextFirstChar = nextWord.charAt(0).toLowerCase();
                let nextLastChar = nextWord.charAt(nextWord.length - 1).toLowerCase();
                if (firstChar === nextLastChar) {
                    matches.push({ current: currentWord, next: nextWord });
                    if(!jada[i].includes(nextWord)) {
                        jada[i].push(nextWord);
                    }
                }else if (nextFirstChar === lastChar) {
                    matches.push({ current: nextWord, next: currentWord });
                    jada[i].push(currentWord);
                }
            }
        }
    }
    console.log("Matches found:", matches);
    console.log("Jada found:", jada);
    return { matches, jada };
}



console.log("Comparing words for matching first and last characters:");
compareWords();