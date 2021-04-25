import Node from "./node"

export default class LinkedList
{
    constructor()
    {
        this.head = null
        this.tail = null
    }

    append(id, data)
    {
        const node = new Node(id, data)

        if (this.tail)
        {
            this.tail.next = node
        }

        if (!this.head)
        {
            this.head = node
        }

        this.tail = node
    }

    prepend(id, data)
    {
        const node = new Node(id, data, this.head)

        this.head = node

        if (!this.tail)
        {
            this.tail = node
        }
    }

    find(cb, ctx = null)
    {
        if (!this.head || typeof cb !== 'function')
        {
            return null
        }

        let current = this.head
        while (current)
        {
            try {
                let res = cb.apply(ctx, [current.data, current.id])
                if (!!res)
                {
                    return current.data
                }
            } catch (e) {
                console.error(e)
            }
            current = current.next
        }
        return null
    }

    toArray()
    {
        const output = []
        this.for((data) => {
            output.push(data)
        }, this)

        return output
    }

    for(cb, ctx = null)
    {
        if (!this.head || typeof cb !== 'function')
        {
            return
        }

        let current = this.head
        while (current)
        {
            try {
                cb.apply(ctx, [current.data, current.id])
            } catch (e) {
                console.error(e)
            }
            current = current.next
        }
    }

    filter(cb, ctx = null)
    {
        let items = []
        if (typeof cb !== 'function')
        {
            return items
        }
        let current = this.head
        while (current)
        {
            try {
                let res = cb.apply(ctx, [current.data, current.id])
                if (!!res)
                {
                    items.push(current.data)
                }
            } catch (e) {
                console.error(e)
            }
            current = current.next
        }
        return items
    }

    get length()
    {
        let count = 0
        let current = this.head

        while (current)
        {
            count++
            current = current.next
        }

        return count
    }

    remove(id)
    {
        if (!this.head)
        {
            return
        }

        while (this.head && this.head.id === id)
        {
            this.head = this.head.next
        }

        let current = this.head
        while (current && current.next)
        {
            if (current.next.id === id)
            {
                current.next = current.next.next
            }
            else
            {
                current = current.next
            }
        }

        if (this.tail.id === id)
        {
            this.tail = current
        }
    }

    clean()
    {
        this.head = null
        this.tail = null
    }
}