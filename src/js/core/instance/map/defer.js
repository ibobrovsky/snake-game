import Cell from "./cell"

const defer = () => {
    let cells = []

    const update = () => {
        for (let i in cells)
        {
            if (cells.hasOwnProperty(i))
            {
                let cell = cells[i]
                if (cell instanceof Cell)
                {
                    cell.update()
                }
            }
        }
        cells = []
    }

    const add = (cell) => {
        cells.push(cell)
    }

    return {
        add,
        update
    }
}
export default defer