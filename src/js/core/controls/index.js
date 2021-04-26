import { createElement } from "../../util/index"
import Score from "./score"
import Speed from "./speed"
import Buttons from "./buttons"

export function initControls (snake)
{
    snake._score = new Score()
    snake._speed = new Speed()
    snake._buttons = new Buttons()
    snake._controlsNode = null
    snake.$on('render', snake._renderControls)
    snake.$on('newGame', snake._newGameControls)
    snake.$on('collisionFood', snake._collisionFoodControls)
}

export function controlsMixin (Snake)
{
    Snake.prototype._renderControls = function (fragment)
    {
        const snake = this
        if (!snake._controlsNode)
        {
            const controlsEl = createElement()
            controlsEl.classList.add('snake-controls')
            controlsEl.appendChild(snake._score.render())
            controlsEl.appendChild(snake._buttons.render(snake))
            controlsEl.appendChild(snake._speed.render())

            snake._controlsNode = controlsEl
        }
        fragment.appendChild(snake._controlsNode)
        return snake._controlsNode
    }

    Snake.prototype._newGameControls = function ()
    {
        const snake = this
        clearScore(snake)
        clearSpeed(snake)

        snake._buttons.updateStartStopBtn(snake)
    }

    Snake.prototype._collisionFoodControls = function ()
    {
        const snake = this
        updateScore(snake)
        updateSpeed(snake, snake._score.speed())
    }
}

export function clearScore (snake)
{
    snake._score.clear()
}

export function updateScore (snake)
{
    snake._score.update()
}

export function clearSpeed (snake)
{
    snake._speed.update(1)
}

export function updateSpeed (snake, newSpeed)
{
    const bEmit = newSpeed !== snake._speed.speed
    snake._speed.update(newSpeed)

    if (bEmit)
    {
        snake.$emit('updateSpeed', newSpeed)
    }
}