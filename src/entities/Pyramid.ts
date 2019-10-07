import {Entity} from '../entity/Entity'
import {EntityType} from '../entity/EntityType'
import {ImageRect} from '../imageStateMachine/ImageRect'
import {Image} from '../image/Image'
import {AtlasID} from '../atlas/AtlasID'
import {Layer} from '../image/Layer'
import {CollisionPredicate} from '../collision/CollisionPredicate'
import {Rect} from '../math/Rect'
import {CollisionType} from '../collision/CollisionType'
import {Atlas} from 'aseprite-atlas'

export class Pyramid extends Entity<Pyramid.State> {
  constructor(atlas: Atlas, props?: Entity.SubProps<Pyramid.State>) {
    super({
      type: EntityType.SCENERY_PYRAMID,
      state: Pyramid.State.VISIBLE,
      map: {
        [Entity.BaseState.HIDDEN]: new ImageRect(),
        [Pyramid.State.VISIBLE]: new ImageRect({
          images: [
            new Image(atlas, {id: AtlasID.SCENERY_PYRAMID}),
            new Image(atlas, {
              id: AtlasID.SCENERY_PYRAMID_SHADOW,
              layer: Layer.SHADOW
            })
          ]
        })
      },
      collisionPredicate: CollisionPredicate.BODIES,
      collisionBodies: [
        Rect.make(0, 12, 5, 8),
        Rect.make(5, 9, 20, 14),
        Rect.make(7, 17, 15, 6),
        Rect.make(25, 12, 5, 8)
      ],
      collisionType: CollisionType.TYPE_SCENERY | CollisionType.OBSTACLE,
      ...props
    })
  }
}

export namespace Pyramid {
  export enum State {
    VISIBLE = 'visible'
  }
}