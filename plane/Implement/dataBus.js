var DataBus = function () {
    this.sound = new Sound();
    this.resource = new Resource();
    this.list = [];
    this.removeList = [];
};
DataBus.prototype.add = function (o) {
    this.list.push(o);
};

DataBus.prototype.remove = function (o) {
    this.removeList.push(o);
};

DataBus.prototype.execRemove = function (o) {
    for (var i = 0, item; item = this.removeList[i]; i++) {
        var index = this.list.indexOf(item);
        if (index > -1) {
            this.list.splice(index, 1);
        }
    }
};


var dataBus = new DataBus();