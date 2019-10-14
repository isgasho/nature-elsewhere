import {Atlas} from 'aseprite-atlas'
import {AtlasID} from '../atlas/AtlasID'
import {Entity} from '../entity/Entity'
import {EntitySerializer} from '../entity/EntitySerializer'
import {EntityType} from '../entity/EntityType'
import {CollisionType} from '../collision/CollisionType'
import {CollisionPredicate} from '../collision/CollisionPredicate'
import {ImageRect} from '../imageStateMachine/ImageRect'
import {Image} from '../image/Image'
import {JSONValue} from '../utils/JSON'
import {Layer} from '../image/Layer'
import {ObjectUtil} from '../utils/ObjectUtil'
import {Rect} from '../math/Rect'
import {UpdatePredicate} from '../updaters/updatePredicate/UpdatePredicate'

export class Bee extends Entity<Bee.Variant, Bee.State> {
  constructor(atlas: Atlas, props?: Entity.SubProps<Bee.Variant, Bee.State>) {
    super({
      ...defaults,
      collisionBodies: defaults.collisionBodies.map(Rect.copy),
      map: {
        [Entity.BaseState.HIDDEN]: new ImageRect(),
        [Bee.State.IDLE]: new ImageRect({
          images: [
            new Image(atlas, {id: AtlasID.BEE}),
            new Image(atlas, {id: AtlasID.BEE_SHADOW, layer: Layer.SHADOW})
          ]
        }),
        [Bee.State.DEAD]: new ImageRect({
          images: [
            new Image(atlas, {id: AtlasID.BEE_DEAD}),
            new Image(atlas, {id: AtlasID.BEE_BLOOD, layer: Layer.BLOOD})
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

export namespace Bee {
  export enum Variant {
    NONE = 'none'
  }

  export enum State {
    IDLE = 'idle',
    DEAD = 'dead'
  }
}

const defaults = ObjectUtil.freeze({
  type: EntityType.BEE,
  variant: Bee.Variant.NONE,
  state: Bee.State.IDLE,
  updatePredicate: UpdatePredicate.INTERSECTS_VIEWPORT,
  collisionType: CollisionType.TYPE_CHARACTER | CollisionType.HARMFUL,
  collisionPredicate: CollisionPredicate.BODIES,
  collisionBodies: [Rect.make(1, 1, 3, 2)]
})
