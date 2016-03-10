 var candidateData = [];
 var margin = {
     top: 20,
     right: 20,
     bottom: 30,
     left: 50
   },
   width = 960 - margin.left - margin.right,
   height = 500 - margin.top - margin.bottom;

 var parseDate = d3.time.format("%m/%d/%Y").parse;

 var svg = d3.select("body").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 d3.json("https://spreadsheets.google.com/feeds/list/1ldYMu_1u-C-2Cj9u9UOCDfgMEcza3GVhhcpZCkw9FY0/od6/public/basic?alt=json", function(error, json) {
   if (error) return console.warn(error);
   candidateData = buildData(json.feed.entry)
     .filter(d => d.poll === 'IBD/TIPP');

   draw(candidateData);
 });

 function draw(data) {

 }

 function buildData(inputData) {
   var tempObj = {};
   var split1;
   var split2;
   var results = [];

   for (var i = 0; i < inputData.length; i++) {
     tempObj = {};
     split1 = [];
     split2 = [];
     split1 = inputData[i].content.$t.split(',');
     split1.forEach(function(pair) {
       split2 = pair.split(':');
       tempObj[split2[0].trim()] = split2[1].trim();
     });
     tempObj.date = inputData[i].title.$t;

     results.push(tempObj);
   }

   return results;
 }
