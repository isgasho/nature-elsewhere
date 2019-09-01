// prettier-ignore
export enum InputBit {
  LEFT =                      0b00_0000_0000_0001,
  RIGHT =                     0b00_0000_0000_0010,
  UP =                        0b00_0000_0000_0100,
  DOWN =                      0b00_0000_0000_1000,
  ACTION =                    0b00_0000_0001_0000,
  MENU =                      0b00_0000_0010_0000,
  DEBUG_CONTEXT_LOSS =        0b00_0000_0100_0000,
  SCALE_RESET =               0b00_0000_1000_0000,
  SCALE_INCREASE =            0b00_0001_0000_0000,
  SCALE_DECREASE =            0b00_0010_0000_0000,
  POINT =                     0b00_0100_0000_0000,
  PICK =                      0b00_1000_0000_0000,
  PREV_ENTITY =               0b01_0000_0000_0000,
  NEXT_ENTITY =               0b10_0000_0000_0000
}

export const InvertInputBitDirection: Readonly<
  Partial<Record<InputBit.Key, InputBit>>
> = Object.freeze({
  LEFT: InputBit.RIGHT,
  RIGHT: InputBit.LEFT,
  UP: InputBit.DOWN,
  DOWN: InputBit.UP,
  SCALE_INCREASE: InputBit.SCALE_DECREASE,
  SCALE_DECREASE: InputBit.SCALE_INCREASE,
  PREV_ENTITY: InputBit.NEXT_ENTITY,
  NEXT_ENTITY: InputBit.PREV_ENTITY
})

export namespace InputBit {
  export type Key = keyof typeof InputBit
}
