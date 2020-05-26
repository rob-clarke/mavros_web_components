import * as ROS from "./ROSComponent.js";

export default class ModeMonitor extends ROS.Component {

    constructor(props) {
        super(props);
        this.state.mode = "Unknown";
        }
    
    componentDidMount() {
        this.setState( (state) => {
            state.topic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "/mavros/state",
                messageType : "mavros_msgs/State"
                });
            state.topic.subscribe( (msg) => this.gotMessage(msg) );
            return state;
            });
        }

    gotMessage(msg) {
        this.setState((state) => {
            state.mode = msg.mode;
            return state;
            });
        }

    render() {
        return (
            <div className="flightModeMonitor">
                <span>Flight Mode:</span><span>{this.state.mode}</span>
            </div>
            );
        }

    }
