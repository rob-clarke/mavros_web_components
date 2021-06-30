import * as ROS from "./ROSComponent.js";

export default class DeploymentInterface extends ROS.Component {

    constructor(props) {
        super(props);
        this._alignJoint = this._alignJoint.bind(this);
        this._wallPress = this._wallPress.bind(this);
        this._deployTags = this._deployTags.bind(this);
        }

    componentDidMount() {
        this.setState( (state) => {
            state.alignTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "/dock/align_joint",
                messageType : "std_msgs/Bool"
                });
            
            state.wallPressTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "/dock/wall_press",
                messageType : "std_msgs/Bool"
                });
            
            state.tagTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "/dock/apriltag",
                messageType : "std_msgs/Bool"
                });

            return state;
            });
        }
    
    _alignJoint(shouldAlign) {
        let alignMsg = new ROS.Lib.Message({
            data: shouldAlign
            });        
        this.state.alignTopic.publish(alignMsg);
        }
    
    _wallPress(shouldPress) {
        let pressMsg = new ROS.Lib.Message({
            data: shouldPress
            });        
        this.state.wallPressTopic.publish(pressMsg);
        }

    _deployTags(shouldDeploy) {
        let tagMsg = new ROS.Lib.Message({
            data: shouldDeploy
            });        
        this.state.wallPressTopic.publish(tagMsg);
        }
        
    render() {
        return (
            <div className="deploymentInterface">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100">
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
                </svg> */}

                <table>
                    <tr>
                        <td>Joint:</td>
                        <td><button onClick={() => _alignJoint(true)}>Align</button></td>
                        <td><button onClick={() => _alignJoint(false)}>Home</button></td>
                    </tr>
                    <tr>
                        <td>Wall Pressing:</td>
                        <td><button onClick={() => _wallPress(true)}>Press</button></td>
                        <td><button onClick={() => _wallPress(false)}>Release</button></td>
                    </tr>
                    <tr>
                        <td>Tags:</td>
                        <td><button onClick={() => _deployTags(true)}>Deploy</button></td>
                        <td><button onClick={() => _deployTags(false)}>Retract</button></td>
                    </tr>
                </table>
            </div>
            );
        }

    };