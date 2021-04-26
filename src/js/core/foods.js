import { isCell, randomInt } from "../util/index"
import { addFoodColor, findCell, removeClass } from "./map/index"

export function initFood (snake)
{
    snake._foods = []
    snake._maxFoods = 1
    snake.$on('render', snake._renderFoods)
    snake.$on('collisionFood', snake._collisionFood)
    snake.$on('newGame', snake._newGameFoods)
    snake.$on('updateSpeed', updateSpeed)
}

export function foodMixin (Snake)
{
    Snake.prototype._newGameFoods = function ()
    {
        const snake = this
        snake._maxFoods = 1
        snake._cleanFoods()
        snake._renderFoods()
    }

    Snake.prototype._cleanFoods = function ()
    {
        const snake = this
        for (let i = 0; i < snake._foods.length;i++)
        {
            const cell = snake._foods[i]
            if (isCell(cell))
            {
                removeClass(snake, cell)
            }
        }

        snake._foods = []
    }

    Snake.prototype._cleanFood = function (uid)
    {
        const snake = this
        for (let i = 0; i < snake._foods.length;i++)
        {
            const cell = snake._foods[i]
            if (isCell(cell) && cell.uid == uid)
            {
                removeClass(snake, cell)
                snake._foods.splice(i, 1)
                break
            }
        }
    }

    Snake.prototype._renderFoods = function ()
    {
        const snake = this
        snake._foods = []
        for (let i = 0;i < snake._maxFoods;i++)
        {
            const food = snake._renderFood()
            if (food)
            {
                snake._foods.push(food)
            }
        }
    }

    Snake.prototype._renderFood = function (set)
    {
        const snake = this

        let colId = randomInt(snake.$options.columns)
        let rowId = randomInt(snake.$options.rows)

        const cell = findCell(snake, colId, rowId)
        if (cell && snake._getEmployedIds().indexOf(cell.uid) < 0)
        {
            addFoodColor(snake, cell)
            if (set)
            {
                snake._foods.push(cell)
            }
            return cell
        }

        return snake._renderFood(set)
    }

    Snake.prototype._collisionFood = function (uid)
    {
        const snake = this
        let max = snake._maxFoods
        const countCells = snake.$options.rows * snake.$options.columns
        const emptyCells = countCells - (snake._snake.length + snake._foods.length - 1)
        if (max > emptyCells)
        {
            max = emptyCells
        }

        const length = snake._foods.length - 1

        const countNewFoods = max - length
        for (let i = 0;i < countNewFoods;i++)
        {
            snake._renderFood(true)
        }

        snake._cleanFood(uid)
    }

    Snake.prototype._getEmployedIds = function ()
    {
        const snake = this
        let employedIds = []
        if (snake._snake.length)
        {
            employedIds = [...employedIds, ...snake._snake.toArray().map(i => i.uid)]
        }
        if (snake._foods.length)
        {
            employedIds = [...employedIds, ...snake._foods.map(i => i.uid)]
        }

        return employedIds
    }
}

function updateSpeed (speed)
{
    const snake = this
    switch (speed)
    {
        case 3:
            snake._maxFoods = 2
            break
        case 5:
            snake._maxFoods = 3
            break
        case 7:
            snake._maxFoods = 4
            break
        case 9:
            snake._maxFoods = 5
            break
    }
}