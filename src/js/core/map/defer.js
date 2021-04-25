import { isCell } from "../../util/index"

const defer = () => {
    let cells = []

    const update = () => {
        for (let i in cells)
        {
            if (cells.hasOwnProperty(i))
            {
                let cell = cells[i]
                if (isCell(cell))
                {
                    cell.update()
                }
            }
        }
        cells = []
    }

    const add = (cell) => {
        if (isCell(cell) && !has(cell))
        {
            cells.push(cell)
        }
    }

    const has = (cell) => {
        for (let i of cells)
        {
            if (i.uid === cell.uid)
            {
                return true
            }
        }
        return false
    }

    return {
        add,
        update
    }
}
export default defer