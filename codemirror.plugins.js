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
   * insert '*text*' '**text**'
   */
  CodeMirror.defineExtension("wrapSymbolTag", function(star) {
    var selectString = this.getSelection();
    this.replaceSelection(star + selectString + star);
    var cursor = this.getCursor(false);
    if(selectString == "") cursor.ch = cursor.ch - star.length;
    this.setCursor(cursor);
  });

})();
