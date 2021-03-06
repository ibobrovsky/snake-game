import { createElement } from "../../util/index"

let uid = 0

export default class Cell
{
    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.uid = uid++

        this.node = null
        this.oldClass = 'snake-map__col'
        this.class = this.oldClass

        this.update()
    }

    render()
    {
        if (!this.node)
        {
            const node = createElement()
            node.classList.add(this.oldClass)
            node.setAttribute('id', `${this.x}_${this.y}`)
            this.node = node
        }
        return this.node
    }

    update()
    {
        if (this.oldClass !== this.class)
        {
            const node = this.render()
            node.classList = this.class
            this.oldClass = this.class
        }
    }

    addSnakeColor()
    {
        this.class = 'snake-map__col snake-map__col--snake'
    }

    addSnakeHeadColor()
    {
        this.class = 'snake-map__col snake-map__col--snake-head'
    }

    addSnakeHeadErrorColor()
    {
        this.class = 'snake-map__col snake-map__col--snake-head-error'
    }

    addFoodColor()
    {
        this.class = 'snake-map__col snake-map__col--food'
    }

    removeClass()
    {
        this.class = 'snake-map__col'
    }
}