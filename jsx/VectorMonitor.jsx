import * as ROS from "./ROSComponent.js";

export default class VectorMonitor extends ROS.Component {

    constructor(props) {
        super(props);
        
        this.state.vector = {
            x: 0.0,
            y: 0.0,
            z: 0.0
            };

        }

    componentDidMount() {
        this.addSubscriber(this.props.topic, this.props.type, (msg) => {
            this.setState( (state) => {
                state.vector = this.props.extractor(msg);
		state.vector.x = state.vector.x || NaN;
		state.vector.y = state.vector.y || NaN;
		state.vector.z = state.vector.z || NaN;
                return state;
                });
            });
        }

    componentDidUpdate(prevProps) {
        if (prevProps === this.props) {
            return;
            }
        // Setup subscibers again...
        }
    
    render() {
        return (
            <div className="vectorMonitor">
                <span>x:</span><span className="value">{this.state.vector.x.toFixed(2)}</span>
                <span>y:</span><span className="value">{this.state.vector.y.toFixed(2)}</span>
                <span>z:</span><span className="value">{this.state.vector.z.toFixed(2)}</span>
            </div>
            );
        }

    }

VectorMonitor.defaultProps = {
    extractor: (msg) => msg.position
    }
