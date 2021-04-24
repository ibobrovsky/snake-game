import Cell from "./cell"
import { LinkedList, createFragment, createElement } from "../../util/index"
import defer from "./defer"

export function initMap (snake)
{
    snake._map = new LinkedList()
    snake._mapNode = null

    snake._deferred = defer()
    snake.$on('update', snake._deferred.update)
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

    Snake.prototype._renderMap = function ()
    {
        const snake = this
        if (!snake._mapNode)
        {
            const map = this._createMap()
            let currentCell = map.head
            const mapFragment = createFragment()
            let rowNode = createRowNode()
            let y = 0
            while (currentCell)
            {
                if (y !== currentCell.data.y)
                {
                    y = currentCell.data.y
                    mapFragment.append(rowNode)
                    rowNode = createRowNode()
                }

                rowNode.append(currentCell.data.render())

                currentCell = currentCell.next
            }
            snake._mapNode = mapFragment
        }
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

function createRowNode ()
{
    const node = createElement()
    node.classList.add('snake-map__row')
    return node
}