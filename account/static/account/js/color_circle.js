var color_circle_radius = 200;
var circular_emotions = [
  'PLEASANT',
  'happy',
  'elated',
  'excited',
  'alert',
  'ACTIVATION',
  'tense',
  'nervous',
  'stressed',
  'upset',
  'UNPLEASANT',
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
var main_circle_stroke = 10;

var circle_svg = d3.select("#emotion_circle")
  .append("svg")
  .attr("width", color_circle_radius*3)
  .attr("height", color_circle_radius*3)
  .style("display", "block")

var circle_foreign = d3.select("#emotion_circle")
  .style("height", 3*color_circle_radius)

  d3.select("#emotion_circle").append("canvas")
  .style("position","relative").style("left", color_circle_radius/2)
  .style("top", -color_circle_radius/2*5)
  .style("z-index", -1)
  .style("display", "block")
  .attr("width", color_circle_radius *2)
  .attr("height", color_circle_radius *2)
  .attr("id","circle_canvas")

var color_circle = document.getElementById("circle_canvas").getContext("2d")
var cc_img = color_circle.createImageData(color_circle_radius*2, color_circle_radius*2)
var selected = null;

make_circular_labeler=function(image){
  circle_svg.append("circle")
  .attr("cx", color_circle_radius*1.5)
  .attr("cy", color_circle_radius*1.5)
  .attr("r", color_circle_radius*1.4)
  .style("fill", "transparent")
  .style("stroke-width", main_circle_stroke)
  .style("stroke", "#333333")

  circle_svg.append("circle")
  .attr("cx", color_circle_radius*1.5)
  .attr("cy", color_circle_radius*1.5)
  .attr("r", color_circle_radius*1)
  .style("fill", "transparent")
  .style("stroke-width", main_circle_stroke)
  .style("stroke", "#333333")
  .on("click", function(){
    if(selected==null){
      selected = circle_svg.append("circle")
      .attr("cx",d3.mouse(this)[0])
      .attr("cy", d3.mouse(this)[1])
      .style("fill", "rgba(0,0,0,0.3)")
      .style("stroke-width", 2)
      .style("stroke", "black")
      selected.transition(500)
      .attr("r", 10)
    }else{
      selected.transition(500).attr("cx",d3.mouse(this)[0])
      .attr("cy", d3.mouse(this)[1])
    }
  })
  for(var i=0; i<20; i++){
    var h = -i/20+5/12;
    var xpos = 1.2*color_circle_radius * Math.cos(i * Math.PI/10)+color_circle_radius*1.5
    var ypos = -1.2*color_circle_radius * Math.sin(i * Math.PI/10)+color_circle_radius*1.5
    var t = circle_svg.append("text")
    .attr("font-size", color_circle_radius/20)
    .attr("y", ypos)
    .text(circular_emotions[i])
    .attr("x", function(){
      var w = d3.select(this).node().getBoundingClientRect().width
      return xpos-w/2
    })
    .attr("fill", function(){
      return hslToRgb(h, 0.7, 0.4)
    })
  }

  draw_color_circle(image)

}


draw_color_circle =function(image){
  console.log(image.width)
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

make_circular_labeler(cc_img);
