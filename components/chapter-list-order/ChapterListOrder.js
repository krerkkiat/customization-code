var ChapterListOrder = function () {
    this.months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    this.order = new Order();

    this.isDefaultOrderReverse = false;
    /*this.isNameOrderReverse = false;*/
    this.isLastUpdatedOrderReverse = false;

    this._alterColumnTitlePanel();
};

ChapterListOrder.prototype._alterColumnTitlePanel = function () {
    var that = this,
        titlePanel = this.getContainer().find(".box03_22");
    titlePanel.find("p").click(function (e) {
        e.preventDefault();
        if(e.currentTarget.textContent == "ตอน") {
            that.isDefaultOrderReverse = !that.isDefaultOrderReverse;
            that.defaultOrder();
        } else if(e.currentTarget.textContent == "ชื่อตอน") {
            /*this.isNameOrderReverse = !this.isNameOrderReverse*/

        } else if(e.currentTarget.textContent == "อัพเดท") {
            that.isLastUpdatedOrderReverse = !that.isLastUpdatedOrderReverse;
            that.lastUpdatedOrder();
        }
    });
};

ChapterListOrder.prototype.defaultOrder = function () {
    if(this.isDefaultOrderReverse) {
        this.changeOrder(this.order.reverse(this.order.default(this.getChapterList())));
    } else {
        this.changeOrder(this.order.default(this.getChapterList()));
    }
};


ChapterListOrder.prototype.lastUpdatedOrder = function () {
    if(this.isLastUpdatedOrderReverse) {
        this.changeOrder(this.order.reverse(this.order.lastUpdated(this.getChapterList())));
    } else {
        this.changeOrder(this.order.lastUpdated(this.getChapterList()));
    }
};

ChapterListOrder.prototype.getContainer = function () {
    return $((document.getElementsByClassName("box03")[0] || document.querySelector("#storydiv > center > table:nth-child(n) > tbody > tr:nth-child(2) > td > table:nth-child(2)")).children[0]);
};

ChapterListOrder.prototype.getChapterList = function () {
    return this.getContainer().find("li:not(.box03_22)").get();
};

ChapterListOrder.prototype.changeOrder = function (list) {
    var c = this.getContainer();
    c.find("li:not(.box03_22)").detach();
    $(list).insertBefore(c.find("div.clear"));
};
