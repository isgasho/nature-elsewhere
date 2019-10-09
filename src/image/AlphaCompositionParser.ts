import {AlphaComposition} from './AlphaComposition'
import {ObjectUtil} from '../utils/ObjectUtil'

export type AlphaCompositionConfig = Maybe<AlphaComposition>

export namespace AlphaCompositionParser {
  export function parse(config: AlphaCompositionConfig): AlphaComposition {
    const composition = config === undefined ? AlphaComposition.IMAGE : config
    ObjectUtil.assertKeyOf(AlphaComposition, composition, 'AlphaComposition')
    return composition
  }
}
