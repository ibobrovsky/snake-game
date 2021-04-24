import Cell from "./map/cell"
import { LinkedList } from "../util/index"
import { findCell } from "./map/index"

export function initSnake (snake)
{
    snake._snake = new LinkedList()
    snake._lengthStartSnake = 3
    snake.$on('update', snake._updateSnake)
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
                if (cell instanceof Cell)
                {
                    if (head)
                    {
                        cell.addSnakeHeadColor()
                        head = false
                    }
                    else
                    {
                        cell.addSnakeColor()
                    }

                    snake._deferred.add(cell)
                    snake._snake.append(cell.uid, cell)
                }
            }
        }
        return snake._snake
    }

    Snake.prototype._updateSnake = function ()
    {
        const snake = this

        if (snake._snake.length)
        {
            let head = true
            snake._snake.for((cell) => {
                if (head)
                {
                    cell.addSnakeHeadColor()
                    head = false
                }
                else
                {
                    cell.addSnakeColor()
                }
                cell.update()
            })
        }
    }
}

export function unshiftSnake (snake)
{
    if (snake._snake.length)
    {
        const tail = snake._snake.tail
        if (tail.data instanceof Cell)
        {
            tail.data.removeClass()
            snake._deferred.add(tail.data)
            snake._snake.remove(tail.id)
        }
    }
}