import { randomInt } from "../util/index"
import { findCell } from "./map/index"
import Cell from "./map/cell"

export function initFood (snake)
{
    snake._foods = []
    snake._maxFoods = 1
}

export function foodMixin (Snake)
{
    Snake.prototype._cleanFoods = function ()
    {
        const snake = this
        for (let i = 0; i < snake._foods.length;i++)
        {
            const cell = snake._foods[i]
            if (cell instanceof Cell)
            {
                cell.removeClass()
                snake._deferred.add(cell)
            }
            snake._foods.splice(i, 1)
        }
    }

    Snake.prototype._renderFoods = function ()
    {
        const snake = this
        snake._foods = []
        for (let i = 0;i < snake._maxFoods;i++)
        {
            const food = this._renderFood()
            snake._foods.push(food)
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
            cell.addFoodColor()
            snake._deferred.add(cell)
            if (set)
            {
                snake._foods.push(cell)
            }
            return cell
        }

        return snake._renderFood()
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