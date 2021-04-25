const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn(obj, key)
{
    return hasOwnProperty.call(obj, key)
}

export function randomInt (max)
{
    return Math.floor(Math.random() * max)
}

export * from "./directions"
export * from "./options"
export * from "./type"
export * from "./dom"

import LinkedList from "./linked-list/index"

export { LinkedList }