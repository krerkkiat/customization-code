Order should be class
then
    LastUpdatedOrder will exrend from Order
    DefaulOrder will entend from Order
    and so on



var Order = function () {
    this.months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
};

Order.prototype.compare = function (a, b) {
    if (a < b) {
        return -1
    } else if (a > b) {
        return 1
    }
    return 0;
};
Order.prototype.default = function (list) {
    var that = this;
    list.sort(function (a, b) {
        var ta = $(a).find("div:first-child p").text();
        var tb = $(b).find("div:first-child p").text();

        var cmpResult = that.compare(parseInt(ta), parseInt(tb));

        return cmpResult;
    });
    return list;
};

Order.prototype.reverse = function (list) {
    return list.reverse();
};

Order.prototype.lastUpdated = function (list) {
    var that = this;
    list.sort(function (a, b) {
        var ta = $(a).find("div p.t-right").text().split(" ");
        var tb = $(b).find("div p.t-right").text().split(" ");

        var cmpResult = that.compare(parseInt(ta[2]), parseInt(tb[2]));
        if (cmpResult == 0) {
            cmpResult = that.compare(that.months.indexOf(ta[1]), that.months.indexOf(tb[1]));
            if (cmpResult == 0) {
                cmpResult = that.compare(parseInt(ta[0]), parseInt(tb[0]));
            }
        }

        return cmpResult;
    });
    return list.reverse();
};
