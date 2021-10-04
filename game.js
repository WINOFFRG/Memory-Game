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

    grid.addEventListener('click', (event) => {
        console.log(event.target.innerText);
    });
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

    uniqueKeys.sort(() => Math.random() - 0.5);     //Need to check

    return uniqueKeys;
}

createGameBoard(6);