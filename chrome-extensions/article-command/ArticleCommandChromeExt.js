var User = function () {
    this.id = this._extarctUserId();
};

User.prototype._extarctUserId = function () {
    var frequencyList = {};
    window.$("#usermenu a[href^=\"http://my.dek-d.com/\"").get().forEach(function (e, i, a) {
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

var Article = function () {
    this._articleIdRegex = /[\?&]id=(\d+)/;
    this._chapterIdRegex = /[\?&]chapter=(\d+)/;
    this._authorIdRegex = /my\.dek-d\.com\/([\w\d-_]+)[\/.]*/;
    this._articleInfoRegex = /^ตอนที่ \d+ : (.+)View : (\d+) , Rating : (\d+)% \/ (\d+) vote\(s\)$/;
    this.TYPE_UNKNOWN = 0;
    this.TYPE_MAIN = 1;
    this.TYPE_CHAPTER = 2;

    this.href = document.location.href;
    this.id = this._extractArticleId();

    this.chapter = null;
    var chapterId = this._extractChapterId();
    if(chapterId !== null) {
        this.chapter = {};
        this.chapter.id = chapterId;

        var info = document.querySelectorAll("div.content div.big_next:not(.big_next1) > p")[0].textContent.match(this._articleInfoRegex);
        this.chapter.title = info[1];
        this.chapter.view = parseInt(info[2]);
        this.chapter.rate = parseFloat(info[3]);
        this.chapter.vote = parseInt(info[4]);
    }

    this.authorId = this._extractAuthorId();

    this.type = this._extractType();

    if(this.type === this.TYPE_CHAPTER) {

    }
};

Article.prototype._extractArticleId = function () {
    var r = this.href.match(this._articleIdRegex);
    if (r && r.length == 2) {
        return r[1];
    }
    return r;
};

Article.prototype._extractChapterId = function () {
    var r = this.href.match(this._chapterIdRegex);
    if (r && r.length == 2) {
        return r[1];
    }
    return r;
};

Article.prototype._extractAuthorId = function () {
    var t = document.querySelector("ul.name_story li:last-of-type a");
    var r = t.href.match(this._authorIdRegex);
    if (r && r.length == 2) {
        return r[1];
    }
    return r;
};

Article.prototype._extractType = function () {
    if(this.chapter == null) {
        return this.TYPE_MAIN;
    } else if(this.chapter !== null) {
        return this.TYPE_CHAPTER;
    } else {
        return this.TYPE_UNKNOWN;
    }
};

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
    window.$(this.menuItems).insertAfter(window.$("ul.welcome-screen-ul li:fir" + "st" + "-" + "ch" + "ild:not(.normal-size)"));
};

ArticleCommand.prototype.detach = function () {
    window.$(this.menuItems).detach();
};

var checkState = function () {
    if(document.readyState === "interactive") {
        setTimeout(function () {
            var articleCommand = new ArticleCommand(new User(), new Article());
            articleCommand.attach();
        }, 7000);
    } else if(document.readyState === "complete") {
        var articleCommand = new ArticleCommand(new User(), new Article());
        articleCommand.attach();
    } else {
        setTimeout(checkState, 3000);
    }
}

setTimeout(checkState, 3000);
