import { toArray } from "../util/index"

export function initEvents (snake)
{
    snake._events = Object.create(null)
}

export function eventsMixin (Snake)
{
    Snake.prototype.$on = function (event, fn)
    {
        const snake = this
        if (Array.isArray(event))
        {
            for (let i = 0, l = event.length; i < l; i++)
            {
                snake.$on(event[i], fn)
            }
        }
        else
        {
            (snake._events[event] || (snake._events[event] = [])).push(fn)
        }

        return snake
    }

    Snake.prototype.$once = function (event, fn)
    {
        const snake = this
        function on ()
        {
            snake.$off(event, on)
            fn.apply(snake, arguments)
        }
        on.fn = fn
        snake.$on(event, on)
        return snake
    }

    Snake.prototype.$off = function (event, fn)
    {
        const snake = this
        if (!arguments.length)
        {
            snake._events = Object.create(null)
            return snake
        }
        if (Array.isArray(event))
        {
            for (let i = 0, l = event.length; i < l; i++)
            {
                snake.$off(event[i], fn)
            }
            return snake
        }

        const cbs = snake._events[event]
        if (!cbs)
        {
            return snake
        }

        if (!fn)
        {
            snake._events[event] = null
            return snake
        }
        let cb
        let i = cbs.length
        while (i--)
        {
            cb = cbs[i]
            if (cb === fn || cb.fn === fn)
            {
                cbs.splice(i, 1)
                break
            }
        }
        return snake
    }

    Snake.prototype.$emit = function (event)
    {
        const snake = this
        let cbs = snake._events[event]
        if (cbs)
        {
            cbs = cbs.length > 1 ? toArray(cbs) : cbs
            const args = toArray(arguments, 1)
            for (let i = 0, l = cbs.length; i < l; i++)
            {
                invoke(cbs[i], snake, args)
            }
        }
        return snake
    }
}

export function invoke (handler, context, args)
{
    let res
    try {
        res = args ? handler.apply(context, args) : handler.call(context)
    } catch (e) {
        console.error(e)
    }
    return res
}