// This is a jQuery plugins file.

(function($){

  // Needs require this lib at the moment:
  // CodeMirror
  // marked
  // codemirror/extend.js
  jQuery.fn.extend({
    markdown: function(){
      return this.each( function(){
        if ( this.type !== 'textarea' ){
          return false;
        }

        var $textarea = jQuery(this);
        var $wrapper  = $textarea.parent();
        var $preview  = jQuery($textarea.attr('data-markdown-preview'));

        var editor = CodeMirror.fromTextArea(this, {
          mode:             'gfm',
          theme:            "default",
          styleActiveLine:  true,
          matchBrackets:    true,
          lineWrapping:     true,
          autofocus:        true,
          indentWithTabs:   true,
          tabSize:          2,
          showCursorWhenSelecting:  true
        });

        editor.on("change", function(doc, changeObj) {
          $preview.html(marked(doc.getValue()));
        });

        editor.on('scroll', function(instance){
          var scrollInfo = instance.getScrollInfo();
          $preview.scrollTop( scrollInfo.top / scrollInfo.height * $preview[0].scrollHeight );
        });

        $preview.html(marked(editor.getValue()));

      });

    }
  });

})(jQuery);