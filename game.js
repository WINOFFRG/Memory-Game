// document.querySelector('.backdrop').addEventListener('click', () => {
//     document.querySelector('.app').classList.remove('backdrop');
//     document.querySelector('.finish').style.display = "None";

// });
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

    for(var val = 0; val < width*width; val++)
    {
        const icon = document.createElement('div');
        icon.classList.add('icon');
        const title = document.createElement('span');
        icon.appendChild(title);
        title.innerText = uniqueKeys[val];

        grid.appendChild(icon);
    }

    let font = width === 4 ? "2.5em" : "2em";
    document.querySelectorAll('.icon').forEach(element => {
        element.style.fontSize = font;
    })

    function addEvent(event){
        
        if(event.target === this)
        {
            return;
        }

        // console.log(event.target, this);
        console.log(event.target.innerText);
    }

    grid.addEventListener('click', addEvent);
}

function repositionFooter(position){

    const footer = document.querySelector('.footer');
    const game = document.querySelector('.game');
    footer.remove();

    if(position === "left")
    document.querySelector('.game').insertBefore(footer, game.firstChild);
    else
    document.querySelector('.app').appendChild(footer);
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
        
        console.log(theme, players, grid);
        createGameBoard(parseInt(grid));
    }


    static init(){
        this.getConfig();
    }    
}

App.init();