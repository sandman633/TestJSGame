const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div'),
bgsound = document.createElement('audio');
document.addEventListener('keydown',startRun);
document.addEventListener('keyup',stopRun);
start.addEventListener('click',startGame);
car.classList.add('car');



const keys = {
    ArrowDown: false,
    ArrowUp: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start : false,
    score: 0,
    speed: 3,
    traffic: 3
};
function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement +1;
}
function  startGame(){
    start.classList.add('hide');

    for(let i =0; i<getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top=(i*100)+'px';
        line.y = i*100;
        gameArea.appendChild(line);
    }
    for(let i = 0; i<getQuantityElements(100*setting.traffic);i++)
    {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100*setting.traffic*(i+1);
        enemy.style.top = enemy.y+'px';
        if(Math.random()>=0.5)
        {
            enemy.style.background = 'transparent url(./image/enemy.png)center / cover no-repeat';
        }
        else
        {
            enemy.style.background = 'transparent url(./image/enemy2.png)center / cover no-repeat';
        }
        gameArea.appendChild(enemy);

    }
    bgsound.loop = 1;
    bgsound.scr = '';
    bgsound.autoplay = 'autoplay';
    gameArea.appendChild(bgsound);

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}
console.log(gameArea.offsetWidth);
function playGame()
{
    console.log('playgame!!!');

    if(setting.start){
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x>0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < 250){
            setting.x += setting.speed;
        }
        if(keys.ArrowDown && setting.y<(gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }
        if(keys.ArrowUp && setting.y>0){
            setting.y -= setting.speed;
        }
        car.style.left = setting.x+'px';
        car.style.top = setting.y+'px';
        requestAnimationFrame(playGame);
    }
}
function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
        line.y += setting.speed;
        line.style.top = line.y+'px';
        if(line.y>= document.documentElement.clientHeight)
        {
            line.y = -100;
        } 
    });
}
function moveEnemy(){
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach(function(enemy){
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if(carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top)
            {
                setting.start = false;
            }

        enemy.y += setting.speed/2;
        enemy.style.top =enemy.y+'px';
        if(enemy.y >= document.documentElement.clientHeight){
            enemy.y = -100*setting.traffic;
            enemy.style.left = (Math.floor(Math.random()*(gameArea.offsetWidth - 50))) +'px';
        }
    });
}
function  startRun(event){
    console.log(event.key);
    event.preventDefault();
    keys[event.key] = true;
}
function  stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}

car.classList.add('car');

