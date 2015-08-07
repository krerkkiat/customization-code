var StyleManager = function (id, initRules) {
    this.id = id;
    initRules = initRules || "";

    this.styleTag = document.getElementById(this.id);

    if(this.styleTag === null) {
        this.head = document.head || document.getElementsByTagName('head')[0];
        this.styleTag = document.createElement('style');
        this.styleTag.id = this.id;

        this.styleTag.type = 'text/css';
        if (this.styleTag.styleSheet) {
            this.styleTag.styleSheet.cssText = initRules;
        } else {
            this.styleTag.appendChild(document.createTextNode(initRules));
        }
        this.head.appendChild(this.styleTag);
    }

    this.styleSheet = this.styleTag.sheet;
};

StyleManager.prototype.insertRule = function (selector, propertyString) {
    /* https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule */
    this.styleSheet.insertRule(selector + "{" + propertyString + "}", this.styleSheet.cssRules.length);
};

StyleManager.prototype.insertRuleAt = function (selector, propertyString, idx) {
    this.styleSheet.insertRule(selector + "{" + propertyString + "}", idx);
};

StyleManager.prototype.deleteRule = function (selector) {
    for(var i = 0; i < this.styleSheet.cssRules.length; i++) {
        if(this.styleSheet.cssRules[i].selectorText === selector) {
            this.styleSheet.deleteRule(i);
            return true;
        }
    }
    return false;
};

StyleManager.prototype.deleteRuleAt = function (idx) {
    this.styleSheet.deleteRule(idx);
};

StyleManager.prototype.getCSSRules = function () {
    return this.styleSheet.cssRules;
};

var styleManager  = new StyleManager("cc-style");
