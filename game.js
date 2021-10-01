document.querySelector('.backdrop').addEventListener('click', () => {
    document.querySelector('.app').classList.remove('backdrop');
    document.querySelector('.finish').style.display = "None";

});

function createGameBoard(width) {
    
    if(width === 4)
    {
        document.querySelector('.grid').style.gridTemplateColumns = `repeat(4, 80px)`;
        document.querySelector('.grid').style.gridTemplateRows = `repeat(4, 80px)`;
    }
    if(width === 6)
    {
        document.querySelector('.grid').style.gridTemplateColumns = `repeat(6, 60px)`;
        document.querySelector('.grid').style.gridTemplateRows = `repeat(6, 60px)`;
    }

    const grid = document.querySelector('.grid');
    


    for(var val = 0; val < width*width; val++)
    {
        const icon = document.createElement('div');
        icon.classList.add('icon');
        const title = document.createElement('h4');
        icon.appendChild(title);
        title.innerText = val;

        grid.appendChild(icon);
    }

    if(width === 4) 
    {
        document.querySelector('.grid').style.fontSize = `0.9em`;
    }
    else
    {
        document.querySelector('.grid').style.fontSize = `1.2em`;
    }

}