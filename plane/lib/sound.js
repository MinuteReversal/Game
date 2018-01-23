/**
 * @author zhy
 * @datetime 2018-01-05
 */
var Sound = function () {
    var me = this;
    me.isPause = false;
    me.list = {};

    if (arguments[0] instanceof Array) {
        me.loadList(arguments[0]);
    }
};

Sound.prototype.loadList = function (list) {
    var me = this;
    for (var i = 0; item = list[i]; i++) {
        if (item.src.indexOf(".mp3") > -1) {
            me.list[item.key] = item.entity;
        }
    }
};

Sound.prototype.play = function (key, isLoop) {
    var me = this;
    var a = me.list[key];
    if (typeof a === "undefined") return;
    a.loop = !!isLoop;
    try {
        a.currentTime = 0;
    } catch (ex) { }
    a.play();
};

Sound.prototype.playAll = function () {
    var me = this;
    for (key in me.list) {
        me.list[key].play();
    }
};

Sound.prototype.pause = function () {
    var me = this;
    me.isPause = true;
    for (key in me.list) {
        me.list[key].pause();
    }
};

Sound.prototype.continue = function () {
    var me = this;
    me.isPause = false;
    for (key in me.list) {
        me.list[key].play();
    }
};

Sound.prototype.stop = function () {
    var me = this;
    for (key in me.list) {
        var a = me.list[key];
        a.pause();
        a.currentTime = 0;
    }
};

Sound.prototype.fixIOSCantPlay = function () {
    var me = this;
    me.playAll();
    me.stop();
};

Sound.prototype.arraybufferToBase64 = function (arraybuffer) {
    var me = this;
    return URL.createObjectURL(new Blob([new Uint8Array(arraybuffer)], { type: "audio/mpeg" }));
};