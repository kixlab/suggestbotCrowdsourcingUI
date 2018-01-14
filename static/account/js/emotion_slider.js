

$(document).ready(function(){

  $(".input_slider").slider();


$('#btnPopover').popover();
$(".slider-handle").on("mouseenter", function(){
  $(this).parent().find(".tooltip").stop().animate({"opacity":"1"}, 300)
}).on("mouseout", function(){
  $(this).parent().find(".tooltip").stop().animate({"opacity":"0"}, 300)
});


$("#elapsedtime").val(localStorage.elapsedtime)

});
