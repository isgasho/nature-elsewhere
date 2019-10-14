import {Atlas} from 'aseprite-atlas'
import {AtlasID} from '../atlas/AtlasID'
import {CollisionPredicate} from '../collision/CollisionPredicate'
import {CollisionType} from '../collision/CollisionType'
import {Entity} from '../entity/Entity'
import {EntitySerializer} from '../entity/EntitySerializer'
import {EntityType} from '../entity/EntityType'
import {Image} from '../image/Image'
import {ImageRect} from '../imageStateMachine/ImageRect'
import {JSONValue} from '../utils/JSON'
import {Layer} from '../image/Layer'
import {ObjectUtil} from '../utils/ObjectUtil'
import {Rect} from '../math/Rect'
import {XY} from '../math/XY'

export class Pond extends Entity<Pond.Variant, Pond.State> {
  constructor(atlas: Atlas, props?: Entity.SubProps<Pond.Variant, Pond.State>) {
    super({
      ...defaults,
      collisionBodies: defaults.collisionBodies.map(Rect.copy),
      map: {
        [Entity.BaseState.HIDDEN]: new ImageRect(),
        [Pond.State.VISIBLE]: new ImageRect({
          images: [
            new Image(atlas, {id: AtlasID.POND, layer: Layer.ABOVE_PLANE}),
            new Image(atlas, {id: AtlasID.CATTAILS, position: new XY(10, -5)}),
            new Image(atlas, {id: AtlasID.GRASS_01, position: new XY(1, 4)}),
            new Image(atlas, {id: AtlasID.GRASS_02, position: new XY(12, 11)}),
            new Image(atlas, {id: AtlasID.GRASS_09, position: new XY(18, 0)}),
            new Image(atlas, {id: AtlasID.GRASS_10, position: new XY(5, 10)}),
            new Image(atlas, {id: AtlasID.GRASS_05, position: new XY(17, 9)}),
            new Image(atlas, {id: AtlasID.GRASS_11, position: new XY(21, 3)}),
            new Image(atlas, {id: AtlasID.GRASS_03, position: new XY(0, 5)}),
            new Image(atlas, {id: AtlasID.GRASS_06, position: new XY(0, 0)}),
            new Image(atlas, {id: AtlasID.GRASS_07, position: new XY(4, -2)})
          ]
        })
      },
      ...props
    })
  }

  toJSON(): JSONValue {
    return EntitySerializer.serialize(this, defaults)
  }
}

export namespace Pond {
  export enum Variant {
    NONE = 'none'
  }

  export enum State {
    VISIBLE = 'visible'
  }
}

const defaults = ObjectUtil.freeze({
  type: EntityType.POND,
  variant: Pond.Variant.NONE,
  state: Pond.State.VISIBLE,
  collisionType:
    CollisionType.TYPE_SCENERY |
    CollisionType.DEEP_WATER |
    CollisionType.IMPEDIMENT,
  collisionPredicate: CollisionPredicate.BODIES,
  collisionBodies: [Rect.make(6, 3, 10, 7), Rect.make(5, 5, 12, 4)]
})
