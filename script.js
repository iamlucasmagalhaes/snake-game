const canvas = document.querySelector('canvas') //seleciona o meu canvas 
const audio = new Audio('assets/audio.mp3')
const ctx = canvas.getContext('2d') //define um contexto
const score = document.querySelector('.score-value') //seleciona o valor do score
const finalScore = document.querySelector('.final-score > span') //seleciona o span dentro do que está dentra da minha tag da classe final-score
const menu = document.querySelector('menu-score')
const buttonPlay = document.querySelector('btn-screen')
const size = 30 //tamanho da fruta 
//cria a minnha cobra
const snake = [
    //o valor muda de 30 em 30, pois o tamanho da fruta é 30
    {x:270, y:240},
    {x:300, y:240},
    {x:330, y:240},
    {x:360, y:240},
    {x:390, y:240},
    {x:420, y:240},
]

//gera um número aleatorio que vai ser usando na posição da comida e na cor
const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

//gera uma posição aleatoria para a comida
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size)
    return Math.round(number / 30) * 30
}

//gera cor aleatoria para a comida
const randomColor = () => {
    const red = randomNumber(0, 255) //vai gerar um numero aletório
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)

    return `rgb(${red}, ${green}, ${blue})`
}

//criando comida
const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
}

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

//desenhando a comida
const drawFood = () => {
    const {x, y, color} = food //desestruturando o objeto comida

    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = food.color
    ctx.fillRect(food.x, food.y, size, size)
    ctx.shadowBlur = 0
}

//função para desnehar grid no mapa
const dawnGrid = () => {
    ctx.lineWidth =  1 //definindo o tamanho da linha
    ctx.strokeStyle =  "#191919" //definindo a cor da linha

    for(let i = 30; i < canvas.width; i+= 30){
        ctx.beginPath() //define onde vai começar o desenho
        ctx.lineTo(i, 0) //definindo onde a linha vai começar
        ctx.lineTo(i, 600) //definindo onde a linha vai terminar
        ctx.stroke() //cria o desenho da linha

        ctx.beginPath()
        ctx.lineTo(0, i)
        ctx.lineTo(600, i)
        ctx.stroke()
    }
}

//função para verificar se a cobra comeu a comida
const chackEat = () => {
    const head = snake[snake.length - 1]

    if(head.x == food.x && head.y == food.y){
        snake.push(head)
        incrementScore()
        audio.play()
        
        let x = randomPosition()
        let y = randomPosition()

        while(snake.find((position) => position.x == x && position.y == y)){
            x = randomPosition()
            y = randomPosition()
        }

        food.x = x
        food.y = y
        food.color = randomColor()
    }
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimit = canvas.width - 1 //cria um limite para a cobra se mover
    const neckIndex = snake.length - 2 //retira a cabeça da cobra para a colisão com ela mesma
    //colisão com a parede
    const wallCollision = head.x < 0 || head.x >= canvasLimit || head.y < 0 || head.y >= canvasLimit

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y
    })

    if(wallCollision || selfCollision){
        gameOver()
    }
}

const gameOver = () => {
    direction = undefined
}

//aumenta a pontuação após checar se a cobra comeu a comida
const incrementScore = () => {
    score.innerText = parseInt(score.innerText) + 10
}

//cria o loop do movimento da cobra
const gameLoop = () => {
    clearInterval(loopId)
    ctx.clearRect(0, 0, 600, 600) //limpa a tela 
    dawnGrid() //deseha o grid
    drawFood() //desenha a comida
    drawSnake() //desenha a cobra
    moveSnake() //move a cobra
    checkCollision()
    chackEat() //verifica se a cobra comeu a comida

    //depois do tempo estabelecido, a função chama ela mesma novamente
    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}

gameLoop()

//adiciona um ouvidor para as teclas pressionadas
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