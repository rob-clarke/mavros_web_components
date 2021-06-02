import * as ROS from "./ROSComponent.js";

export default class StringTopic extends ROS.Component {

    constructor(props) {
        super(props);
        this.state.string = "";
        }

    componentDidMount() {
        this.addSubscriber(this.props.topic, "std_msgs/String", (msg) => {
            this.setState( (state) => {
                state.string = msg.data;
                return state;
                })
            });
        }
    
    render() {
        return (
            <span>{this.state.string}</span>
            );
        }

    };