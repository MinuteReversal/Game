/**
 * @author zhy
 * @datetime 2018-01-05
 */
var Sound = function () {
    this.isPause = false;
    this.audioContext = null;
    this.list = [];
    this.isSupportAudioContext = typeof AudioContext !== "undefined";

    if (this.isSupportAudioContext) {
        this.audioContext = new AudioContext();
    }
};

Sound.prototype.play = function (arraybuffer, isLoop) {
    var me = this;
    if (me.isSupportAudioContext) {
        me.audioContext.decodeAudioData(arraybuffer, function (buffer) {
            var bs = this.createBufferSource();
            bs.buffer = buffer;
            bs.connect(this.destination);
            bs.loop = !!isLoop;
            bs.start();
            bs = undefined;
        });
    }
    else {
        var audio = new Audio();
        audio.loop = isLoop;
        audio.addEventListener("ended", function (evt) {
            me.list.splice(me.list.indexOf(this), 1);
        });
        audio.src = me.arraybufferToBase64(arraybuffer);
        me.list.push(audio);
        audio.play();
    }
};

Sound.prototype.pause = function () {
    var me = this;
    me.isPause = true;
    if (me.isSupportAudioContext) {
        me.audioContext.suspend();
    }
    else {
        me.list.forEach(function (value, index, array) {
            value.pause();
        });
    }
};

Sound.prototype.continue = function () {
    var me = this;
    me.isPause = false;
    if (me.isSupportAudioContext) {
        me.audioContext.resume();
    }
    else {
        me.list.forEach(function (value, index, array) {
            value.play();
        });
    }
};

Sound.prototype.stop = function () {
    var me = this;

};

Sound.prototype.arraybufferToBase64 = function (arraybuffer) {
    var me = this;
    return URL.createObjectURL(new Blob([new Uint8Array(arraybuffer)], { type: "audio/mpeg" }));
};