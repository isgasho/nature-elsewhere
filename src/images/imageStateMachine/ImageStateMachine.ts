import {EntityState} from '../../entities/entityState/EntityState'
import {ImageRect} from '../imageRect/ImageRect'
import {UpdateStatus} from '../../entities/updaters/updateStatus/UpdateStatus'
import {Layer} from '../layer/layer'
import {XY} from '../../math/xy/XY'

// origin in level XY
// would be nice to make all changes at once instead of walking th eimages multiple itmes.
export interface ImageStateMachine {
  state: EntityState | string
  map: Readonly<Record<EntityState | string, ImageRect>>
}

export namespace ImageStateMachine {
  export function imageRect(machine: ImageStateMachine): ImageRect {
    return machine.map[machine.state]
  }

  export function setState(
    machine: ImageStateMachine,
    state: EntityState | string
  ): UpdateStatus {
    if (machine.state === state) return UpdateStatus.UNCHANGED
    const {bounds, scale} = machine.map[machine.state]
    machine.state = state
    ImageRect.moveTo(machine.map[machine.state], bounds)
    setScale(machine, scale)
    return UpdateStatus.UPDATED
  }

  export function setScale(machine: ImageStateMachine, scale: XY): void {
    ImageRect.setScale(machine.map[machine.state], scale)
  }

  /** Raise or lower all images for all states. */
  export function elevate(machine: ImageStateMachine, offset: Layer): void {
    for (const state in machine.map)
      ImageRect.elevate(machine.map[state], offset)
  }

  export function resetAnimation(machine: ImageStateMachine): void {
    for (const {animator} of machine.map[machine.state].images) {
      animator.period = 0
      animator.exposure = 0
    }
  }
}