import {Entity} from '../entity/Entity'
import {EntityType} from '../entity/EntityType'
import {ImageRect} from '../imageStateMachine/ImageRect'
import {Image} from '../image/Image'
import {AtlasID} from '../atlas/AtlasID'
import {Layer} from '../image/Layer'
import {Atlas} from 'aseprite-atlas'
import {CollisionType} from '../collision/CollisionType'
import {XY} from '../math/XY'

export class Pond extends Entity<Pond.State> {
  constructor(atlas: Atlas, props?: Entity.SubProps<Pond.State>) {
    super({
      type: EntityType.SCENERY_POND,
      state: Pond.State.VISIBLE,
      map: {
        [Entity.BaseState.HIDDEN]: new ImageRect(),
        [Pond.State.VISIBLE]: new ImageRect({
          images: [
            new Image(atlas, {
              id: AtlasID.SCENERY_POND,
              layer: Layer.ABOVE_PLANE
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_CATTAILS,
              position: new XY(15, -3)
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_GRASS_1,
              position: new XY(1, 4)
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_GRASS_2,
              position: new XY(12, 11)
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_GRASS_6,
              position: new XY(24, 4)
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_GRASS_8,
              position: new XY(26, 6)
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_GRASS_9,
              position: new XY(11, -1)
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_GRASS_10,
              position: new XY(6, 10)
            }),
            new Image(atlas, {
              id: AtlasID.SCENERY_GRASS_5,
              position: new XY(21, 10)
            })
          ]
        })
      },
      collisionType:
        CollisionType.TYPE_SCENERY |
        CollisionType.DEEP_WATER |
        CollisionType.IMPEDIMENT,
      ...props
    })
  }
}

export namespace Pond {
  export enum State {
    VISIBLE = 'visible'
  }
}