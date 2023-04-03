let cardsArray = [
    {
        'id': '1',
        'name': 'iron',
        'img': './img/iron.jpg',
    },
    {
        'id': '2',
        'name': 'cap',
        'img': './img/cap.jpg',
    },
    {
        'id': '3',
        'name': 'spider',
        'img': './img/spider.jpg',
    },
    {
        'id': '4',
        'name': 'avenger',
        'img': './img/avengers.jpg',
    },
    {
        'id': '5',
        'name': 'panther',
        'img': './img/panther.jpg',
    },
    {
        'id': '6',
        'name': 'spiderman',
        'img': './img/spiderman.jpg',
    },
    {
        'id': '7',
        'name': 'bat',
        'img': './img/bat.jpg',
    },
    {
        'id': '8',
        'name': 'super',
        'img': './img/super.jpg',
    }
];
const len = cardsArray.length;
for (let i = 0; i < len; i++) {
    let obj = {
        'id': `${i + 9}`,
        'name': `${cardsArray[i].name}`,
        'img': `${cardsArray[i].img}`
    }
    cardsArray.push(obj);
}
let shuffledChild = Array.from(cardsArray).sort(() => 0.5 - Math.random());

const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('button'),
    win: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}


const startGame = () => {
    state.gameStarted = true
    selectors.start.classList.add('disabled')

    state.loop = setInterval(() => {
        state.totalTime++

        selectors.moves.innerText = `${state.totalFlips} moves`
        selectors.timer.innerText = `Time: ${state.totalTime} sec`
    }, 300)
}

const flipCard = card => {
    state.flippedCards++
    state.totalFlips++

    if (!state.gameStarted) {
        startGame()
    }
}


let clickCount = 0;
let firstCard = "";
let firstCard_id = "";
let secondCard = "";

const card_matches = () => {
    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach((curElem) => {
        curElem.classList.add('card_match');
    })
}

const resetValues = () => {
    firstCard = "";
    secondCard = "";
    clickCount = 0;

    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach((curElem) => {
        curElem.classList.remove('card_selected')
    })

}

const parentDiv = document.querySelector('#card-section');

parentDiv.addEventListener('click', (event) => {
    let curCard = event.target;

    if (curCard.id === "card-section")
        return false;

    clickCount++;

    if (clickCount < 3) {

        if (clickCount === 1) {
            firstCard = curCard.parentNode.dataset.name;
            firstCard_id = curCard.parentNode.dataset.id;
            curCard.parentNode.classList.add('card_selected');
        }
        else {
            if (curCard.parentNode.dataset.id == firstCard_id) {
                clickCount--;
                return false;
            }
            secondCard = curCard.parentNode.dataset.name;
            curCard.parentNode.classList.add('card_selected');
        }

        if (firstCard !== "" && secondCard !== "") {
            console.log(firstCard);
            console.log(secondCard);
            if (firstCard === secondCard) {
                setTimeout(() => {
                    card_matches();
                    firstCard = "";
                    secondCard = "";
                    clickCount = 0;
                }, 500)

            } else {
                setTimeout(() => {
                    resetValues();
                }, 500)
            }
        }
    }
})

for (let i = 0; i < shuffledChild.length; i++) {
    const childDiv = document.createElement('div');
    // childDiv.style.backgroundImage = `url(${shuffledChild[i].img})`;

    childDiv.classList.add('card');
    childDiv.dataset.id = shuffledChild[i].id;
    childDiv.dataset.name = shuffledChild[i].name;

    const front_div = document.createElement('div');
    front_div.classList.add('front-card')

    const back_div = document.createElement('div');
    back_div.classList.add('back-card')

    back_div.style.backgroundImage = `url(${shuffledChild[i].img})`;

    parentDiv.appendChild(childDiv)

    childDiv.appendChild(front_div)
    childDiv.appendChild(back_div)
}
const attachEventListeners = () => {
    document.addEventListener('click', event => {
        const eventTarget = event.target
        const eventParent = eventTarget.parentElement

        if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
            flipCard(eventParent)
        } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
            startGame()
        }
    })
}
attachEventListeners();
