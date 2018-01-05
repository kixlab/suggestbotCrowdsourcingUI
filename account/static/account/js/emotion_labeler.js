/*
You need color_transform.js to be included in the html code
before putting it in your interface
You can put a circle by adding div in html with generate_circular_labeler function,
like below
<div id="id_for_div"></div>
<script>
//generate_circular_labeler("id_for_div")
</script>
You can also add multiple labelers if you want to
*/
//these are parameters for the labeler
var color_circle_radius = 120;
var circular_emotions = [
  'POSITIVE',
  'happy',
  'elated',
  'excited',
  'alert',
  'ACTIVATION',
  'tense',
  'nervous',
  'stressed',
  'upset',
  'NEGATIVE',
  'sad',
  'depressed',
  '',
  'bored',
  'DEACTIVATION',
  'calm',
  'relaxed',
  'serene',
  'contented'
];
var main_circle_stroke = color_circle_radius/20;
var circle_svg_dic = {}
var select_dic = {}

//will be deprecated... for input in figure number
var fig_input_num=1
//function for making labeler
make_circular_labeler=function(image, color_circle, div_id){
  //inputs to record the value
  $("<input></input>").appendTo("#"+div_id)
  .attr("id", div_id+"_pos").attr("type", "number").attr("name",function(){
    return "positivity"+fig_input_num.toString();
  }).css("display", "none")
  $("<input></input>").appendTo("#"+div_id)
  .attr("id", div_id+"_exc").attr("type", "number").attr("name",function(){
    return "excitement"+fig_input_num.toString();
  }).css("display", "none")
  fig_input_num++;
/*<<<<<< HEAD:account/static/account/js/color_circle.js
  circle_svg_dic[div_id].append("rect")
  .attr("x", color_circle_radius*0.1)
  .attr("y", color_circle_radius*0.1)
  .attr("width", color_circle_radius*2.8)
  .attr("height", color_circle_radius*2.8)
  .style("fill", "transparent")
  .style("stroke-width", main_circle_stroke)
  .style("stroke", "#333333")
  circle_svg_dic[div_id].append('path')
                        .attr('d', lineFunction([{'x':color_circle_radius*1.5, 'y':color_circle_radius*0.5},{'x':color_circle_radius*1.5, 'y':color_circle_radius*2.5}]))
                        .attr("stroke", "black");
  circle_svg_dic[div_id].append('path')
                        .attr('d', lineFunction([{'x':color_circle_radius*0.5, 'y':color_circle_radius*1.5},{'x':color_circle_radius*2.5, 'y':color_circle_radius*1.5}]))
                        .attr("stroke", "black")
  circle_svg_dic[div_id].append('text')
                        .attr("font-size", color_circle_radius/10)
                        .text("valence")
                        .attr("y", 1.5*color_circle_radius-color_circle_radius/100)
                        .attr("x", function(){
                          console.log(d3.select(this).node().getBoundingClientRect().width)
                          return 2.5*color_circle_radius-main_circle_stroke-d3.select(this).node().getBoundingClientRect().width
                        });
  circle_svg_dic[div_id].append('text')
                        .text("arousal")
                        .attr("font-size", color_circle_radius/10)
                        .attr("y", function(){
                          return 0.5*color_circle_radius+d3.select(this).node().getBoundingClientRect().height
                        })
                        .attr("x", 1.5*color_circle_radius+color_circle_radius/100)

=======*/

  circle_svg_dic[div_id].append('path')
                        .attr('d', lineFunction([{'x':color_circle_radius*1.5, 'y':color_circle_radius*0.5},{'x':color_circle_radius*1.5, 'y':color_circle_radius*2.5}]))
                        .attr("stroke", "black");
  circle_svg_dic[div_id].append('path')
                        .attr('d', lineFunction([{'x':color_circle_radius*0.5, 'y':color_circle_radius*1.5},{'x':color_circle_radius*2.5, 'y':color_circle_radius*1.5}]))
                        .attr("stroke", "black")
  circle_svg_dic[div_id].append('text')
                        .attr("font-size", color_circle_radius/10)
                        .text("valence")
                        .attr("y", 1.5*color_circle_radius-color_circle_radius/100)
                        .attr("x", function(){
                          console.log(d3.select(this).node().getBoundingClientRect().width)
                          return 2.5*color_circle_radius-main_circle_stroke-d3.select(this).node().getBoundingClientRect().width
                        });
  circle_svg_dic[div_id].append('text')
                        .text("arousal")
                        .attr("font-size", color_circle_radius/10)
                        .attr("y", function(){
                          return 0.5*color_circle_radius+d3.select(this).node().getBoundingClientRect().height
                        })
                        .attr("x", 1.5*color_circle_radius+color_circle_radius/100)

//>>>>>>> laber_label_drawer:account/static/account/js/emotion_labeler.js

  circle_svg_dic[div_id].append("rect")
  .attr("x", color_circle_radius*0.5)
  .attr("y", color_circle_radius*0.5)
  .attr("width", color_circle_radius*2)
  .attr("height", color_circle_radius*2)
  .style("fill", "transparent")
  .style("stroke-width", main_circle_stroke)
  .style("stroke", "#333333")
  .on("click", function(){
    //change value of input
    var pos_val = (parseFloat(d3.mouse(this)[0])-color_circle_radius*1.5)/parseFloat(color_circle_radius)
    var exc_val = -(parseFloat(d3.mouse(this)[1])-color_circle_radius*1.5)/parseFloat(color_circle_radius)
    console.log("#"+div_id+"_pos")
    $("#"+div_id+"_pos").val(pos_val)
    $("#"+div_id+"_exc").val(exc_val)
    if(select_dic[div_id]==null){
      select_dic[div_id] = circle_svg_dic[div_id].append("circle")
      .attr("cx",d3.mouse(this)[0])
      .attr("cy", d3.mouse(this)[1])
      .style("fill", "rgba(0,0,0,0.3)")
      .style("stroke-width", color_circle_radius/100)
      .style("stroke", "black")
      select_dic[div_id].transition(500)
      .attr("r", color_circle_radius/20)
    }else{
      select_dic[div_id].attr("cx",d3.mouse(this)[0])
      .attr("cy", d3.mouse(this)[1])
    }
  })
  for(var i=0; i<20; i++){
    var h = -i/20+5/12;
    var xpos;
    var ypos;
    var xcos = Math.cos(i * Math.PI/10)
    var ysin = Math.sin(i * Math.PI/10)
    if(Math.abs(xcos)>Math.abs(ysin)){
      if(xcos>0){
        xpos = 2.7*color_circle_radius;
        ypos = -1.2*ysin/xcos*color_circle_radius+1.5*color_circle_radius
      }else{
        xpos = 0.3*color_circle_radius;
        ypos = 1.2*ysin/xcos*color_circle_radius+1.5*color_circle_radius
      }
    }else{
      if(ysin<0){
        ypos = 2.7*color_circle_radius;
        xpos = -1.2/ysin*xcos*color_circle_radius+1.5*color_circle_radius
      }else{
        ypos = 0.3*color_circle_radius;
        xpos = 1.2/ysin*xcos*color_circle_radius+1.5*color_circle_radius
      }
    }
    //svar xpos = 1.2*color_circle_radius * Math.cos(i * Math.PI/10)+color_circle_radius*1.5
    //var ypos = -1.2*color_circle_radius * Math.sin(i * Math.PI/10)+color_circle_radius*1.5
    var t = circle_svg_dic[div_id].append("text")
    .attr("font-size", color_circle_radius/15)
    .attr("y", ypos)
    .text(circular_emotions[i])
    .attr("x", function(){
      console.log(d3.select(this).node().getBoundingClientRect().width)
      var w = d3.select(this).node().getBoundingClientRect().width
      if(w==0){
        var upper = circular_emotions[i].replace(/[^A-Z]/g, "").length
        w=(circular_emotions[i].length-upper) * color_circle_radius/40 + (upper+2.5) * color_circle_radius/40;
      }
       //= d3.select(this).node().getBoundingClientRect().width

      return xpos-w/2
    })

  }

//  draw_color_circle(image, color_circle)

}

//function only for drawing color circle
draw_color_circle =function(image, color_circle){
  for(var i=0; i<image.width; i++){
    for(var j=0; j<image.height; j++){
      //console.log("h")
      var x = parseFloat(i-color_circle_radius)/parseFloat(color_circle_radius);
      var y = parseFloat(-j+color_circle_radius)/parseFloat(color_circle_radius);
      var color = emoTorgb(x, y, false);
      //console.log(color)
      if(x*x+y*y<1){
      setPixelColor(image, i, j, color);
    }else{
      setPixelColor(image, i, j, color, 0);
    }
    }
  }
  color_circle.clearRect(0, 0, color_circle_radius*2, color_circle_radius*2);
  color_circle.putImageData(image, 0, 0);

}

//repeatably usable function for generating labeler
 generate_circular_labeler= function(div_id){
   var circle_svg = d3.select("#"+div_id)
     .append("svg")
     .style("position", "relative").style("z-index", 1)
     .attr("width", color_circle_radius*3)
     .attr("height", color_circle_radius*3)
     .style("display", "block")

   d3.select("#"+div_id)
     .style("height", 3*color_circle_radius)
     .style("width", 3*color_circle_radius)

     d3.select("#"+div_id).append("canvas")
     .style("position","relative").style("left", color_circle_radius/2)
     .style("top", -color_circle_radius/2*5)
     .style("z-index", 0)
     .style("display", "block")
     .attr("width", color_circle_radius *2)
     .attr("height", color_circle_radius *2)
     .attr("id",div_id+"_circle_canvas")

   var color_circle = document.getElementById(div_id+"_circle_canvas").getContext("2d")
   var cc_img = color_circle.createImageData(color_circle_radius*2, color_circle_radius*2)
   var selected = null;
   circle_svg_dic[div_id]=circle_svg;
   select_dic[div_id]=selected;

   make_circular_labeler(cc_img, color_circle, div_id);
 }
// function to input circle to the interface
input_value_to_labeler = function(div_id, val, aro){
  var cx = (val+1.5)*color_circle_radius
  var cy = (-aro+1.5)*color_circle_radius
  $("#"+div_id+"_pos").val(val)
  $("#"+div_id+"_exc").val(aro)
  if(select_dic[div_id]==null){
    select_dic[div_id] = circle_svg_dic[div_id].append("circle")
    .attr("cx",cx)
    .attr("cy", cy)
    .style("fill", "rgba(0,0,0,0.3)")
    .style("stroke-width", color_circle_radius/100)
    .style("stroke", "black")
    select_dic[div_id].transition(500)
    .attr("r", color_circle_radius/20)
    console.log("in")
  }else{
    select_dic[div_id].attr("cx",cx)
    .attr("cy", cy)
    console.log("in")
  }
}
// function to delete circle from the interface
delete_value_circle = function(div_id){
  if(select_dic[div_id]){
    select_dic[div_id].remove()
    select_dic[div_id] = null;
    $("#"+div_id+"_pos").val(null)
    $("#"+div_id+"_exc").val(null)
  }
}

 var lineFunction = d3.svg.line()
   .x(function(d) { return d.x; })
   .y(function(d) { return d.y; })
   .interpolate('linear');
