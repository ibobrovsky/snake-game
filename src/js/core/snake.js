import { isCell, LinkedList } from "../util/index"
import { addSnakeColor, addSnakeHeadColor, findCell, removeClass, addSnakeHeadErrorColor } from "./map/index"

export function initSnake (snake)
{
    snake._snake = new LinkedList()
    snake._lengthStartSnake = 3
    snake.$on('render', snake._renderSnake)
    snake.$on('collisionSnake', snake._collisionSnake)
    snake.$on('newGame', snake._newGameSnake)
}

export function snakeMixin (Snake)
{
    Snake.prototype._renderSnake = function (clean)
    {
        const snake = this
        if (clean)
        {
            snake._snake.for((cell) => {
                removeClass(snake, cell)
            })
            snake._snake.clean()
        }

        if (!snake._snake.length)
        {
            let centerRowId = Math.ceil(snake.$options.rows / 2)
            let centerColId = Math.ceil(snake.$options.columns / 2)

            let head = true
            for (let i = 0; i < snake._lengthStartSnake;i++)
            {
                const cell = findCell(snake, centerColId - i, centerRowId)
                if (isCell(cell))
                {
                    if (head)
                    {
                        addSnakeHeadColor(snake, cell)
                        head = false
                    }
                    else
                    {
                        addSnakeColor(snake, cell)
                    }

                    snake._snake.append(cell.uid, cell)
                }
            }
        }
        return snake._snake
    }

    Snake.prototype._collisionSnake = function ()
    {
        const snake = this
        addSnakeHeadErrorColor(snake, snake._snake.head.data)
    }

    Snake.prototype._newGameSnake = function ()
    {
        const snake = this

        snake._renderSnake(true)
    }
}

export function pushHeadSnake (snake, nextCell)
{
    if (!isCell(nextCell))
    {
        return
    }

    if (snake._snake.length > 1 && snake._snake.head)
    {
        const oldHeadSnake = snake._snake.head.data
        if (isCell(oldHeadSnake))
        {
            addSnakeColor(snake, oldHeadSnake)
        }
    }

    addSnakeHeadColor(snake, nextCell)
    snake._snake.prepend(nextCell.uid, nextCell)
}

export function unshiftTailSnake (snake)
{
    if (!snake._snake.length)
        return

    const tail = snake._snake.tail
    if (isCell(tail.data))
    {
        removeClass(snake, tail.data)
        snake._snake.remove(tail.id)
    }
}