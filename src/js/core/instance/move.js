import { directions } from "../util/index"
import { findCell } from "./map/index"
import { unshiftSnake } from "./snake"
import Cell from "./map/cell"

export function initMove (snake)
{
    snake._direction = directions.right
}

export function moveMixin (Snake)
{
    Snake.prototype._move = function ()
    {
        const snake = this
        const headSnake = snake._snake.head.data
        const nextCell = getNextCol(snake, headSnake.x, headSnake.y)
        if (nextCell instanceof Cell)
        {
            snake._snake.prepend(nextCell.uid, nextCell)
        }
        unshiftSnake(snake)
        snake._update()
    }
}

export function changeDirection (snake, direction)
{


    snake._direction = direction
}

export function getNextCol (snake, colId, rowId)
{
    const direction = snake._direction

    switch (direction)
    {
        case directions.up:
        case directions.down:
            let nextRowId = direction === directions.up
                ? (rowId - 1)
                : (rowId + 1)

            if (nextRowId >= snake.$options.rows)
            {
                nextRowId = 0
            }

            return findCell(snake, colId, nextRowId)
        case directions.right:
        case directions.left:
            let nextColId = direction === directions.left
                ? (colId - 1)
                : (colId + 1)

            if (nextColId >= snake.$options.columns)
            {
                nextColId = 0
            }

            return findCell(snake, nextColId, rowId)
    }

    return  null
}