import { _decorator, Component, input, Input, EventKeyboard, KeyCode,
         RigidBody2D, Vec2, Contact2DType, Collider2D, IPhysics2DContact } from 'cc'

const { ccclass, property } = _decorator

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {

    @property
    moveSpeed = 5

    @property
    jumpForce = 12

    private direction = 0
    private rb: RigidBody2D | null = null
    private isGrounded = false
    private collider: Collider2D | null = null

    start() {
        this.rb = this.getComponent(RigidBody2D)
        this.collider = this.getComponent(Collider2D);

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
    }

    onEnable() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this)
    }

    onDisable() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this)

        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.collider.off(Contact2DType.END_CONTACT, this.onEndContact, this);
    }

    onKeyDown(e: EventKeyboard) {

        if (e.keyCode === KeyCode.KEY_A) this.direction = -1
        if (e.keyCode === KeyCode.KEY_D) this.direction = 1

        if (e.keyCode === KeyCode.SPACE) {
            if (this.isGrounded == true) {
                this.jump()
            }
        }
    }

    onKeyUp(e: EventKeyboard) {

        if (e.keyCode === KeyCode.KEY_A && this.direction === -1)
            this.direction = 0

        if (e.keyCode === KeyCode.KEY_D && this.direction === 1)
            this.direction = 0
    }

    update() {

        if (!this.rb) return

        const vel = this.rb.linearVelocity
        this.rb.linearVelocity = new Vec2(this.direction * this.moveSpeed, vel.y)
        console.log(this.direction)
        this.swap()
        
        //const myString: string = this.isGrounded.toString();
        //console.log(myString)
        //this.checkGround()
    }

   jump() {
        const velocity = this.rb.linearVelocity;
        velocity.y = this.jumpForce;
        this.rb.linearVelocity = velocity;
    }

    swap(){
        if(this.direction < 0){
            if(this.node.scale.x > 0){
                this.node.setScale(this.node.scale.x * -1, this.node.scale.y)
            }
        }
        if(this.direction > 0 ){
            if(this.node.scale.x < 0){
                this.node.setScale(this.node.scale.x * -1, this.node.scale.y)
            }
        }
    }
    
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.isGrounded = true;
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.isGrounded = false;
    }
}