var color_code = [

]

//initialization
var timeline_width = window.innerWidth*0.72;
var timeline_height = 30;
var stroke_border = 4;
console.log(timeline_width)
var timeline_data=[]

//create shared timeline
var timeline_svg = d3.select("#shared_timeline")
  .append("svg")
  .attr("width", timeline_width)
  .attr("height",timeline_height)
//create gradient color definition
var gradient_defs = timeline_svg.append("defs")

//function for generating mock data
//data spec : for existing data, they will be color in string, like "rgb(#,#,#)"
//empty string is for the case when no worker has worked on it
gen_mock_data=function(n){
  for(var i=0; i<n; i++){
    if(Math.random()>0.5){
    var val = Math.random()*2-1
    var ar = Math.random()*2-1
    var a = Math.floor(Math.random()*255)
    var c = emoTorgb(val, ar)//hslToRgb(h,s,l);//"hsl("+h.toString()+","+s.toString()+","+l.toString()+")"
    console.log(c)
    timeline_data.push(c)
  }else{
    timeline_data.push("")
  }
  }
}

//function for drawing emotion gradient timeline
draw_emotion_gradient = function(svg, data, n){
  //length in percentage and pixel
  var len = 100/parseFloat(data.length);
  var rect_len = timeline_width/parseFloat(data.length);
  //color data for gradient
  var color_data = []

  var grad_rect = svg.append("rect")
  .attr("x",0).attr("y",0)
  .attr("width", timeline_width)
  .attr("height", timeline_height)
  //put color datum from 'data' to color data
  for(var i=0; i<data.length; i++){
    if(data[i]!=""){
      if(i!=n){
        var color_datum = {
          offset: ((i+.5)*len).toString()+"%",
          color: data[i],
      }
      color_data.push(color_datum)
    }else{
    //handling color for block of currently working
        if(i>0){
          var color_datum1={
            offset: (i*len).toString()+"%",
            color: data[i-1],
          }
          color_data.push(color_datum1)
        }
        if(i<data.length){
          var color_datum2={
            offset: ((i+1)*len).toString()+"%",
            color: data[i+1],
          }
          color_data.push(color_datum2)
        }
      }
    }else{
      svg.append("rect")
      .attr("x",(rect_len*i)+stroke_border/4).attr("y",stroke_border/2)
      .attr("width", rect_len-stroke_border/2)
      .attr("height", timeline_height-stroke_border)
      .style("fill", "#000000")
    }
  }
  //making color definition from color data
  gradient_defs.append("linearGradient")
    .attr("id","timeline_grad")
    .attr("x1", "0%")
    .attr("x2", "100%")
    .attr("y1", "0%")
    .attr("y2", "0%")
    .selectAll("stop")
    .data(color_data)
    .enter().append("stop")
    .attr("offset", function(d){return d.offset;})
    .attr("stop-color", function(d){return d.color;});
//draw rectangle for color
console.log(timeline_width)

  grad_rect.style("fill", "url(#timeline_grad)")
  .style("stroke", "#ffffff")
  .style("stroke-width", stroke_border)
//draw lines for split
  svg.selectAll("line")
  .data(data).enter()
  .append("line")
  .attr("x1", function(d, i){return rect_len*(i);})
  .attr("y1", 0)
  .attr("x2", function(d, i){return rect_len*(i);})
  .attr("y2", timeline_height)
  .style("stroke", "#ffffff")
  .style("stroke-width", stroke_border/2)
//draw white space for block
  svg.append("rect")
  .attr("id", "current_working_block")
  .attr("x",(rect_len*n)+stroke_border/4).attr("y",stroke_border/2)
  .attr("width", rect_len-stroke_border/2)
  .attr("height", timeline_height-stroke_border)
  .attr("data-toggle", "tooltip")
  .attr("title", "You are working on this time block.")
  .style("fill", "#eeeeee")
//turn on tooltip
  $("#current_working_block").tooltip("show");
}

gen_mock_data(50)
draw_emotion_gradient(timeline_svg, timeline_data,2)
///////////////////

//function to transform emotion to hsl
function emoTorgb(val, ar){
  var rad = Math.atan2(ar, val)
  var deg = (rad)/2/Math.PI;
  var h = -deg+5/12
  if(h<0){
    h=h+1;
  }
  console.log(h)
  var s = Math.sqrt(val*val+ar*ar)
  return hslToRgb(h,s,0.8)
}

//function to transform hsl to rgb
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return "rgb("+Math.round(r * 255).toString()+","+ Math.round(g * 255).toString()+","+Math.round(b * 255)+")";
}
