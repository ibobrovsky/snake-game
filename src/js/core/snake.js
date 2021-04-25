import { isCell, LinkedList } from "../util/index"
import { addSnakeColor, addSnakeHeadColor, findCell, removeClass } from "./map/index"

export function initSnake (snake)
{
    snake._snake = new LinkedList()
    snake._lengthStartSnake = 3
    snake.$on('render', snake._renderSnake)
}

export function snakeMixin (Snake)
{
    Snake.prototype._renderSnake = function ()
    {
        const snake = this
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