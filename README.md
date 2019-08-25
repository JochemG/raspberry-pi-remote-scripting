### Prerequisites
Raspberry Pi with:
* Raspbian/NOOBS installed
* Network connection
* 100MB of free space

Basic NodeJS/Javascript experience

### Installation
1) Install nodejs
   1) Download an ARM6l .tar.gz nodejs from https://nodejs.org/dist/  
   1) tar -xzf \<nodejs-tar-gz-file>
   1) sudo cp -r \<nodejs-unzipped-folder>/* /usr/local/  
1) git clone this project
1) Open the terminal and navigate inside the cloned project
1) npm install
1) npm build
   * Builds the single page application for remote interaction.
1) ifconfig
   * detect IP address of the PI
1) npm start
1) Use any browser enabled device on your network and navigate to \<Raspberry Pi IP Address>:9000 
1) Create your first script :) 

### Update the project
1) git pull
1) npm install
1) npm build
1) npm start

### Features
* Remote listing and editing scripts  
* Viewing log files  
* (Re)starting scripts
* setInterval & setTimeout alternatives to ensure cleanup
* pigpio for GPIO pins input/output support


## Lifecycle methods
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
   * Highly recommend using this instead of setInterval. Calls clearInterval on stop/reboot.
* timeout: (...setTimeoutArgs) => timeouteId: number
   * Highly recommend using this instead of setTimeout. Calls clearTimeout on stop/reboot.
* wait: (milliseconds) => Promise
   * Promisified timeout. Example: "async () => { log('Start'); await wait(5000); log('Done');
   * Highly recommend using this instead of setTimeout. Calls clearTimeout on stop/reboot.
* gpio: require('rpi-gpio')
   * Highly recommend using the script helper instead of manually importing for cleaning up on stop/reboot.
* gpiop: require('rpi-gpio').promise
   * Highly recommend using the script helper instead of manually importing for cleaning up on stop/reboot.
* pigpio: require('pigpio')
   * Highly recommend using the script helper instead of manually importing for cleaning up on stop/reboot.
   * Documentation: https://github.com/fivdi/pigpio

## Future
* Script webpage for sensor/camera feedback and remote virtual control
* Live logs
* Extend editor