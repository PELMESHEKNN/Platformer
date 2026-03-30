import { _decorator, Component, EventTarget, Node } from 'cc';
const { ccclass } = _decorator;

@ccclass('EventManager')
export class EventManager extends Component {
    private static _instance: EventManager;

    public static get instance(): EventManager {
        if (!this._instance) {
            const node = new Node("EventManager");
            this._instance = node.addComponent(EventManager);
        }
        return this._instance;
    }

    public events = new EventTarget();

    emit(eventName: string, data?: any) {
        this.events.emit(eventName, data);
    }

    on(eventName: string, callback: Function, target?: any) {
        this.events.on(eventName, callback, target);
    }

    off(eventName: string, callback?: Function, target?: any) {
        this.events.off(eventName, callback, target);
    }
}