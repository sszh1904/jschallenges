// Challenge 1
function ageInDays() {
    var birthYear = prompt('What year were you born in?');
    var days = (2020-birthYear) * 365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + days + ' days old');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
    
}
// ----------------------------------------------------------------------------

//Challenge 2
function generateCat() {
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image);
}
// ----------------------------------------------------------------------------

//Challenge 3
function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    result = decideWinner(humanChoice, botChoice);
    message = finalMessage(result);
    rpgFrontEnd(yourChoice.id, botChoice, message);
}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDataBase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'paper': 1, 'scissors': 0.5, 'rock': 0}
    };
    
    var yourScore = rpsDataBase[yourChoice][computerChoice];
    var computerScore = rpsDataBase[computerChoice][yourChoice];
    
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if (yourScore === 1){
        return {'message': "You won!", 'colour': 'green'};
    } else if (yourScore === 0.5) {
        return {'message': "You tied!", 'colour': 'yellow'};
    } else {
        return {'message': "You lost!", 'colour': 'red'};
    }
}

function rpgFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    
    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)' >";    
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['colour'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'];    
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 38, 233, 1)' >";
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}

// ----------------------------------------------------------------------------

//Challenge 4
function buttonColourChange(colour){
    if (colour.value === 'red') {
        buttonsRed();
    } else if (colour.value === 'green') {
        buttonsGreen();
    } else if (colour.value === 'blue') {
        buttonsBlue();
    } else if (colour.value === 'reset') {
        buttonColorReset();
    } else if (colour.value === 'random') {
        randomColours();
    }
}
    
var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons)

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonsRed(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsBlue(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-primary');
    }
}

function buttonColorReset(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColours(){
    let choices = ['btn-primary', 'btn-danger', 'btn-warning', 'btn-success']
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random() * 4)]);
    }
}

// ----------------------------------------------------------------------------

//Challenge 5
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'J':10, 'Q':10, 'K':10, 'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#stand-button').addEventListener('click', dealerLogic);

// hit button
function blackjackHit(){
    if (blackjackGame['isStand'] === false){
        let card = randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if (activePlayer['score'] <= 21){
        let cardImage = document.createElement('img');
        cardImage.src = 'static/images/'+card+'.png';
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

// timesleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// stand button
async function dealerLogic(){
    if (blackjackGame['turnsOver'] === false){
        
        blackjackGame['isStand'] = true;
        
        while (DEALER['score'] < 16 && blackjackGame['isStand'] === true){
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            await sleep(1000);
        }
        
            
        blackjackGame['turnsOver'] = true;
            
        let winner = computeWinner();
        showResult(winner);
    
    }
}

// deal button
function blackjackDeal(){
    if (blackjackGame['turnsOver'] === true){
        
        blackjackGame['isStand'] = false;
        
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (i=0;i < yourImages.length;i++){
            yourImages[i].remove();
        }
        for (i=0;i < dealerImages.length;i++){
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
    
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = "Let's Play!";
        document.querySelector('#blackjack-result').style.color = "black";
        
        blackjackGame['turnsOver'] = false;
    }
}

function updateScore(card, activePlayer){
    if (card == 'A'){
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += 11
        }
        else{
            activePlayer['score'] += 1
        }
    }
    else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}


function computeWinner(){
    let winner;
    if (YOU['score'] <= 21){
        if (DEALER['score'] < YOU['score'] || (DEALER['score'] > 21)){
            winner = YOU;
            blackjackGame['wins'] += 1
        } else if (YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackjackGame['losses'] += 1
        } else{
            blackjackGame['draws'] += 1
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
        blackjackGame['losses'] += 1
    } else if (YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws'] += 1
    }
    return winner;
}

function showResult(winner){
    if (blackjackGame['turnsOver'] === true){
        let message, messageColor;
        if (winner == YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won!';
            messageColor = 'green';
            winSound.play();
        } else if (winner == DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
}