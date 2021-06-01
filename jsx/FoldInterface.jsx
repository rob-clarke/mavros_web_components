import * as ROS from "./ROSComponent.js";

export default class FoldInterface extends ROS.Component {

    constructor(props) {
        super(props);
        this.state.folded_status = 0; // 1 = Folded, 2 = Unfolded

        this._sendControl = this._sendControl.bind(this);
        this._sendStop = this._sendStop.bind(this);
        }

    componentDidMount() {
        this.setState( (state) => {
            state.switchTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "/folded_status",
                messageType : "std_msgs/Int64"
                });
            state.switchTopic.subscribe( (msg) => {
                this.setState( (state) => {
                    state.folded_status = msg.data;
                    return state;
                    })
                });

            state.controlTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "action_fold",
                messageType : "std_msgs/String"
                });

            return state;
            });
        }
    
    _sendControl(fold_command) {
        let controlMsg = new ROS.Lib.Message({
            data: fold_command
            });        
        this.state.controlTopic.publish(controlMsg);
        }
    
    _sendStop() {
        // Spoof switch states to make script stop
        this.state.switchTopic.publish(new ROS.Lib.Message({data: 1}));
        this.state.switchTopic.publish(new ROS.Lib.Message({data: 2}));
        // Send a 0 to reset to indeterminate state
        this.state.switchTopic.publish(new ROS.Lib.Message({data: 0}));
        }
        
    render() {
        const folded = this.state.folded_status == 1;
        const unfolded = this.state.folded_status == 2;
        return (
            <div className="foldInterface">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100">
                    <rect x="35" y="0" width="15" height="100" fill="#555"/>
                    <g class="outArm" visibility={unfolded ? "visible" : "hidden"}>
                        <rect x="0" y="20" width="45" height="10" fill="#999"/>
                    </g>
                    <g class="foldingArm" transform="rotate(135)" visibility={!(folded | unfolded) ? "visible" : "hidden"}>
                        <rect x="-10" y="-50" width="45" height="10" fill="#999"/>
                    </g>
                    <g class="foldedArm" visibility={folded ? "visible" : "hidden"}>
                        <rect x="35" y="20" width="10" height="45" fill="#999"/>
                    </g>
                </svg>

                <button onClick={() => this._sendControl("unfold")}>Unfold</button>
                <button onClick={this._sendStop}>STOP</button>
                <button onClick={() => this._sendControl("fold")}>Fold</button>
            </div>
            );
        }

    };