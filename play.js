

class Box{
    
    constructor(from, to){
        this.from = from
        this.to = to
        this.players = []
    }

    addPlayer(player){
        this.players.push(player)
    }
}


function randomNumberGen(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class Board{

    constructor(){
        this.board = []
        this.initLadders()
        this.showBoard()
        this.initSnakes()
        this.showBoard()
        this.initOthers()
    }


    initLadders(){
        for(let i =1 ;i<= 10; i++){
            let no = randomNumberGen(2, 99)
            let ladderTo = randomNumberGen(no, 99)
            this.addBox(no, ladderTo)
        }    
    }

    initSnakes(){
        let i = 10;
        while(i>0){
            let no = randomNumberGen(2, 99)
            // console.log(no)
            // console.log(typeof this.board[no])
            if(typeof this.board[no] != 'undefined'){
//                console.log('continue')
                continue
            }
            let snakeTo = randomNumberGen(2, no)
            this.addBox(no, snakeTo)
            i--
//            console.log('completed')
        }  
    }

    addBox(from , to){
        let box =  new Box(from, to)
        this.board[from] = box
    }

    initOthers(){
        for(let i=1; i<= 100; i++){
            if(typeof this.board[i] == 'undefined'){
                this.addBox(i, i)
            }
        }
    }
    showBoard(){
        this.board.forEach(el =>{
            console.log(`${el.from}: ${el.to}`)
        })
    }
}


class Player{

    constructor(name){
        this.name = name
        this.position = 0
    }

}

class Game{

    constructor( name1, name2){
        this.player1 = new Player(name1)
        this.player2 = new Player(name2)
        this.gameBoard = new Board()
    }

    play(player, dice){
        player.position = player.position + dice > 100? 100: player.position + dice
        if(this.gameBoard.board[player.position].from != this.gameBoard.board[player.position].to){
            player.position = this.gameBoard.board[player.position].to
        }

    }

}


let game = new Game('nikhil', 'aditi')

game.gameBoard.showBoard()
let player1Turn = true

let count = 0
while (game.player1.position< 100 && game.player2.position < 100){
    count ++
    if(player1Turn){
        console.log(game.player1.position)
        let dice = randomNumberGen(1, 6)
        console.log(dice)
        game.play(game.player1, dice)
        console.log(game.player1.position)    
        player1Turn = false
    }
    else{
        console.log(game.player2.position)
        let dice = randomNumberGen(1, 6)
        console.log(dice)
        game.play(game.player2, dice)
        console.log(game.player2.position)       
        player1Turn = true 
    }
}

if(game.player1.position == 100){
    console.log('nikhil wins')
}
else{
    console.log('aditi wins')
}
console.log(`count:${count}`)