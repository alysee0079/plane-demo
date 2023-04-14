import { _decorator, Component, resources, SpriteFrame, Sprite, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('EnemyControl')
export class EnemyControl extends Component {
  @property
  speed: number = 300

  // 是否死亡
  isDie: boolean = false

  start() {}
  update(deltaTime: number) {
    if (!this.isDie) {
      // 移动
      const length = this.speed * deltaTime
      const position = this.node.getPosition()
      this.node.setPosition(new Vec3(position.x, position.y - length, 0))
      if (position.y - length < -420) {
        this.node.destroy()
      }
    }
  }
  // 死亡
  die() {
    this.isDie = true
    // 加载爆炸图片
    resources.load('enemy0_die/spriteFrame', SpriteFrame, (err, spriteFrame) => {
      if (err) return
      this.node.getComponent(Sprite).spriteFrame = spriteFrame
    })
    this.scheduleOnce(() => this.node.destroy(), 0.3)
  }
}
