// document.querySelector('.backdrop').addEventListener('click', () => {
//     document.querySelector('.app').classList.remove('backdrop');
//     document.querySelector('.finish').style.display = "None";

// });
window.ARRAY = [];



function revealIcon(event) {

    event.stopPropagation();
    
    if(event.target === this)
    {
        return;
    }
    console.log(event.target);
}

function createGameBoard(width) {

    const grid = document.querySelector('.grid');
    
    if(width === 4)
    {
        grid.style.gridTemplateColumns = `repeat(4, 5em)`;
        grid.style.gridTemplateRows = `repeat(4, 5em)`;
        grid.style.lineHeight = "5em";
    }
    if(width === 6)
    {
        grid.style.gridTemplateColumns = `repeat(6, 4em)`;
        grid.style.gridTemplateRows = `repeat(6, 4em)`;
        grid.style.lineHeight = "4em";
    }

    let length = width === 4 ? 8 : 18;
    let uniqueKeys = makeBoardKeys(length);
    let total = width*width;

    for(var row = 1; row <= width; row++)
    {
        const innerArray = [];
        for(var col = 1; col <= width; col++)
        {
            const icon = document.createElement('div');
            icon.classList.add('icon');
            const title = document.createElement('span');
            icon.appendChild(title);
            const val = uniqueKeys[--total];
            title.innerText = val;
            innerArray.push(val);
            icon.setAttribute('data-x', row-1);
            icon.setAttribute('data-y', col-1);
            grid.appendChild(icon);
        }

        ARRAY.push(innerArray);
    }

    let font = width === 4 ? "2.5em" : "2em";
    document.querySelectorAll('.icon').forEach(element => {
        element.style.fontSize = font;
    })

    grid.addEventListener('click', revealIcon, true);

    // document.querySelectorAll('.icon').forEach(element => {
     
    //     element.addEventListener('click', (event) => {
    //         event.stopPropagation();
    //     })
        
    //     // let x = 
    // });
}

function repositionFooter(position){

    const footer = document.querySelector('.footer');
    const game = document.querySelector('.game');
    footer.remove();

    if(position === "left")
    {
        document.querySelector('.game').insertBefore(footer, game.firstChild);
        const players = Array.from(footer.firstElementChild.children);

        for(let count = 0; count < players.length; count++)
        {
            players[count].innerHTML = `
                <h4>P${count+1}</h4>
                <h2>0</h2>
            `;
        }
    }
    else
    {
        document.querySelector('.app').appendChild(footer);

        const players = Array.from(footer.firstElementChild.children);

        for(let count = 0; count < players.length; count++)
        {
            players[count].innerHTML = `
                <h4>Player ${count+1}</h4>
                <h2>0</h2>
            `;
        }
    }

}

window.onresize = () => {
    if (window.innerWidth < 600)
    {
        repositionFooter("left");
    }
    else
    {
        repositionFooter("bottom");
    }
}

function makeBoardKeys(width){

    const set = new Set()   //Set has unique elements
    
    while(set.size < width) {
      set.add(Math.floor(Math.random() * 99));
    }

    let uniqueKeys = Array.from(set);
    uniqueKeys = uniqueKeys.concat(uniqueKeys);

    // I have written a comparator here, Here in cpmpare func is returns any random +ve or -ve number so based upon
    // the random number it will sort the array in ascending or descending order.
    uniqueKeys.sort(() => Math.random() - 0.5);     // Shuffle the array

    return uniqueKeys;
}

function setPlayers(number)
{
    const playerBar = document.querySelector('.players');
    let player = "";

    for(let count = 0; count < number; count++)
    {
        player += `<div class="player">
            <h4>Player ${count+1}</h4>
            <h2>0</h2>
        </div>`;

        playerBar.innerHTML = player;
    }
}

function confirmExit(){
    if(confirm("Are you sure to Restart the Game?")){
        window.location.href = "/index.html?mode=restart"
        console.log("Starting New Game!");
    }
    else{
        return;
    }
}

function Game() {

    const game = document.querySelector('.grid');

    function startGame(){

        const element = Array.from(game.children);
        const size = Math.sqrt(element.length);
        let count = 0;

        for(let row = 0; row < size; row++)
        {
            for(let col = 0; col < size; col++)
            {
                let idx = count++;
                element[idx].classList.add('hideIcon');
                element[idx].childNodes[0].innerText = " ";
            }
        }
    }

    setTimeout(startGame(), 3000);
}
class App{

    static getConfig(){
        let config = [];
        window.location.search.split('&').forEach(parameter => {
            config.push(parameter.split('=')[1]);
        })

        let theme = config[0];
        let players = config[1];
        let grid = config[2];

        // Implemented Router for Page and Errors
        if((theme != "icons" && theme != "numbers") ||
           (players != "1" && players != "2" && players != "3" && players != "4") ||
           (grid != "4" && grid != "6"))
           {
               window.location.href = "/404.html";
               console.log("Couldn't load the desired Cofig!");
               return;
           }
        
        createGameBoard(parseInt(grid), theme);
        setPlayers(parseInt(players));
    }


    static init(){
        this.getConfig();
        
        // Game();
    }    
}

App.init();