import * as atlas from './atlas.js'
import * as entity from './entity.js'
import * as recorder from '../inputs/recorder.js'
import * as shader from '../graphics/shader.js'

/** @typedef {{memory: Int16Array; readonly entities: entity.State[]}} State */

/** @return {State} */
export function newState() {
  return {memory: new Int16Array(), entities: []}
}

/**
 * @arg {State} state
 * @arg {ReadonlyArray<entity.State>} entities
 * @return {void}
 */
export function nextSpawnState(state, entities) {
  entities.forEach(entity => {
    let index = state.entities.findIndex(
      val => entity._drawOrder <= val._drawOrder
    )
    state.entities.splice(
      index === -1 ? state.entities.length : index,
      0,
      entity
    )
  })
}

/**
 * @arg {State} state
 * @arg {number} step
 * @arg {atlas.State} atlas
 * @arg {recorder.ReadState} recorderState
 * @return {void}
 */
export function nextStepState(state, step, atlas, recorderState) {
  state.entities.forEach(val => val.nextStepState(step, atlas, recorderState))
}

/**
 * @arg {State} state
 * @return {void}
 */
export function flushUpdatesToMemory(state) {
  const length = state.entities.length
  if (state.memory.length < length * shader.layout.perInstance.length) {
    state.memory = new Int16Array(length * shader.layout.perInstance.length * 2)
  }
  state.entities.forEach((s, i) => {
    const coord = s.bounds
    // prettier-ignore
    state.memory.set([coord.x, coord.y, coord.w, coord.h,
                      s._scrollPosition.x, s._scrollPosition.y,
                      s._position.x, s._position.y,
                      s._scale.x, s._scale.y],
                      i * shader.layout.perInstance.length)
  })
}