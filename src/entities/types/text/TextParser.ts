import {Atlas} from '../../../atlas/atlas/Atlas'
import {Entity} from '../../entity/Entity'
import {EntityType} from '../../entityType/EntityType'
import {Limits} from '../../../math/Limits'
import {Image} from '../../../images/image/Image'
import {Layer} from '../../../images/layer/layer'
import {XY} from '../../../math/xy/XY'
import {TextLayout} from '../../../text/textLayout/TextLayout'
import {Rect} from '../../../math/rect/Rect'
import {XYParser} from '../../../math/xy/XYParser'
import {ImageParser} from '../../../images/image/ImageParser'
import {Text} from './Text'
import {UI_MEM_FONT_PREFIX} from '../../../atlas/atlasID/AtlasID'
import {EntityTypeUtil} from '../../entityType/EntityTypeUtil'
import {EntityUtil} from '../../entity/EntityUtil'

export namespace TextParser {
  export function parse(text: Entity, atlas: Atlas): Text {
    if (!EntityTypeUtil.assert<Text>(text, EntityType.UI_TEXT))
      throw new Error()

    const textImages = toImages(
      atlas,
      text.text,
      text.textLayer,
      XYParser.parse(text.textScale),
      {
        x: EntityUtil.imageState(text).bounds.x,
        y: EntityUtil.imageState(text).bounds.y,
        w:
          text.textMaxSize && text.textMaxSize.w
            ? text.textMaxSize.w
            : Limits.maxShort,
        h:
          text.textMaxSize && text.textMaxSize.h
            ? text.textMaxSize.h
            : Limits.maxShort
      }
    )

    // Images are added dynamically but ImageRect expects a static configuration
    // determined at parse time. Recalculate the bounds.
    EntityUtil.imageState(text).images.push(...textImages)
    const union = Rect.unionAll(
      EntityUtil.imageState(text).images.map(image => image.bounds)
    )
    if (union) {
      EntityUtil.imageState(text).bounds.x = union.x
      EntityUtil.imageState(text).bounds.y = union.y
      EntityUtil.imageState(text).bounds.w = union.w
      EntityUtil.imageState(text).bounds.h = union.h
    }
    EntityUtil.invalidateBounds(text)
    return text
  }

  /** @arg y The vertical scroll offset in pixels. */
  function toImages(
    atlas: Atlas,
    string: string,
    layer: Layer.Key,
    scale: XY,
    bounds: Rect,
    y: number = 0
  ): readonly Image[] {
    const images = []
    const {positions} = TextLayout.layout(string, bounds.w, scale)
    for (let i = 0; i < positions.length; ++i) {
      const position = positions[i]
      if (!position) continue
      if (TextLayout.nextLine(position.y, scale).y < y) continue
      if (position.y > y + bounds.h) break

      const char = newCharacterImage(
        string.charCodeAt(i),
        {x: bounds.x + position.x, y: bounds.y + position.y - y},
        layer,
        scale,
        atlas
      )
      images.push(char)
    }
    return images
  }
}

function newCharacterImage(
  char: number,
  position: XY,
  layer: Layer.Key,
  scale: XY,
  atlas: Atlas
): Image {
  const id = UI_MEM_FONT_PREFIX + char
  return ImageParser.parse({id, bounds: position, layer, scale}, atlas)
}