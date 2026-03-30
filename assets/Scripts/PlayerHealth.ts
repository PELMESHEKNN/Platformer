import { _decorator, Component } from 'cc';
import { EventManager } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerHealth')
export class PlayerHealth extends Component {

    @property()
    maxHealth = 100;

    private currentHealth = 100;

    start() {
        this.currentHealth = this.maxHealth;
        this.updateHUD();
    }
    takeDamage(amount: number) {
        this.currentHealth = Math.max(this.currentHealth - amount, 0);
        this.updateHUD();
    }

    heal(amount: number) {
        this.currentHealth = Math.min(this.currentHealth + amount, this.maxHealth);
        this.updateHUD();
    }

    private updateHUD() {
        EventManager.instance.emit('UPDATE_HUD', {
            current: this.currentHealth,
            max: this.maxHealth
        });
    }

    getHealth() {
        return this.currentHealth;
    }
}