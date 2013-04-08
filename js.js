$(function(){

  $markdown_preview = $('#markdown-preview');

  $("#markdown-input").resizable({
    handles: "e",
    resize: function(event, ui) {
      $markdown_preview.width($('body').width() - ui.size.width - 10); //10 is padding value
    }
  });

  $('.markdown-input').markdown();

  $("#download-box a").click(function(){
    $(this).attr('href', "data:application/stream;base64," + $.base64.encode($(".markdown-input").val()));
  });
});
