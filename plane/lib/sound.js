var Sound = function () {
    this.isPause = false;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
};

Sound.prototype.play = function (arraybuffer, isLoop) {
    var me = this;
    me.audioContext.decodeAudioData(arraybuffer, function (buffer) {
        var bs = this.createBufferSource();
        bs.buffer = buffer;
        bs.connect(this.destination);
        bs.loop = !!isLoop;
        bs.start();
        bs = undefined;
    });
};

Sound.prototype.pasue = function () {
    var me = this;
    me.isPause = true;
    me.audioContext.suspend();
};

Sound.prototype.continue = function () {
    var me = this;
    me.isPause = false;
    me.audioContext.resume();
};

Sound.prototype.stop = function () {
    var me = this;
};