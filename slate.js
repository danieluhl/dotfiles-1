// Configs
S.cfga({
  'defaultToCurrentScreen': true,
  'secondsBetweenRepeat': 0.1,
  'checkDefaultsOnLoad': true,
  'focusCheckWidthMax': 3000,
  'orderScreensLeftToRight': true
});
// config for operations
var opsConfig = {
  'corner': {
    'screen': '2560x1440',
    'direction': 'top-left',
    'width': 'screenSizeX/2',
    'height': 'screenSizeY/2'
  },
  'move': {
    'screen': '2560x1440',
    'x': 'screenOriginX',
    'y': 'screenOriginY',
    'width': 'screenSizeX',
    'height': 'screenSizeY'
  }
};
// config for hashes (for layouts)
var hashConfig = {
  'ignore-fail': true,
  'repeat': true
};
// slate helper module
var sh = {
  op: function(name, ops) {
    return S.op(name, _.extend({}, opsConfig[name], ops));
  },
  corner: function(ops) {
    return sh.op('corner', ops);
  },
  move: function(ops) {
    return sh.op('move', ops);
  },
  focus: function(direction) {
    return sh.op('focus', {
      direction: direction
    });
  },
  focusApp: function(app) {
    return sh.op('focus', {
      app: app
    });
  },
  chain: function(ops) {
    return S.op('chain', {
      'operations': ops
    });
  },
  hash: function(opsArray) {
    return _.extend({}, hashConfig, {
      'operations': opsArray
    });
  },
  layout: function(name, ops) {
    return sh.op('layout', {
      'name': S.lay(name, ops)
    });
  }
}
var ops = {
  full: sh.move({}),
  left: sh.move({
    'width': 'screenSizeX/2'
  }),
  leftExt: sh.move({
    'width': 'screenSizeX*2/3'
  }),
  right: sh.move({
    'width': 'screenSizeX/2',
    'x': 'screenOriginX+(screenSizeX/2)'
  }),
  rightExt: sh.move({
    'width': 'screenSizeX*2/3',
    'x': 'screenOriginX+(screenSizeX/3)'
  }),
  top: sh.move({
    'height': 'screenSizeY/2'
  }),
  topExt: sh.move({
    'height': 'screenSizeX*2/3'
  }),
  bottom: sh.move({
    'height': 'screenSizeY/2',
    'y': 'screenOriginY+screenSizeY/2'
  }),
  topLeft: sh.corner({}),
  topLeftExt: sh.corner({
    'height': 'screenSizeY*2/3'
  }),
  topRight: sh.corner({
    'direction': 'top-right',
    'height': 'screenSizeY/2'
  }),
  topRightExt: sh.corner({
    'direction': 'top-right',
    'height': 'screenSizeY*2/3'
  }),
  bottomLeft: sh.corner({
    'direction': 'bottom-left'
  }),
  bottomRight: sh.corner({
    'direction': 'bottom-right'
  }),
};
var chainOps = {
  up: sh.chain([
    ops.topRightExt,
    ops.topRight,
    ops.topLeftExt,
    ops.topLeft,
    ops.top
  ]),
  down: sh.chain([
    ops.bottomRight,
    ops.bottomLeft,
    ops.bottom
  ]),
  left: sh.chain([
    ops.leftExt,
    ops.left
  ]),
  right: sh.chain([
    ops.rightExt,
    ops.right
  ])
};
var layouts = {
  default: {
    'iTerm2': sh.hash([ops.topRightExt]),
    'Google Chrome': sh.hash([ops.rightExt]),
    'Spotify': sh.hash([ops.right]),
    'Slack': sh.hash([ops.left]),
    'Microsoft Outlook': sh.hash([ops.rightExt]),
    'Evernote': sh.hash([ops.left]),
    'Sublime Text': sh.hash([ops.leftExt]),
    '_after_': {
      'operations': [
        sh.focusApp('iTerm2'),
        sh.focusApp('Sublime Text')
      ]
    }
  },
  fullscreen: {
    'iTerm2': sh.hash([ops.rightExt]),
    'Google Chrome': sh.hash([ops.full]),
    'Spotify': sh.hash([ops.full]),
    'Slack': sh.hash([ops.full]),
    'Microsoft Outlook': sh.hash([ops.full]),
    'Evernote': sh.hash([ops.full]),
    'Sublime Text': sh.hash([ops.full]),
    '_after_': {
      'operations': [
        sh.focusApp('iTerm2'),
        sh.focusApp('Sublime Text')
      ]
    }
  },
  runner: function(name) {
    return function() {
      return sh.layout(name, layouts[name]).run();
    }
  }
};
// Batch bind everything. Less typing.
S.bnda({
  // layout bindings
  ']:ctrl;cmd;alt;shift': layouts.runner('default'),
  '[:ctrl;cmd;alt;shift': layouts.runner('fullscreen'),
  // chain bindings
  'up:ctrl;cmd;alt;shift': chainOps.up,
  'up:ctrl;cmd;alt;shift': chainOps.up,
  'down:ctrl;cmd;alt;shift': chainOps.down,
  'left:ctrl;cmd;alt;shift': chainOps.left,
  'right:ctrl;cmd;alt;shift': chainOps.right,
  // regular bindings
  '\:ctrl;cmd;alt;shift': ops.full,
  'z:ctrl;cmd;alt;shift': S.op('undo'),
  'r:ctrl;cmd;alt;shift': S.op('relaunch'),
  // focus bindings
  's:ctrl;cmd;alt;shift': sh.focusApp('Sublime Text'),
  'a:ctrl;cmd;alt;shift': sh.focusApp('iTerm2'),
  'd:ctrl;cmd;alt;shift': sh.focusApp('Google Chrome'),
  'tab:ctrl;cmd;alt;shift': sh.focus('behind')
});
// Test Cases
S.src('.slate.test', true);
S.src('.slate.test.js', true);
// Log that we're done configuring
S.log('[SLATE] -------------- Finished Loading Config --------------');