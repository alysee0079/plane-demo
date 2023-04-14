import { _decorator, Component, Node, Vec3, UITransform, Sprite, Prefab, resources, SpriteFrame, instantiate, Collider2D, Contact2DType } from 'cc'
import { EnemyControl } from './EnemyControl'
const { ccclass, property } = _decorator

@ccclass('Player')
export class Player extends Component {
  @property(Prefab)
  bulletPre: Prefab = null
  @property
  time: number = 0.3

  start() {
    // 移动
    const ui = this.node.parent.getComponent(UITransform)
    this.node.on(Node.EventType.TOUCH_MOVE, event => {
      const position = ui.convertToNodeSpaceAR(new Vec3(event.getUILocation().x, event.getUILocation().y, 0))
      this.node.setPosition(position)
    })
    // 攻击
    this.schedule(() => {
      // 创建子弹
      let bullet = instantiate(this.bulletPre)
      // 设置位置
      bullet.setPosition(new Vec3(this.node.getPosition().x, this.node.getPosition().y + 80, 0))
      // 设置父级
      this.node.parent.addChild(bullet)
    }, this.time)
    // 注册碰撞监听
    let collider = this.getComponent(Collider2D)
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }
  }
  update(deltaTime: number) {}
  // 碰撞开始
  onBeginContact(self: Collider2D, other: Collider2D) {
    if (other.tag === 1) {
      // 通知敌人死亡
      other.getComponent(EnemyControl).die()
      // 销毁自己
      resources.load('hero1_die/spriteFrame', SpriteFrame, (err, spriteFrame) => {
        if (err) return
        this.node.getComponent(Sprite).spriteFrame = spriteFrame
      })
      this.scheduleOnce(() => this.node.destroy(), 0.3)
    }
  }
}
