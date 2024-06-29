const canvas = document.querySelector('canvas') //seleciona o meu canvas 
const ctx = canvas.getContext('2d') //define um contexto
const size = 30 //tamanho da fruta
//cria a minnha cobra
const snake = [
    //o valor muda de 30 em 30, pois o tamanho da fruta é 30
    {x:200, y:200},
    {x:230, y:200},
] 

let direction

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

setInterval(() => {
    ctx.clearRect(0, 0, 600, 600)
    
    drawSnake()
    moveSnake()
}, 300)