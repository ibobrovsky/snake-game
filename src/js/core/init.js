import { initEvents } from "./events"
import { initControls } from "./controls/index"
import { initMap } from "./map/index"
import { initSnake } from "./snake"
import { initFood } from "./foods"
import { initMove } from "./move"
import { initGame } from "./game"
import { query, mergeOptions, defaultOptions } from "../util/index"

export function initMixin (Snake)
{
    Snake.prototype._init = function (el, options)
    {
        const snake = this

        snake.$el = query(el)
        snake.$options = mergeOptions(
            defaultOptions,
            options || {}
        )

        initEvents(snake)
        initControls(snake)
        initMap(snake)
        initSnake(snake)
        initFood(snake)
        initMove(snake)
        initGame(snake)

        if (snake.$el)
        {
            snake._mount(snake.$el)
        }
    }
}