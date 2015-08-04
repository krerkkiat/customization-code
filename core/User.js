var User = function () {
    this.id = this._extarctUserId();
};

User.prototype._extarctUserId = function () {
    var frequencyList = {};
    $("#usermenu a[href^=\"http://my.dek-d.com/\"").get().forEach(function (e, i, a) {
        var rx = /my\.dek-d\.com\/([\w\d-_]+)\/.*/;
        var r = e.href.match(rx);
        if (r !== null) {
            if (this[r[1]] !== undefined) {
                this[r[1]] += 1;
            } else {
                this[r[1]] = 0;
            }
        }
    }, frequencyList);

    var mi = "dekdee";
    for (var i in frequencyList) {
        if (frequencyList[i] > frequencyList[mi]) {
            mi = i;
        }
    }

    return mi;
};

var user = new User();
