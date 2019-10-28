import { Entity } from "perform-ecs"

export const toReact = (entity: Entity) :any => {
    return entity.components.reduce((acc, val) => { return {...acc, ...val.args[0]}}, {})
}


