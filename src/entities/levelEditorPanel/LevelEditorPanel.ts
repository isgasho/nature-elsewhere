import {Atlas} from 'aseprite-atlas'
import {AtlasID} from '../../atlas/AtlasID'
import {Button} from '../Button'
import {Checkbox} from '../Checkbox'
import {CollisionPredicate} from '../../collision/CollisionPredicate'
import {CollisionType} from '../../collision/CollisionType'
import {EntityFactory} from '../../entity/EntityFactory'
import {Entity} from '../../entity/Entity'
import {EntityID} from '../../entity/EntityID'
import {EntityPicker} from '../EntityPicker'
import {
  EntityType,
  SCENERY_VALUE_PREFIX,
  CHAR_VALUE_PREFIX
} from '../../entity/EntityType'
import {
  FollowCam,
  FollowCamOrientation
} from '../../updaters/followCam/FollowCam'
import {Group} from '../Group'
import {Image} from '../../image/Image'
import {ImageRect} from '../../imageStateMachine/ImageRect'
import {JSON} from '../../utils/JSON'
import {Layer} from '../../image/Layer'
import {LevelEditorPanelBackground} from './LevelEditorPanelBackground'
import {Marquee} from '../Marquee'
import {Plane} from '../Plane'
import {RadioCheckboxGroup} from '../RadioCheckboxGroup'
import {Text} from '../text/Text'
import {UpdatePredicate} from '../../updaters/updatePredicate/UpdatePredicate'
import {UpdaterType} from '../../updaters/updaterType/UpdaterType'
import {UpdateState} from '../../updaters/UpdateState'
import {UpdateStatus} from '../../updaters/updateStatus/UpdateStatus'
import {WH} from '../../math/WH'
import {XY} from '../../math/XY'
import {ObjectUtil} from '../../utils/ObjectUtil'

export class LevelEditorPanel
  extends Entity<LevelEditorPanel.Variant, LevelEditorPanel.State>
  implements FollowCam {
  readonly radioGroup: Entity
  readonly xCheckbox: Checkbox
  readonly yCheckbox: Checkbox
  readonly variantCheckbox: Checkbox
  readonly stateCheckbox: Checkbox
  readonly entityCheckbox: Checkbox
  readonly entityPicker: EntityPicker
  readonly decrementButton: Button
  readonly incrementButton: Button
  readonly destroyButton: Button
  readonly createButton: Button
  readonly toggleGridButton: Button
  readonly positionRelativeToCam: FollowCamOrientation
  readonly camMargin: WH

  constructor(
    atlas: Atlas,
    props?: Entity.SubProps<LevelEditorPanel.Variant, LevelEditorPanel.State>
  ) {
    super({
      ...defaults,
      updaters: [...defaults.updaters],
      map: {
        [Entity.BaseState.HIDDEN]: new ImageRect(),
        [LevelEditorPanel.State.VISIBLE]: new ImageRect()
      },
      ...props
    })

    this.variantCheckbox = new Checkbox(atlas, {
      textMaxSize: new WH(31, 5),
      position: new XY(55, 14),
      imageID: AtlasID.PALETTE_BLACK
    })
    this.stateCheckbox = new Checkbox(atlas, {
      textMaxSize: new WH(34, 5),
      position: new XY(52, 20),
      imageID: AtlasID.PALETTE_BLACK
    })
    this.xCheckbox = new Checkbox(atlas, {
      text: '0',
      textLayer: Layer.UI_HI,
      position: new XY(46, 26),
      imageID: AtlasID.PALETTE_BLACK
    })
    this.yCheckbox = new Checkbox(atlas, {
      text: '0',
      textLayer: Layer.UI_HI,
      position: new XY(68, 26),
      imageID: AtlasID.PALETTE_BLACK
    })
    this.entityCheckbox = new Checkbox(atlas, {
      state: Checkbox.State.CHECKED,
      textMaxSize: new WH(32, 5),
      position: new XY(88, 2),
      imageID: AtlasID.PALETTE_BLACK
    })
    this.radioGroup = new RadioCheckboxGroup({
      children: [
        new Text(atlas, {
          text: 'var',
          textLayer: Layer.UI_HI,
          position: new XY(44, 14)
        }),
        this.variantCheckbox,
        new Text(atlas, {
          text: 'st',
          textLayer: Layer.UI_HI,
          position: new XY(44, 20)
        }),
        this.stateCheckbox,
        new Text(atlas, {
          text: 'x',
          textLayer: Layer.UI_HI,
          position: new XY(42, 26)
        }),
        this.xCheckbox,
        new Text(atlas, {
          text: 'y',
          textLayer: Layer.UI_HI,
          position: new XY(64, 26)
        }),
        this.yCheckbox,
        this.entityCheckbox
      ]
    })
    this.decrementButton = new Button(atlas, {
      position: new XY(2, 22),
      children: [
        new Group({
          map: {
            [Entity.BaseState.HIDDEN]: new ImageRect(),
            [Group.State.VISIBLE]: new ImageRect({
              images: [
                new Image(atlas, {
                  id: AtlasID.UI_BUTTON_DECREMENT,
                  layer: Layer.UI_HIHI
                })
              ]
            })
          }
        })
      ]
    })
    this.incrementButton = new Button(atlas, {
      position: new XY(10, 22),
      children: [
        new Group({
          map: {
            [Entity.BaseState.HIDDEN]: new ImageRect(),
            [Group.State.VISIBLE]: new ImageRect({
              images: [
                new Image(atlas, {
                  id: AtlasID.UI_BUTTON_INCREMENT,
                  layer: Layer.UI_HIHI
                })
              ]
            })
          }
        })
      ]
    })
    this.destroyButton = new Button(atlas, {
      position: new XY(18, 22),
      children: [
        new Group({
          map: {
            [Entity.BaseState.HIDDEN]: new ImageRect(),
            [Group.State.VISIBLE]: new ImageRect({
              images: [
                new Image(atlas, {
                  id: AtlasID.UI_BUTTON_DESTROY,
                  layer: Layer.UI_HIHI
                })
              ]
            })
          }
        })
      ]
    })
    this.createButton = new Button(atlas, {
      position: new XY(26, 22),
      children: [
        new Group({
          map: {
            [Entity.BaseState.HIDDEN]: new ImageRect(),
            [Group.State.VISIBLE]: new ImageRect({
              images: [
                new Image(atlas, {
                  id: AtlasID.UI_BUTTON_CREATE,
                  layer: Layer.UI_HIHI
                })
              ]
            })
          }
        })
      ]
    })
    this.toggleGridButton = new Button(atlas, {
      position: new XY(34, 22),
      children: [
        new Group({
          map: {
            [Entity.BaseState.HIDDEN]: new ImageRect(),
            [Group.State.VISIBLE]: new ImageRect({
              images: [
                new Image(atlas, {
                  id: AtlasID.UI_BUTTON_TOGGLE_GRID,
                  layer: Layer.UI_HIHI
                })
              ]
            })
          }
        })
      ]
    })
    this.entityPicker = new EntityPicker(atlas, {position: new XY(89, 0)})
    this.addChildren(
      this.decrementButton,
      this.incrementButton,
      this.destroyButton,
      this.createButton,
      this.toggleGridButton,
      this.entityPicker,
      this.radioGroup,
      new LevelEditorPanelBackground(atlas)
    )

    this.setEntityFields(0, atlas)

    this.positionRelativeToCam = FollowCamOrientation.SOUTH_EAST
    this.camMargin = new WH(0, 0)
  }

  update(state: UpdateState): UpdateStatus {
    let status = super.update(state)
    if (
      this.decrementButton.clicked ||
      this.decrementButton.longClicked ||
      this.incrementButton.clicked ||
      this.incrementButton.longClicked
    ) {
      const offset =
        this.decrementButton.clicked || this.decrementButton.longClicked
          ? -1
          : this.incrementButton.clicked || this.incrementButton.longClicked
          ? 1
          : 0
      if (this.xCheckbox.checked())
        this._updateNumberCheckbox(this.xCheckbox, state, offset)
      else if (this.yCheckbox.checked())
        this._updateNumberCheckbox(this.yCheckbox, state, offset)
      else if (this.entityCheckbox.checked()) this.updateEntity(state, offset)
      else if (this.stateCheckbox.checked())
        this.updateEntityState(state, offset)
      else if (this.variantCheckbox.checked())
        this.updateEntityVariant(state, offset)
    }

    if (this.createButton.clicked) {
      const child = this.entityPicker.getActiveChild()
      if (child) {
        const position = new XY(
          checkboxNumber(this.xCheckbox),
          checkboxNumber(this.yCheckbox)
        )
        let entity = EntityFactory.produce(state.level.atlas, {
            type: child.type,
            state: child.state(),
            variant: child.variant,
            position
          })
          // force collision to bounds for picking
        ;(<any>entity).collisionPredicate = CollisionPredicate.BOUNDS
        const sandbox = Entity.findAnyByID(
          state.level.parentEntities,
          EntityID.UI_LEVEL_EDITOR_SANDBOX
        )
        if (!sandbox) throw new Error('Missing sandbox.')

        // marquee.setSelection(entity)
        sandbox.addChildren(entity)
        // [todo] set selection here
      }
    }
    if (this.toggleGridButton.clicked) toggleGrid(state)

    const marquee = <Maybe<Marquee>>(
      Entity.findAnyByID(state.level.parentEntities, EntityID.UI_MARQUEE)
    )
    if (
      marquee &&
      marquee.selection &&
      marquee.state() !== Entity.BaseState.HIDDEN
    ) {
      const {selection} = marquee
      const sandbox = Entity.findAnyByID(
        state.level.parentEntities,
        EntityID.UI_LEVEL_EDITOR_SANDBOX
      )
      if (!sandbox) throw new Error('Missing sandbox.')
      if (this.destroyButton.clicked) {
        marquee.selection = undefined
        marquee.transition(Entity.BaseState.HIDDEN)
        sandbox.removeChild(selection)
      }
      if (
        this.decrementButton.clicked ||
        this.decrementButton.longClicked ||
        this.incrementButton.clicked ||
        this.incrementButton.longClicked
      ) {
        const position = new XY(
          checkboxNumber(this.xCheckbox),
          checkboxNumber(this.yCheckbox)
        )
        selection.moveTo(position)
        sandbox.invalidateBounds()
        marquee.moveTo(new XY(position.x - 1, position.y - 1))
      } else {
        this._updateNumberCheckbox(
          this.xCheckbox,
          state,
          selection.bounds.position.x - checkboxNumber(this.xCheckbox)
        )
        this._updateNumberCheckbox(
          this.yCheckbox,
          state,
          selection.bounds.position.y - checkboxNumber(this.yCheckbox)
        )
      }
    }

    return status | UpdateStatus.UPDATED
  }

  setEntityFields(offset: number, atlas: Atlas): void {
    this.entityPicker.setActiveChild(
      this.entityPicker.activeChildIndex + offset
    )
    const child = this.entityPicker.getActiveChild()
    if (!child) return
    const entityLabel = child.type.replace(
      new RegExp(`^(${SCENERY_VALUE_PREFIX}|${CHAR_VALUE_PREFIX})`),
      ''
    )
    this.entityCheckbox.setText(
      {
        textLayer: Layer.UI_PICKER_OFFSET,
        text: entityLabel
      },
      Layer.UI_PICKER_OFFSET,
      atlas
    )
    this.setEntityStateFields(0, atlas)
    this.setEntityVariantFields(0, atlas)
  }

  setEntityStateFields(offset: number, atlas: Atlas): void {
    this.entityPicker.offsetActiveChildStateIndex(offset)
    const child = this.entityPicker.getActiveChild()
    if (!child) return
    this.stateCheckbox.setText(
      {textLayer: Layer.UI_PICKER_OFFSET, text: child.state()},
      Layer.UI_PICKER_OFFSET,
      atlas
    )
    this.radioGroup.invalidateBounds()
  }

  setEntityVariantFields(offset: number, atlas: Atlas): void {
    this.entityPicker.offsetActiveChildVariantIndex(atlas, offset)
    const child = this.entityPicker.getActiveChild()
    if (!child) return
    this.variantCheckbox.setText(
      {textLayer: Layer.UI_PICKER_OFFSET, text: child.variant},
      Layer.UI_PICKER_OFFSET,
      atlas
    )
    this.radioGroup.invalidateBounds()
  }

  updateEntity(state: UpdateState, offset: number): void {
    this.setEntityFields(offset, state.level.atlas)
  }

  updateEntityState(state: UpdateState, offset: number): void {
    this.setEntityStateFields(offset, state.level.atlas)
  }

  updateEntityVariant(state: UpdateState, offset: number): void {
    this.setEntityVariantFields(offset, state.level.atlas)
  }

  toJSON(): JSON {
    return this._toJSON(defaults)
  }

  private _updateNumberCheckbox(
    checkbox: Checkbox,
    state: UpdateState,
    offset: number
  ): void {
    const num = checkboxNumber(checkbox) + offset
    checkbox.setText(
      {
        type: EntityType.UI_TEXT,
        textLayer: Layer.UI_PICKER_OFFSET,
        text: num.toString()
      },
      Layer.UI_PICKER_OFFSET,
      state.level.atlas
    )
    this.radioGroup.invalidateBounds()
  }
}

function checkboxNumber(checkbox: Checkbox) {
  const text = checkbox.getText()
  return Number.parseInt(text)
}

function toggleGrid(state: UpdateState): void {
  const grid = Entity.findAnyByID(state.level.parentEntities, EntityID.UI_GRID)
  if (!grid) throw new Error('Missing grid.')
  const toggle =
    grid.state() === Entity.BaseState.HIDDEN
      ? Plane.State.VISIBLE
      : Entity.BaseState.HIDDEN
  grid.transition(toggle)
}

export namespace LevelEditorPanel {
  export enum Variant {
    NONE = 'none'
  }

  export enum State {
    VISIBLE = 'visible'
  }
}

const defaults = ObjectUtil.freeze({
  type: EntityType.UI_LEVEL_EDITOR_PANEL,
  variant: LevelEditorPanel.Variant.NONE,
  updatePredicate: UpdatePredicate.ALWAYS,
  collisionType: CollisionType.TYPE_UI,
  collisionPredicate: CollisionPredicate.CHILDREN,
  updaters: [UpdaterType.UI_FOLLOW_CAM],
  state: LevelEditorPanel.State.VISIBLE
})
