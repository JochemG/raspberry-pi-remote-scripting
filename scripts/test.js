function tick(helpers) {
   var {log} = helpers;
   log('Hello, please stop me because I generate a lot of logs');
}

module.exports.onStart = async (helpers) => {
   var {log, interval, wait} = helpers;
   log('The script has awoken!');
   interval(tick.bind(null, helpers), 3000);
   await wait (5000);
   log('The script has been running for 5 seconds already, time for a coffee :)');
   await wait (5000);
   log('Aaah that was good coffee, 10 seconds and still going strong ;)');
};

module.exports.onStop = async ({log}) => {
   log('After a long day of work, time to take a nap... Script shutdown')
};