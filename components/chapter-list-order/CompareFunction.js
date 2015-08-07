var CompareFunction = {};
CompareFunction.months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

CompareFunction.compareChapterId = function (a, b) {
    var ta = $(a).find("div:first-child p").text();
    var tb = $(b).find("div:first-child p").text();

    var cmpResult = CompareFunction.compareNumber(parseInt(ta), parseInt(tb));

    return cmpResult;
};

CompareFunction.compareChapterUpdateDate = function (a, b) {
    var ta = $(a).find("div p.t-right").text().split(" ");
    var tb = $(b).find("div p.t-right").text().split(" ");

    var cmpResult = CompareFunction.compareNumber(parseInt(ta[2]), parseInt(tb[2]));
    if (cmpResult == 0) {
        cmpResult = CompareFunction.compareNumber(CompareFunction.months.indexOf(ta[1]), CompareFunction.months.indexOf(tb[1]));
        if (cmpResult == 0) {
            cmpResult = CompareFunction.compareNumber(parseInt(ta[0]), parseInt(tb[0]));
        }
    }

    return cmpResult;
};

CompareFunction.compareNumber = function (a, b) {
    if (a < b) {
        return -1
    } else if (a > b) {
        return 1
    }
    return 0;
};
