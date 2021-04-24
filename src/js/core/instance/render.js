export function initRender (snake)
{

}

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
        snake._renderSnake()
        snake._renderFoods()
        return map
    }

    Snake.prototype._update = function ()
    {
        const snake = this
        snake.$emit('update')
    }
}