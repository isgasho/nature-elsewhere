import {Updater} from './updater'
import {Entity} from '../entity'
import {UpdateStatus} from './update-status'
import {InputSource} from '../../inputs/input-source'
import {InputBit} from '../../inputs/input-bit'
import {XY} from '../../math/xy'

export namespace DestinationMarker {
  export enum State {
    VISIBLE = 'visible'
  }
  export const update: Updater.Update = (marker, state) => {
    const [set] = state.input.combo.slice(-1)
    const pick = set && set[InputSource.POINTER_PICK]

    let status = UpdateStatus.UNCHANGED
    if (pick && pick.bits === InputBit.PICK) {
      status |= Entity.setState(marker, State.VISIBLE)
      Entity.imageState(marker).images.forEach(
        image => ((image.animator.exposure = 0), (image.animator.period = 0))
      )
      status |= Entity.moveTo(marker, XY.sub(pick.xy, {x: 1, y: 1}))
    }

    return status
  }
}