import {XY} from '../../math/xy/XY'
import {IntParser} from '../../math/IntParser'
import {DecamillipixelIntXYConfig} from './DecamillipixelIntXYConfig'

export namespace DecamillipixelIntXYParser {
  export function parse(config: DecamillipixelIntXYConfig): XY {
    return {
      x: config && config.x !== undefined ? IntParser.parse(config.x) : 0,
      y: config && config.y !== undefined ? IntParser.parse(config.y) : 0
    }
  }
}
