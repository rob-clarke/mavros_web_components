import * as ROS from "./ROSComponent.js";

export default class FlightUnitMonitor extends ROS.Component {

    constructor(props) {
        super(props);
        this.state = {
            haveControl: false,
            unitStatus: 6,
            unitString: ""
            };
        
        this.handleClick = this.handleClick.bind(this)
        }
    
    componentDidMount() {
        this.setState( (state) => {
            state.haveControlTopic = new ROS.Lib.Topic({
                ros: this.ros,
                name: `/${this.props.unitName}/have_control`,
                messageType: "std_msgs/Bool"
                });
            
            state.statusTopic = new ROS.Lib.Topic({
                    ros: this.ros,
                    name: `/${this.props.unitName}/unit_status`,
                    messageType: "prometheus_flight_msgs/UnitStatus"
                    });
            state.statusTopic.subscribe( (msg) => this.updateStatus(msg) );

            state.unitStringTopic = new ROS.Lib.Topic({
                    ros: this.ros,
                    name: `/${this.props.unitName}/unit_string`,
                    messageType: "std_msgs/String"
                    });
            state.unitStringTopic.subscribe( (msg) => this.updateString(msg) );

            return state;
            });
        }
    
    updateStatus(msg) {
        this.setState( (state) => {
            state.unitStatus = msg.status;
            return state;
            });
        }
    
    updateString(msg) {
        this.setState( (state) => {
            state.unitString = msg.data;
            return state;
            });
        }
    
    getStatusString() {
        const unitStatusStrings = ["INITIALISING","READY","RUNNING","COMPLETE","ENDED","FAILED","UNKNOWN"];
        return unitStatusStrings[this.state.unitStatus];
        }

    handleClick() {
        const unitStatusString = this.getStatusString();
        if( unitStatusString === "RUNNING" || unitStatusString === "COMPLETE" ) {
            const controlMsg = new ROS.Lib.Message({data: false});
            this.state.haveControlTopic.publish(controlMsg);
            }
        else if ( unitStatusString === "READY" ) {
            const controlMsg = new ROS.Lib.Message({data: true});
            this.state.haveControlTopic.publish(controlMsg);
            }
        }
    
    render() {
        const unitStatusString = this.getStatusString();
        let buttonClass = "inactive";
        if ( unitStatusString === "RUNNING" || unitStatusString === "COMPLETE" ) {
            buttonClass = "active";
            }
        if ( unitStatusString === "INITIALISING" ) {
            buttonClass += " warning";
            }
        if ( unitStatusString === "FAILED" || unitStatusString === "UNKNOWN" ) {
            buttonClass += " error";
            }
        return (
            <div className="flightUnitMonitor">
                <span className="unitName">{this.props.unitName}</span>
                <span className="unitString">{this.state.unitString}</span>
                <button className={buttonClass} onClick={this.handleClick}>{unitStatusString}</button>
            </div>
            );
        }

    };
