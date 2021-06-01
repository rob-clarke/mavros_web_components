import * as ROS from "./ROSComponent.js";

export default class DockMonitor extends ROS.Component {

    constructor(props) {
        super(props);
        this.state.switches = [undefined,undefined,undefined,undefined];
        this.state.status = {
            latchString: "Unknown",
            magnetString: "Unknown"
            };
        }
    
    componentDidMount() {
        this.setState( (state) => {
            state.switchTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "/dock/switches",
                messageType : "std_msgs/Int8"
                });
            state.switchTopic.subscribe( (msg) => this.handleSwitches(msg) );

            state.statusTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name : "/dock/status",
                messageType : "prometheus_flight_msgs/DockStatus"
                });
            state.statusTopic.subscribe( (msg) => this.handleStatus(msg) );

            return state;
            });
        }

    handleSwitches(msg) {
        this.setState((state) => {
            for( let i = 0; i < state.switches.length; i++ ) {
                state.switches[i] = (msg.data & (0x1 << i)) !== 0;
                }
            return state;
            });
        }
    
    handleStatus(msg) {
        this.setState((state) => {
            state.status.latchString = msg.latch ? "Locked" : "Released";
            state.status.magnetString = msg.magnet ? "Locked" : "Released";
            return state;
            });
        }

    render() {
        let latchLocked = this.state.status.latchString == "Locked";
        return (
            <div className="dockSwitchMonitor">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="50" fill="#555"/>
                    <g fill="#999">
                        <path d="M 50 65 L 78.68 90.96 A 50 50 0 0 1 21.32 90.96 z" />
                        <path d="M 50 35 L 78.68  9.04 A 50 50 0 0 0 21.32  9.04 z" />
                        <path d="M 65 50 L 90.96 78.68 A 50 50 0 0 0 90.96 21.32 z" />
                        <path d="M 35 50 L  9.04 78.68 A 50 50 0 0 1  9.04 21.32 z" />
                    </g>
                    <g class="switchIndicators">
                        <circle cx="15" cy="70" r="5" fill={this.state.switches[0] ? "green" : "red"}/>
                        <circle cx="85" cy="30" r="5" fill={this.state.switches[1] ? "green" : "red"}/>
                        <circle cx="85" cy="70" r="5" fill={this.state.switches[2] ? "green" : "red"}/>
                        <circle cx="15" cy="30" r="5" fill={this.state.switches[3] ? "green" : "red"}/>
                    </g>
                    <g class="magnetIndicators" fill={this.state.status.magnetString == "Locked" ? "green" : "red"}>
                        <circle cx="50" cy="85" r="10"/>
                        <circle cx="50" cy="15" r="10"/>
                    </g>
                    <g class="latchIndicators" transform="translate(50,50) rotate(-45)" fill={latchLocked ? "green" : "red"} visibility={latchLocked ? "visible" : "hidden"}>
                        <rect x="-10" y="-20" width="10" height="5"/>
                        <rect x="-10" y="15" width="10" height="5"/>
                        <rect x="0" y="-20" width="10" height="5"/>
                        <rect x="0" y="15" width="10" height="5"/>
                    </g>
                    <g class="latchBase" transform="translate(50,50) rotate(-45)" fill={latchLocked ? "green" : "red"}>
                        <rect x="-15" y="-20" width="5" height="5"/>
                        <rect x="-15" y="15" width="5" height="5"/>
                        <rect x="10" y="-20" width="5" height="5"/>
                        <rect x="10" y="15" width="5" height="5"/>
                    </g>
                </svg>

                <span>Latch:</span><span>{this.state.status.latchString}</span>
                <span>Magnet:</span><span>{this.state.status.magnetString}</span>
            </div>
            );
        }

    }
