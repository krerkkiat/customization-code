/* Method from http://kilianvalkhof.com/2010/javascript/how-to-build-a-fast-simple-list-filter-with-jquery/ */

var SearchBox = function () {
    var that = this;

    jQuery.expr[':'].Contains = function (a, i, m) {
        return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };

    this.box = document.createElement("input");
    this.box.setAttribute("style", "height: 20px; line-height: 25px; margin: 0 5px 0 5px; width: 250px");
    this.box.setAttribute("type", "text");
    this.box.setAttribute("placeholder", "หาโค้ดที่ต้องการไม่เจอ? ลองค้นหาดูสิ");

    // mark as unused
    this.target = $((document.getElementsByClassName("box03")[0] || document.querySelector("#storydiv > center > table:nth-child(n) > tbody > tr:nth-child(2) > td > table:nth-child(2)")).children[0]).parent();
    this.target.first().css("height", this.target.first()[0].scrollHeight);
    /*var list = t.find("li:not(.box03_22)").get();*/
    $(this.box).insertAfter($("h2.box02.box02_1.head2 p"));

    $(this.box).change(function () {
        var searchText = $(that.box).val();
        if (searchText !== "") {
            /*$(list).find("a:not(:Contains(" + searchText + "))").parent().parent().slideUp();
            $(list).find("a:Contains(" + searchText + ")").parent().parent().slideDown();*/

            /*t.find("li:not(.box03_22):Contains(" + searchText + ")").slideDown();
            t.find("li:not(.box03_22):not(:Contains(" + searchText + "))").slideUp();*/

            var a = that.target.find(that.makeMatchSeletors(searchText)).get();
            var b = that.target.find("li:not(.box03_22)").get();
            var notInA = $.grep(b, function (i) {
                return $.inArray(i, a) == -1;
            });
            $(a).slideDown();
            $(notInA).slideUp();

            /*$.unique(t.find(makeMatchSeletors(searchText))).slideDown();
            $.unique(t.find(makeNotMatchSeletors(searchText))).slideUp();*/
        } else {
            that.target.find("li:not(.box03_22)").slideDown();
        }
    }).keyup(function () {
        $(this).change();
    });
};

SearchBox.prototype.makeMatchSeletors = function (searchText) {
    var searchTextList = searchText.split(" ");
    var selector = "";
    for (var i = 0; i < searchTextList.length; i++) {
        selector += "li:not(.box03_22):Contains(" + searchTextList[i] + "),";
    }
    return selector.slice(0, -1);
};

SearchBox.prototype.makeNotMatchSeletors = function(searchText) {
    var searchTextList = searchText.split(" ");
    var selector = "li:not(.box03_22):not(";
    for (var i = 0; i < searchTextList.length; i++) {
        selector += ":Contains(" + searchTextList[i] + ")";
    }
    return selector + ")";
};
