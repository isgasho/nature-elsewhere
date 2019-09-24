import {Input} from './Input'
import {InputState} from './InputState'

export interface InputPoller {
  readonly inputs: InputState
  onEvent(event: PointerEvent): void
}

export namespace InputPoller {
  export function make(): InputPoller {
    const poller: InputPoller = {
      inputs: {point: undefined, pick: undefined},
      onEvent: event => onEvent(poller, event)
    }
    return poller
  }

  export function register(
    poller: InputPoller,
    win: Window,
    register: boolean
  ): void {
    const fn = win[register ? 'addEventListener' : 'removeEventListener']
    const types = ['pointerup', 'pointermove', 'pointerdown', 'pointercancel']
    for (const type of types) fn(type, <EventListener>poller.onEvent)
  }

  /** Call this function *after* processing the collected input. This function
      primes the poller to collect input for the next frame so it should occur
      towards the end of the game update loop *after* entity processing. */
  export function update(poller: InputPoller, time: Milliseconds): void {
    InputState.update(poller.inputs, time)
  }
}

function onEvent(poller: InputPoller, event: PointerEvent): void {
  poller.inputs.point = eventToPoint(poller, event)
  poller.inputs.pick = eventToPick(poller, event)
  event.preventDefault()
}

function eventToPoint(
  {inputs}: InputPoller,
  {type, clientX, clientY}: PointerEvent
): Maybe<Input> {
  if (type === 'pointercancel') return undefined
  const active = type === 'pointermove' || type === 'pointerdown'
  const {point} = inputs
  const timer = !point ? 1 : point.active !== active ? 0 : point.timer
  return {active, timer, windowPosition: {x: clientX, y: clientY}}
}

function eventToPick(
  {inputs}: InputPoller,
  {type, clientX, clientY}: PointerEvent
): Maybe<Input> {
  if (type === 'pointercancel') return undefined
  const {pick} = inputs
  const active =
    type === 'pointerdown' ||
    (type === 'pointermove' && pick && pick.active) ||
    false
  const timer = !pick ? 1 : pick.active !== active ? 0 : pick.timer
  return {active, timer, windowPosition: {x: clientX, y: clientY}}
}
