import { _decorator, Component, Node, Vec3, find, Camera } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Player')
export class Player extends Component {
  start() {
    const camera = this.node.parent.getChildByName('Camera').getComponent(Camera)
    this.node.on(Node.EventType.TOUCH_MOVE, event => {
      // console.log(camera.screenPointToRay(event.getUILocation().x, event.getUILocation().y).o.x)
      this.node.setPosition(event.getUILocation().x - 240, event.getUILocation().y - 400)
    })
  }

  update(deltaTime: number) {}
}
