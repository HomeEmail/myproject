
(function(){

var detector = {};
var NA_VERSION = "-1";
var win = this;
var external;
var re_msie = /\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/;

function toString(object){
  return Object.prototype.toString.call(object);
}
function isObject(object){
  return toString(object) === "[object Object]";
}
function isFunction(object){
  return toString(object) === "[object Function]";
}
function each(object, factory, argument){
  for(var i=0,b,l=object.length; i<l; i++){
    if(factory.call(object, object[i], i) === false){break;}
  }
}

// 硬件??信息??表?式。
// 使用??可以按优先?排序。
var DEVICES = [
  ["nokia", function(ua){
    // 不能???表?式合并，因?可能出? "nokia; nokia 960"
    // ?种情?下?优先??出 nokia/-1
    if(ua.indexOf("nokia ") !== -1){
      return /\bnokia ([0-9]+)?/;
    }else if(ua.indexOf("noain") !== -1){
      return /\bnoain ([a-z0-9]+)/;
    }else{
      return /\bnokia([a-z0-9]+)?/;
    }
  }],
  // 三星有 Android 和 WP ??。
  ["samsung", function(ua){
    if(ua.indexOf("samsung") !== -1){
      return /\bsamsung(?:\-gt)?[ \-]([a-z0-9\-]+)/;
    }else{
      return /\b(?:gt|sch)[ \-]([a-z0-9\-]+)/;
    }
  }],
  ["wp", function(ua){
    return ua.indexOf("windows phone ") !== -1 ||
      ua.indexOf("xblwp") !== -1 ||
      ua.indexOf("zunewp") !== -1 ||
      ua.indexOf("windows ce") !== -1;
  }],
  ["pc", "windows"],
  ["ipad", "ipad"],
  // ipod ???置于 iphone 之前。
  ["ipod", "ipod"],
  ["iphone", /\biphone\b|\biph(\d)/],
  ["mac", "macintosh"],
  ["mi", /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
  ["aliyun", /\baliyunos\b(?:[\-](\d+))?/],
  ["meizu", /\b(?:meizu\/|m)([0-9]+)\b/],
  ["nexus", /\bnexus ([0-9s.]+)/],
  ["huawei", function(ua){
    var re_mediapad = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
    if(ua.indexOf("huawei-huawei") !== -1){
      return /\bhuawei\-huawei\-([a-z0-9\-]+)/;
    }else if(re_mediapad.test(ua)){
      return re_mediapad;
    }else{
      return /\bhuawei[ _\-]?([a-z0-9]+)/;
    }
  }],
  ["lenovo", function(ua){
    if(ua.indexOf("lenovo-lenovo") !== -1){
      return /\blenovo\-lenovo[ \-]([a-z0-9]+)/;
    }else{
      return /\blenovo[ \-]?([a-z0-9]+)/;
    }
  }],
  // 中?
  ["zte", function(ua){
    if(/\bzte\-[tu]/.test(ua)){
      return /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/;
    }else{
      return /\bzte[ _\-]?([a-su-z0-9\+]+)/;
    }
  }],
  // 步步高
  ["vivo", /\bvivo(?: ([a-z0-9]+))?/],
  ["htc", function(ua){
    if(/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(ua)){
      return /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/;
    }else{
      return /\bhtc[ _\-]?([a-z0-9 ]+)/;
    }
  }],
  ["oppo", /\boppo[_]([a-z0-9]+)/],
  ["konka", /\bkonka[_\-]([a-z0-9]+)/],
  ["sonyericsson", /\bmt([a-z0-9]+)/],
  ["coolpad", /\bcoolpad[_ ]?([a-z0-9]+)/],
  ["lg", /\blg[\-]([a-z0-9]+)/],
  ["android", /\bandroid\b|\badr\b/],
  ["blackberry", "blackberry"]
];

// 操作系?信息??表?式
var OS = [
  ["wp", function(ua){
    if(ua.indexOf("windows phone ") !== -1){
      return /\bwindows phone (?:os )?([0-9.]+)/;
    }else if(ua.indexOf("xblwp") !== -1){
      return /\bxblwp([0-9.]+)/;
    }else if(ua.indexOf("zunewp") !== -1){
      return /\bzunewp([0-9.]+)/;
    }
    return "windows phone";
  }],
  ["windows", /\bwindows nt ([0-9.]+)/],
  ["macosx", /\bmac os x ([0-9._]+)/],
  ["ios", function(ua){
    if(/\bcpu(?: iphone)? os /.test(ua)){
      return /\bcpu(?: iphone)? os ([0-9._]+)/;
    }else if(ua.indexOf("iph os ") !== -1){
      return /\biph os ([0-9_]+)/;
    }else{
      return /\bios\b/;
    }
  }],
  ["yunos", /\baliyunos ([0-9.]+)/],
  ["android", function(ua){
    if(ua.indexOf("android") >= 0){
      return /\bandroid[ \/-]?([0-9.x]+)?/;
    }else if(ua.indexOf("adr") >= 0){
      if(ua.indexOf("mqqbrowser") >= 0){
        return /\badr[ ]\(linux; u; ([0-9.]+)?/;
      }else{
        return /\badr(?:[ ]([0-9.]+))?/;
      }
    }
    return "android";
    //return /\b(?:android|\badr)(?:[\/\- ](?:\(linux; u; )?)?([0-9.x]+)?/;
  }],
  ["chromeos", /\bcros i686 ([0-9.]+)/],
  ["linux", "linux"],
  ["windowsce", /\bwindows ce(?: ([0-9.]+))?/],
  ["symbian", /\bsymbian(?:os)?\/([0-9.]+)/],
  ["blackberry", "blackberry"]
];

// 解析使用 Trident ?核的??器的 `??器模式` 和 `文?模式` 信息。
// @param {String} ua, userAgent string.
// @return {Object}
function IEMode(ua){
  if(!re_msie.test(ua)){return null;}

  var m,
      engineMode, engineVersion,
      browserMode, browserVersion,
      compatible=false;

  // IE8 及其以上提供有 Trident 信息，
  // 默?的兼容模式，UA 中 Trident 版本不?生?化。
  if(ua.indexOf("trident/") !== -1){
    m = /\btrident\/([0-9.]+)/.exec(ua);
    if(m && m.length>=2){
      // 真?引擎版本。
      engineVersion = m[1];
      var v_version = m[1].split(".");
      v_version[0] = parseInt(v_version[0], 10) + 4;
      browserVersion = v_version.join(".");
    }
  }

  m = re_msie.exec(ua);
  browserMode = m[1];
  var v_mode = m[1].split(".");
  if("undefined" === typeof browserVersion){
    browserVersion = browserMode;
  }
  v_mode[0] = parseInt(v_mode[0], 10) - 4;
  engineMode = v_mode.join(".");
  if("undefined" === typeof engineVersion){
    engineVersion = engineMode;
  }

  return {
    browserVersion: browserVersion,
    browserMode: browserMode,
    engineVersion: engineVersion,
    engineMode: engineMode,
    compatible: engineVersion !== engineMode
  };
}

// ??同源的 TheWorld 和 360 的 external ?象?行??。
// @param {String} key, ??字，用于????器的安?路?中出?的??字。
// @return {Undefined,Boolean,Object} 返回 undefined 或 false 表示??未命中。
function checkTW360External(key){
  if(!external){return;} // return undefined.
  try{
    //        360安?路?：
    //        C:%5CPROGRA~1%5C360%5C360se3%5C360SE.exe
    var runpath = external.twGetRunPath.toLowerCase();
    // 360SE 3.x ~ 5.x support.
    // 暴露的 external.twGetVersion 和 external.twGetSecurityID 均? undefined。
    // 因此只能用 try/catch 而?法使用特性判?。
    var security = external.twGetSecurityID(win);
    var version = external.twGetVersion(security);

    if(runpath && runpath.indexOf(key) === -1){return false;}
    if(version){return {version: version};}
  }catch(ex){}
}

var ENGINE = [
  ["trident", re_msie],
  //["blink", /blink\/([0-9.+]+)/],
  ["webkit", /\bapplewebkit[\/]?([0-9.+]+)/],
  ["gecko", /\bgecko\/(\d+)/],
  ["presto", /\bpresto\/([0-9.]+)/],
  ["androidwebkit", /\bandroidwebkit\/([0-9.]+)/],
  ["coolpadwebkit", /\bcoolpadwebkit\/([0-9.]+)/],
  ["u2", /\bu2\/([0-9.]+)/],
  ["u3", /\bu3\/([0-9.]+)/]
];
var BROWSER = [
  // Sogou.
  ["sogou", function(ua){
    if (ua.indexOf("sogoumobilebrowser") >= 0) {
      return /sogoumobilebrowser\/([0-9.]+)/
    } else if (ua.indexOf("sogoumse") >= 0){
      return true;
    }
    return / se ([0-9.x]+)/;
  }],
  // TheWorld (世界之窗)
  // 由于裙??系，TheWorld API 与 360 高度重合。
  // 只能通? UA 和程序安?路?中的?用程序名??分。
  // TheWorld 的 UA 比 360 更靠?，所有? TheWorld 的??放置到 360 之前。
  ["theworld", function(ua){
    var x = checkTW360External("theworld");
    if(typeof x !== "undefined"){return x;}
    return "theworld";
  }],
  // 360SE, 360EE.
  ["360", function(ua) {
    var x = checkTW360External("360se");
    if(typeof x !== "undefined"){return x;}
    if(ua.indexOf("360 aphone browser") !== -1){
      return /\b360 aphone browser \(([^\)]+)\)/;
    }
    return /\b360(?:se|ee|chrome|browser)\b/;
  }],
  // Maxthon
  ["maxthon", function(ua){
    try{
      if(external && (external.mxVersion || external.max_version)){
        return {
          version: external.mxVersion || external.max_version
        };
      }
    }catch(ex){}
    return /\b(?:maxthon|mxbrowser)(?:[ \/]([0-9.]+))?/;
  }],
  ["qq", /\bm?qqbrowser\/([0-9.]+)/],
  ["green", "greenbrowser"],
  ["tt", /\btencenttraveler ([0-9.]+)/],
  ["liebao", function(ua){
    if (ua.indexOf("liebaofast") >= 0){
      return /\bliebaofast\/([0-9.]+)/;
    }
    if(ua.indexOf("lbbrowser") === -1){return false;}
    var version;
    try{
      if(external && external.LiebaoGetVersion){
        version = external.LiebaoGetVersion();
      }
    }catch(ex){}
    return {
      version: version || NA_VERSION
    };
  }],
  ["tao", /\btaobrowser\/([0-9.]+)/],
  ["coolnovo", /\bcoolnovo\/([0-9.]+)/],
  ["saayaa", "saayaa"],
  // 有基于 Chromniun 的急速模式和基于 IE 的兼容模式。必?在 IE 的??之前。
  ["baidu", /\b(?:ba?idubrowser|baiduhd)[ \/]([0-9.x]+)/],
  // 后面?做修复版本?，?里只要能??是 IE 即可。
  ["ie", re_msie],
  ["mi", /\bmiuibrowser\/([0-9.]+)/],
  // Opera 15 之后?始使用 Chromniun ?核，需要放在 Chrome 的??之前。
  ["opera", function(ua){
    var re_opera_old = /\bopera.+version\/([0-9.ab]+)/;
    var re_opera_new = /\bopr\/([0-9.]+)/;
    return re_opera_old.test(ua) ? re_opera_old : re_opera_new;
  }],
  ["oupeng", /\boupeng\/([0-9.]+)/],
  ["yandex", /yabrowser\/([0-9.]+)/],
  // 支付?手机客?端
  ["ali-ap", function(ua){
    if(ua.indexOf("aliapp") > 0){
      return /\baliapp\(ap\/([0-9.]+)\)/;
    }else{
      return /\balipayclient\/([0-9.]+)\b/;
    }
  }],
  // 支付?平板客?端
  ["ali-ap-pd", /\baliapp\(ap-pd\/([0-9.]+)\)/],
  // 支付?商?客?端
  ["ali-am", /\baliapp\(am\/([0-9.]+)\)/],
  // 淘?手机客?端
  ["ali-tb", /\baliapp\(tb\/([0-9.]+)\)/],
  // 淘?平板客?端
  ["ali-tb-pd", /\baliapp\(tb-pd\/([0-9.]+)\)/],
  // 天?手机客?端
  ["ali-tm", /\baliapp\(tm\/([0-9.]+)\)/],
  // 天?平板客?端
  ["ali-tm-pd", /\baliapp\(tm-pd\/([0-9.]+)\)/],
  // UC ??器，可能?被??? Android ??器，??需要前置。
  // UC 桌面版??器?? Chrome 信息，需要放在 Chrome 之前。
  ["uc", function(ua){
    if(ua.indexOf("ucbrowser/") >= 0){
      return /\bucbrowser\/([0-9.]+)/;
    } else if(ua.indexOf("ubrowser/") >= 0){
      return /\bubrowser\/([0-9.]+)/;
    }else if(/\buc\/[0-9]/.test(ua)){
      return /\buc\/([0-9.]+)/;
    }else if(ua.indexOf("ucweb") >= 0){
      // `ucweb/2.0` is compony info.
      // `UCWEB8.7.2.214/145/800` is browser info.
      return /\bucweb([0-9.]+)?/;
    }else{
      return /\b(?:ucbrowser|uc)\b/;
    }
  }],
  ["chrome", / (?:chrome|crios|crmo)\/([0-9.]+)/],
  // Android 默???器。???需要在 safari 之前。
  ["android", function(ua){
    if(ua.indexOf("android") === -1){return;}
    return /\bversion\/([0-9.]+(?: beta)?)/;
  }],
  ["safari", /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
  // 如果不能被??? Safari，?猜?是 WebView。
  ["webview", /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],
  ["firefox", /\bfirefox\/([0-9.ab]+)/],
  ["nokia", /\bnokiabrowser\/([0-9.]+)/]
];

// UserAgent Detector.
// @param {String} ua, userAgent.
// @param {Object} expression
// @return {Object}
//    返回 null 表示?前表?式未匹配成功。
function detect(name, expression, ua){
  var expr = isFunction(expression) ? expression.call(null, ua) : expression;
  if(!expr){return null;}
  var info = {
    name: name,
    version: NA_VERSION,
    codename: ""
  };
  var t = toString(expr);
  if(expr === true){
    return info;
  }else if(t === "[object String]"){
    if(ua.indexOf(expr) !== -1){
      return info;
    }
  }else if(isObject(expr)){ // Object
    if(expr.hasOwnProperty("version")){
      info.version = expr.version;
    }
    return info;
  }else if(expr.exec){ // RegExp
    var m = expr.exec(ua);
    if(m){
      if(m.length >= 2 && m[1]){
        info.version = m[1].replace(/_/g, ".");
      }else{
        info.version = NA_VERSION;
      }
      return info;
    }
  }
}

var na = {name:"na", version:NA_VERSION};
// 初始化??。
function init(ua, patterns, factory, detector){
  var detected = na;
  each(patterns, function(pattern){
    var d = detect(pattern[0], pattern[1], ua);
    if(d){
      detected = d;
      return false;
    }
  });
  factory.call(detector, detected.name, detected.version);
}

// 解析 UserAgent 字符串
// @param {String} ua, userAgent string.
// @return {Object}
var parse = function(ua){
  ua = (ua || "").toLowerCase();
  var d = {};

  init(ua, DEVICES, function(name, version){
    var v = parseFloat(version);
    d.device = {
      name: name,
      version: v,
      fullVersion: version
    };
    d.device[name] = v;
  }, d);

  init(ua, OS, function(name, version){
    var v = parseFloat(version);
    d.os = {
      name: name,
      version: v,
      fullVersion: version
    };
    d.os[name] = v;
  }, d);

  var ieCore = IEMode(ua);

  init(ua, ENGINE, function(name, version){
    var mode = version;
    // IE ?核的??器，修复版本?及兼容模式。
    if(ieCore){
      version = ieCore.engineVersion || ieCore.engineMode;
      mode = ieCore.engineMode;
    }
    var v = parseFloat(version);
    d.engine = {
      name: name,
      version: v,
      fullVersion: version,
      mode: parseFloat(mode),
      fullMode: mode,
      compatible: ieCore ? ieCore.compatible : false
    };
    d.engine[name] = v;
  }, d);

  init(ua, BROWSER, function(name, version){
    var mode = version;
    // IE ?核的??器，修复??器版本及兼容模式。
    if(ieCore){
      // ?修改 IE ??器的版本，其他 IE ?核的版本不修改。
      if(name === "ie"){
        version = ieCore.browserVersion;
      }
      mode = ieCore.browserMode;
    }
    var v = parseFloat(version);
    d.browser = {
      name: name,
      version: v,
      fullVersion: version,
      mode: parseFloat(mode),
      fullMode: mode,
      compatible: ieCore ? ieCore.compatible : false
    };
    d.browser[name] = v;
  }, d);
  return d;
};


// NodeJS.
if(typeof process === "object" && process.toString() === "[object process]"){

  // 加?更多的??。
  var morerule = module["require"]("./morerule");
  [].unshift.apply(DEVICES, morerule.DEVICES || []);
  [].unshift.apply(OS,      morerule.OS      || []);
  [].unshift.apply(BROWSER, morerule.BROWSER || []);
  [].unshift.apply(ENGINE,  morerule.ENGINE  || []);

}else{

  var userAgent = navigator.userAgent || "";
  //var platform = navigator.platform || "";
  var appVersion = navigator.appVersion || "";
  var vendor = navigator.vendor || "";
  external = win.external;

  detector = parse(userAgent + " " + appVersion + " " + vendor);
  win.detector = detector;

}


// exports `parse()` API anyway.
detector.parse = parse;
window.Detector=detector;
	
})();

//console.log(Detector);

/*
// 判???器名
Detector.browser.name === "chrome" // true

// 判???器名方法 2.
!!Detector.browser.ie // false

// 判?老???器
if(Detector.browser.ie && Detector.browser.version < 8){
    alert("你的??器太老了。");
}

// 判? Trident 4(IE8) 以下版本??器引擎
if(Detector.engine.trident && Detector.engine.mode < 4){
    // hack code.
}

// 收集客?端??信息
Detector.browser.name + "/" + Detector.browser.fullVersion;
*/

