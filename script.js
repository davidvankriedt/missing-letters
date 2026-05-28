
/*
ERRORS TO FIX:

    [] -  

*/


const WORD_SIZE = 5;
const NUM_MISSING_LETTERS = 2;
const wordContainer = document.getElementById('word-container');
const gameContainer = document.getElementById('game-container');

const words = ['words', 'roads', 'frogs', 'totem', 'space', 'socks'];
let word = Array.from(words[Math.floor(Math.random() * 4)]);
let correct_letters = 0;


const initGame = () => {
    localStorage.setItem('score', 0);
    
    setNewWord();

    // listen for letter input
    document.querySelectorAll('input').forEach((letter) => {
        letter.addEventListener('input', (e) => {
            const index = letter.id.match(/\d+/);
            if (e.data == word[index]) {
                correct_letters++;
            } else {
                if (correct_letters > 0) {
                    correct_letters--;
                }
            }
    
            if (correct_letters >= NUM_MISSING_LETTERS) {
                endRound();
            }
        });
    });
}

const setNewWord = () => {
    wordContainer.replaceChildren();

    let newWord = word;

    while (newWord === word) {
        newWord =  Array.from(words[Math.floor(Math.random() * 4)]);
    }

    word = newWord;

    const modified = { ...word };



    // 2 missing letters
    for (let i = 0; i < NUM_MISSING_LETTERS; i++) {
        modified[Math.floor(Math.random() * 4)] = '';
    }

    for (let i = 0; i < WORD_SIZE; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.id = `box-${i}`;

        wordContainer.appendChild(box);
        
        if (modified[i] === '') {
            const input = document.createElement('input');
            input.className = 'missing-letter';
            input.id = `missing-letter-${i}`;
            box.appendChild(input);
        } else {
            box.innerText = word[i];
        }
    }
}


const endRound = () => {
    gameContainer.style.display = 'none';

    localStorage.setItem('score', parseInt(localStorage.getItem('score')) + 1);

    document.getElementById('end-round-screen').style.display = 'block';
};

const endGame = () => {
    document.getElementById('end-round-screen').style.display = 'none';
    document.getElementById('final-score').innerText = `Final Score: ${localStorage.getItem('score')}`;
    document.getElementById('end-game-screen').style.display = 'flex';
}

// next round button listener
document.getElementById('next-round-button').addEventListener('click', () => {
    document.getElementById('end-round-screen').style.display = 'none';

    setNewWord();

    gameContainer.style.display = 'block';
});


// end game button listener
document.getElementById('end-game-button').addEventListener('click', endGame);


// new game button listener
document.getElementById('new-game-button').addEventListener('click', () => {
    document.getElementById('end-game-screen').style.display = 'none';
    gameContainer.style.display = 'block';
    wordContainer.replaceChildren();

    initGame();
});

document.getElementById('start-game-button').addEventListener('click', () => {
    document.getElementById('start-game-screen').style.display = 'none';
    gameContainer.style.display = 'block';
});

initGame();