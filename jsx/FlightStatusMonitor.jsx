import * as ROS from "./ROSComponent.js";

import ModeMonitor from "./ModeMonitor.js";
import BatteryMonitor from "./BatteryMonitor.js";
import VectorMonitor from "./VectorMonitor.js";

export default class FlightStatusMonitor extends ROS.Component {

    render() {
        return (
            <div className="flightStatusMonitor">
                <ModeMonitor />
                <BatteryMonitor warn_limit="14.6" critical_limit="14.0" />
                <div>
                    <span>Position</span>
                    <VectorMonitor topic="/mavros/local_position/pose" type="geometry_msgs/PoseStamped" timeout="0.5" extractor={(msg) => msg.pose.position } />
                </div>
                <div>
                    <span>Setpoint</span>
                    <VectorMonitor topic="/mavros/setpoint_raw/local" type="mavros_msgs/PositionTarget" timeout="0.5" />
                </div>
            </div>
            );
        }

    }