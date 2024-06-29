const canvas = document.querySelector('canvas') //seleciona o meu canvas 
const ctx = canvas.getContext('2d') //define um contexto
const size = 30 //tamanho da fruta
//cria a minnha cobra
const snake = [
    //o valor muda de 30 em 30, pois o tamanho da fruta é 30
    {x:200, y:200},
    {x:230, y:200},
] 

let direction, loopId

//desenha a cobra na tela
const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    //percorre todo o meu vetor e recebe cada posição como parâmtero, criando assim o desenho
    snake.forEach((position, index) => {
        //o index serve para mostrar onde está a cabeça da cobra
        if(index == snake.length - 1){
            //a última posição do array vai ter uma cor diferente do restante da cobra
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

//função para capturar o movimento da cobra
const moveSnake = () => {
    
    if(!direction) return //se o valor for vazio, então a cobra fica parada

    const head = snake.at(-1) //captura o último elemento do meu vetor

    if(direction === "right"){
        snake.push({x:head.x + size, y:head.y})
    }

    if(direction === "left"){
        snake.push({x:head.x - size, y:head.y})
    }

    if(direction === "down"){
        snake.push({x:head.x, y:head.y + size})
    }

    if(direction === "up"){
        snake.push({x:head.x, y:head.y - size})
    }

    snake.shift()
}

//cria o loop do movimento da cobra
const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600) //limpa a tela 

    drawSnake() //desenha a cobra
    moveSnake() //move a cobra

    //depois do tempo estabelecido, a função chama ela mesma novamente
    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()

document.addEventListener("keydown", ({key}) => {
    if(key === "ArrowRight" && direction !== "left"){
        direction = "right"
    }

    if(key === "ArrowLeft" && direction !== "right"){
        direction = "left"
    }

    if(key === "ArrowUp" && direction !== "down"){
        direction = "up"
    }

    if(key === "ArrowDown" && direction !== "up"){
        direction = "down"
    }
})