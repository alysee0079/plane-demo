import { _decorator, Component, assetManager } from 'cc'
const { ccclass, property } = _decorator

@ccclass('EnemyControl')
export class EnemyControl extends Component {
  start() {}
  update(deltaTime: number) {}
  // 死亡
  die() {
    // 加载爆炸图片
    assetManager.loadBundle('../resources/enemy0_die.png')
    // this.node.destroy()
  }
}
