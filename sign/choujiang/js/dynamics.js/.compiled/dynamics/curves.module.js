// Generated by CoffeeScript 1.7.1
(function() {
  var Bezier, Curve, CustomBezier, EaseIn, EaseInOut, EaseOut, Gravity, GravityWithForce, Linear, SelfSpring, Spring, curves,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  curves = {};

  Curve = (function() {
    Curve.properties = {};

    function Curve(options) {
      var k, v, _ref;
      this.options = options != null ? options : {};
      this.next = __bind(this.next, this);
      this.init = __bind(this.init, this);
      _ref = this.options.type.properties;
      for (k in _ref) {
        v = _ref[k];
        if ((this.options[k] == null) && !v.editable) {
          this.options[k] = v["default"];
        }
      }
    }

    Curve.prototype.init = function() {
      return this.t = 0;
    };

    Curve.prototype.next = function(step) {
      var r;
      if (this.t > 1) {
        this.t = 1;
      }
      r = this.at(this.t);
      this.t += step;
      return r;
    };

    Curve.prototype.editable = function() {
      return false;
    };

    Curve.prototype.at = function(t) {
      return [t, t];
    };

    return Curve;

  })();

  Linear = (function(_super) {
    __extends(Linear, _super);

    function Linear() {
      return Linear.__super__.constructor.apply(this, arguments);
    }

    Linear.properties = {
      duration: {
        min: 100,
        max: 4000,
        "default": 1000
      }
    };

    Linear.prototype.at = function(t) {
      return [t, t];
    };

    return Linear;

  })(Curve);

  Gravity = (function(_super) {
    __extends(Gravity, _super);

    Gravity.properties = {
      bounce: {
        min: 0,
        max: 80,
        "default": 40
      },
      gravity: {
        min: 1,
        max: 4000,
        "default": 1000
      },
      expectedDuration: {
        editable: false
      }
    };

    function Gravity(options) {
      this.options = options != null ? options : {};
      this.at = __bind(this.at, this);
      this.curve = __bind(this.curve, this);
      this.init = __bind(this.init, this);
      this.length = __bind(this.length, this);
      this.gravityValue = __bind(this.gravityValue, this);
      this.bounceValue = __bind(this.bounceValue, this);
      this.duration = __bind(this.duration, this);
      this.expectedDuration = __bind(this.expectedDuration, this);
      if (this.initialForce == null) {
        this.initialForce = false;
      }
      this.options.duration = this.duration();
      Gravity.__super__.constructor.call(this, this.options);
    }

    Gravity.prototype.expectedDuration = function() {
      return this.duration();
    };

    Gravity.prototype.duration = function() {
      return Math.round(1000 * 1000 / this.options.gravity * this.length());
    };

    Gravity.prototype.bounceValue = function() {
      return Math.min(this.options.bounce / 100, 80);
    };

    Gravity.prototype.gravityValue = function() {
      return this.options.gravity / 100;
    };

    Gravity.prototype.length = function() {
      var L, b, bounce, curve, gravity;
      bounce = this.bounceValue();
      gravity = this.gravityValue();
      b = Math.sqrt(2 / gravity);
      curve = {
        a: -b,
        b: b,
        H: 1
      };
      if (this.initialForce) {
        curve.a = 0;
        curve.b = curve.b * 2;
      }
      while (curve.H > 0.001) {
        L = curve.b - curve.a;
        curve = {
          a: curve.b,
          b: curve.b + L * bounce,
          H: curve.H * bounce * bounce
        };
      }
      return curve.b;
    };

    Gravity.prototype.init = function() {
      var L, b, bounce, curve, gravity, _results;
      Gravity.__super__.init.apply(this, arguments);
      L = this.length();
      gravity = this.gravityValue() * L * L;
      bounce = this.bounceValue();
      b = Math.sqrt(2 / gravity);
      this.curves = [];
      curve = {
        a: -b,
        b: b,
        H: 1
      };
      if (this.initialForce) {
        curve.a = 0;
        curve.b = curve.b * 2;
      }
      this.curves.push(curve);
      _results = [];
      while (curve.b < 1 && curve.H > 0.001) {
        L = curve.b - curve.a;
        curve = {
          a: curve.b,
          b: curve.b + L * bounce,
          H: curve.H * bounce * bounce
        };
        _results.push(this.curves.push(curve));
      }
      return _results;
    };

    Gravity.prototype.curve = function(a, b, H, t) {
      var L, c, t2;
      L = b - a;
      t2 = (2 / L) * t - 1 - (a * 2 / L);
      c = t2 * t2 * H - H + 1;
      if (this.initialForce) {
        c = 1 - c;
      }
      return c;
    };

    Gravity.prototype.at = function(t) {
      var bounce, curve, gravity, i, v;
      bounce = this.options.bounce / 100;
      gravity = this.options.gravity;
      i = 0;
      curve = this.curves[i];
      while (!(t >= curve.a && t <= curve.b)) {
        i += 1;
        curve = this.curves[i];
        if (!curve) {
          break;
        }
      }
      if (!curve) {
        v = this.initialForce ? 0 : 1;
      } else {
        v = this.curve(curve.a, curve.b, curve.H, t);
      }
      return [t, v];
    };

    return Gravity;

  })(Curve);

  GravityWithForce = (function(_super) {
    __extends(GravityWithForce, _super);

    GravityWithForce.prototype.returnsToSelf = true;

    function GravityWithForce(options) {
      this.options = options != null ? options : {};
      this.initialForce = true;
      GravityWithForce.__super__.constructor.call(this, this.options);
    }

    return GravityWithForce;

  })(Gravity);

  Spring = (function(_super) {
    __extends(Spring, _super);

    function Spring() {
      this.at = __bind(this.at, this);
      return Spring.__super__.constructor.apply(this, arguments);
    }

    Spring.properties = {
      frequency: {
        min: 0,
        max: 100,
        "default": 15
      },
      friction: {
        min: 1,
        max: 1000,
        "default": 200
      },
      anticipationStrength: {
        min: 0,
        max: 1000,
        "default": 0
      },
      anticipationSize: {
        min: 0,
        max: 99,
        "default": 0
      },
      duration: {
        min: 100,
        max: 4000,
        "default": 1000
      }
    };

    Spring.prototype.at = function(t) {
      var A, At, a, angle, b, decal, frequency, friction, frictionT, s, v, y0, yS;
      frequency = Math.max(1, this.options.frequency);
      friction = Math.pow(20, this.options.friction / 100);
      s = this.options.anticipationSize / 100;
      decal = Math.max(0, s);
      frictionT = (t / (1 - s)) - (s / (1 - s));
      if (t < s) {
        A = (function(_this) {
          return function(t) {
            var M, a, b, x0, x1;
            M = 0.8;
            x0 = s / (1 - s);
            x1 = 0;
            b = (x0 - (M * x1)) / (x0 - x1);
            a = (M - b) / x0;
            return (a * t * _this.options.anticipationStrength / 100) + b;
          };
        })(this);
        yS = (s / (1 - s)) - (s / (1 - s));
        y0 = (0 / (1 - s)) - (s / (1 - s));
        b = Math.acos(1 / A(yS));
        a = (Math.acos(1 / A(y0)) - b) / (frequency * (-s));
      } else {
        A = (function(_this) {
          return function(t) {
            return Math.pow(friction / 10, -t) * (1 - t);
          };
        })(this);
        b = 0;
        a = 1;
      }
      At = A(frictionT);
      angle = frequency * (t - s) * a + b;
      v = 1 - (At * Math.cos(angle));
      return [t, v, At, frictionT, angle];
    };

    return Spring;

  })(Curve);

  SelfSpring = (function(_super) {
    __extends(SelfSpring, _super);

    function SelfSpring() {
      this.at = __bind(this.at, this);
      return SelfSpring.__super__.constructor.apply(this, arguments);
    }

    SelfSpring.properties = {
      frequency: {
        min: 0,
        max: 100,
        "default": 15
      },
      friction: {
        min: 1,
        max: 1000,
        "default": 200
      },
      duration: {
        min: 100,
        max: 4000,
        "default": 1000
      }
    };

    SelfSpring.prototype.returnsToSelf = true;

    SelfSpring.prototype.at = function(t) {
      var A, At, At2, Ax, angle, frequency, friction, v;
      frequency = Math.max(1, this.options.frequency);
      friction = Math.pow(20, this.options.friction / 100);
      A = (function(_this) {
        return function(t) {
          return 1 - Math.pow(friction / 10, -t) * (1 - t);
        };
      })(this);
      At = A(t);
      At2 = A(1 - t);
      Ax = (Math.cos(t * 2 * 3.14 - 3.14) / 2) + 0.5;
      Ax = Math.pow(Ax, this.options.friction / 100);
      angle = frequency * t;
      v = Math.cos(angle) * Ax;
      return [t, v, Ax, -Ax];
    };

    return SelfSpring;

  })(Curve);

  Bezier = (function(_super) {
    __extends(Bezier, _super);

    Bezier.properties = {
      points: {
        type: 'points',
        "default": [
          {
            x: 0,
            y: 0,
            controlPoints: [
              {
                x: 0.2,
                y: 0
              }
            ]
          }, {
            x: 0.5,
            y: 1.2,
            controlPoints: [
              {
                x: 0.3,
                y: 1.2
              }, {
                x: 0.8,
                y: 1.2
              }
            ]
          }, {
            x: 1,
            y: 1,
            controlPoints: [
              {
                x: 0.8,
                y: 1
              }
            ]
          }
        ]
      },
      duration: {
        min: 100,
        max: 4000,
        "default": 1000
      }
    };

    function Bezier(options) {
      this.options = options != null ? options : {};
      this.at = __bind(this.at, this);
      this.yForX = __bind(this.yForX, this);
      this.B = __bind(this.B, this);
      this.returnsToSelf = this.options.points[this.options.points.length - 1].y === 0;
      Bezier.__super__.constructor.call(this, this.options);
    }

    Bezier.prototype.editable = function() {
      return true;
    };

    Bezier.prototype.B_ = function(t, p0, p1, p2, p3) {
      return (Math.pow(1 - t, 3) * p0) + (3 * Math.pow(1 - t, 2) * t * p1) + (3 * (1 - t) * Math.pow(t, 2) * p2) + Math.pow(t, 3) * p3;
    };

    Bezier.prototype.B = function(t, p0, p1, p2, p3) {
      return {
        x: this.B_(t, p0.x, p1.x, p2.x, p3.x),
        y: this.B_(t, p0.y, p1.y, p2.y, p3.y)
      };
    };

    Bezier.prototype.yForX = function(xTarget, Bs) {
      var B, aB, i, lower, percent, upper, x, xTolerance, _i, _len;
      B = null;
      for (_i = 0, _len = Bs.length; _i < _len; _i++) {
        aB = Bs[_i];
        if (xTarget >= aB(0).x && xTarget <= aB(1).x) {
          B = aB;
        }
        if (B !== null) {
          break;
        }
      }
      if (!B) {
        if (this.returnsToSelf) {
          return 0;
        } else {
          return 1;
        }
      }
      xTolerance = 0.0001;
      lower = 0;
      upper = 1;
      percent = (upper + lower) / 2;
      x = B(percent).x;
      i = 0;
      while (Math.abs(xTarget - x) > xTolerance && i < 100) {
        if (xTarget > x) {
          lower = percent;
        } else {
          upper = percent;
        }
        percent = (upper + lower) / 2;
        x = B(percent).x;
        i += 1;
      }
      return B(percent).y;
    };

    Bezier.prototype.at = function(t) {
      var Bs, i, k, points, x, y, _fn;
      x = t;
      points = this.options.points || Bezier.properties.points["default"];
      Bs = [];
      _fn = (function(_this) {
        return function(pointA, pointB) {
          var B;
          B = function(t) {
            return _this.B(t, pointA, pointA.controlPoints[pointA.controlPoints.length - 1], pointB.controlPoints[0], pointB);
          };
          return Bs.push(B);
        };
      })(this);
      for (i in points) {
        k = parseInt(i);
        if (k >= points.length - 1) {
          break;
        }
        _fn(points[k], points[k + 1]);
      }
      y = this.yForX(x, Bs);
      return [x, y];
    };

    return Bezier;

  })(Curve);

  CustomBezier = (function(_super) {
    __extends(CustomBezier, _super);

    CustomBezier.properties = {
      friction: {
        min: 1,
        max: 1000,
        "default": 500
      },
      duration: {
        min: 100,
        max: 4000,
        "default": 1000
      }
    };

    function CustomBezier(options) {
      this.options = options != null ? options : {};
      this.at = __bind(this.at, this);
      CustomBezier.__super__.constructor.apply(this, arguments);
      this.bezier = new Bezier({
        type: Bezier,
        duration: this.options.duration,
        points: this.options.points
      });
    }

    CustomBezier.prototype.editable = function() {
      return false;
    };

    CustomBezier.prototype.at = function(t) {
      return this.bezier.at(t);
    };

    return CustomBezier;

  })(Bezier);

  EaseInOut = (function(_super) {
    __extends(EaseInOut, _super);

    function EaseInOut(options) {
      if (options == null) {
        options = {};
      }
      options.friction = options.friction || EaseInOut.properties.friction["default"];
      options.points = [
        {
          x: 0,
          y: 0,
          controlPoints: [
            {
              x: 0.92 - (options.friction / 1000),
              y: 0
            }
          ]
        }, {
          x: 1,
          y: 1,
          controlPoints: [
            {
              x: 0.08 + (options.friction / 1000),
              y: 1
            }
          ]
        }
      ];
      EaseInOut.__super__.constructor.call(this, options);
    }

    return EaseInOut;

  })(CustomBezier);

  EaseIn = (function(_super) {
    __extends(EaseIn, _super);

    function EaseIn(options) {
      if (options == null) {
        options = {};
      }
      options.friction = options.friction || EaseIn.properties.friction["default"];
      options.points = [
        {
          x: 0,
          y: 0,
          controlPoints: [
            {
              x: 0.92 - (options.friction / 1000),
              y: 0
            }
          ]
        }, {
          x: 1,
          y: 1,
          controlPoints: [
            {
              x: 1,
              y: 1
            }
          ]
        }
      ];
      EaseIn.__super__.constructor.call(this, options);
    }

    return EaseIn;

  })(CustomBezier);

  EaseOut = (function(_super) {
    __extends(EaseOut, _super);

    function EaseOut(options) {
      if (options == null) {
        options = {};
      }
      options.friction = options.friction || EaseIn.properties.friction["default"];
      options.points = [
        {
          x: 0,
          y: 0,
          controlPoints: [
            {
              x: 0,
              y: 0
            }
          ]
        }, {
          x: 1,
          y: 1,
          controlPoints: [
            {
              x: 0.08 + (options.friction / 1000),
              y: 1
            }
          ]
        }
      ];
      EaseOut.__super__.constructor.call(this, options);
    }

    return EaseOut;

  })(CustomBezier);

  curves.Spring = Spring;

  curves.SelfSpring = SelfSpring;

  curves.Gravity = Gravity;

  curves.GravityWithForce = GravityWithForce;

  curves.Linear = Linear;

  curves.Bezier = Bezier;

  curves.EaseInOut = EaseInOut;

  curves.EaseIn = EaseIn;

  curves.EaseOut = EaseOut;

  module.exports = curves;

}).call(this);
