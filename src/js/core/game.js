export function initGame (snake)
{
    snake._pause = true
    snake._interval = null
    snake._isEndGame = false
    snake.$on('updateSpeed', updateSpeed)
}

export function gameMixin (Snake)
{
    Snake.prototype.newGame = function ()
    {
        const snake = this
        snake.pause()
        snake.$emit('newGame')
        snake._update()
        snake._isEndGame = false
    }

    Snake.prototype.start = function ()
    {
        const snake = this
        if (snake._isEndGame)
            return

        snake._pause = false
        return snake._interval = setInterval(() => {
            if (snake._isEndGame)
            {
                snake.pause()
                return
            }
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

    Snake.prototype.startStop = function ()
    {
        const snake = this
        snake._pause
            ? snake.start()
            : snake.pause()
    }
}

function updateSpeed ()
{
    const snake = this
    snake.pause()
    snake.start()
}

export function speed (snake)
{
    return snake._speed.speedInterval()
}