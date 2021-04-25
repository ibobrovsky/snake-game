export function initGame (snake)
{
    snake._score = 0
    snake._timeout = 150
    snake._speed = 1
    snake._pause = true
    snake._interval = null
    document.addEventListener('keydown', (e) => {
        onKeyUp(snake, e)
    })
}

export function gameMixin (Snake)
{
    Snake.prototype.newGame = function ()
    {
        const snake = this
        snake.$emit('newGame')
    }

    Snake.prototype.start = function ()
    {
        const snake = this
        clearScore(snake)
        snake._pause = false
        return snake._interval = setInterval(() => {
            snake._move()
        }, speed(snake))
    }

    Snake.prototype.pause = function ()
    {
        const snake = this
        if (snake._interval)
        {
            clearInterval(snake._interval)
            snake._interval = null
            snake._pause = true
        }
    }
}

export function speed (snake)
{
    return Math.max(20, snake._timeout - 50 * snake._speed)
}

export function clearScore (snake)
{
    snake._score = 0
}

function onKeyUp (snake, e)
{
    if (e.keyCode == 32)
    {
        snake._pause
            ? snake.start()
            : snake.pause()
    }
}