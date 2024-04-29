// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
   word = word.toUpperCase();
   let letterPoints = "";

   for (let i = 0; i < word.length; i++) {

      for (const pointValue in oldPointStructure) {

         if (oldPointStructure[pointValue].includes(word[i])) {
            letterPoints += `Points for '${word[i]}': ${pointValue}\n`
         }
      }
   }
   return letterPoints;
}

function initialPrompt() {

   console.log("Let's play some scrabble!")
   let userWord = input.question("Please enter a word to score: ");
   return userWord;
}

function simpleScorer(word) {
   return word.length;
}

function vowelBonusScorer(word) {
   let point = 0
   let vowel = ['a', 'e', 'i', 'o', 'u']
   for (let i = 0; i < word.length; i++) {
      if (vowel.includes(word[i])) {
         point += 3
      } else {
         point += 1
      };
   }
   return point;
}

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];


function scorerPrompt() {
   console.log("Which scoring prompt would you like to use?")
   let userResponse = input.question("Select 0, 1, or 2.\n0 - Simple: one point per character. \n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses Scrabble point scorer\n");
   return scoringAlgorithms[Number(userResponse)];
}


function transform(oldPointStructure) {


   let newPointStructure = {}
   for (let pointValue in oldPointStructure) {

      for (let i = 0; i < oldPointStructure[pointValue].length; i++) {

         newPointStructure[oldPointStructure[pointValue][i].toLowerCase()] = Number(pointValue);
      }

   }
   return newPointStructure;
}


let newPointStructure = transform(oldPointStructure);


function scrabbleScorer(userWord) {

let pointValue = 0

for (let i =0; i < userWord.length; i++) {
   
   pointValue += newPointStructure[userWord[i]]
   
   }
   return pointValue; 
}


// scrabbleScorer is basically taking newPointStructure and accumulating points for each letter to provide
// overall score for the word rather than points for each letter...........so, use accumulator for word[i]

function runProgram() {

   let userWord = initialPrompt();
   let selectedAlgorithm = scorerPrompt();

   console.log(selectedAlgorithm.scorerFunction(userWord));
};

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
