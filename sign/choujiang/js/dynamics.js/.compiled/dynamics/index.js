// Generated by CoffeeScript 1.7.1
(function() {
  var Animations, Matrix, ct, curve, curves, dynamics, getStyle, helpers, runningAnimations, startAnimations, tick, type;

  curves = require('curves');

  helpers = require('helpers');

  Animations = require('animations');

  Matrix = require('matrix');

  ct = 0;

  runningAnimations = [];

  tick = function(t) {
    var frame, running, toRemove, ts, _i, _j, _len, _len1;
    ts = t - ct;
    ct = t;
    toRemove = [];
    for (_i = 0, _len = runningAnimations.length; _i < _len; _i++) {
      running = runningAnimations[_i];
      frame = running.animations.frame(ts);
      helpers.applyFrame(running.element, frame);
      if (running.animations.timeLeft() <= 0) {
        toRemove.push(running);
      }
      running.animations.change();
    }
    for (_j = 0, _len1 = toRemove.length; _j < _len1; _j++) {
      running = toRemove[_j];
      runningAnimations.splice(runningAnimations.indexOf(running), 1);
      running.animations.complete();
    }
    return requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);

  startAnimations = function(element, animations, options) {
    if (options == null) {
      options = {};
    }
    dynamics.stop(element);
    return runningAnimations.push({
      element: element,
      animations: animations,
      options: options
    });
  };

  getStyle = function(element, properties) {
    var property, style, _base, _i, _len;
    if (element.style != null) {
      if (element.dynamics == null) {
        element.dynamics = {};
      }
      if ((_base = element.dynamics).style == null) {
        _base.style = {};
      }
      style = element.dynamics.style;
      for (_i = 0, _len = properties.length; _i < _len; _i++) {
        property = properties[_i];
        if (style[property] == null) {
          style[property] = 0;
        }
      }
      return style;
    } else {
      return element;
    }
  };

  dynamics = function(element, properties, options) {
    var allProperties, animation, animations, animationsArr, style, _i, _len;
    if (properties instanceof Array) {
      animationsArr = properties;
    } else {
      animationsArr = [[properties, options]];
    }
    allProperties = [];
    for (_i = 0, _len = animationsArr.length; _i < _len; _i++) {
      animation = animationsArr[_i];
      allProperties = allProperties.concat(Object.keys(animation[0]));
    }
    style = getStyle(element, allProperties);
    animations = new Animations(animationsArr, style);
    return startAnimations(element, animations, options);
  };

  for (type in curves) {
    curve = curves[type];
    dynamics[type] = curve;
  }

  dynamics.stop = function(element) {
    var running, _i, _len, _ref, _results;
    _ref = runningAnimations.slice();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      running = _ref[_i];
      if (running.element === element) {
        _results.push(runningAnimations.splice(runningAnimations.indexOf(running), 1));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  dynamics.css = helpers.css;

  this.dynamics = dynamics;

}).call(this);