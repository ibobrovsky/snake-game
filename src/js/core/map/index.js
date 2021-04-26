import Cell from "./cell"
import { LinkedList, createFragment, createElement, isCell } from "../../util/index"
import defer from "./defer"

export function initMap (snake)
{
    snake._map = new LinkedList()
    snake._mapNode = null
    snake._deferred = defer()
    snake.$on('render', snake._renderMap)
}

export function mapMixin (Snake)
{
    Snake.prototype._createMap = function ()
    {
        const snake = this
        if (!snake._map.length)
        {
            for (let y = 0;y < snake.$options.rows;y++)
            {
                for (let x = 0;x < snake.$options.columns;x++)
                {
                    const cell = new Cell(x, y)
                    snake._map.append(cell.uid, cell)
                }
            }
        }

        return snake._map
    }

    Snake.prototype._renderMap = function (fragment)
    {
        const snake = this
        if (!snake._mapNode)
        {
            const map = snake._createMap()
            let currentCell = map.head
            const mapFragment = createFragment()
            let rowNode = createRowNode()
            let countColumns = snake.$options.columns
            let i = 0
            while (currentCell)
            {
                rowNode.append(currentCell.data.render())
                i++
                if (i == countColumns)
                {
                    mapFragment.append(rowNode)
                    rowNode = createRowNode()
                    i = 0
                }

                currentCell = currentCell.next
            }
            const mapEl = createElement()
            mapEl.classList.add('snake-map')
            mapEl.append(mapFragment)
            snake._mapNode = mapEl
        }
        fragment.appendChild(snake._mapNode)
        return snake._mapNode
    }
}

export function findCell (snake, colId, rowId)
{
    if (snake._map)
    {
        return snake._map.find((data) => data.x === colId && data.y === rowId, snake)
    }
    return null
}

export function removeClass (snake, cell)
{
    addSnakeClass(snake, cell, 'removeClass')
}

export function addFoodColor (snake, cell)
{
    addSnakeClass(snake, cell, 'addFoodColor')
}

export function addSnakeColor (snake, cell)
{
    addSnakeClass(snake, cell, 'addSnakeColor')
}

export function addSnakeHeadColor (snake, cell)
{
    addSnakeClass(snake, cell, 'addSnakeHeadColor')
}

export function addSnakeHeadErrorColor (snake, cell)
{
    addSnakeClass(snake, cell, 'addSnakeHeadErrorColor')
}

function addSnakeClass (snake, cell, methodName)
{
    if (isCell(cell) && typeof cell[methodName] === 'function')
    {
        snake._deferred.add(cell)
        cell[methodName]()
    }
}

function createRowNode ()
{
    const node = createElement()
    node.classList.add('snake-map__row')
    return node
}