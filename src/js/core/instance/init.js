import { initEvents } from "./events"
import { initMap } from "./map/index"
import { initRender } from "./render"
import { initSnake } from "./snake"
import { initFood } from "./foods"
import { initMove } from "./move"
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
        initMap(snake)
        initRender(snake)
        initSnake(snake)
        initFood(snake)
        initMove(snake)

        if (snake.$el)
        {
            snake._mount(snake.$el)
        }
    }
}