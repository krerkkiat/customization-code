/* require CompareFunction */

var ChapterListOrder = function () {
    this.ASCENDING_ORDER = 0;
    this.DESCENDING_ORDER = 1;

    this.container = this.getContainer();

    this.chapterIdState = this.ASCENDING_ORDER;
    this.chapterUpdateDateState = this.ASCENDING_ORDER;

    this._alterColumnTitlePanel();
};

ChapterListOrder.prototype._alterColumnTitlePanel = function () {
    var that = this,
        titlePanel = this.container.find(".box03_22");
    titlePanel.find("p").click(function (e) {
            e.preventDefault();
            if (e.currentTarget.textContent == "ตอน") {
                that.chapterIdState = (that.chapterIdState == that.ASCENDING_ORDER)? that.DESCENDING_ORDER : that.ASCENDING_ORDER;
                that.reorder(CompareFunction.compareChapterId, that.chapterIdState);

                that.chapterUpdateDateState = that.ASCENDING_ORDER;
            } else if (e.currentTarget.textContent == "อัพเดท") {
                that.chapterUpdateDateState = (that.chapterUpdateDateState == that.ASCENDING_ORDER)? that.DESCENDING_ORDER : that.ASCENDING_ORDER;
                that.reorder(CompareFunction.compareChapterUpdateDate, that.chapterUpdateDateState);

                that.chapterIdState = that.DESCENDING_ORDER;
            }
    });
};

ChapterListOrder.prototype.getContainer = function () {
    return $((document.getElementsByClassName("box03")[0] || document.querySelector("#storydiv > center > table:nth-child(n) > tbody > tr:nth-child(2) > td > table:nth-child(2)")).children[0]);
};

ChapterListOrder.prototype.getChapterList = function () {
    return this.container.find("li:not(.box03_22)").get();
};

ChapterListOrder.prototype.reorder = function (compareFunction, orderType) {
    var list = this.getChapterList();

    list.sort(compareFunction);

    if(orderType === this.DESCENDING_ORDER) {
        list = list.reverse();
    }

    this.container.find("li:not(.box03_22)").detach();
    $(list).insertBefore(this.container.find("div.clear"));
};

var chapterListOrder = new ChapterListOrder();
