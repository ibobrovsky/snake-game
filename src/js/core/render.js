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
        const map = snake._renderMap()
        snake.$emit('render')
        return map
    }

    Snake.prototype._update = function ()
    {
        const snake = this
        snake.$emit('update')
        snake._deferred.update()
    }
}