import React from "/web_modules/react.js";
import ROSLIB from '/web_modules/roslib.js';

const defaultURL = "ws://"+window.location.hostname+":9090";

const rosContext = new ROSLIB.Ros({ws: defaultURL});
rosContext.connect(defaultURL);

class ROSComponent extends React.Component {

    constructor(props) {
        super(props);
        this.ros = rosContext;

        this.state = {
            subscribers: []
            };
        }
    
    addSubscriber(topicName,messageType,callback) {
        this.setState( (state) => {
            const numSubs = state.subscribers.push(
                new ROSLIB.Topic({
                    ros: this.ros,
                    name : topicName,
                    messageType : messageType
                    })
                );
            state.subscribers[numSubs-1].subscribe( (msg) => callback(msg) );
            return state;
            });
        }

    };

export { ROSLIB as Lib };
export { ROSComponent as Component };