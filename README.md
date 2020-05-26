React components for ROS interface

Some problems getting roslib.js to build as an ES6 module. Needed to remove the
webworker transport option as webworkify is very browserify specific. Hence it
is included here.

React modules are built using snowpack: `npx snowpack`. Configuration for
snowpack is contained in `package.json`.