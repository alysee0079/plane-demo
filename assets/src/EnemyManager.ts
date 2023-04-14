import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc'
const { ccclass, property } = _decorator

@ccclass('EnemyManager')
export class EnemyManager extends Component {
  // 敌机预制体
  @property(Prefab)
  enemyPre: Prefab = null

  start() {
    // 每隔 2s 创建一个敌机
    this.schedule(() => {
      let enemy = instantiate(this.enemyPre)
      enemy.setPosition(new Vec3((Math.random() - 0.5) * 480, this.node.getPosition().y, 0))
      // 设置父级
      this.node.parent.addChild(enemy)
    }, 0.5)
  }

  update(deltaTime: number) {}
}
