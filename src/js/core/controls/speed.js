import { createElement, createTextNode } from "../../util/index"

export default class Speed
{
    constructor()
    {
        this.speed = 1
        this.maxSpeed = 10
        this.timeout = 150
        this.node = null
        this.textNode = null
        this.resultNode = null
        this.speedIntervals = {
            1: 150,
            2: 140,
            3: 130,
            4: 120,
            5: 110,
            6: 100,
            7: 80,
            8: 60,
            9: 40,
            10: 20,
        }
    }

    renderTextNode()
    {
        if (!this.textNode)
        {
            this.textNode = createTextNode('Скорость: ')
        }
        return this.textNode
    }

    speedInterval()
    {
        return this.speedIntervals[this.speed] || this.speedIntervals[this.maxSpeed]
    }

    renderResultNode()
    {
        if (!this.resultNode)
        {
            const resultNode = createElement()
            resultNode.classList.add('snake-controls__speed-result')
            resultNode.textContent = `${this.speed}`

            this.resultNode = resultNode
        }
        return this.resultNode
    }

    render()
    {
        if (!this.node)
        {
            const node = createElement()
            node.classList.add('snake-controls__speed')
            const textNode = this.renderTextNode()
            const resultNode = this.renderResultNode()

            node.appendChild(textNode)
            node.appendChild(resultNode)

            this.node = node
        }
        return this.node
    }

    update(newSpeed)
    {
        newSpeed = this.normalizeSpeed(newSpeed)

        if (newSpeed === this.speed || newSpeed > this.maxSpeed)
        {
            return
        }

        this.speed = newSpeed
        const resultNode = this.renderResultNode()
        resultNode.innerText = this.speed
    }

    normalizeSpeed(speed)
    {
        return Number(parseInt(speed, 10))
    }
}