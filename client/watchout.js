// start slingin' some d3 here.

// set time out
// button for easy, med, hard (will determine how many circles are on page (how large array is, use range underscore))

// change colors

var difficultyArray = [900,220,400,120,200,901,391,210,341];


$(document.body).ready(function() {
  var response = window.prompt('Choose your difficulty: easy | medium | hard');
  if ( response === 'medium') {
    for (var i = 0; i < 20; i++) {
      difficultyArray[i] = randBetween(100,600);
    }
  } else if ( response === 'hard') {
    // console.log('hard!');
    for (var i = 0; i < 40; i++) {
      difficultyArray[i] = randBetween(100,600);

    }
  } else {
    difficultyArray = [900,220,400,120,200,901,391,210,341];
  }
})


var cxArr = [];
var cyArr = [];

function randBetween(min,max) {
  return Math.round((Math.random() * (max-min)) + min);
}

$('#easy').on('click', function(){
  difficultyArray = difficultyArray;
})

$('#medium').on('click', function(){
  for (var i = 0; i < 20; i++) {
    difficultyArray[i] = randBetween(100,600);
  }
})

$('#hard').on('click', function(){
  for (var i = 0; i < 40; i++) {
    difficultyArray[i] = randBetween(100,600);
  }
})

var svgContainer = d3.select("body").append("svg")
                                    .attr("width", document.body.clientWidth)
                                    .attr("height", 600);//document.body.clientHeight);

var circles = svgContainer.selectAll("circle")
                          .data(difficultyArray)
                          .enter()
                          .append("circle");


/*var circleAttributes = circles
                      .attr("cx", function (d) { return d; })
                      .attr("cy", function (d) { return d; })
                      .attr("r", 20 )
                      .style("fill", function(d) {
                       var returnColor;
                       if (d % 2) { returnColor = "green";
                       } else { returnColor = "purple";
                       } return returnColor;
                      })
                      .call(drag)
                      // .on("start", dragstarted)
                      // .on("drag", dragged)
                      // .on("end", dragended);*/


setInterval(function(){ circles.transition().ease('cubic')
                      .attr("cx", function (d) {
                        var newCx = Math.floor(Math.random()*d);
                        cxArr.push(newCx);  
                        return newCx; 
                      })
                      .attr("cy", function (d) {
                        var newCy = Math.floor(Math.random()*d);
                        cyArr.push(newCy);
                        return newCy; 
                      })
                      .attr("r", 20 )
                      .style("fill", function(d) {
                       var returnColor;
                       if (d % 2) { returnColor = "green";
                       } else { returnColor = "purple";
                       } return returnColor;
                      }); 
                      cyArr = [];
                      cxArr = [];
                    }, 500);

var drag = d3.behavior.drag();

drag.on('drag',dragged);
// drag.on('drag',checkCollision);

var myDot = d3.select('svg').append('circle')
var myDotAttributes = myDot.attr('cx',230).attr('cy',230).attr('r',20).attr('id','myCircle').call(drag); // add a unique class in HTML for SVG, make it black

// add cx & cy of circles into array (2 sep),
// within another function on drag, check if index of != -1 for both, 



//////








// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height"),
//     radius = 32;

// var circles = d3.range(20).map(function() {
//   return {
//     x: Math.round(Math.random() * (width - radius * 2) + radius),
//     y: Math.round(Math.random() * (height - radius * 2) + radius)
//   };
// });

// var color = d3.scaleOrdinal()
//     .range(d3.schemeCategory20);

// svg.selectAll("circle")
//   .data(difficultyArray) //circles)
//   .enter().append("circle")
//     .attr("cx", function(d) { return d.x; })
//     .attr("cy", function(d) { return d.y; })
//     .attr("r", radius)
//     .style("fill", function(d, i) { return color(i); })
//     .call(d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended));

// function dragstarted(d) {
//   d3.select(this).raise().classed("active", true);
// }
var collisionCount = 0;
var score = 0;


function dragged(d) {
  
  // d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  d3.select(this).attr("cx", d3.event.x).attr("cy", d3.event.y);
  // console.log('this:',this);
  // console.log('event:', d3.event);
  if ( cxArr.indexOf(d3.event.x) != -1 && cyArr.indexOf(d3.event.y) !== -1 ) {
    // update collision count
    $('.current span').html(score++);
    console.log('ALL GOOD!');
    // store it in high score if its higher than high score
  } else {
    console.log('YOU DIE!!');
    // update score +1 every second?
    $('.collisions span').html(score);
  }
}

function checkCollision() {
  if ( cxArr.indexOf(d3.event.x) !== -1 && cyArr.indexOf(d3.event.y) !== -1 ) {
    // update collision count
    console.log('ALL GOOD!');
    // store it in high score if its higher than high score
  } else {
    // update score +1 every second?
  }
}

// function dragended(d) {
//   d3.select(this).classed("active", false);
// }



