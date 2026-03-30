import { _decorator, Component } from 'cc'
import { PlayerHealth } from './PlayerHealth'

const { ccclass, property } = _decorator

@ccclass('Enemy')
export class Enemy extends Component {
    @property
    damage = 10

    onCollisionEnter(_: any, other: any) {
        const health = other.getComponent(PlayerHealth)
        if (!health) return

        health.takeDamage(this.damage)
    }
}