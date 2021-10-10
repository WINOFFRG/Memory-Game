class App {

    static init() {
        this.setActiveButton();
        this.startGame();
    }

    static setActiveButton() {      

        function setActive(event) {
            const btnList = Array.from(this.children);
            
            btnList.forEach(btn => {
                btn.classList.remove('active');
            });

            event.target.classList.add('active');
        }

        const themeDiv = document.querySelector('.theme .buttons');
        const players = document.querySelector('.players .buttons');
        const grid = document.querySelector('.grid .buttons');

        themeDiv.addEventListener('click', setActive);
        players.addEventListener('click', setActive);
        grid.addEventListener('click', setActive);
    }

    static startGame() {

        function changePage(){
            let theme = document.querySelector('.theme .buttons .btn.active');
            let players = document.querySelector('.players .buttons .btn.active');
            let grid = document.querySelector('.grid .buttons .btn.active');

            if(!theme || !players || !grid) {
                alert("Please choose your Settings!");
                return;
            }
            theme = theme.innerText.toLowerCase();
            players = players.innerText.toLowerCase();
            grid = grid.innerText[0];
            let url = `/game.html?theme=${theme}&players=${players}&grid=${grid}`;
            console.log("Start", theme, players, grid);         
            window.location.href = url;
        }

        const startBtn = document.querySelector('.start');
        startBtn.addEventListener('click', changePage);
    }
    
}
App.init();
