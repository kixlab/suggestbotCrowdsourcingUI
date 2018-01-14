var dataSet = [[0,0,"nothing","rgba(20,20,20,0.3)"],
              [-1,0,"annoyance","rgba(255,0,0,.3)"],
              [-2,0,"anger","rgba(255,0,0,.5)"],
              [-3,0,"rage","rgba(255,0,0,.9)"],
              [1,0,"apprehension","rgba(0,100,0,0.3)"],
              [2,0,"fear","rgba(0,100,0,0.5)"],
              [3,0,"terror","rgba(0,100,0,0.9)"],
              [1,-1,"acceptance","rgba(0,230,0,0.3)"],
              [2,-2,"trust","rgba(0,230,0,0.5)"],
              [3,-3,"admiration","rgba(0,230,0,0.9)"],
              [1,1,"distraction","rgba(0,50,200,0.3)"],
              [2,2,"surprise","rgba(0,50,200,0.5)"],
              [3,3,"amazement","rgba(0,50,200,0.9)"],
              [-1,1,"boredom","rgba(100,0,100,0.3)"],
              [-2,2,"disgust","rgba(100,0,100,0.5)"],
              [-3,3,"loathing","rgba(120,0,120,0.9)"],
              [-1,-1,"interest","rgba(200,170,0,0.3)"],
              [-2,-2,"anticipation","rgba(200,70,0,0.6)"],
              [-3,-3,"vigilance","rgba(200,20,20,0.9)"],
              [0,1,"pensiveness","rgba(70,70,200,0.3)"],
              [0,2,"sadness","rgba(70,70,200,0.5)"],
              [0,3,"grief","rgba(70,70,200,0.9)"],
              [0,-1,"serenity","rgba(200,130,0,0.3)"],
              [0,-2,"joy","rgba(200,130,0,0.5)"],
              [0,-3,"ectasy","rgba(200,130,0,0.9)"]];

var svg = d3.select(".content")
  .append("svg")
  .attr("width", 500)
  .attr("height",500)

var g = svg.selectAll("circle")
  .data(dataSet)
  .enter()
  .append('g').attr("class",'circle')
  .attr("transform", "translate(250,250)")

g.append("circle")
  .attr("fill",function(d) {
    return d[3]
  })
  .attr("cx", function(d) {
        return d[0]*70;
  })
  .attr("cy", function(d) {
        return d[1]*70;
  })
  .attr("r",30)

g.append('text')
  .text(function(d){return d[2]})
  .style("text-anchor", "middle")
  .style("font-size","10px")
  .attr("dx", function(d) {
        return d[0]*70;
  })
  .attr("dy", function(d) {
        return d[1]*70;
  })

$("g").on('click', function() {
  console.log($(this).find('text').text());
})
