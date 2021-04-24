export function isString (v)
{
    return typeof v === 'string'
}

export function isNil (v)
{
    return v === undefined || v === null
}

export function isObject (v)
{
    return !!v && typeof v === 'object'
}

export function isDomNode (v)
{
    return isObject(v) && 'nodeType' in v
}

export function toArray (list, start)
{
    start = start || 0
    let i = list.length - start
    const ret = new Array(i)
    while (i--)
    {
        ret[i] = list[i + start]
    }
    return ret
}