import { initMixin } from "./init"
import { eventsMixin } from "./events"
import { controlsMixin } from "./controls/index"
import { mapMixin } from "./map/index"
import { renderMixin } from "./render"
import { snakeMixin } from "./snake"
import { foodMixin } from "./foods"
import { moveMixin } from "./move"
import { gameMixin } from "./game"

function Snake (el, options)
{
    this._init(el, options)
}

initMixin(Snake)
eventsMixin(Snake)
controlsMixin(Snake)
mapMixin(Snake)
renderMixin(Snake)
snakeMixin(Snake)
foodMixin(Snake)
moveMixin(Snake)
gameMixin(Snake)

export default Snake