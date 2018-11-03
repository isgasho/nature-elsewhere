import * as entity from './entity.js'
import * as player from './player.js'
import {EntityID} from './entity-id.js'

/** @typedef {import('../drawables/atlas').Atlas} Atlas} */
/** @typedef {import('./entity').State} Entity} */
/** @typedef {import('../level').Level} Level */
/** @typedef {import('../inputs/recorder').ReadState} Recorder} */

/**
 * @typedef {(entity: Entity, step: number, atlas: Atlas, recorder: Recorder, level: Level, cam: WH) => void} Step
 */

/** @type {Readonly<Partial<Record<EntityID, Step>>>} */
export const Behavior = {
  [EntityID.PLAYER]: player.step,
  [EntityID.CLOUD]: wraparound,
  [EntityID.RAIN_CLOUD]: wraparound
}

/** @type {Step} */
export function wraparound(entityState, step, atlas, _recorder, level, cam) {
  entity.step(entityState, step, atlas)
  const start = level.bounds.x - cam.w
  const end = level.bounds.x + level.bounds.w + cam.w
  entityState.position.x =
    ((entityState.position.x - end) % (start - end)) + end
}