import { _decorator, Component, Node, log, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('BgControl')
export class BgControl extends Component {
  @property(Node)
  bg1: Node = null
  @property(Node)
  bg2: Node = null

  start() {}

  update(deltaTime: number) {
    const bg1y = this.bg1.getPosition().y - 200 * deltaTime
    this.bg1.setPosition(new Vec3(0, bg1y))
    const bg2y = this.bg2.getPosition().y - 200 * deltaTime
    this.bg2.setPosition(new Vec3(0, bg2y))

    if (bg1y <= -800) {
      this.bg1.setPosition(new Vec3(0, 800 + bg2y))
    }
    if (bg2y <= -800) {
      this.bg2.setPosition(new Vec3(0, 800 + bg1y))
    }
  }
}
