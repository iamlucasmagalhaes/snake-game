const canvas = document.querySelector('canvas') //seleciona o meu canvas 
const ctx = canvas.getContext('2d') //define um contexto
const size = 30 //tamanho da fruta
//cria a minnha cobra
const snake = [
    //o valor muda de 30 em 30, pois o tamanho da fruta é 30
    {x: 200, y:200},
    {x: 230, y:200},
] 

//desenha a cobra na tela
const drawSnake = () => {
    ctx.fillStyle = "#ddd"
    //percorre todo o meu vetor e recebe cada posição como parâmtero, criando assim o desenho
    snake.forEach((position, index) => {
        //o index serve para mostrar onde está a cabeça da cobra
        if(index == snake.length - 1){
            ctx.fillStyle = "white"
        }

        ctx.fillRect(position.x, position.y, size, size)
    })
}

drawSnake()