import * as ROS from "./ROSComponent.js";

export default class BatteryMonitor extends ROS.Component {

    constructor(props) {
        super(props);
        this.state.voltage = 0.0;
        }

    componentDidMount() {
        this.addSubscriber("/mavros/battery", "sensor_msgs/BatteryState", (msg) => {
            this.setState( (state) => {
                state.voltage = msg.voltage;
                return state;
                })
            });
        }
    
    render() {
        let displayClass = "normal";
        if( this.state.voltage < this.props.warn_limit ) {
            displayClass = "warning";
            }
        if( this.state.voltage < this.props.critical_limit ) {
            displayClass = "critical";
            }
        return (
            <div className={`batteryMonitor ${displayClass}`}>
                <span>Battery Voltage:</span><span>{this.state.voltage.toFixed(2)}</span>
            </div>
            );
        }

    };