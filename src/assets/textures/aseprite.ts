/**
 * This typing assumes the options specified in package.json and annotated
 * herein with **via CLI**. The JSON export format appears to not be documented
 * but the related [binary format] is. Types marked "**by convention**" are
 * supplemental to and unenforced by the JSON format. Any data of these types
 * should be validated as soon as possible. All numbers are integers. All
 * indices are zero-based. All geometry are described from the top left to the
 * bottom right in pixel units:
 *
 *       y
 *       |0 1 2 …
 *   x---+------►
 *     0 |
 *     1 |
 *     2 |
 *     : ▼
 *
 * [binary format]: https://github.com/aseprite/aseprite/blob/master/docs/ase-file-specs.md.
 */

/**
 * The topmost data type for JSON exported from Aseprite. This format contains
 * all the image, animation, and collision information for every file packed in
 * the atlas.
 */
export type File = {
  meta: Meta
  /** All Frames for all files packed. */
  frames: Frames
}

/** @type {Object.<TagFrameNumber, Frame>} */
export type Frames = {[tagFrameNumber: string]: Frame}

export type Meta = {
  /** E.g., 'http://www.aseprite.org/'. */
  app: string
  /** E.g., '1.2.8.1'. */
  version: string
  /** The associated output. E.g., 'atlas.png'. */
  image: string
  /** E.g., 'RGBA8888' or 'I8'. */
  format: string
  /** Output dimensions. **Via CLI** `--sheet-pack`, uses a power of 2. */
  size: WH
  /** E.g., '1'. */
  scale: string
  /** All FrameTags for all files packed **via CLI** `--list-tags`. */
  frameTags: FrameTag[]
  /** All slices for all files packed **via CLI** `--list-slices`. */
  slices: Slice[]
}

/**
 * A Tag followed by a space followed by an optional frame number **via CLI**
 * `--filename-format '{tag} {frame}'`. E.g., 'cloud xl 4' refers to the file
 * named "cloud.aseprite" with animation named "xs", frame index 4, and 'sky  '
 * refers to the file named "sky.aseprite" with animation named "", the first
 * frame. See https://github.com/aseprite/aseprite/issues/1713.
 */
export type TagFrameNumber = string

/**
 * **By convention**, tags are a file stem followed by a space followed by a
 * possibly empty animation name. E.g., 'cactus xs' describes the file named
 * "cactus.aseprite" with animation named "xs" and 'sun ' refers to the file
 * named "sun.aseprite" with animation named "". Animation names are use to
 * distinguish different variations like size (s, m, l) or state (walk, run,
 * fly).
 */
export type Tag = string

/**
 * A single animation frame and most primitive unit. Each file packed always
 * has at least one Frame.
 */
export type Frame = {
  /**
   * The Frame's bounds within the atlas, including a 1px border padding
   * **via CLI** `--inner-padding 1`. The padding dimensions may also be
   * calculated by subtracting member's WH dimensions from sourceSize and
   * dividing by 2.
   */
  frame: Rect
  rotated: boolean
  trimmed: boolean
  /** The Frame's bounds within the file packed, not including padding. */
  spriteSourceSize: Rect
  sourceSize: WH
  duration: Duration
}

/**
 * A label and animation behavior for one or more Frames. When combined with the
 * referenced Frames, an animation is represented.
 */
export type FrameTag = {
  name: Tag
  /** The inclusive starting Frame index. */
  from: number
  /**
   * The inclusive ending Frame index, possibly identical to the starting frame
   * index.
   */
  to: number
  direction: Direction
}

/** Animation length in milliseconds. */
export type Duration = number

/**
 * **By convention**, animations that should never end have this reserved value.
 */
export const INFINITE_DURATION: Duration = 65535

/** An animation's looping behavior. */
export enum Direction {
  /** Animate from start to end; when looping, return to start. */
  FORWARD = 'forward',
  /** Animate from end to start; when looping, return to end. */
  REVERSE = 'reverse',
  /**
   * Animate from start to end - 1 or start, whichever is greater; when looping,
   * change direction (initially, end to start + 1 or end, whichever is lesser.
   * Traversals from start to end - 1 and end to start + 1 are each considered
   * complete loops.
   */
  PING_PONG = 'pingpong'
}

/**
 * **By convention**, a collection of bounds within the file packed whose union
 * defines the total collision polygon for a single Frame.
 */
export type Slice = {
  name: Tag
  /** Color in #rrggbbaa format. E.g., blue is '#0000ffff'. */
  color: string
  keys: Key[]
}

/** A Frame collision boundary subset within the file packed. */
export type Key = {
  /**
   * The inclusive associated Frame's start offset, the exclusive previous
   * Frame's end offset. **By convention,** the exclusive end offset is the next
   * higher Key.frame if it exists or the animation's end if not. A Key's Frame
   * index may be calculated from FrameTag.index + Key.frame.
   */
  frame: number
  /** The Frame's collision boundary within the file packed. */
  bounds: Rect
}

export type Rect = XY & WH

/** Width and height lengths. */
export type WH = {
  /** Width. */
  w: number
  /** Height. */
  h: number
}

/** x and y-coordinates. */
export type XY = {
  /** Distance along the x-axis. */
  x: number
  /** Distance along the y-axis. */
  y: number
}