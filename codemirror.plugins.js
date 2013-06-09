/**
 * Extension for CodeMirror.
 *
 * @author Miclle <miclle.zheng@gmail.com>
 * Contributed under the same license terms as CodeMirror.
 */
(function() {

  /**
   * insert '## text'
   */
  CodeMirror.defineExtension("insertTitle", function(num) {
    var pos = this.getCursor();
        pos.ch = 0;
    this.replaceRange("###### ".slice(6 - num), pos, pos);
  });

  /**
   * insert '*text*' '**text**' ...
   */
  CodeMirror.defineExtension("wrapSymbolTag", function(symbol) {
    var selectString = this.getSelection();
    this.replaceSelection(symbol + selectString + symbol);
    var cursor = this.getCursor(false);
    if(selectString == "") cursor.ch = cursor.ch - symbol.length;
    this.setCursor(cursor);
  });

  /**
   * save markdown content
   */
  CodeMirror.defineExtension("saveMarkdownContent", function() {
    function eventFire(el, etype){
      if (el.fireEvent) {
        (el.fireEvent('on' + etype));
      } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent(etype, true, false);
        el.dispatchEvent(evObj);
      }
    }
    var link = document.createElement("a");
    link.download = "markdown.md";
    link.href = "data:application/stream;base64," + $.base64.encode(this.getValue());
    eventFire(link, "click");
  });

  /**
   * tab fast keys
   */
  CodeMirror.defineExtension("tabFastKey", function() {
    var posEnd = this.getCursor("end");
    var posStart = { line: posEnd.line, ch: posEnd.ch - 1}
    switch(this.getRange(posStart, posEnd)){
      case "a":
        this.replaceRange("[Title text](http://sample.com/)", posStart, posEnd);
      break;
      case "i":
        this.replaceRange("![Alt text](https://sample.com/)", posStart, posEnd);
      break;
      default:
        CodeMirror.commands.defaultTab(this);
      break;
    }
  });

})();