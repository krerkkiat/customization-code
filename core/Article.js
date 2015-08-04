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

var article = new Article();
