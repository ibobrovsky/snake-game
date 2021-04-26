import { createElement } from "../../util/index"

export default class Buttons
{
    constructor()
    {
        this.node = null
        this.newGameNode = null
        this.StartStopNode = null
    }

    render(snake)
    {
        if (!this.node)
        {
            const node = createElement()
            node.classList.add('snake-controls__buttons')
            node.appendChild(this.renderStartStop(snake))
            node.appendChild(this.renderNewGame(snake))

            this.node = node
        }
        return this.node
    }

    renderNewGame(snake)
    {
        if (!this.newGameNode)
        {
            const node = createElement('button')
            node.classList.add('snake-controls__btn')
            node.setAttribute('type', 'button')
            node.textContent = 'Новая игра'
            node.addEventListener('click', e => {
                snake.newGame()
            })

            this.newGameNode = node
        }
        return this.newGameNode
    }

    renderStartStop(snake)
    {
        if (!this.StartStopNode)
        {
            const node = createElement('button')
            node.classList.add('snake-controls__btn')
            node.setAttribute('type', 'button')
            node.textContent = 'Старт'
            const buttons = this
            node.addEventListener('click', e => {
                snake.startStop()
                buttons.updateStartStopBtn(snake)
            })

            this.StartStopNode = node
        }
        return this.StartStopNode
    }

    updateStartStopBtn(snake)
    {
        let text = 'Старт'
        if (!snake._pause)
        {
            text = 'Пауза'
        }
        const node = this.renderStartStop()
        const curText = node.innerText
        if (text !== curText)
        {
            node.innerText = text
        }
    }
}