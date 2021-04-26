import { hasOwn } from "./index"

export const defaultOptions = {
    rows: 20,
    columns: 20
}

export function mergeOptions (parent, child)
{
    const options = {}
    let key
    for (key in parent)
    {
        mergeField(key)
    }
    for (key in child)
    {
        if (!hasOwn(parent, key))
        {
            mergeField(key)
        }
    }
    function mergeField (key)
    {
        options[key] = child[key] === undefined ? parent[key] : child[key]
    }
    return options
}