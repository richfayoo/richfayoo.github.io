const score = JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    lose:0,
    tied:0
};
resultUpdate();

function playerMove(playerMove){
    const computermove = pickComputerMove();
    let result;
if(playerMove === 'rock'){
    if(computermove === 'rock'){
        result = 'tied'
    }else if(computermove === 'paper'){
        result = 'you lose'
    }else if(computermove === 'scissor'){
        result = 'you win' 
    }
}else if(playerMove === 'paper'){
    if(computermove === 'rock'){
        result = 'you win'
    }else if(computermove === 'paper'){
        result = 'tied'
    }else if(computermove === 'scissor'){
        result = 'you lose' 
    }
}else if(playerMove === 'scissor'){
    if(computermove === 'rock'){
        result = 'you lose'
    }else if(computermove === 'paper'){
        result = 'you win'
    }else if(computermove === 'scissor'){
        result = 'tied' 
    }
}

if(result === 'you win'){
    score.wins += 1;
}else if(result === 'you lose'){
    score.lose += 1;
}else if(result === 'tied'){
    score.tied += 1;
}
localStorage.setItem('score', JSON.stringify(score));

resultUpdate();
document.querySelector('.js-move').innerHTML = `You Pick ${playerMove}, Computer Pick ${computermove}`
document.querySelector('.js-result').innerHTML = result
}

function resultUpdate(){
document.querySelector('.js-score').innerHTML = `
Wins = ${score.wins}  Lose = ${score.lose}  Tied = ${score.tied}`
}

function pickComputerMove(){
    let computermove
    const randomnumber = Math.random();
if(randomnumber >= 0 && randomnumber <= 1/3){
    computermove = 'rock';
}else if(randomnumber >= 1/3 && randomnumber <= 2/3){
    computermove = 'paper';
}else if(randomnumber >= 2/3 && randomnumber <= 1){
    computermove = 'scissor'}
    return computermove;
}