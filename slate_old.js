// Configs
S.cfga({
  'defaultToCurrentScreen': true,
  'secondsBetweenRepeat': 0.1,
  'checkDefaultsOnLoad': true,
  'focusCheckWidthMax': 3000,
  'orderScreensLeftToRight': true
});
// Generic Operations
// note: to use these you must .dup and give a screen
var full = S.op('move', {
  'x': 'screenOriginX',
  'y': 'screenOriginY',
  'width': 'screenSizeX',
  'height': 'screenSizeY'
});
var corner = S.op('corner', {
  'direction': 'top-left',
  'width': 'screenSizeX/2',
  'height': 'screenSizeY/2'
});
var conf = {
  tbolt: {
    screen: {
      screen: '2560x1440'
    }
  },
  smallLap: {
    screen: {
      screen: '2560x1600'
    }
  },
  largeLap: {
    screen: {
      screen: '2880x1800'
    }
  }
};
var getChain = function(ops) {
  return S.op('chain', {
    'operations': ops
  });
};
// Layout Hashes
var baseHash = {
  'ignore-fail': true,
  'repeat': true
};
var getHash = function(opKey) {
  var newHash = baseHash;
  return _.extend({}, newHash, {
    'operations': [opKey]
  });
};
// screen is tbolt, smallLap, largeLap string
var getLayoutOperation = function(layoutOps, layoutName) {
  return S.op('layout', {
    'name': S.lay(layoutName, layoutOps)
  });
};
var getBaseLayoutOps = function(ops) {
  return {
    'iTerm2': getHash(ops.topRightExt),
    'Google Chrome': getHash(ops.rightExt),
    'Spotify': getHash(ops.right),
    'Slack': getHash(ops.left),
    'Microsoft Outlook': getHash(ops.rightExt),
    'Evernote': getHash(ops.left),
    'Sublime Text': getHash(ops.leftExt)
  }
};
var getSmallLapLayoutOps = function(ops) {
    return {
      'iTerm2': getHash(ops.rightExt),
      'Google Chrome': getHash(ops.full),
      'Spotify': getHash(ops.rightExt),
      'Slack': getHash(ops.full),
      'Microsoft Outlook': getHash(ops.full),
      'Evernote': getHash(ops.full),
      'Sublime Text': getHash(ops.full),
      '_after_': {
        'operations': [S.op('focus', {
          'app': 'Sublime Text'
        }),S.op('focus', {
          'app': 'iTerm2'
        })]
      }
    }
  }
  // Layout runners
var runBaseLayout = function() {
  return getLayoutOperation(getBaseLayoutOps(conf.tbolt.ops), 'tboltBaseLayout').run();
};
var runSmallLapLayout = function() {
    return getLayoutOperation(getSmallLapLayoutOps(conf.smallLap.ops), 'smallLapLayout').run();
  }
  // build config
_.each(_.keys(conf), function(key) {
  var fullscreen = full.dup(conf[key].screen);
  var cornerscreen = corner.dup(conf[key].screen);
  conf[key].ops = {
    full: fullscreen,
    left: fullscreen.dup({
      'width': 'screenSizeX/2'
    }),
    leftExt: fullscreen.dup({
      'width': 'screenSizeX*2/3'
    }),
    right: fullscreen.dup({
      'width': 'screenSizeX/2',
      'x': 'screenOriginX+(screenSizeX/2)'
    }),
    rightExt: fullscreen.dup({
      'width': 'screenSizeX*2/3',
      'x': 'screenOriginX+(screenSizeX/3)'
    }),
    top: fullscreen.dup({
      'height': 'screenSizeY/2'
    }),
    topExt: fullscreen.dup({
      'height': 'screenSizeX*2/3'
    }),
    bottom: fullscreen.dup({
      'height': 'screenSizeY/2',
      'y': 'screenOriginY+screenSizeY/2'
    }),
    topLeft: cornerscreen,
    topLeftExt: cornerscreen.dup({
      'height': 'screenSizeY*2/3'
    }),
    topRight: cornerscreen.dup({
      'direction': 'top-right',
      'height': 'screenSizeY/2'
    }),
    topRightExt: cornerscreen.dup({
      'direction': 'top-right',
      'height': 'screenSizeY*2/3'
    }),
    bottomLeft: cornerscreen.dup({
      'direction': 'bottom-left'
    }),
    bottomRight: cornerscreen.dup({
      'direction': 'bottom-right'
    }),
    showDev: S.op('show', {
      'app': ['iTerm', 'Sublime Text']
    }),
    showWeb: S.op('show', {
      'app': ['Google Chrome']
    })
  };
  conf[key].ops.chainUp = getChain([
    conf[key].ops.topRightExt,
    conf[key].ops.topRight,
    conf[key].ops.topLeftExt,
    conf[key].ops.topLeft,
    conf[key].ops.top
  ]);
  conf[key].ops.chainDown = getChain([
    conf[key].ops.bottomRight,
    conf[key].ops.bottomLeft,
    conf[key].ops.bottom
  ]);
  conf[key].ops.chainLeft = getChain([
    conf[key].ops.leftExt,
    conf[key].ops.left
  ]);
  conf[key].ops.chainRight = getChain([
    conf[key].ops.rightExt,
    conf[key].ops.right
  ]);
  conf[key].ops.chainToggleDev = getChain([
    conf[key].ops.showDev,
    conf[key].ops.showWeb
  ]);
});
// Batch bind everything. Less typing.
S.bnda({
  // Layout Bindings
  'p:ctrl;cmd;alt;shift': runBaseLayout,
  'o:ctrl;cmd;alt;shift': runSmallLapLayout,
  'up:ctrl;cmd;alt;shift': conf.tbolt.ops.chainUp,
  'down:ctrl;cmd;alt;shift': conf.tbolt.ops.chainDown,
  'left:ctrl;cmd;alt;shift': conf.tbolt.ops.chainLeft,
  'right:ctrl;cmd;alt;shift': conf.tbolt.ops.chainRight,
  '`:ctrl;cmd;alt;shift': conf.tbolt.ops.full,
  'x:ctrl;cmd;alt;shift': S.op('undo'),
  'f:ctrl;cmd;alt;shift': conf.tbolt.ops.chainToggleDev,
  'r:ctrl;cmd;alt;shift': S.op('relaunch'),
  //https://github.com/jigish/slate/wiki/Operations#sequence
  // // Focus Bindings
  // // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // 'l:cmd': S.op('focus', {
  //   'direction': 'right'
  // }),
  // 'h:cmd': S.op('focus', {
  //   'direction': 'left'
  // }),
  // 'k:cmd': S.op('focus', {
  //   'direction': 'up'
  // }),
  // 'j:cmd': S.op('focus', {
  //   'direction': 'down'
  // }),
  // 'k:cmd;alt': S.op('focus', {
  //   'direction': 'behind'
  // }),
  // 'j:cmd;alt': S.op('focus', {
  //   'direction': 'above'
  // }),
  // 'right:cmd': S.op('focus', {
  //   'direction': 'right'
  // }),
  // 'left:cmd': S.op('focus', {
  //   'direction': 'left'
  // }),
  // 'up:cmd': S.op('focus', {
  //   'direction': 'up'
  // }),
  // 'down:cmd': S.op('focus', {
  //   'direction': 'down'
  // }),
  // 'up:cmd;alt': S.op('focus', {
  //   'direction': 'behind'
  // }),
  // 'down:cmd;alt': S.op('focus', {
  //   'direction': 'behind'
  // }),
  // // Window Hints
  // 'esc:cmd': S.op('hint'),
  // // Switch currently doesn't work well so I'm commenting it out until I fix it.
  // //'tab:cmd' : S.op('switch'),
  // // Grid
  // 'esc:ctrl': S.op('grid')
});
// Test Cases
// S.src('.slate.test', true);
// S.src('.slate.test.js', true);
// Log that we're done configuring
S.log('[SLATE] -------------- Finished Loading Config --------------');