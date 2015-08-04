var ArticleCommand = function (user, article) {
    this.user = user;
    this.article = article;

    this.menuItems = [];

    this.editChapterPageMenu = null;
    this.editMainPageMenu = null;

    this._createEditMenuItems();
};

ArticleCommand.prototype._createEditMenuItems = function () {
    var userId = this.user.id;
    var author = this.article.authorId;

    var editorBaseURL = "http://my.dek-d.com/";
    var editorBaseURL2 = "/control/writer3/story-editor.php?";

    if (userId === author && this.article.type !== this.article.TYPE_UNKNOWN) {
        var text = "";
        var url = "";
        if (this.article.type == this.article.TYPE_CHAPTER) {
            text = "แก้ไขตอนนี้";
            url = editorBaseURL + userId + editorBaseURL2 + "story_id=" + this.article.id + "&chapter=" + this.article.chapter.id;

            this.addMenuItem(text, url);
        }
        text = "แก้ไขหน้าหลัก";
        url = editorBaseURL + userId + editorBaseURL2 + "story_id=" + this.article.id + "&chapter=-1";

        this.addMenuItem(text, url);
    }
};

ArticleCommand.prototype.addMenuItem = function (text, link) {
    var li = document.createElement("li");
    li.setAttribute("class", "normalsize");
    var a = document.createElement("a");
    a.setAttribute("href", link);
    a.textContent = text;
    li.appendChild(a);

    this.menuItems.push(li);
};

ArticleCommand.prototype.attach = function () {
    $(this.menuItems).insertAfter($("ul.welcome-screen-ul li:fir" + "st" + "-" + "ch" + "ild:not(.normal-size)"));
};

ArticleCommand.prototype.detach = function () {
    $(this.menuItems).detach();
};

var articleCommand = new ArticleCommand(user, article);
