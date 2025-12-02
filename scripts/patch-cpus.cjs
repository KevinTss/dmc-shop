const os = require('os');

const available =
  typeof os.availableParallelism === 'function'
    ? os.availableParallelism()
    : 0;
const reported = Array.isArray(os.cpus?.()) ? os.cpus().length : 0;
const count = Math.max(available, reported, 1);

os.cpus = () => Array.from({length: count}, () => ({
  model: '',
  speed: 0,
  times: {user: 0, nice: 0, sys: 0, idle: 0, irq: 0},
}));
