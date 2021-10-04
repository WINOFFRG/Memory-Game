class App {

    static init() {
        this.setActiveButton();
        sessionStorage.GRID = 4;
    }

    static setActiveButton() {
        
        const theme = Array.from(document.querySelector('.theme .buttons').children);
        theme.forEach(element => {
            if(sessionStorage.THEME === element.innerText)
                element.classList.add('active');      
        });

        const players = Array.from(document.querySelector('.players .buttons').children);
        players.forEach(element => {
            if(sessionStorage.PLAYERS === element.innerText)
                element.classList.add('active');      
        });

        const grid = Array.from(document.querySelector('.grid .buttons').children);
        grid.forEach(element => {
            if(sessionStorage.GRID === element.innerText)
                element.classList.add('active');      
        });
         
    }

    static activeButton() {
    }

}

App.init();