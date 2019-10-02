import {Atlas} from 'aseprite-atlas'
import {AtlasID} from '../../../atlas/AtlasID'
import {Checkbox, CheckboxState} from './Checkbox'
import {Entity} from '../../../entity/Entity'
import {EntityType} from '../../../entity/EntityType'
import {IEntityParser} from '../../RecursiveEntityParser'
import {ImageConfig, ImageParser} from '../../../image/ImageParser'
import {Image} from '../../../image/Image'
import {ImageRect} from '../../../imageStateMachine/ImageRect'
import {Layer} from '../../../image/Layer'
import {TextConfig} from '../text/TextParser'
import {WH} from '../../../math/WH'
import {XY} from '../../../math/XY'

export namespace CheckboxParser {
  export function parse(
    checkbox: Entity,
    atlas: Atlas,
    parser: IEntityParser
  ): Checkbox {
    if (!checkbox.assert<Checkbox>(EntityType.UI_CHECKBOX)) throw new Error()
    setText(checkbox, 0, checkbox.text, atlas, parser)
    if (!('checked' in checkbox)) (<Checkbox>checkbox).checked = false
    return <Checkbox>checkbox
  }

  export function setText(
    checkbox: Checkbox,
    layer: Layer,
    text: string,
    atlas: Atlas,
    parser: IEntityParser
  ): void {
    checkbox.text = text
    const config: TextConfig = {
      type: EntityType.UI_TEXT,
      text: text,
      textLayer: checkbox.textLayer,
      textScale: {...checkbox.textScale},
      textMaxSize: {...checkbox.textMaxSize},
      position: {
        x: checkbox.bounds.position.x + 1,
        y: checkbox.bounds.position.y
      },
      imageID: checkbox.imageRect().imageID
    }
    const child = parser(config, atlas)
    child.elevate(layer)
    checkbox.children[0] = child
    setBackground(checkbox, layer, atlas)
    checkbox.invalidateBounds()
  }
}

function setBackground(checkbox: Checkbox, layer: Layer, atlas: Atlas): void {
  const text = checkbox.children[0]
  for (const state of [CheckboxState.UNCHECKED, CheckboxState.CHECKED]) {
    const size = new WH(text.bounds.size.w, text.bounds.size.h)
    checkbox.machine.map[state].images.length = 0
    const images = newBackgroundImages(state, layer, atlas, size)
    for (const image of images)
      ImageRect.add(checkbox.machine.map[state], image)
    ImageRect.moveTo(
      checkbox.machine.map[state],
      new XY(text.bounds.position.x - 1, checkbox.bounds.position.y)
    )
  }
}

function newBackgroundImages(
  state: CheckboxState,
  layerOffset: Layer,
  atlas: Atlas,
  {w, h}: WH
): Image[] {
  const id = backgroundID[state]
  const layer = 'UI_MID'
  const background: ImageConfig = {
    id,
    bounds: {position: {x: 1}, size: {w, h}},
    layer
  }
  const border: ImageConfig = {
    id,
    bounds: {position: {y: 1}, size: {w: w + 2, h: h - 2}},
    layer
  }
  const backgroundImage = ImageParser.parse(background, atlas)
  const borderImage = ImageParser.parse(border, atlas)
  Image.elevate(backgroundImage, layerOffset)
  Image.elevate(borderImage, layerOffset)
  return [backgroundImage, borderImage]
}
const backgroundID: Readonly<Record<CheckboxState, AtlasID>> = Object.freeze({
  [CheckboxState.UNCHECKED]: AtlasID.PALETTE_PALE_GREEN,
  [CheckboxState.CHECKED]: AtlasID.PALETTE_LIGHT_GREEN
})
