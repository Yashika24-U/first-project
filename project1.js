function ageinDays(){
var birthyear = prompt("Enter your birthyear, my Friend!!");
var ageinDayss = (2022-birthyear)*365;
var h1 = document.createElement('h1');
var textAnswer = document.createTextNode("Your are "  +ageinDayss+ " day");
h1.setAttribute("id","ageinDayss");
h1.appendChild(textAnswer);
document.getElementById("flex-box-result").appendChild(h1);
}
function reset(){
    document.getElementById("flex-box-result").remove();
}
//challenge 2===============================================
function generator()
{
   var image =  document.createElement('img');
   var div = document.getElementById('flex-box-generator');
   image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size=small width=130px";
   div.appendChild(image);
}
//challenge 3==============================================
function rpsGame(yourChoice){
    console.log(yourChoice);

    var humanChoice,botChoice;
   
   humanChoice = yourChoice.id;
   botChoice = numberToChoice(randToRpsInt());
  console.log('computerChoice:',botChoice);

   results = decideWinner(humanChoice , botChoice); //[0,1] human lost | bot won
   console.log(results);

    message = finalMessage(results);
   console.log(message); //{'You Won!",'color:'green'}


    rpsFrontEnd(yourChoice.id, botChoice,message);
}
function randToRpsInt()
{
    return Math.floor(Math.random() *3);
}
function numberToChoice(number){
    return ['rock','paper','scissor'][number];
}
function decideWinner(yourChoice,computerChoice)
{
    var rpsDatabase = 
    {
        'rock' :{'scissor':1 ,'paper':0 , 'rock':0.5},
        'paper':{'scissor':0 ,'paper':0.5, 'rock':1},
        'scissor':{'scissor':0.5 ,'paper':1, 'rock':0} 
    };


    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}
function finalMessage([yourScore, computerScore])
{
    if(yourScore === 0){
        return {'message':'You lost!','color':'red'};
    }
    else if(yourScore === 0.5){
        return{'message':'You tied!','color':'yellow'};
    }
    else{
        return{'message':'You Won!','color':'green'};
    }

}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage) 
{
var imagesDatabase = {
    'rock':document.getElementById('rock').src,
    'paper':document.getElementById('paper').src,
    'scissor':document.getElementById('scissor').src,
}
document.getElementById('rock').remove();     
document.getElementById('paper').remove();   
document.getElementById('scissor').remove();

var humanDiv = document.createElement('div');
var botDiv = document.createElement('div');
var messageDiv = document.createElement('div');

humanDiv.innerHTML = "<img src ='" +imagesDatabase[humanImageChoice] + "' height = 150 width  = 150 style = 'box-shadow: 0px 10px 50px rgba(37,50,233,1);'>"
messageDiv.innerHTML = "<h1 style = 'color:"+finalMessage['color']+";font-size : 60px; padding : 30px; '>"+finalMessage['message'] +"</h1>"
botDiv.innerHTML = "<img src ='" +imagesDatabase[botImageChoice] + "' height = 150 width = 150  style = 'box-shadow : 0px 10px 50px rgba(243, 38,233,1);'>"


document.getElementById('flex-box-rps-div').appendChild(humanDiv);
document.getElementById('flex-box-rps-div').appendChild(botDiv);
document.getElementById('flex-box-rps-div').appendChild(messageDiv);
}
//challenge 4===========================================================================
var all_buttons = document.getElementsByTagName('button')

console.log(all_buttons)
var copyall_buttons =[];
for(let i = 0; i < all_buttons.length; i++)
{
    copyall_buttons.push(all_buttons[i]);
}
console.log(copyall_buttons)

function buttonColorchange(buttonthing)
{
    if(buttonthing.value === 'red')
    {
        buttontoRed();
    }
    if(buttonthing.value === 'green')
    {
        buttontoGreen();
    }
    if(buttonthing.value === 'random')
    {
        buttontoRandom();
    }
    if(buttonthing.value === 'reset')
    {
        buttontoReset();
    }
} 

function buttontoRed()
{
    for(let i = 0; i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttontoGreen()
{
    for(let i = 0; i<all_buttons.length;i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttontoRandom()
{
    var choices = ['btn-primary','btn-success','btn-warning','btn-danger'];
    for(let i= 0;i < all_buttons.length;i++)
    {
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}
function buttontoReset()
{
    for (let i = 0; i < all_buttons.length; i++)
    {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyall_buttons[i]);
    }   
}
//Challenge:5============================================================================================================================
let blackjackGame = {
    'you':{'scoreSpan':'#your-blackjack-result','div':'#your-box','score':0},
    'dealer':{'scoreSpan':'#dealer-blackjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'Q':10,'J':10,'A':[1,11]},
    'wins':0,
    'draws':0,
    'losses':0,
    'isStand':false,
    'turnsOver': false,
};

const YOU = blackjackGame['you']
const DEALER = blackjackGame['dealer']

const hitsound = new Audio('bg-sounds/swish.m4a');
const winSound = new Audio('bg-sounds/cash.mp3');
const lossSound = new Audio('bg-sounds/aww.mp3');


document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


function blackjackHit()
//hit state only work when you havent used stand yet
{
    if(blackjackGame['isStand'] === false)
    {
    let card = randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    }
}
function randomCard()
{
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}
function showCard(card,activePlayer)
{   
    if(activePlayer['score'] <= 21)
    {
    let cardImage = document.createElement('img');
    cardImage.src =`bg-images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitsound.play();
    }
}

function blackjackDeal()
{
   if(blackjackGame['turnsOver'] == true)
    {   
        
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        //console.log(yourImages);

        for(i=0; i<yourImages.length;i++)
        {
            yourImages[i].remove();
        }

        for(i=0; i<dealerImages.length;i++)
        {
            dealerImages[i].remove();
        }
    

        YOU['score'] = 0;
        DEALER['score'] = 0;
        
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color ='#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color ='#ffffff';

        document.querySelector('#black-jack-result').textContent = "Let's play";
        document.querySelector('#black-jack-result').style.color = "black";
        blackjackGame['turnsOver']=true;
    }   
}
function updateScore(card,activePlayer)
{   if(card ==='A')
    {
        if(activePlayer['score'] + blackjackGame['cardsMap'][cards][1] <= 21)
        {
            activePlayer['score'] += blackjackGame['cardsMap'][cards][1];
        }
        else
        {
            activePlayer['score'] += blackjackGame['cardsMap'][cards][0];
        }
    
    }
    else
    {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}
function showScore(activePlayer)
{   if(activePlayer['score'] > 21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'; 
    }
    else
    {
    document.querySelector(activePlayer['scoreSpan']).textContent=activePlayer['score'];
    }
}
function dealerLogic()
{
    blackjackGame['isStand'] = true;
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);   

    if (DEALER['score']>15)
    {
        blackjackGame['turnsOver'] = true;
        let winner = computeWinner();
        showResult(winner);
        console.log(blackjackGame['turnsOver']);
    }
}

//computewinner returns who just won
//update,wins,draws and losses

function computeWinner(){
let winner;

if(YOU['score'] <= 21)
{   
    if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21))
    {
        blackjackGame['wins']++;      
        winner = YOU;
    } 
    else if(YOU['score']<DEALER['score'])
    {
        blackjackGame['losses']++;
        winner = DEALER;
    }
    else if(YOU['score'] === DEALER['score'])
    {
        blackjackGame['draws']++;
    }
}
else if (YOU['score'] > 21 && DEALER['score'] <= 21)
{
    blackjackGame['losses']++;
    winner = DEALER;
}    
else if (YOU['score']>21 && DEALER['score']>21)
{
    blackjackGame['draws']++;
}
    console.log(blackjackGame);
    return winner;
}
//showResult==================================================================================================================================================
function showResult(winner)
{

let message,messageColor;
if(blackjackGame['turnsOver']==true)
{
    if(winner === YOU)
    {
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'YOU Won!!';
        messageColor = 'green';
        winSound.play();
    }
    else if(winner === DEALER)
    {
        document.querySelector('#loses').textContent =blackjackGame['losses'];
        message = 'YOU Lost!!';
        messageColor = 'red';
        lossSound.play();
    }
    else
    {
        document.querySelector('#draws').textContent = blackjackGame['draws'];
        message = 'You drew!!';
        messageColor = 'black';
    }
    document.querySelector('#black-jack-result').textContent = message;
    document.querySelector('#black-jack-result').style.color = messageColor;
    }
}        
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    



















