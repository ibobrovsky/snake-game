import {
    isString,
    isDomNode,
} from "./type"

export function createElement (tag = 'div')
{
    if (isString(tag) && tag.length)
    {
        return document.createElement(tag)
    }
    return null
}

export function createFragment ()
{
    return document.createDocumentFragment()
}

export function createTextNode (string)
{
    return document.createTextNode(string)
}

export function query (selector)
{
    if (isString(selector))
    {
        const node = document.querySelector(selector)
        if (node)
        {
            return node
        }
    }
    else if (isDomNode(selector))
    {
        return selector
    }

    return createElement('div')
}