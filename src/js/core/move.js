import {directions, isCell} from "../util/index"
import { findCell } from "./map/index"
import { unshiftTailSnake, pushHeadSnake } from "./snake"

export function initMove (snake)
{
    snake._direction = directions.right
    snake._step = false
    snake._collision = false
    document.addEventListener('keydown', (e) => {
        onKeyDown(snake, e)
    })
    snake.$on('newGame', snake._newGameMove)
}

export function moveMixin (Snake)
{
    Snake.prototype._move = function ()
    {
        const snake = this
        const headSnake = snake._snake.head.data
        const nextCell = getNextCol(snake, headSnake.x, headSnake.y)

        if (isCollisionSnake(snake, nextCell))
        {
            snake.$emit('collisionSnake')
            snake._isEndGame = true
            snake._update()
            return
        }

        if (isCollisionFood(snake, nextCell))
        {
            snake.$emit('collisionFood', nextCell.uid)
            snake._collision = true
        }

        if (!snake._collision)
        {
            unshiftTailSnake(snake)
        }

        pushHeadSnake(snake, nextCell)

        snake._update()
        snake._collision = false
        snake._step = true
    }

    Snake.prototype._newGameMove = function ()
    {
        const snake = this
        snake._step = false
        snake._collision = false
        snake._direction = directions.right
    }
}

export function onKeyDown (snake, e)
{
    if (!snake._step)
        return

    switch (e.keyCode)
    {
        case 38:
        case 87:
            changeDirection(snake, directions.up)
            break
        case 39:
        case 68:
            changeDirection(snake, directions.right)
            break
        case 40:
        case 83:
            changeDirection(snake, directions.down)
            break
        case 37:
        case 65:
            changeDirection(snake, directions.left)
            break
    }

    snake._step = false
}

export function changeDirection (snake, direction)
{
    let change = false
    switch (direction)
    {
        case directions.up:
            if (snake._direction !== directions.down)
            {
                change = true
            }
            break
        case directions.right:
            if (snake._direction !== directions.left)
            {
                change = true
            }
            break
        case directions.down:
            if (snake._direction !== directions.up)
            {
                change = true
            }
            break
        case directions.left:
            if (snake._direction !== directions.right)
            {
                change = true
            }
            break
    }
    if (change)
    {
        snake._direction = direction
    }
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
            else if (nextRowId < 0)
            {
                nextRowId = snake.$options.rows -1
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
            else if (nextColId < 0)
            {
                nextColId = snake.$options.columns -1
            }

            return findCell(snake, nextColId, rowId)
    }

    return  null
}

export function isCollisionFood (snake, nextCell)
{
    if (isCell(nextCell))
    {
        const foodsUIds = snake._foods.map(i => i.uid)
        return foodsUIds.indexOf(nextCell.uid) >= 0
    }
    return false
}

export function isCollisionSnake (snake, nextCell)
{
    if (isCell(nextCell))
    {
        const snakeUIds = snake._snake.toArray().map(i => i.uid)
        const index = snakeUIds.indexOf(nextCell.uid)
        return index >= 0 && index !== snakeUIds.length - 1
    }
    return false
}