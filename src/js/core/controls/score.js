import { createElement, createTextNode } from "../../util/index"

export default class Score
{
    constructor()
    {
        this.score = 0
        this.updateScoreCount = 5
        this.node = null
        this.textNode = null
        this.resultNode = null
    }

    speed()
    {
        if (this.score <= 50)
        {
            return 1
        }
        else if (this.score <= 100)
        {
            return 2
        }
        else if (this.score <= 200)
        {
            return 3
        }
        else if (this.score <= 400)
        {
            return 4
        }
        else if (this.score <= 800)
        {
            return 5
        }
        else if (this.score <= 1500)
        {
            return 6
        }
        else if (this.score <= 2000)
        {
            return 7
        }
        else if (this.score <= 4000)
        {
            return 8
        }
        else if (this.score <= 5000)
        {
            return 9
        }
        else if (this.score <= 10000)
        {
            return 10
        }
    }

    renderTextNode()
    {
        if (!this.textNode)
        {
            this.textNode = createTextNode('Набрано очков: ')
        }
        return this.textNode
    }

    renderResultNode()
    {
        if (!this.resultNode)
        {
            const resultNode = createElement()
            resultNode.classList.add('snake-controls__score-result')
            resultNode.textContent = `${this.score}`

            this.resultNode = resultNode
        }
        return this.resultNode
    }

    render()
    {
        if (!this.node)
        {
            const node = createElement()
            node.classList.add('snake-controls__score')
            const textNode = this.renderTextNode()
            const resultNode = this.renderResultNode()

            node.appendChild(textNode)
            node.appendChild(resultNode)

            this.node = node
        }
        return this.node
    }

    update()
    {
        if (this.score <= 50)
        {
            this.updateScoreCount = 5
        }
        else if (this.score <= 100)
        {
            this.updateScoreCount = 10
        }
        else if (this.score <= 200)
        {
            this.updateScoreCount = 15
        }
        else if (this.score <= 400)
        {
            this.updateScoreCount = 20
        }
        else if (this.score <= 800)
        {
            this.updateScoreCount = 25
        }
        else if (this.score <= 1500)
        {
            this.updateScoreCount = 30
        }
        else if (this.score <= 2000)
        {
            this.updateScoreCount = 35
        }
        else if (this.score <= 4000)
        {
            this.updateScoreCount = 40
        }
        else if (this.score <= 5000)
        {
            this.updateScoreCount = 45
        }
        else if (this.score <= 10000)
        {
            this.updateScoreCount = 50
        }

        this.score += this.updateScoreCount
        const resultNode = this.renderResultNode()
        resultNode.innerText = this.score
    }

    clear()
    {
        this.score = 0
        this.updateScoreCount = 5

        const resultNode = this.renderResultNode()
        resultNode.innerText = this.score
    }

    normalizeScore(score)
    {
        return Number(parseInt(score, 10))
    }
}