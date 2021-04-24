import { initMixin } from "./init"
import { eventsMixin } from "./events"
import { mapMixin } from "./map/index"
import { renderMixin } from "./render"
import { snakeMixin } from "./snake"
import { foodMixin } from "./foods"
import { moveMixin } from "./move"

function Snake (el, options)
{
    this._init(el, options)
}

initMixin(Snake)
eventsMixin(Snake)
mapMixin(Snake)
renderMixin(Snake)
snakeMixin(Snake)
foodMixin(Snake)
moveMixin(Snake)

export default Snake