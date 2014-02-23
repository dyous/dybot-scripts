// Description:
//   None
//
// Dependencies:
//   None
//
// configuration:
//   None
//
// commands:
//   todo:        - Show tasks
//   todo: <task> - Add task
//   done: <idx>  - Remove task
//
// Author:
//   bouzuya
//

module.exports = function(robot) {

  var BRAIN_KEY = 'todo';

  robot.hear(/^todo:\s*$/i, function(res) {
    var tasks = robot.brain.get(BRAIN_KEY) || [];
    if (tasks.length === 0) {
      res.send('todo: no item');
    } else {
      res.send('todo:\n' + tasks.map(function(task, idx) {
        return ' [' + idx + '] "' + task + '"';
      }).join('\n'));
    }
  });

  robot.hear(/^todo:\s+(.*)$/i, function(res) {
    var task = res.match[1];
    var tasks = robot.brain.get(BRAIN_KEY) || [];
    tasks.push(task);
    robot.brain.set(BRAIN_KEY, tasks);
    var idx = tasks.length - 1;
    res.send('todo: [' + idx + '] "' + task + '" added');
  });

  robot.hear(/^done:\s+(\d+)$/i, function(res) {
    var idx = parseInt(res.match[1], 10);
    var tasks = robot.brain.get(BRAIN_KEY) || [];
    var removed = tasks.splice(idx, 1);
    if (removed.length > 0) {
      var task = removed[0];
      res.send('todo: [' + idx + '] "' + task + '" removed');
    }
  });

};

