import {WH} from '../../../math/wh/wh'
import {FollowCamOrientation} from './follow-cam-orientation'

export interface FollowCam {
  readonly positionRelativeToCam: FollowCamOrientation
  readonly camMargin: WH
}
