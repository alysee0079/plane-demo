import { _decorator, Component, Node, log, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('BgControl')
export class BgControl extends Component {
  start() {}

  update(deltaTime: number) {
    for (const child of this.node.children) {
      const curPos = child.getPosition()
      child.setPosition(new Vec3(0, (curPos.y -= 50 * deltaTime)))
    }
  }
}
