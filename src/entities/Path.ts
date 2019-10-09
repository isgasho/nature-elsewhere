import {Entity} from '../entity/Entity'
import {EntityType} from '../entity/EntityType'
import {ImageRect} from '../imageStateMachine/ImageRect'
import {Image} from '../image/Image'
import {AtlasID} from '../atlas/AtlasID'
import {Atlas} from 'aseprite-atlas'
import {CollisionType} from '../collision/CollisionType'
import {XY} from '../math/XY'
import {Layer} from '../image/Layer'
import {JSON} from '../utils/JSON'
import {ObjectUtil} from '../utils/ObjectUtil'

export class Path extends Entity<Path.Variant, Path.State> {
  constructor(atlas: Atlas, props?: Entity.SubProps<Path.Variant, Path.State>) {
    super({
      ...defaults,
      map: {
        [Entity.BaseState.HIDDEN]: new ImageRect(),
        [Path.State.VISIBLE]: new ImageRect({
          images: variantImages(
            atlas,
            (props && props.variant) || Path.Variant.STRAIGHT_NE
          )
        })
      },
      ...props
    })
  }

  toJSON(): JSON {
    return this._toJSON(defaults)
  }
}

export namespace Path {
  export enum Variant {
    STRAIGHT_NE = '/',
    STRAIGHT_NW = '\\',
    CORNER_N = '^',
    CORNER_E = '>',
    CORNER_S = 'v',
    CORNER_W = '<'
  }
  export enum State {
    VISIBLE = 'visible'
  }
}

function variantImages(atlas: Atlas, variant: Path.Variant): Image[] {
  switch (variant) {
    case Path.Variant.STRAIGHT_NE:
      return [
        new Image(atlas, {
          id: AtlasID.SCENERY_PATH_NE,
          layer: Layer.ABOVE_PLANE
        })
      ]
    case Path.Variant.STRAIGHT_NW:
      return [
        new Image(atlas, {
          id: AtlasID.SCENERY_PATH_NE,
          layer: Layer.ABOVE_PLANE,
          scale: new XY(-1, 1)
        })
      ]
    case Path.Variant.CORNER_E:
      return [
        new Image(atlas, {
          id: AtlasID.SCENERY_PATH_CORNER_E,
          layer: Layer.ABOVE_PLANE
        })
      ]
    case Path.Variant.CORNER_W:
      return [
        new Image(atlas, {
          id: AtlasID.SCENERY_PATH_CORNER_E,
          layer: Layer.ABOVE_PLANE,
          scale: new XY(-1, 1)
        })
      ]
    case Path.Variant.CORNER_N:
      return [
        new Image(atlas, {
          id: AtlasID.SCENERY_PATH_CORNER_N,
          layer: Layer.ABOVE_PLANE
        })
      ]
    case Path.Variant.CORNER_S:
      return [
        new Image(atlas, {
          id: AtlasID.SCENERY_PATH_CORNER_N,
          layer: Layer.ABOVE_PLANE,
          scale: new XY(1, -1)
        })
      ]
  }
}

const defaults = ObjectUtil.freeze({
  type: EntityType.SCENERY_PATH,
  variant: Path.Variant.STRAIGHT_NE,
  state: Path.State.VISIBLE,
  collisionType: CollisionType.TYPE_SCENERY
})
