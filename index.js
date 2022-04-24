function setUsername(){
    return prompt('Enter your username');
}

function game(){
    return new Promise((resolve, reject)=>{
            const number = Math.floor(Math.random()*6)+1;
            const input = prompt('Enter number');
        
            if(parseInt(input) === number){
                points = points + 2;
                resolve({
                    name: username,
                    points: 'Your points: ' + points,
                    message: 'You are right! You got 2 points!'
                });
            }
            else if(parseInt(input) + 1 === number || parseInt(input) - 1 === number){
                points = points + 1;
                resolve({
                    name: username,
                    points: 'Your points: ' + points,
                    message: `Your number is ${input}, our number is ${number}, you got 1 point!`
                });
            }
            else if (input != number){
                resolve({
                    name: username,
                    points: 'Your points: ' + points,
                    message: 'You missed! Our number is: ' + number
                });
            }
    });
}

function continueGame(){
    return new Promise((resolve, reject) =>{
        if(prompt('Do you want continue game? yes/no') === 'yes'){
            resolve();
        }
        else{
            reject('Game is finished!');
        }
    });
}

function gameHandler(){
    game().then((success) => {
        console.log(success.name + ' ' + success.message + '\n' + success.points);
        continueGame().then(()=>gameHandler()).catch(end => console.log(end));
    }).catch(failed => console.log(failed.name + ' ' + failed.message + '\n' + failed.points));
}

let points = 0;
const username = setUsername();
gameHandler();