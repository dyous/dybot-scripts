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
//   hubot todo        - Show tasks
//   hubot todo <task> - Add task
//   hubot done <idx>  - Remove task
//
// Author:
//   bouzuya
//

module.exports = function(robot) {

  var BRAIN_KEY = 'todo';

  robot.respond(/todo\s*(.*)$/i, function(res) {
    var user = res.envelope.user;
    var data = robot.brain.get(BRAIN_KEY) || {};
    var tasks = data[user.id] || [];
    var task = res.match[1];
    if (task) {
      tasks.push(task);
      data[user.id] = tasks;
      robot.brain.set(BRAIN_KEY, data);
      var idx = tasks.length - 1;
      res.send('todo: [' + idx + '] "' + task + '" added');
    } else {
      if (tasks.length === 0) {
        res.send('todo: no item');
      } else {
        res.send('todo:\n' + tasks.map(function(task, idx) {
          return ' [' + idx + '] "' + task + '"';
        }).join('\n'));
      }
    }
  });

  robot.respond(/done\s+(\d+)$/i, function(res) {
    var user = res.envelope.user;
    var data = robot.brain.get(BRAIN_KEY) || {};
    var idx = parseInt(res.match[1], 10);
    var tasks = data[user.id] || [];
    var removed = tasks.splice(idx, 1);
    data[user.id] = tasks;
    robot.brain.set(BRAIN_KEY, data);
    if (removed.length > 0) {
      var task = removed[0];
      res.send('todo: [' + idx + '] "' + task + '" removed');
    }
  });

};

