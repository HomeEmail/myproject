(function() {
    var e, d = "http://adserving.joymb.com/queryad?rc=NmM6YjA6Y2U6YmM6ZTI6ZQ%3D%3D&wa=TGltZWlCSjIoNUcp&ef=TGltZWlTREtEZW1v&an=My4wLjAuOTc0&kcfv=1blHUEzm6W7fM3iWfHQQ9Xpx%2BaLBMMzoq98v3gltIiWwi%2FwOs3yG2MRNW9DMK2hGCp%2B6cdUY7C0aAh0X%2FVwJ%2F%2ByC6%2BGsMIu6fSF4sJ8sOYVeOc%2Bw6CwB7A%3D%3D&seckey=069fc5677ecb834aa07157f2c5a02b868f5377540001&adt=613BC2FE-8183-478F-AE83-3D297807B747&idfv=M0U1OUNGODItQzg1Ny00Q0Y2LTgyNjEtMjM4RkZFN0VCQzhF&isjb=0&uid=MDI6MDA6MDA6MDA6MDA6MDBfNmFLNVFaSmxpR29QdmxzVlBJZDJyWURzMDNvbE05VWV2WC9rYSsvZVRjeVdYMTUzTzJyYzVxa2d3c1BhYkludUROTG5mUk5qZW4rYlFsSFZYeS91WWc9PV9nYW1lSWRiYW5uZXI%3D&sdkinitMS=1.329530&jsinitMS=-1&imsi=%7B%22Carriername%22%3A%22%u4E2D%u56FD%u8054%u901A%22%2C%22MobileCountryCode%22%3A%22460%22%2C%22MobileNetworkCode%22%3A%2201%22%2C%22AllowsVOIP%22%3A%22YES%22%2C%22ISOCountryCode%22%3A%22cn%22%7D&pv=2.0&rf=2&at=1&db=0&gmo=%2B8&fwv=2.7.0&sdkv=3.0.0.150302&wbv=3&ver=1.0&lang=zh_cn&chid=&tag=3&shk=3&cam=0&vid=3&aud=3&gps=3&acl=3&prs=3&als=3&cel=&nt=3&lon=116.4649&lat=39.906941&ora=0",
        i = "http://adserving.joymb.com/impad?nt=3&uid=MDI6MDA6MDA6MDA6MDA6MDBfNmFLNVFaSmxpR29QdmxzVlBJZDJyWURzMDNvbE05VWV2WC9rYSsvZVRjeVdYMTUzTzJyYzVxa2d3c1BhYkludUROTG5mUk5qZW4rYlFsSFZYeS91WWc9PV9nYW1lSWRiYW5uZXI%3D&imsi=%7B%22Carriername%22%3A%22%u4E2D%u56FD%u8054%u901A%22%2C%22MobileCountryCode%22%3A%22460%22%2C%22MobileNetworkCode%22%3A%2201%22%2C%22AllowsVOIP%22%3A%22YES%22%2C%22ISOCountryCode%22%3A%22cn%22%7D&at=2&gmo=%2B8",
        b, l, a = p("img");

    function c() {
        return { displayAd: function() { b.appendChild(a) }, hideAd: function() { b.removeChild(n("limei_adImg")) } } }

    function j(t) {
        var s = new Image();
        s.src = i;
        s.onload = function() { s.onload = null;
            s = null };
        if (t != null && t != undefined) {
            var u = new Image();
            u.src = t;
            u.onload = function() { u.onload = null;
                u = null } } }

    function g(s) { b = n(s.id);
        h(s) }

    function h(s) { k(r(s.adtype)) }

    function r(s) {
        var t = {};
        if (s == "banner") { t.success = q }
        if (s == "interstitial") { t.success = m }
        t.failure = f;
        t.url = d;
        return t }

    function m(u) { l = u;
        var w = l.toUrl,
            s = l.preUrl,
            t = l.impressionTrackingUrl;
        if (u.statuscode == 423) {
            return }
        if (l == null || l == undefined) { h();
            return }
        var v = l.creativeType;
        if (v != 4) { h();
            return }
        i = i + "&cid=" + escape(l.adId) + "&skey=" + escape(l.skey) + "&rid=" + escape(l.rid);
        a.id = "limei_adImg";
        a.alt = "";
        a.style.cssText = "width:100%;height:auto;margin:0;padding:0;display:block;cursor:point";
        a.src = l.adUrl;
        a.addEventListener("click", function() {
            var x = new Image();
            x.src = s;
            x.onload = function() { x.onload = null;
                x = null };
            window.open(w) });
        j(t) }

    function q(v) { l = v.ad;
        var w = l.trueUrl,
            t = l.adtargeturl,
            u = l.impression_tracking_url;
        if (v.statuscode == 423) {
            return }
        if (l == null || l == undefined) { h();
            return }
        var s = l.showtype;
        if (s == "10" || s == "1" || s == "2") { h();
            return }
        i = i + "&cid=" + escape(l.adId) + "&skey=" + escape(l.skey) + "&rid=" + escape(l.rid);
        a.id = "limei_adImg";
        a.alt = "";
        a.style.cssText = "width:100%;height:auto;margin:0;padding:0;display:block;cursor:point";
        a.src = l.src;
        a.addEventListener("click", function() {
            var x = new Image();
            x.src = t;
            x.onload = function() { x.onload = null;
                x = null };
            window.open(w) });
        j(u) }
    window.MBJoy = function() {};

    function f() {alert('failure result:'+arguments[0].msg);}

    function o(H) {
        var t = "",
            z = "",
            s = "",
            w = "",
            G = 2;
        var E = navigator.userAgent;
        var y = E.split("(");
        var v = y[1].split(")");
        var I = v[0].split(" ")[4].split("_");
        var u = "";
        for (var x = 0, A = I.length; x < A; ++x) {
            if (x == 0) { u += I[x] } else { u += "." + I[x] } }
        if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) { 
        	//alert("请在移动端访问~");
            //return ;
            E="Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";
        }
        var D = "";
        try {
            if (/iPhone/.test(E)) { t = "Apple";
                z = "iPhone " + u;
                s = "ios";
                w = u } else { t = "Android";
                z = v[0].split(";")[2];
                s = "Android";
                w = v[0].split(";")[2].split(" ")[2];
                G = 1 }
            if (/\//.test(z)) {
                var F = z.split("/");
                z = F[0] + F[1] }
            if (/\//.test(w)) {
                var C = w.split("/");
                w = C[0] + C[1] }
            D = t + "/" + z + "/" + s + "/" + w 
        } catch (B) { D = "Apple/iPhone7%2C2/ios/9.2.1" }
        d = d + "&adu=" + H.adu + "&gameId=" + H.gameId + "&ua=" + D + "&mod=" + G + "&sw=" + H.sw + "&sh=" + H.sh;
        i = i + "&adu=" + H.adu + "&gameId=" + H.gameId + "&ua=" + D + "&mod=" + G;
        g(H);
        return c() }
    window.adlmjs = { getInstance: function(s) {
            if (!e) { e = o(s) }
            return e } };

    function n(s) {
        return document.getElementById(s) }

    function p(s) {
        return document.createElement(s) }

    function k(v) {
        var y = "jsonp_" + (+new Date()),
            A = v.doc || document,
            s = v.url,
            z = A.createElement("script"),
            w = A.getElementsByTagName("head")[0],
            B = v.success || function() {},
            t = v.failure || function() {};
        z.type = "text/javascript";
        v.charset && (z.charset = v.charset);
        v.deffer && (z.deffer = v.deffer);
        s = s + (s.indexOf("?") >= 0 ? "&" + (v.jsonp || "callback") + "=" + y : "?" + (v.jsonp || "callback") + "=" + y);
        z.src = s;
        var u = false;

        function x() {
            if (!u) {
                try { delete window[y];
                    z.parentNode.removeChild(z);
                    z = null } catch (C) {}
                u = true } }
        window[y] = function() { x();
            if (B) { B.apply(v.scope || this, arguments) } };
        window.errorcallback = function() {
            if (t) { t.apply(v.scope || this, arguments) } };
        z.onreadystatechange = z.onload = function() {
            var C = this.readyState;
            if (!u && (!C || C === "loaded" || C === "complete")) { x() } };
        z.onerror = function() { x();
            if (t) { t.apply(v.scope || this, arguments) } else { errorcallback.apply(v.scope || this, arguments) } };
        w.appendChild(z);
        return z } })();
