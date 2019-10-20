import {AtlasID} from '../atlas/AtlasID'
import {CollisionPredicate} from '../collision/CollisionPredicate'
import {CollisionType} from '../collision/CollisionType'
import {EntityCollider} from '../collision/EntityCollider'
import {EntityID} from './EntityID'
import {EntityType} from './EntityType'
import {FloatXY} from '../math/FloatXY'
import {Image} from '../image/Image'
import {ImageRect} from '../imageStateMachine/ImageRect'
import {ImageStateMachine} from '../imageStateMachine/ImageStateMachine'
import {Integer} from 'aseprite-atlas'
import {JSONValue} from '../utils/JSON'
import {Layer} from '../image/Layer'
import {Level} from '../levels/Level'
import {ProcessChildren} from './ProcessChildren'
import {ReadonlyRect, Rect} from '../math/Rect'
import {UpdatePredicate} from '../updaters/UpdatePredicate'
import {UpdateState} from '../updaters/UpdateState'
import {UpdateStatus} from '../updaters/UpdateStatus'
import {XY} from '../math/XY'

export abstract class Entity<
  Variant extends string = string,
  State extends string = string
> {
  private readonly _id: EntityID

  private readonly _type: EntityType
  /** Variants allow multiple forms of the same type. For example, two different
      representations of an apple tree. All variants must support all states.
      States are expected to change during execution but variants generally do
      not. */
  private readonly _variant: Variant

  /** The local coordinate system or minimal union of the entity and all of its
      children given in level coordinates with origin at (x, y). All images,
      collisions, and children are always in bounds and are also specified in
      level coordinates, not coordinates relative the local entity origin. This
      local coordinate system is necessary for calculating absolute translations
      (moveTo), and quick cached collision and layout checks such as determining
      if the entity is on screen. All of these states must be kept in sync. */
  protected readonly _bounds: Rect

  private readonly _velocity: XY

  private readonly _velocityFraction: FloatXY

  private readonly _machine: ImageStateMachine<State | Entity.BaseState>

  private readonly _updatePredicate: UpdatePredicate
  private _collisionType: CollisionType

  private _collisionPredicate: CollisionPredicate

  /** Collision bodies in level coordinates. Check for bounds intersection
      before testing each body. Images should not be considered directly for
      collision tests. */
  private readonly _collisionBodies: readonly Rect[]

  /** Operations are shallow by default (do not recurse children) unless
      specified otherwise. That is, only translation and animation are
      recursive. */
  private readonly _children: Entity[]

  constructor(props: Entity.Props<Variant, State>) {
    this._id = props.id ?? Entity.defaults.id
    this._type = props.type
    this._variant = props.variant
    this._bounds = Rect.make(0, 0, 0, 0)
    this._velocity =
      props.velocity ??
      (props.vx !== undefined || props.vy !== undefined
        ? new XY(props.vx ?? 0, props.vy ?? 0)
        : Entity.defaults.velocity.copy())
    this._velocityFraction = {x: 0, y: 0}
    this._machine = new ImageStateMachine({state: props.state, map: props.map})
    this._updatePredicate =
      props.updatePredicate ?? Entity.defaults.updatePredicate
    this._collisionType = props.collisionType ?? Entity.defaults.collisionType
    this._collisionPredicate =
      props.collisionPredicate ?? Entity.defaults.collisionPredicate
    this._collisionBodies = props.collisionBodies ?? [
      ...Entity.defaults.collisionBodies
    ]
    this._children = props.children ?? []
    this.setConstituentID(props.constituentID)

    // Calculate the bounds of the entity's images, collision bodies, and all
    // children. Children themselves are not invalidated by this call.
    this.invalidateBounds()

    const position =
      props.position ??
      (props.x !== undefined || props.y !== undefined
        ? new XY(props.x ?? 0, props.y ?? 0)
        : undefined)
    if (position !== undefined) this.moveTo(position)
    const scale =
      props.scale ??
      (props.sx !== undefined || props.sy !== undefined
        ? new XY(props.sx ?? 1, props.sy ?? 1)
        : undefined)
    if (scale !== undefined) this.scaleTo(scale)

    // EntityParser doesn't have access to the array of variants.
    if (!this.variants().includes(props.variant))
      throw new Error(`Unknown variant "${props.variant}".`)
  }
  get id(): EntityID {
    return this._id
  }

  get type(): EntityType {
    return this._type
  }

  get variant(): Variant {
    return this._variant
  }

  variants(): Variant[] {
    if ('Variant' in this.constructor)
      return Object.values(this.constructor['Variant'])
    return [this.variant]
  }

  get bounds(): ReadonlyRect {
    return this._bounds
  }

  /** This is a shallow invalidation. If a child changes state, or is added, the
      parents' bounds should be updated. */
  invalidateBounds(): void {
    const bounds = Rect.unionAll([
      this.imageBounds(),
      ...this.collisionBodies,
      ...this.children.map(child => child.bounds)
    ])
    if (!bounds) return
    this._bounds.position.x = bounds.position.x
    this._bounds.position.y = bounds.position.y
    this._bounds.size.w = bounds.size.w
    this._bounds.size.h = bounds.size.h
  }
  get velocity(): XY {
    return this._velocity
  }

  get updatePredicate(): UpdatePredicate {
    return this._updatePredicate
  }

  get collisionType(): CollisionType {
    return this._collisionType
  }

  setCollisionType(type: CollisionType): void {
    this._collisionType = type
  }

  get collisionPredicate(): CollisionPredicate {
    return this._collisionPredicate
  }

  set collisionPredicate(predicate: CollisionPredicate) {
    this._collisionPredicate = predicate
  }

  get collisionBodies(): readonly ReadonlyRect[] {
    return this._collisionBodies
  }

  get children(): readonly Entity[] {
    return this._children
  }

  addChildren(...entities: readonly Entity[]): void {
    this._children.push(...entities)
    this.invalidateBounds()
  }

  removeChild(child: Readonly<Entity>): boolean {
    for (let i = 0; i < this.children.length; ++i) {
      if (this.children[i] === child) {
        this._children.splice(i, 1)
        this.invalidateBounds()
        return true
      }
      if (
        this.children[i].children.some(grandchild =>
          grandchild.removeChild(child)
        )
      ) {
        this.invalidateBounds()
        return true
      }
    }
    return false
  }

  clearChildren(): void {
    this._children.length = 0
  }

  replaceChild(child: Readonly<Entity>, entity: Entity): void {
    const index = this.children.findIndex(entity => child === entity)
    if (index === -1) return
    this._children[index] = entity
    this.invalidateBounds()
  }

  addImages(...images: readonly Image[]): void {
    this._machine.addImages(...images)
    this.invalidateBounds()
  }

  /** The image bounds for the current entity (children and collision rectangles
      are not considered). */
  imageBounds(): ReadonlyRect {
    return this._machine.bounds()
  }

  moveTo(to: Readonly<XY>): UpdateStatus {
    return this.moveBy(to.sub(this.bounds.position))
  }

  /** Recursively move the entity, its images, its collision bodies, and all of
      its children. */
  moveBy(by: Readonly<XY>): UpdateStatus {
    let status = UpdateStatus.UNCHANGED
    if (!by.x && !by.y) return status
    this._bounds.position.x += by.x
    this._bounds.position.y += by.y
    status |= this._machine.moveBy(by)
    Rect.moveAllBy(this._collisionBodies, by)
    for (const child of this.children) child.moveBy(by)
    return status | UpdateStatus.UPDATED
  }

  scale(): Readonly<XY> {
    return this._machine.getScale()
  }

  scaleTo(to: Readonly<XY>): UpdateStatus {
    if (!to.x || !to.y)
      throw new Error(`Scale must be nonzero (x=${to.x}, y=${to.y}).`)
    if (this.scale().equal(to)) return UpdateStatus.UNCHANGED
    const collisionScale = to.div(this.scale())
    const status = this._machine.scaleTo(to)
    if (status & UpdateStatus.UPDATED) {
      for (const body of this._collisionBodies) {
        body.size.w *= Math.abs(collisionScale.x)
        body.size.h *= Math.abs(collisionScale.y)
      }
    }
    this.invalidateBounds()
    return status
  }

  constituentID(): Maybe<AtlasID> {
    return this._machine.constituentID()
  }

  setConstituentID(id?: AtlasID): UpdateStatus {
    return this._machine.setConstituentID(id)
  }

  images(): readonly Readonly<Image>[] {
    return this._machine.images()
  }

  invalidateImageBounds(): void {
    this._machine.invalidate()
  }

  replaceImages(state: State, ...images: readonly Image[]): UpdateStatus {
    return this._machine.replaceImages(state, ...images)
  }

  moveImagesBy(by: Readonly<XY>): UpdateStatus {
    const status = this._machine.moveBy(by)
    if (status & UpdateStatus.UPDATED) this.invalidateBounds()
    return status
  }

  moveImagesTo(to: Readonly<XY>): UpdateStatus {
    const status = this._machine.moveTo(to)
    if (status & UpdateStatus.UPDATED) this.invalidateBounds()
    return status
  }

  /** See ImageRect._origin. */
  origin(): Readonly<XY> {
    return this._machine.origin()
  }

  /** Recursively animate the entity and its children. Only visible entities are
      animated so its possible for a composition entity's children to be fully,
      *partly*, or not animated together. */
  animate(state: UpdateState): Readonly<Image>[] {
    if (!Rect.intersects(state.level.cam.bounds, this.bounds)) return []
    const visible = this._machine.intersects(state.level.cam.bounds)
    for (const image of visible) image.animate(state.level.atlas, state.time)
    for (const child of this.children) visible.push(...child.animate(state))
    return visible
  }

  resetAnimation(): void {
    this._machine.resetAnimation()
  }

  /** Returns whether the current entity is in the viewport or should always be
      updated. Children are not considered. */
  active(viewport: ReadonlyRect): boolean {
    return (
      this.updatePredicate === UpdatePredicate.ALWAYS ||
      Rect.intersects(this.bounds, viewport)
    )
  }

  state(): State | Entity.BaseState {
    return this._machine.state
  }

  states(): (State | Entity.BaseState)[] {
    return this._machine.states()
  }

  transition(state: State | Entity.BaseState): UpdateStatus {
    const status = this._machine.transition(state)
    if (status & UpdateStatus.UPDATED) this.invalidateBounds()
    return status
  }

  /** See UpdatePredicate. Actually this is going to go ahead and go into children so updte the docs */
  update(
    state: UpdateState,
    skipChildren: ProcessChildren = ProcessChildren.INCLUDE
  ): UpdateStatus {
    if (!this.active(state.level.cam.bounds)) return UpdateStatus.UNCHANGED

    let status = this._updatePosition(state)

    if (skipChildren === ProcessChildren.SKIP) return status

    for (const child of this.children) {
      status |= child.update(state)
      if (UpdateStatus.terminate(status)) return status
    }

    return status
  }

  collidesRect(rect: ReadonlyRect): Entity[] {
    const collisions: Entity[] = []
    if (this.collisionPredicate === CollisionPredicate.NEVER) return collisions

    if (!Rect.intersects(this.bounds, rect))
      // Any collisions requires the rectangle to intersect with the entity's
      // bounds.
      return collisions

    if (this.collisionPredicate & CollisionPredicate.BOUNDS)
      collisions.push(this)

    if (
      this.collisionPredicate & CollisionPredicate.IMAGES &&
      !collisions.length
    ) {
      // Test if any image collides.
      if (
        Rect.intersects(this.imageBounds(), rect) &&
        this.images().some(image => Rect.intersects(rect, image.bounds))
      )
        collisions.push(this)
    }

    if (
      this.collisionPredicate & CollisionPredicate.BODIES &&
      !collisions.length
    ) {
      // Test if any body collides.
      if (this.collisionBodies.some(body => Rect.intersects(rect, body)))
        collisions.push(this)
    }

    if (this.collisionPredicate & CollisionPredicate.CHILDREN)
      for (const child of this.children)
        collisions.push(...child.collidesRect(rect))

    // Children are not shared so the collision array will not contain
    // duplicates.
    return collisions
  }

  findByID(id: EntityID): Maybe<Entity> {
    return this.find(entity => entity.id === id)
  }

  find(predicate: (entity: Entity) => boolean): Maybe<Entity> {
    if (predicate(this)) return this
    for (const child of this.children) {
      const descendant = child.find(predicate)
      if (descendant) return descendant
    }
    return
  }

  /** Raise or lower an entity's images and its descendants' images for all
      states. */
  elevate(offset: Layer): void {
    this._machine.elevate(offset)
    for (const child of this.children) child.elevate(offset)
  }

  collides(_entities: readonly Entity[], _state: UpdateState): void {}

  abstract toJSON(): JSONValue

  private _updatePosition(state: UpdateState): UpdateStatus {
    // [todo] level bounds checking
    const from: Readonly<XY> = this.bounds.position.copy()

    const diagonal = this.velocity.x && this.velocity.y

    this._velocityFraction.x += this.velocity.x * state.time
    this._velocityFraction.y += this.velocity.y * state.time

    if (diagonal) {
      // When moving diagonally, synchronize / group integer boundary changes
      // across directions to minimize pixel changes per frame and avoid jarring.
      const max = Math.max(
        Math.abs(this._velocityFraction.x),
        Math.abs(this._velocityFraction.y)
      )
      this._velocityFraction.x = max * Math.sign(this.velocity.x)
      this._velocityFraction.y = max * Math.sign(this.velocity.y)
    }

    const translate: Readonly<XY> = XY.trunc(
      this._velocityFraction.x / 10_000,
      this._velocityFraction.y / 10_000
    )
    this._velocityFraction.x -= translate.x * 10_000
    this._velocityFraction.y -= translate.y * 10_000

    const to: Readonly<XY> = this.bounds.position.add(translate)
    let status = this.moveTo(to)
    if (!(status & UpdateStatus.UPDATED)) return UpdateStatus.UNCHANGED

    const entities = Level.activeParentsWithPlayer(state.level)

    let collidesWith = EntityCollider.collidesEntities(this, entities)

    if (
      diagonal &&
      collidesWith.some(
        collision => collision.collisionType & CollisionType.OBSTACLE
      )
    ) {
      status |= this.moveTo(new XY(to.x, from.y))
      collidesWith = EntityCollider.collidesEntities(this, entities)
      if (
        collidesWith.some(
          collision => collision.collisionType & CollisionType.OBSTACLE
        )
      ) {
        status |= this.moveTo(new XY(from.x, to.y))
        collidesWith = EntityCollider.collidesEntities(this, entities)
      }
    }

    if (
      collidesWith.some(
        collision => collision.collisionType & CollisionType.OBSTACLE
      )
    )
      status |= this.moveTo(new XY(from.x, from.y))

    this.collides(collidesWith, state)

    return status
  }
}

export namespace Entity {
  export enum BaseState {
    HIDDEN = 'hidden'
  }

  export interface Props<
    Variant extends string = string,
    State extends string = string
  > {
    /** Defaults to EntityID.UNDEFINED. */
    readonly id?: EntityID
    readonly type: EntityType
    readonly variant: Variant
    /** Defaults to (0, 0). */
    readonly x?: Integer
    readonly y?: Integer
    readonly position?: Readonly<XY> // This isn't used as a reference.
    readonly sx?: Integer
    readonly sy?: Integer
    readonly scale?: Readonly<XY> // This isn't used as a reference.
    readonly constituentID?: AtlasID
    readonly vx?: Integer
    readonly vy?: Integer
    readonly velocity?: XY
    /** Defaults to {}. */
    readonly state: State | BaseState
    readonly map: Record<State | BaseState, ImageRect>
    /** Defaults to BehaviorPredicate.NEVER. */
    readonly updatePredicate?: UpdatePredicate
    /** Defaults to CollisionPredicate.NEVER. */
    readonly collisionType?: CollisionType
    readonly collisionPredicate?: CollisionPredicate
    /** Defaults to []. In local coordinates (converted to level by parser). */
    readonly collisionBodies?: Rect[]
    /** Defaults to []. */
    readonly children?: Entity[]
  }

  export interface SubProps<
    Variant extends string = string,
    State extends string = string
  >
    extends Optional<
      Entity.Props<Variant, State>,
      | 'type'
      | 'variant'
      | 'state'
      | 'map'
      | 'updatePredicate'
      | 'collisionType'
      | 'collisionPredicate'
      | 'collisionBodies'
    > {}

  export const defaults = Object.freeze({
    id: EntityID.ANONYMOUS,
    state: Entity.BaseState.HIDDEN,
    position: Object.freeze(new XY(0, 0)),
    velocity: Object.freeze(new XY(0, 0)),
    updatePredicate: UpdatePredicate.INTERSECTS_VIEWPORT,
    collisionType: CollisionType.INERT,
    collisionPredicate: CollisionPredicate.NEVER,
    collisionBodies: Object.freeze([]),
    constituentID: undefined,
    scale: Object.freeze(new XY(1, 1))
  })

  export function removeAny(
    entities: Entity[],
    member: Readonly<Entity>
  ): boolean {
    for (let i = 0; i < entities.length; ++i) {
      if (entities[i] === member) {
        entities.splice(i, 1)
        return true
      }
      if (entities[i].removeChild(member)) return true
    }
    return false
  }

  export function findAnyByID(
    entities: readonly Entity[],
    id: EntityID
  ): Maybe<Entity> {
    for (const entity of entities) {
      const found = entity.findByID(id)
      if (found) return found
    }
    return
  }

  export function member(
    entities: readonly Readonly<Entity>[],
    sought: Readonly<Entity>
  ): boolean {
    for (const member of entities)
      if (member.find(entity => entity === sought)) return true
    return false
  }
}
