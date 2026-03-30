import { _decorator, Component } from 'cc'
import { PlayerHealth } from './PlayerHealth'
import { PlayerMovement } from './PlayerMovement'

const { ccclass } = _decorator

@ccclass('Player')
export class Player extends Component {
    health!: PlayerHealth
    movement!: PlayerMovement
   
    onLoad() {
        this.movement = this.getComponent(PlayerMovement)!
        this.health = this.getComponent(PlayerHealth)!
    }
}