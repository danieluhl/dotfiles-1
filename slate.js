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
  // toggle focus between two apps given a title regex
  toggleFocus: function(regex, app1, app2) {
    return sh.chain([
      function(windowObject) {
        var title = windowObject.title();
        if (title !== undefined && title.match(regex)) {
          windowObject.doOperation(sh.focusApp(app1));
        } else {
          windowObject.doOperation(sh.focusApp(app2));
        }
      }
    ]);
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
  },
  sequence: function(ops) {
    return S.op('sequence', {
      'operations': ops
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
  rightThird: sh.move({
    'width': 'screenSizeX*2/3',
    'x': 'screenOriginX+(screenSizeX/3)'
  }),
  rightFourth: sh.move({
    'width': 'screenSizeX*3/4',
    'x': 'screenOriginX+(screenSizeX/4)'
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
  topRightThird: sh.corner({
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
// Chain operations
var chainOps = {
  up: sh.chain([
    ops.topRightThird,
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
    ops.rightThird,
    ops.rightFourth,
    ops.right
  ])
};
var layouts = {
  default: {
    'iTerm2': sh.hash([ops.topRightThird]),
    'Google Chrome': sh.hash([ops.rightFourth]),
    'Spotify': sh.hash([ops.right]),
    'Slack': sh.hash([ops.left]),
    'Microsoft Outlook': sh.hash([ops.rightThird]),
    'Evernote': sh.hash([ops.left]),
    'Sublime Text': sh.hash([ops.leftExt]),
    '_after_': {
      'operations': [
        sh.focusApp('iTerm2'),
        sh.focusApp('Sublime Text')
      ]
    }
  },
  split: {
    'iTerm2': sh.hash([ops.topRightThird]),
    'Google Chrome': sh.hash([ops.right]),
    'Spotify': sh.hash([ops.right]),
    'Slack': sh.hash([ops.left]),
    'Microsoft Outlook': sh.hash([ops.right]),
    'Evernote': sh.hash([ops.left]),
    'Sublime Text': sh.hash([ops.left]),
    '_after_': {
      'operations': [
        sh.focusApp('iTerm2'),
        sh.focusApp('Sublime Text')
      ]
    }
  },
  fullscreen: {
    'iTerm2': sh.hash([ops.rightThird]),
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
var sequences = {
  default: [
    [sh.focusApp('Slack')],
    [ops.left],
    [sh.focusApp('Microsoft Outlook')],
    [ops.rightThird],
    [sh.focusApp('Spotify')],
    [ops.right],
    [sh.focusApp('Evernote')],
    [ops.left],
    [sh.focusApp('Google Chrome')],
    [ops.rightFourth],
    [sh.focusApp('iTerm2')],
    [ops.topRightThird],
    [sh.focusApp('Sublime Text')],
    [ops.leftExt]
  ],
  fullscreen: [
    [sh.focusApp('Slack')],
    [ops.full],
    [sh.focusApp('Microsoft Outlook')],
    [ops.full],
    [sh.focusApp('Spotify')],
    [ops.full],
    [sh.focusApp('Evernote')],
    [ops.full],
    [sh.focusApp('Google Chrome')],
    [ops.full],
    [sh.focusApp('iTerm2')],
    [ops.rightThird],
    [sh.focusApp('Sublime Text')],
    [ops.full]
  ]
};

// Batch bind everything. Less typing.
S.bnda({
  // layout bindings
  ']:ctrl;cmd;alt;shift': sh.sequence(sequences.default),
  '[:ctrl;cmd;alt;shift': sh.sequence(sequences.fullscreen),
  // chain bindings
  'up:ctrl;cmd;alt;shift': chainOps.up,
  'up:ctrl;cmd;alt;shift': chainOps.up,
  'down:ctrl;cmd;alt;shift': chainOps.down,
  'left:ctrl;cmd;alt;shift': chainOps.left,
  'right:ctrl;cmd;alt;shift': chainOps.right,
  // regular bindings
  'f:ctrl;cmd;alt;shift': ops.full,
  'z:ctrl;cmd;alt;shift': S.op('undo'),
  'r:ctrl;cmd;alt;shift': S.op('relaunch'),
  // focus bindings
  '1:ctrl;cmd;alt;shift': sh.focusApp('Sublime Text'),
  '2:ctrl;cmd;alt;shift': sh.focusApp('iTerm2'),
  's:ctrl;cmd;alt;shift': sh.focusApp('Slack'),
  'o:ctrl;cmd;alt;shift': sh.focusApp('Microsoft Outlook'),
  'c:ctrl;cmd;alt;shift': sh.focusApp('Google Chrome'),
  'e:ctrl;cmd;alt;shift': sh.focusApp('Evernote')
});
// Test Cases
S.src('.slate.test', true);
S.src('.slate.test.js', true);
// Log that we're done configuring
S.log('[SLATE] -------------- Finished Loading Config --------------');