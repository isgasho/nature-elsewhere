import {WindowModeSetting} from './window-mode-setting'
import {ZoomMultiplierSetting} from './zoom-multiplier-setting'

export interface Settings {
  readonly zoomMultiplier: ZoomMultiplierSetting
  readonly windowMode: WindowModeSetting
}

export namespace Settings {
  export const defaults: Settings = Object.freeze({
    zoomMultiplier: ZoomMultiplierSetting.MAX,
    windowMode:
      process.env.NODE_ENV === 'development'
        ? WindowModeSetting.WINDOWED
        : WindowModeSetting.FULLSCREEN
  })
}
