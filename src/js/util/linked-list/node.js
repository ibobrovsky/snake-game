export default class Node
{
    constructor(id, data, next = null)
    {
        this.id = id
        this.data = data
        this.next = next
    }
}