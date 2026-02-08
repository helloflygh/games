!function() {
    "use strict";
    if (window.AudioContext || (window.AudioContext = window.webkitAudioContext || window.mozAudioContext),
    window.AudioContext && !AudioContext.prototype.createGain && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode),
    window.OfflineAudioContext || (window.OfflineAudioContext = window.webkitOfflineAudioContext),
    window.AudioBufferSourceNode && (AudioBufferSourceNode.prototype.start || (AudioBufferSourceNode.prototype.start = AudioBufferSourceNode.prototype.noteOn),
    AudioBufferSourceNode.prototype.stop || (AudioBufferSourceNode.prototype.stop = AudioBufferSourceNode.prototype.noteOff)),
    !window.performance) {
        var e, t, n, a, o, r, i, s, c, l, A, u, $, f, _, d, p, v, h, m, g, y, x, b, V, w, I, C, E, P, T, S, D, R, L, G, B, X, O, N, Y, k, q, F, U, M, Q, z, H, j, Z, W, J, K, ee = Date.now();
        window.performance = {
            now: function() {
                return Date.now() - ee
            }
        }
    }
    window.NodeList && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach),
    Uint8Array.prototype.slice || Object.defineProperty(Uint8Array.prototype, "slice", {
        value: function(e, t) {
            return new Uint8Array(Array.prototype.slice.call(this, e, t))
        }
    }),
    Object.assign || Object.defineProperty(Object, "assign", {
        value: function e(t, n) {
            if (null == t)
                throw TypeError("Cannot convert undefined or null to object");
            for (var a = Object(t), o = 1; o < arguments.length; o++) {
                var r = arguments[o];
                if (null != r)
                    for (var i in r)
                        Object.prototype.hasOwnProperty.call(r, i) && (a[i] = r[i])
            }
            return a
        },
        writable: !0,
        configurable: !0
    }),
    Element.prototype.closest || (Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
    Element.prototype.closest = function(e) {
        var t = this;
        if (!document.documentElement.contains(this))
            return null;
        do {
            if (t.matches(e))
                return t;
            t = t.parentElement
        } while (null !== t);
        return null
    }
    ),
    Array.prototype.find || (Array.prototype.find = function(e) {
        for (var t = Object(this), n = t.length >>> 0, a = arguments[1], o = 0; o < n; o++) {
            var r = t[o];
            if (e.call(a, r, o, t))
                return r
        }
    }
    );
    var et, en, ea, eo = String.fromCharCode, er = [[100, 111, 99, 117, 109, 101, 110, 116], [108, 111, 99, 97, 116, 105, 111, 110], [104, 111, 115, 116], [119, 119, 119, 46, 111, 110, 101, 109, 111, 116, 105, 111, 110, 46, 99, 111, 109]], ei = function(e) {
        return eo.apply(null, e) || er
    }, es = window[ei(er[0])][ei(er[1])][ei(er[2])] == ei(er[3]), ec = !("ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch);
    document.documentElement && (ec && (document.documentElement.className += " mouse-device"),
    document.location.search.indexOf("fullscreen") > -1 && (document.documentElement.className += " fullscreen")),
    et = /iPad|iPhone|iPod/.test(navigator.userAgent),
    en = (document.querySelector('meta[property="script-time"]') || {}).content,
    e = function(e) {
        var t = new XMLHttpRequest;
        t.open(e.method || "POST", e.url, !0),
        e.responseType && (t.responseType = e.responseType),
        e.contentType && t.setRequestHeader("Content-Type", e.contentType);
        var n = function() {
            e.always && e.always()
        };
        return t.onload = function() {
            if (404 == t.status) {
                e.fail ? e.fail(t.status) : alert("Not found (" + t.status + ")"),
                n();
                return
            }
            if (t.status >= 500) {
                e.fail ? e.fail(t.status) : alert("Server error (" + t.status + ")"),
                n();
                return
            }
            if (e.reponseType)
                e.done(this.responseText);
            else
                try {
                    var a = JSON.parse(this.responseText);
                    e.done(a)
                } catch (o) {
                    alert(o)
                }
            n()
        }
        ,
        e.fail && (t.onerror = t.ontimeout = function() {
            e.fail ? e.fail() : alert("Network error"),
            n()
        }
        ),
        t.send(e.content ? e.content : e.form ? new FormData(e.form) : null),
        t
    }
    ,
    t = function(e) {
        var t = navigator.userAgent.match("Firefox") && "mp3" != e.format ? "ogg" : "mp3"
          , n = new Date().getTime()
          , a = new XMLHttpRequest;
        return a.open("GET", "sound_loader.php?" + (e.sound ? "sound=" + e.sound + "&" : "") + "items=" + e.items + "&format=" + t + "&time=" + en, !0),
        a.responseType = "arraybuffer",
        a.onprogress = function(t) {
            t.total && e.onProgress && e.onProgress({
                progress: t.loaded / t.total
            })
        }
        ,
        a.onload = function() {
            if (200 != a.status)
                throw "Error loading sounds " + a.responseURL + " (" + a.status + ")";
            for (var t = new Uint8Array(this.response), n = 0, o = function() {
                for (var e = ""; t[n]; )
                    e += String.fromCharCode(t[n]),
                    n++;
                return n++,
                e
            }, r = [], i = ""; ; ) {
                var s = o();
                if (!s)
                    break;
                var c = parseInt(o())
                  , l = t.slice(n, n + c).buffer;
                (function(t) {
                    var n = new Promise(function(n, a) {
                        e.context.decodeAudioData(l, function(a) {
                            n(),
                            e.onItem({
                                name: t,
                                buffer: a
                            })
                        }, function(e) {
                            a(),
                            i || (i = e + " " + t + " (" + c + ")")
                        })
                    }
                    );
                    r.push(n)
                }
                )(s),
                n += c
            }
            Promise.all(r).then(function(t) {
                e.onFinished()
            }).catch(function(t) {
                throw setTimeout(function() {
                    e.ignoreErrors || alert("Error decoding sounds"),
                    e.onFinished()
                }, 0),
                t + " " + i
            })
        }
        ,
        a.onerror = a.ontimeout = function(t) {
            throw setTimeout(function() {
                alert("Error loading sounds"),
                e.onFinished()
            }, 0),
            "Error loading sounds " + e.items + " (" + (new Date().getTime() - n) + " ms)"
        }
        ,
        es && a.send(),
        {
            stop: function() {
                a.abort()
            }
        }
    }
    ,
    n = function(e) {
        var t = document.createElement("input");
        t.type = "file",
        t.style.display = "none",
        document.body.appendChild(t),
        t.addEventListener("change", function(n) {
            var a = t.files[0]
              , o = new FileReader;
            o.onload = function(t) {
                e.onLoad({
                    filename: a.name,
                    content: t.target.result
                })
            }
            ,
            "ArrayBuffer" == e.type ? o.readAsArrayBuffer(a) : "DataURL" == e.type ? o.readAsDataURL(a) : o.readAsText(a),
            t.parentNode.removeChild(t)
        }),
        t.click()
    }
    ,
    a = function(e, t, n) {
        var a = new Blob([e],{
            type: t
        })
          , o = document.createElement("a")
          , r = window.URL.createObjectURL(a);
        o.href = r,
        o.target = "_blank",
        o.download = n,
        document.body.appendChild(o),
        o.click(),
        et || window.URL.revokeObjectURL(r),
        o.parentElement.removeChild(o)
    }
    ,
    o = function(e, t, n) {
        var o = e.length;
        n && (o -= n * (e.sampleRate || 44100));
        var r, i, s = e.numberOfChannels, c = o * s * 2 + 44, l = new ArrayBuffer(c), A = new DataView(l), u = [], $ = 0, f = 0;
        function _(e) {
            A.setUint16(f, e, !0),
            f += 2
        }
        function d(e) {
            A.setUint32(f, e, !0),
            f += 4
        }
        for (d(1179011410),
        d(c - 8),
        d(1163280727),
        d(544501094),
        d(16),
        _(1),
        _(s),
        d(e.sampleRate),
        d(2 * e.sampleRate * s),
        _(2 * s),
        _(16),
        d(1635017060),
        d(c - f - 4),
        r = 0; r < e.numberOfChannels; r++)
            u.push(e.getChannelData(r));
        for (; f < c; ) {
            for (r = 0; r < s; r++) {
                var p = u[r];
                i = (.5 + (i = Math.max(-1, Math.min(1, p[$] + (p[$ + o] || 0)))) < 0 ? 32768 * i : 32767 * i) | 0,
                A.setInt16(f, i, !0),
                f += 2
            }
            $++
        }
        a(l, "audio/wav", t)
    }
    ,
    r = function(e) {
        throw e
    }
    ,
    ea = {
        get: function(e, t, n) {
            if (!(t in e) && "toJSON" != t)
                throw "Prop not found " + t;
            return e[t]
        }
    },
    i = function(e) {
        return "?test" != document.location.search ? e : new Proxy(e,ea)
    }
    ;
    var el, eA, eu, e$ = function(e={}) {
        let t, n, a, o = function(e) {
            var o = t.context.sampleRate || 44100;
            n = new ef({
                context: new OfflineAudioContext(2,o * e.duration,o),
                audioSystem: t
            }),
            a = setInterval( () => {
                e.onProgress && e.onProgress(n.context.currentTime / e.duration)
            }
            , 1e3),
            n.context.oncomplete = t => {
                e.onComplete({
                    renderedBuffer: t.renderedBuffer
                }),
                r()
            }
        }, r = function() {
            clearTimeout(a),
            n && "closed" != n.context.state && n.context.suspend(n.context.currentTime),
            n = null
        };
        return !function() {
            if (!/iPad|iPhone|iPod/.test(navigator.userAgent))
                return;
            let e = document.createElement("div");
            e.id = "tempAudio",
            e.innerHTML = '<audio x-webkit-airplay="deny"></audio>';
            let n = e.children[0];
            n.src = "data:audio/mpeg;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA//////////////////////////////////////////////////////////////////8AAABhTEFNRTMuMTAwA8MAAAAAAAAAABQgJAUHQQAB9AAAAnGMHkkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQxAADgnABGiAAQBCqgCRMAAgEAH///////////////7+n/9FTuQsQH//////2NG0jWUGlio5gLQTOtIoeR2WX////X4s9Atb/JRVCbBUpeRUq//////////////////9RUi0f2jn/+xDECgPCjAEQAABN4AAANIAAAAQVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVQ==",
            n.preload = "auto",
            n.type = "audio/mpeg",
            n.disableRemotePlayback = !0,
            document.body.append(e);
            let a = () => {
                n.play().catch( () => {}
                ),
                n.pause(),
                "running" != t.context.state && t.context.resume(),
                window.removeEventListener("mousedown", a)
            }
              , o = () => {
                window.addEventListener("mousedown", a)
            }
            ;
            window.addEventListener("focus", () => o()),
            o()
        }(),
        t = new ef({
            context: new AudioContext({
                sampleRate: 44100
            }),
            lowpass: e.lowpass,
            highpass: e.highpass
        }),
        this.current = function() {
            return n || t
        }
        ,
        this.startOffline = o,
        this.stopOffline = r,
        this.isOffline = function() {
            return !!n
        }
        ,
        this
    }, ef = function(e) {
        var t, n = this, a = e.context, o = e.audioSystem, r = {}, i = {}, s = a.createGain();
        s.gain.value = o ? o.masterGain.gain.value : .8,
        es && s.connect(a.destination);
        var c = a.createGain();
        c.gain.value = o ? o.convolverGain.gain.value : 1;
        var l = a.createBiquadFilter();
        l.type = o ? o.filter1.type : e.highpass ? "highpass" : "allpass",
        l.frequency.value = o ? o.filter1.frequency.value : e.highpass || 0,
        l.Q.value = 0;
        var A = a.createBiquadFilter();
        A.type = o ? o.filter2.type : e.lowpass ? "lowpass" : "allpass",
        A.frequency.value = o ? o.filter2.frequency.value : e.lowpass || 0,
        l.connect(A);
        var u = a.createGain();
        u.gain.value = 0,
        u.connect(s),
        c.connect(s),
        A.connect(s);
        var $ = a.createGain();
        $.connect(s);
        var f = function() {
            for (var e in r)
                r[e].disconnect();
            r = {}
        }
          , _ = function(e) {
            if (t) {
                if (e == t.buffer)
                    return;
                t.disconnect()
            }
            f(),
            (t = n.convolver = a.createConvolver()).connect(c),
            t.buffer = e,
            A.connect(t)
        };
        o && o.convolver.buffer && _(o.convolver.buffer);
        var d = function(e) {
            c.gain.value = e
        }
          , p = function() {
            $.disconnect(),
            f(),
            ($ = n.sessionGain = a.createGain()).connect(s)
        }
          , v = function(e, t, n) {
            for (var a = e.getChannelData(0), o = e.sampleRate || 44100, r = n ? n * o : a.length, i = Math.min(t * o, Math.floor(r / 2)), s = r - 1; s >= 0; s--)
                s >= r - i && (a[s] = a[s] * (r - s) / i + a[s - i] * (s - r + i) / i)
        }
          , h = function(e) {
            var n = r[e];
            if (n)
                return n;
            var o = a.createGain();
            return o.gain.value = e,
            t && o.connect(t),
            r[e] = o,
            o
        }
          , m = function(e) {
            var t = i[e];
            return t || (t = i[e] = a.createGain()).connect(n.filter1),
            t
        }
          , g = function(e, t, n, a) {
            var o = m(e);
            o.gain.cancelScheduledValues(n),
            o.gain.setTargetAtTime(t, n, a)
        }
          , y = function() {
            for (var e in i)
                i[e].disconnect();
            i = {}
        };
        return this.context = a,
        this.sessionGain = $,
        this.masterGain = s,
        this.convolverGain = c,
        this.filter1 = l,
        this.filter2 = A,
        this.setConvolverBuffer = _,
        this.setConvolverGain = d,
        this.fadeOutSession = p,
        this.crossFade = v,
        this.effectLevelNode = h,
        this.channelGain = m,
        this.setChannelGain = g,
        this.resetChannelGains = y,
        this
    }, e_ = ('Simple',
    'Compound',
    'Complex',
    (el = [{
        value: "2/2",
        name: "2/2",
        beats: 2,
        beatScale: 2,
        beatDiv: 2,
        group: "a"
    }, {
        value: "4/2",
        name: "4/2",
        beats: 4,
        beatScale: 2,
        beatDiv: 2,
        group: "a"
    }, {
        value: "2/4",
        name: "2/4",
        beats: 2,
        beatScale: 1,
        beatDiv: 2,
        group: "a"
    }, {
        value: "3/4",
        name: "3/4",
        beats: 3,
        beatScale: 1,
        beatDiv: 2,
        group: "a"
    }, {
        value: "4/4",
        name: "4/4",
        beats: 4,
        beatScale: 1,
        beatDiv: 2,
        group: "a"
    }, {
        value: "3/8",
        name: "3/8",
        beats: 3,
        beatScale: .5,
        beatDiv: 2,
        group: "a"
    }, {
        value: "6/8",
        name: "6/8",
        beats: 2,
        beatScale: 1.5,
        beatDiv: 3,
        group: "b"
    }, {
        value: "9/8",
        name: "9/8",
        beats: 3,
        beatScale: 1.5,
        beatDiv: 3,
        group: "b"
    }, {
        value: "12/8",
        name: "12/8",
        beats: 4,
        beatScale: 1,
        beatDiv: 3,
        group: "b"
    }, {
        value: "5/4",
        name: "5/4",
        beats: 5,
        beatScale: 1,
        beatDiv: 2,
        group: "c"
    }, {
        value: "7/4",
        name: "7/4",
        beats: 7,
        beatScale: 1,
        beatDiv: 2,
        group: "c"
    }, {
        value: "5/8",
        name: "5/8",
        beats: 5,
        beatScale: .5,
        beatDiv: 2,
        group: "c"
    }, {
        value: "7/8",
        name: "7/8",
        beats: 7,
        beatScale: .5,
        beatDiv: 2,
        group: "c"
    }]).forEach(function(e, t) {
        el[e.value] = e
    }),
    function(e, t) {
        for (var n in t)
            "object" != typeof t[n] || t[n].length ? typeof e[n] != typeof t[n] && void 0 != t[n] && (e[n] = t[n]) : "object" != typeof e[n] ? e[n] = JSON.parse(JSON.stringify(t[n])) : e_(e[n], t[n])
    }
    );
    eA = this,
    eu = function(e) {
        function t(e) {
            if (e && e.constructor === Array) {
                var t = e.filter(function(e) {
                    return "number" == typeof e
                }).filter(function(e) {
                    return !isNaN(e)
                });
                if (6 === e.length && 6 === t.length) {
                    var a = n();
                    return a[0] = t[0],
                    a[1] = t[1],
                    a[4] = t[2],
                    a[5] = t[3],
                    a[12] = t[4],
                    a[13] = t[5],
                    a
                }
                if (16 === e.length && 16 === t.length)
                    return e
            }
            throw TypeError("Expected a `number[]` with length 6 or 16.")
        }
        function n() {
            for (var e = [], t = 0; t < 16; t++)
                t % 5 == 0 ? e.push(1) : e.push(0);
            return e
        }
        function a(e) {
            return o(e)
        }
        function o(e) {
            var t = Math.PI / 180 * e
              , a = n();
            return a[0] = a[5] = Math.cos(t),
            a[1] = a[4] = Math.sin(t),
            a[4] *= -1,
            a
        }
        e.format = t,
        e.fromString = function e(n) {
            if ("string" == typeof n) {
                var a = n.match(/matrix(3d)?\(([^)]+)\)/);
                if (a)
                    return t(a[2].split(", ").map(parseFloat))
            }
            throw TypeError("Expected a string containing `matrix()` or `matrix3d()")
        }
        ,
        e.identity = n,
        e.inverse = function e(n) {
            var a = t(n)
              , o = a[0] * a[5] - a[4] * a[1]
              , r = a[0] * a[6] - a[4] * a[2]
              , i = a[0] * a[7] - a[4] * a[3]
              , s = a[1] * a[6] - a[5] * a[2]
              , c = a[1] * a[7] - a[5] * a[3]
              , l = a[2] * a[7] - a[6] * a[3]
              , A = a[10] * a[15] - a[14] * a[11]
              , u = a[9] * a[15] - a[13] * a[11]
              , $ = a[9] * a[14] - a[13] * a[10]
              , f = a[8] * a[15] - a[12] * a[11]
              , _ = a[8] * a[14] - a[12] * a[10]
              , d = a[8] * a[13] - a[12] * a[9]
              , p = 1 / (o * A - r * u + i * $ + s * f - c * _ + l * d);
            if (isNaN(p) || p === 1 / 0)
                throw Error("Inverse determinant attempted to divide by zero.");
            return [(a[5] * A - a[6] * u + a[7] * $) * p, (-a[1] * A + a[2] * u - a[3] * $) * p, (a[13] * l - a[14] * c + a[15] * s) * p, (-a[9] * l + a[10] * c - a[11] * s) * p, (-a[4] * A + a[6] * f - a[7] * _) * p, (a[0] * A - a[2] * f + a[3] * _) * p, (-a[12] * l + a[14] * i - a[15] * r) * p, (a[8] * l - a[10] * i + a[11] * r) * p, (a[4] * u - a[5] * f + a[7] * d) * p, (-a[0] * u + a[1] * f - a[3] * d) * p, (a[12] * c - a[13] * i + a[15] * o) * p, (-a[8] * c + a[9] * i - a[11] * o) * p, (-a[4] * $ + a[5] * _ - a[6] * d) * p, (a[0] * $ - a[1] * _ + a[2] * d) * p, (-a[12] * s + a[13] * r - a[14] * o) * p, (a[8] * s - a[9] * r + a[10] * o) * p]
        }
        ,
        e.multiply = function e(n, a) {
            for (var o = t(n), r = t(a), i = [], s = 0; s < 4; s++)
                for (var c = [o[s], o[s + 4], o[s + 8], o[s + 12]], l = 0; l < 4; l++) {
                    var A = 4 * l
                      , u = [r[A], r[A + 1], r[A + 2], r[A + 3]]
                      , $ = c[0] * u[0] + c[1] * u[1] + c[2] * u[2] + c[3] * u[3];
                    i[s + A] = $
                }
            return i
        }
        ,
        e.perspective = function e(t) {
            var a = n();
            return a[11] = -1 / t,
            a
        }
        ,
        e.rotate = a,
        e.rotateX = function e(t) {
            var a = Math.PI / 180 * t
              , o = n();
            return o[5] = o[10] = Math.cos(a),
            o[6] = o[9] = Math.sin(a),
            o[9] *= -1,
            o
        }
        ,
        e.rotateY = function e(t) {
            var a = Math.PI / 180 * t
              , o = n();
            return o[0] = o[10] = Math.cos(a),
            o[2] = o[8] = Math.sin(a),
            o[2] *= -1,
            o
        }
        ,
        e.rotateZ = o,
        e.scale = function e(t, a) {
            var o = n();
            return o[0] = t,
            o[5] = "number" == typeof a ? a : t,
            o
        }
        ,
        e.scaleX = function e(t) {
            var a = n();
            return a[0] = t,
            a
        }
        ,
        e.scaleY = function e(t) {
            var a = n();
            return a[5] = t,
            a
        }
        ,
        e.scaleZ = function e(t) {
            var a = n();
            return a[10] = t,
            a
        }
        ,
        e.skew = function e(t, a) {
            var o = n();
            return o[4] = Math.tan(Math.PI / 180 * t),
            a && (o[1] = Math.tan(Math.PI / 180 * a)),
            o
        }
        ,
        e.skewX = function e(t) {
            var a = n();
            return a[4] = Math.tan(Math.PI / 180 * t),
            a
        }
        ,
        e.skewY = function e(t) {
            var a = n();
            return a[1] = Math.tan(Math.PI / 180 * t),
            a
        }
        ,
        e.toString = function e(n) {
            return "matrix3d(" + t(n).join(", ") + ")"
        }
        ,
        e.translate = function e(t, a) {
            var o = n();
            return o[12] = t,
            a && (o[13] = a),
            o
        }
        ,
        e.translate3d = function e(t, a, o) {
            var r = n();
            return void 0 !== t && void 0 !== a && void 0 !== o && (r[12] = t,
            r[13] = a,
            r[14] = o),
            r
        }
        ,
        e.translateX = function e(t) {
            var a = n();
            return a[12] = t,
            a
        }
        ,
        e.translateY = function e(t) {
            var a = n();
            return a[13] = t,
            a
        }
        ,
        e.translateZ = function e(t) {
            var a = n();
            return a[14] = t,
            a
        }
        ,
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    "object" == typeof exports && "undefined" != typeof module ? eu(exports) : "function" == typeof define && define.amd ? define(["exports"], eu) : eu((eA = eA || self).Rematrix = {});
    var ec = !("ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch);
    document.documentElement && ec && (document.documentElement.className += " mouse-device");
    var ed = function(e, t, n, a) {
        var o = [e, Rematrix.translate3d(t, n, a)].reduce(Rematrix.multiply);
        return {
            x: o[12],
            y: o[13],
            z: o[14]
        }
    }
      , ep = function(e, t, n, a) {
        var o = [Rematrix.inverse(e), Rematrix.translate3d(t, n, a)].reduce(Rematrix.multiply);
        return {
            x: o[12],
            y: o[13],
            z: o[14]
        }
    }
      , ev = [{
        width: 256,
        height: 256,
        transform: "translate3d(-50px,-50px,50px)"
    }, {
        width: 256,
        height: 256,
        transform: "translate3d(50px,-50px,-50px) rotateY(180deg)"
    }, {
        width: 256,
        height: 256,
        transform: "translate3d(-50px,-50px,-50px) rotateY(-90deg)"
    }, {
        width: 256,
        height: 256,
        transform: "translate3d(50px,-50px,50px) rotateY(90deg)"
    }, {
        width: 256,
        height: 256,
        transform: "translate3d(-50px,-50px,-50px) rotateX(90deg)"
    }, {
        width: 256,
        height: 256,
        transform: "translate3d(-50px,50px,50px) rotateX(-90deg)"
    }]
      , eh = !0
      , em = !1
      , eg = {}
      , e0 = [];
    Rematrix.identity();
    var ey = function(e, t, n) {
        var a = Math.round(t)
          , o = Math.round(n);
        if (a < 0 || o < 0 || a >= h || o >= h)
            return !1;
        var r = e0[e]
          , i = r.hitCache;
        if (i.imageData && a >= i.x1 && o >= i.y1 && a <= i.x2 && o <= i.y2) {
            var s = i.imageData;
            if (s.data[4 * s.width * (o - i.y1) + 4 * (a - i.x1) + 3] < 192)
                return
        }
        return r.context.getImageData(a, o, 1, 1).data[3] >= 192
    }
      , ex = function(e, t, n, a, o) {
        if (!(a < t) && !(o < n)) {
            var r = e0[e]
              , i = r.hitCache;
            i.x1 = t,
            i.y1 = n,
            i.x2 = a,
            i.y2 = o,
            i.imageData = r.context.getImageData(t, n, a - t + 1, o - n + 1)
        }
    }
      , e3 = function(e, t, n, a) {
        var o = (a + 35999640) % 360;
        o % 180 == 0 ? ex(e, 0 == o ? t : 0, n - 5, 180 == o ? t : h, n + 5) : ex(e, t - 5, 90 == o ? n : 0, t + 5, 270 == o ? n : h)
    }
      , eb = function() {
        if (e3(m, y, x, w),
        y > h - 10) {
            var e = e5(m, 0, y, x, y - h);
            e3(e.planeId, e.x, e.y, w + e.rot)
        }
        if (x > h - 10) {
            var e = e5(m, 90, y, x, x - h);
            e3(e.planeId, e.x, e.y, w + e.rot - 90)
        }
        if (y < 10) {
            var e = e5(m, 180, y, x, -y);
            e3(e.planeId, e.x, e.y, w + e.rot - 180)
        }
        if (x < 10) {
            var e = e5(m, 270, y, x, -x);
            e3(e.planeId, e.x, e.y, w + e.rot - 270)
        }
    }
      , eV = function() {
        var e = c[A % c.length];
        return A += 1,
        e
    }
      , ew = function() {
        var e, t, n, a, o = document.createElement("div");
        o.className = "food",
        this.reset = function() {
            a = eV()
        }
        ,
        this.placeFood = function() {
            var r = n
              , i = [0, 1, 2, 3, 4, 5];
            i.splice(m, 1),
            l.forEach(function(e) {
                var t = e.currentPlaneId();
                void 0 != t && i.splice(i.indexOf(t), 1)
            });
            for (var s = 0; e = Math.random() * (h - 20) + 10,
            t = Math.random() * (h - 20) + 10,
            (ey(n = s < 1e3 ? i[Math.floor(Math.random() * i.length)] : Math.floor(6 * Math.random()), e, t) || ey(n, e + 6, t) || ey(n, e - 6, t) || ey(n, e, t + 6) || ey(n, e, t - 6)) && !(s > 1e4); )
                s++;
            var c = function() {
                r && o.parentNode.removeChild(o),
                e0[n].div.appendChild(o),
                o.classList.remove("fade", "animate"),
                o.style.left = e / 2 + "px",
                o.style.top = t / 2 + "px",
                o.style.backgroundImage = "radial-gradient(" + e7(a) + "," + e7(a, .1) + ",transparent)",
                K++
            };
            o.classList.add("animate"),
            setTimeout(function() {
                o.classList.add("fade")
            }, 0),
            setTimeout(c, 500),
            document.getElementById("score").innerHTML = u
        }
        ,
        this.test = function() {
            var o = y - e
              , r = x - t;
            m == n && 12 > Math.sqrt(o * o + r * r) && (u += 50,
            S = a,
            a = eV(),
            this.placeFood(),
            k += 150,
            eR("eat", .1))
        }
        ,
        this.currentPlaneId = function() {
            return n
        }
    }
      , e2 = function() {
        O.style.transform = "rotate(" + w + "deg)"
    }
      , e1 = function() {
        N.style.transform = "rotate(" + Q + "deg)"
    }
      , eI = function(e) {
        e && e()
    }
      , eC = function() {
        e6(),
        !em && (em = !0,
        s.classList.add("running"),
        document.getElementById("share-box").style.display = "none",
        eQ(function() {
            eG()
        }))
    }
      , e4 = function() {
        em && (g = !0,
        document.getElementById("share-box").style.display = "",
        d.style.transform = "",
        setTimeout(function() {
            em = !1,
            s.classList.remove("running")
        }, 1e3))
    }
      , e6 = function() {
        A = 0,
        Y = [],
        p = 0,
        v = 0,
        g = !1,
        m = Math.floor(6 * Math.random()),
        y = R = 50,
        x = L = 125,
        w = 0,
        I = 4,
        C = 0,
        E = 0,
        P = 0,
        T = 2,
        D = (S = eV()).slice(),
        X = 0,
        q = G = y,
        F = B = x,
        Q = w,
        k = 50,
        U = I,
        M = I,
        Q = w,
        z = m,
        W = S.slice(),
        J = D.slice(),
        H = -1,
        j = 0,
        Z = 0,
        u = 0,
        K = 0,
        e0.forEach(function(e) {
            e.context.clearRect(0, 0, h, h),
            e.hitCache.imageData = void 0,
            e.lastTailX = void 0,
            e.lastTailY = void 0
        }),
        l.forEach(function(e) {
            e.reset(),
            e.placeFood()
        }),
        eb()
    }
      , e7 = function(e, t) {
        return "rgba(" + Math.round(e[0]) + "," + Math.round(e[1]) + "," + Math.round(e[2]) + "," + (t || 1) + ")"
    }
      , eE = function(e, t, n, a, o, r) {
        var i = e0[e]
          , s = Math.cos(r * Math.PI / 180)
          , c = Math.sin(r * Math.PI / 180);
        if (o) {
            var l = a + 2;
            if (!g && (ey(e, t + s * l - c * l / 2, n + c * l + s * l / 2) || ey(e, t + s * l + c * l / 2, n + c * l - s * l / 2)) && (g = p,
            b = y,
            V = x,
            eR("gameover"),
            setTimeout(function() {
                e4()
            }, 3e3)),
            g) {
                var A = Math.max(1 - (p - g) * .04, 0);
                if (0 == A)
                    return;
                var u = p - g;
                t += (Math.random() - .5) * u,
                n += (Math.random() - .5) * u,
                a += (p - g) * .15,
                i.context.globalAlpha = A * A
            }
            i.context.globalCompositeOperation = "source-over",
            i.context.fillStyle = e7(D),
            i.context.beginPath(),
            i.context.ellipse(t, n, a, a, 0, 0, 2 * Math.PI, !1),
            i.context.fill(),
            i.context.globalAlpha = 1,
            g || (i.context.globalCompositeOperation = "destination-out",
            i.context.fillStyle = "white",
            i.context.beginPath(),
            i.context.arc(t + s * a / 2 - c * a / 3, n + c * a / 2 + s * a / 3, 1, 0, 2 * Math.PI, !1),
            i.context.arc(t + s * a / 2 + c * a / 3, n + c * a / 2 - s * a / 3, 1, 0, 2 * Math.PI, !1),
            i.context.fill())
        } else {
            void 0 != i.lastTailX && (i.context.globalCompositeOperation = "destination-out",
            i.context.beginPath(),
            i.context.arc(i.lastTailX, i.lastTailY, a, 0, 2 * Math.PI, !1),
            i.context.fillStyle = "white",
            i.context.fill(),
            i.context.globalCompositeOperation = "source-over",
            i.context.beginPath(),
            i.context.arc(i.lastTailX - 2 * s, i.lastTailY - 2 * c, a, 0, 2 * Math.PI, !1),
            i.context.fillStyle = e7(J),
            i.context.globalAlpha = .015,
            i.context.fill(),
            i.context.globalAlpha = 1);
            var $ = a - 1;
            i.context.globalCompositeOperation = "source-over",
            i.context.beginPath(),
            i.context.arc(t + s, n + c, $, r * Math.PI / 180 + 1.5 * Math.PI, r * Math.PI / 180 + 2.5 * Math.PI, !1),
            i.context.lineTo(t - s * $, n - c * $),
            i.context.fillStyle = e7(J),
            i.context.fill(),
            i.lastTailX = t,
            i.lastTailY = n
        }
    }
      , eP = function(e, t, n, a, o, r, i, s) {
        var c, l, A, u, $ = t + Math.cos(.1 * r + i * Math.PI / 180), f = n + Math.sin(.12 * r + i * Math.PI / 180);
        if (s ? (u = Math.sqrt((c = $ - R) * c + (l = f - L) * l),
        c /= u,
        l /= u,
        A = Math.atan2(l, c),
        R = $,
        L = f) : (u = Math.sqrt((c = $ - G) * c + (l = f - B) * l),
        c /= u,
        l /= u,
        A = Math.atan2(l, c),
        G = $,
        B = f),
        eE(e, $, f, o, s, a),
        e0[e],
        $ > h - 10) {
            var _ = e5(e, 0, $, f, $ - h);
            eE(_.planeId, _.x, _.y, o, s, a + _.rot)
        }
        if (f > h - 10) {
            var _ = e5(e, 90, $, f, f - h);
            eE(_.planeId, _.x, _.y, o, s, a + _.rot - 90)
        }
        if ($ < 10) {
            var _ = e5(e, 180, $, f, -$);
            eE(_.planeId, _.x, _.y, o, s, a + _.rot - 180)
        }
        if (f < 10) {
            var _ = e5(e, 270, $, f, -f);
            eE(_.planeId, _.x, _.y, o, s, a + _.rot - 270)
        }
    }
      , eT = {
        planeId: void 0,
        rot: void 0,
        x: void 0,
        y: void 0
    }
      , e5 = function(e, t, n, a, o) {
        var r = e0[e]
          , i = r.connected[(t + 3599640) % 360 / 90]
          , s = e0[i]
          , c = ed(r.transform, n / 2, a / 2, -o / 2)
          , l = ed(r.transform, n / 2, a / 2, -o / 2 - 1)
          , A = ep(s.transform, c.x, c.y, c.z)
          , u = ep(s.transform, l.x, l.y, l.z)
          , $ = eT;
        return $.planeId = i,
        $.x = 2 * A.x,
        $.y = 2 * A.y,
        $.rot = 180 * Math.atan2(u.y - A.y, u.x - A.x) / Math.PI,
        $
    }
      , eS = function() {
        var e = e0[m]
          , t = y / h - .5
          , n = x / h - .5
          , a = Math.atan2(n, t)
          , o = Math.sqrt(t * t + n * n)
          , r = w % 180 == 0 ? 1 : 0;
        P += .01 > Math.abs(r - P) ? 0 : (r > P ? 1 : -1) * .1;
        var i = Rematrix.rotateX(Math.sin(a) * o * P * 90)
          , s = Rematrix.rotateY(-Math.cos(a) * o * P * 90)
          , c = Rematrix.rotateX(Math.sin(a) * o * (1 - P) * 90)
          , l = Rematrix.rotateY(-Math.cos(a) * o * (1 - P) * 90)
          , A = [Rematrix.rotateZ(X), i, s, l, c, Rematrix.inverse(e.transform)].reduce(Rematrix.multiply)
          , u = ep(A, 0, 0, 0);
        _.style.transform = "matrix3d(" + [A, Rematrix.translate3d(u.x, u.y, u.z)].reduce(Rematrix.multiply) + ")"
    }
      , eD = function() {
        var e = Math.sin(Math.PI / 180 * w);
        y += Math.cos(Math.PI / 180 * w),
        x += e
    }
      , eR = function(e, t, n, a, o) {
        var r = eg[e];
        if (r) {
            var i = $.current().context
              , s = i.createBufferSource();
            s.buffer = r.buffer,
            s.playbackRate.value = n || 1,
            s.loop = a || !1;
            var c = i.createGain();
            o ? (c.gain.value = 0,
            c.gain.linearRampToValueAtTime(t || 1, o)) : c.gain.value = void 0 != t ? t : 1,
            s.connect(c),
            c.connect($.current().sessionGain),
            s.start(0)
        }
    }
      , eL = function() {
        if (k > 0)
            k--;
        else if (!g) {
            var e = Y[H + 1];
            if (e && j == e[0]) {
                var t = e[1] != z;
                z = e[1],
                Q = e[2],
                U = e[3],
                q = e[4],
                F = e[5],
                Z = e[6],
                W = e[7].slice(),
                H++,
                e1(),
                t && (N.parentNode.removeChild(N),
                e0[z].div.appendChild(N))
            }
            e0[z];
            var n = M + .5 * Math.sin(.13 * j);
            M != U && (M += (U < M ? -1 : 1) * .05),
            eP(z, q, F, Q, n + 1, j, Z, !1),
            N.style.left = q + "px",
            N.style.top = F + "px";
            var a = 1 * Math.sin(Math.PI / 180 * Q);
            q += 1 * Math.cos(Math.PI / 180 * Q),
            F += a,
            j++
        }
        e0[m];
        var o = (w + 35999640) % 360
          , r = 180 == o && y < 0 ? -y : 270 == o && x < 0 ? -x : 0 == o && y > h ? y - h : 90 == o && x > h ? x - h : 0;
        if (r > 0) {
            var i = e5(m, w, y, x, r);
            m = i.planeId,
            y = i.x,
            x = i.y,
            X += w - i.rot,
            es && (w = i.rot),
            P = w % 180 == 0 ? 1 : 0,
            eb(),
            e2(),
            O.parentNode.removeChild(O),
            e0[m].div.appendChild(O),
            eR("swosh", .4, .1 * Math.random() + .95)
        }
        e0[m];
        var n = I + .5 * Math.sin(.13 * p)
          , s = 4 == T ? 3 : 4;
        s != I && (I += (s < I ? -1 : 1) * .05),
        eP(m, y, x, w, n, p, X, !0);
        var c = [p, m, w, s, y, x, X, S];
        (0 == Y.length || m != Y[Y.length - 1][1] || w != Y[Y.length - 1][2] || s != Y[Y.length - 1][3] || S[0] != Y[Y.length - 1][7][0] || S[1] != Y[Y.length - 1][7][1] || S[2] != Y[Y.length - 1][7][2]) && Y.push(c),
        eD(),
        l.forEach(function(e) {
            e.test()
        }),
        D[0] += (S[0] - D[0]) * .01,
        D[1] += (S[1] - D[1]) * .01,
        D[2] += (S[2] - D[2]) * .01,
        J[0] += (W[0] - J[0]) * .01,
        J[1] += (W[1] - J[1]) * .01,
        J[2] += (W[2] - J[2]) * .01,
        eS(),
        p++,
        v--
    }
      , eG = function() {
        if (em) {
            for (var e = g ? 1 : T; e > 0; e--)
                eL();
            window.requestAnimationFrame(eG)
        }
    }
      , eB = function(e) {
        if (!g) {
            var t = e - X
              , n = w == t;
            if (clearTimeout(f),
            (t - w + 1799820) % 180 != 0) {
                var a = t - w;
                if (a > 180 && (a -= 360),
                a < -180 && (a += 360),
                a == E)
                    for (; v > 0; )
                        eL(),
                        v--;
                C = w,
                E = a,
                w = t,
                e2(),
                v = 20,
                eb(),
                T = 2,
                f = setTimeout(function() {
                    T = 4
                }, 500)
            } else
                T = n ? 4 : 1
        }
    }
      , eX = {
        ArrowLeft: 180,
        ArrowRight: 0,
        ArrowUp: 270,
        ArrowDown: 90
    }
      , eO = {}
      , eN = function(e) {
        var t = e.key;
        if (!eO[t]) {
            if (eO[t] = !0,
            em) {
                var n = eX[t];
                void 0 != n && eB(n)
            }
            " " == t && eC(),
            "Escape" == t && e4()
        }
    }
      , eY = function(e) {
        delete eO[e.key],
        eO.ArrowLeft || eO.ArrowRight || eO.ArrowUp || eO.ArrowDown || (clearTimeout(f),
        T = 2)
    }
      , ek = {
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
        deltaX: 0,
        deltaY: 0,
        down: !1
    }
      , eq = function(e) {
        var t, n;
        if (e.changedTouches) {
            var a = e.changedTouches[0];
            t = a.clientX,
            n = a.clientY
        } else
            t = e.clientX,
            n = e.clientY;
        return ek.lastX = ek.x,
        ek.lastY = ek.y,
        ek.deltaX = t - ek.x,
        ek.deltaY = n - ek.y,
        ek.dist = Math.sqrt(ek.deltaX * ek.deltaX + ek.deltaY * ek.deltaY),
        ek.x = t,
        ek.y = n,
        ek
    }
      , eF = function(e) {
        return eq(e),
        !1
    }
      , eU = function(e) {
        var t = eq(e);
        t.down = !0,
        t.startX = t.x,
        t.startY = t.y;
        var n = e.target.getBoundingClientRect();
        if (em) {
            var a, o = (t.x - n.x) / n.width, r = (t.y - n.y) / n.height;
            eB(a = Math.min(o, 1 - o) < Math.min(r, 1 - r) ? o > .5 ? 0 : 180 : r > .5 ? 90 : 270),
            e.preventDefault()
        }
        eh && (eR("swosh", 0),
        eh = !1)
    }
      , eM = function(e) {
        eq(e).down = !1,
        clearTimeout(f),
        T = 2
    }
      , eQ = function(e) {
        var t = document.getElementById("app")
          , n = t.clientWidth
          , a = t.clientHeight;
        d.style.transform = "";
        var o = 2 * Math.min(Math.max(.0013 * Math.min(n, a), .9), 1.2);
        document.getElementById("container").style.perspective = 300 * o + "px",
        setTimeout(function() {
            d.style.transform = "scale3d(" + o + "," + o + "," + o + ")",
            e && e()
        }, 600)
    }
      , ez = function() {
        _ = document.getElementById("planet"),
        d = document.getElementById("world"),
        c = [];
        for (var e = 0; e < 2; e += 1)
            for (var n = 0; n < 2; n += 1)
                for (var a = 0; a < 2; a += 1)
                    e * n * a != 1 && c.push([128 * e + 64, 128 * n + 64, 128 * a + 64]);
        l = [];
        for (var o = 0; o < 2; o++)
            l.push(new ew);
        var r = "";
        ev.forEach(function(e) {
            r += '<div class="plane" style="width: ' + .5 * e.width + "px; height: " + .5 * e.height + "px; transform: " + e.transform.replace(/50px/g, .5 * e.width / 2 + "px") + '"><div class="bg"><div class="map"></div><div class="shadow"></div></div><canvas width="' + 1 * e.width + '" height="' + 1 * e.height + '"></canvas></div>'
        }),
        _.innerHTML = r,
        h = 1 * ev[0].width,
        ev.forEach(function(e, t) {
            var n = _.childNodes[t];
            n.style.filter = "brightness(" + (.025 * t + .85) + ")";
            var a = n.childNodes[1]
              , o = a.getContext("2d", {
                willReadFrequently: !0
            })
              , r = Rematrix.fromString(getComputedStyle(n).transform);
            e0.push({
                plane: e,
                div: n,
                canvas: a,
                context: o,
                transform: r,
                lastHeadX: 0,
                lastHeadY: 0,
                lastTailX: 0,
                lastTailY: 0,
                hitCache: {
                    x1: void 0,
                    y1: void 0,
                    x2: void 0,
                    y2: void 0,
                    imageData: void 0
                }
            })
        }),
        e0.forEach(function(e, t) {
            for (var n = [], a = 0; a < 360; a += 90) {
                var o, r = Math.cos(a * Math.PI / 180), i = Math.sin(a * Math.PI / 180), s = h / 2 + r * h / 2, c = h / 2 + i * h / 2, l = ed(e.transform, s, c, 0), A = ed(e.transform, s + r, c + i, 0);
                e0.forEach(function(e, n) {
                    if (n != t) {
                        var a = ep(e.transform, l.x, l.y, l.z);
                        ep(e.transform, A.x, A.y, A.z).z - a.z > 0 && (o = n)
                    }
                }),
                n.push(o)
            }
            e.connected = n
        }),
        document.getElementById("start-game-button").onclick = function() {
            eC()
        }
        ,
        (O = document.createElement("div")).style.display = "none",
        O.id = "head",
        O.className = "head",
        e0[0].div.appendChild(O),
        (N = document.createElement("div")).style.display = "none",
        N.id = "tail",
        N.className = "tail",
        e0[0].div.appendChild(N),
        N.style.left = q + "px",
        N.style.top = F + "px",
        (s = document.getElementById("app")).classList.add("ready"),
        s.onmousemove = s.ontouchmove = eF,
        s.onmousedown = s.ontouchstart = eU,
        s.onmouseup = s.ontouchend = eM,
        window.onkeydown = eN,
        window.onkeyup = eY,
        window.addEventListener("resize", function() {
            eQ()
        }),
        $ = new e$({}),
        t({
            items: ["swosh", "gameover", "eat", "song"],
            format: "mp3",
            context: $.current().context,
            onItem: function(e) {
                eg[e.name] = {
                    buffer: e.buffer
                }
            },
            onFinished: function() {
                eR("song", .5, .75, !0, 5)
            },
            ignoreErrors: !0
        }),
        eI()
    };
    window.onerror = function(e, t, n) {
        alert(e + "," + t + "," + n)
    }
    ,
    document.addEventListener("DOMContentLoaded", ez)
}();
