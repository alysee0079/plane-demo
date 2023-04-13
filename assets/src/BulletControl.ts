import { _decorator, Component, Vec3, Collider2D, Contact2DType } from 'cc'
import { EnemyControl } from './EnemyControl'
const { ccclass, property } = _decorator

@ccclass('BulletControl')
export class BulletControl extends Component {
  @property
  speed: number = 800

  start() {
    // 注册碰撞监听
    let collider = this.getComponent(Collider2D)
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }
  }
  update(deltaTime: number) {
    // 移动
    const length = deltaTime * this.speed
    let { x, y } = this.node.getPosition()
    y += length
    this.node.setPosition(new Vec3(x, y, 0))
    // 销毁
    if (y >= 800) {
      this.node.destroy()
    }
  }
  // 碰撞开始
  onBeginContact(self: Collider2D, other: Collider2D) {
    // 销毁自己, 敌人死亡
    if (other.tag === 1) {
      // 通知敌人死亡
      other.getComponent(EnemyControl).die()
      // 销毁自己
      this.node.destroy()
    }
  }
}
