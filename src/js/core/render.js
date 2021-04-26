import { createFragment } from "../util/index"

export function renderMixin (Snake)
{
    Snake.prototype._mount = function (el)
    {
        const snake = this
        el.append(snake._render())
        snake._update()
    }

    Snake.prototype._render = function ()
    {
        const snake = this
        const fragment = createFragment()
        snake.$emit('render', fragment)
        return fragment
    }

    Snake.prototype._update = function ()
    {
        const snake = this
        snake.$emit('update')
        snake._deferred.update()
    }
}