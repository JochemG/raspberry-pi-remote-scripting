### Installation
1) Install a clean Raspbian
1) Install nodejs
   1) Download an ARM6l .tar.gz nodejs from https://nodejs.org/dist/  
   1) tar -xzf \<nodejs-tar-gz-file>
   1) sudo cp -r \<nodejs-unzipped-folder>/* /usr/local/  
1) npm install
1) node index.js
1) ifconfig to detect IP address of the PI
1) Use any browser enabled device on your network to navigate to <RPI-IP>:9000 
1) Create your first script :) 

### Features
* Viewing a list of scripts and editing them  
* Viewing log files  
* (Re)starting scripts
* setInterval & setTimeout support with cleanup

### Lifecycle methods
Your script can export the following functions:
* module.exports.onStart: (helpers: ScriptHelpers) => undefined
  * This function will be triggered when the "Execute" button on the UI is clicked and the current active script was ended.
* module.exports.onStop: (helpers: ScriptHelpers) => undefined
  * This function will be triggered when the "Execute" button on the UI is clicked to clean up the script.
  
## ScriptHelper
Instances of ScriptHelper provides functions that keep scripts concise, predictable and destructible.
* log: (message: string) => undefined
   * Adds an entry to the logs.
* interval: (...setIntervalArgs) => intervalId: number
   * Wraps around setInterval, but ensures that clearInterval is executed onStop.
* timeout: (...setTimeoutArgs) => timeouteId: number
   * Wraps around setTimeout, but ensures that clearTimeout is executed onStop.
* wait: (milliseconds) => Promise
   * Promisified setTimeout. Example: "async () => { log('Start'); await wait(5000); log('Done');
* gpio: require('rpi-gpio')
* gpiop: require('rpi-gpio').gpiop

### Future
* Webpages
* Websocket support
* Reset pins on stop