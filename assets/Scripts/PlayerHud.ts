import { _decorator, Component, Label, ProgressBar } from 'cc';
import { EventManager } from './EventManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerHud')
export class PlayerHud extends Component {

    @property(Label)
    healthLabel!: Label;

    @property(ProgressBar)
    healthBar!: ProgressBar;

    onEnable() {
        EventManager.instance.on('UPDATE_HUD', this.onUpdateHUD, this);
    }

    onDestroy() {
        EventManager.instance.off('UPDATE_HUD', this.onUpdateHUD, this);
    }

    private onUpdateHUD(data: { current: number, max: number }) {
        this.healthLabel.string = `${data.current} / ${data.max}`;
        this.healthBar.progress = data.current / data.max;
    }
}