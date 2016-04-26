/* WebChart.js
   Author: Jason Duffey
   Date: 07/2015
   A Javascript class that implements a Radial Chart using SVG
   It accepts a JSON string with the data needed to create the chart
   Created for a project at American Timber and Steel.
   Inspiration for the format of the class comes from http://hdcharts.com/
   For more JS SVG chart libraries.
   A sample JSON string accepted:
    '{"base":{"min":"0","max":"15","color":"#000000","bgcolor":"#ffffff,#e6e6e6","baseFontColor":"#990000","baseFont":"Verdana, Tahoma, sans-serif",
    "gridlines":"2","linewidth":"2","nodeRadius":"3"},"sets":[{"width":"2","showFill":"0","fillColor":"#444444","color":"#b00b1e","set":[{"Plabel":"A",
    "value":"5"},{"Plabel":"B","value":"8"},{"Plabel":"C","value":"2"},{"Plabel":"D","value":"1"},{"Plabel":"E","value":"11"},{"Plabel":"F","value":"9"},
    {"Plabel":"G","value":"10"},{"Plabel":"H","value":"2"}]}],"header":{"caption":"This is the title","labels":[{"title":"E"},{"title":"SE"},{"title":"S"},
    {"title":"SW"},{"title":"W"},{"title":"NW"},{"title":"N"},{"title":"NE"}]},"numeral":{"decimals":"1"}}';
*/
var WebChart = function(container, jsonData) {
	this.Cdata = JSON.parse(jsonData);
	this.con = document.getElementById(container);
}

WebChart.prototype.initilize = function() {
	var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("xmlns","http://www.w3.org/2000/svg");
	svg.setAttribute('width', 600);
	svg.setAttribute('height', 400);
	this.con.appendChild(svg);
	var xCenter = 600 / 2;
	var yCenter = 400 / 2;
	var radius = (400 - 50) / 2;
	var gridlines = [];

	//Add the header caption
	var heading = document.createElementNS("http://www.w3.org/2000/svg", "text");
	heading.setAttribute("x", 10);
	heading.setAttribute("y", 20);
	heading.setAttribute("fill", this.Cdata.base.baseFontColor);
	heading.setAttribute("style","font-family:" + this.Cdata.base.baseFont + ";");
	var text = document.createTextNode(this.Cdata.header.caption);
	heading.appendChild(text);	
	svg.appendChild(heading);

	for(var j = 0; j < parseInt(this.Cdata.base.gridlines); j++) {
		gridlines[j] = "";
	}
	//Draw the spokes of the web, based on the first set's lenth, following sets must have the same number of elements
	for(var i = 0; i < parseInt(this.Cdata.header.labels.length); i++) {
		var angle = i * 2 * Math.PI / parseInt(this.Cdata.sets[0].set.length);
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttribute("x1", xCenter + (radius * Math.cos(angle)));
		line.setAttribute("y1", yCenter + (radius * Math.sin(angle)));
		line.setAttribute("x2", xCenter);
		line.setAttribute("y2", yCenter);
		line.setAttribute("style", "stroke:" + this.Cdata.base.color + ";stroke-width:" + this.Cdata.base.linewidth + ";");
		svg.appendChild(line);

		//Add the labels to the chart
		var nlabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		nlabel.setAttribute("x", xCenter + ((radius + 10)* Math.cos(angle)));
		nlabel.setAttribute("y", yCenter + ((radius + 10) * Math.sin(angle)));
		nlabel.setAttribute("fill", this.Cdata.base.baseFontColor);
		nlabel.setAttribute("style","font-family:" + this.Cdata.base.baseFont + ";");
		nlabel.setAttribute("alignment-baseline", "middle");
		nlabel.setAttribute("text-anchor", "middle");
		var text = document.createTextNode(this.Cdata.header.labels[i].title);
		nlabel.appendChild(text);	
		svg.appendChild(nlabel);

		for(var j = 0; j < parseInt(this.Cdata.base.gridlines); j++) {
			gridlines[j] += (xCenter + (radius * Math.cos(angle) * (1 - (j / parseInt(this.Cdata.base.gridlines))))) + "," + (yCenter + (radius * Math.sin(angle) * (1 - (j / parseInt(this.Cdata.base.gridlines))))) + " ";
		}
	}
	//Add the gridlines around the web
	for(var j = 0; j < parseInt(this.Cdata.base.gridlines); j++) {
		var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		poly.setAttribute("style", "stroke:" + this.Cdata.base.color + ";stroke-width:" + this.Cdata.base.linewidth + ";fill:none;");
		poly.setAttribute("points", gridlines[j]);
		svg.appendChild(poly);

		//Add gridline values
		var omega = -(Math.PI / parseInt(this.Cdata.header.labels.length));
		var gridLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		gridLabel.setAttribute("x", (xCenter + (radius * Math.cos(omega) *(1 - (j / parseInt(this.Cdata.base.gridlines))))));
		gridLabel.setAttribute("y",( yCenter + (radius * Math.sin(omega) *(1 - (j / parseInt(this.Cdata.base.gridlines))))));
		gridLabel.setAttribute("fill", this.Cdata.base.baseFontColor);
		gridLabel.setAttribute("style","font-family:" + this.Cdata.base.baseFont + ";");
		var text = document.createTextNode((parseInt(this.Cdata.base.min) + ((parseInt(this.Cdata.base.max) - parseInt(this.Cdata.base.min)) * (1 - (j / parseInt(this.Cdata.base.gridlines))))).toFixed(parseInt(this.Cdata.numeral.decimals)));
		gridLabel.appendChild(text);	
		svg.appendChild(gridLabel);
	}
	//Add label for the center
	var gridLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	gridLabel.setAttribute("x", xCenter + 5);
	gridLabel.setAttribute("y", yCenter - 5);
	gridLabel.setAttribute("fill", this.Cdata.base.baseFontColor);
	gridLabel.setAttribute("style","font-family:" + this.Cdata.base.baseFont + ";");
	var text = document.createTextNode((parseInt(this.Cdata.base.min)).toFixed(parseInt(this.Cdata.numeral.decimals)));
	gridLabel.appendChild(text);	
	svg.appendChild(gridLabel);

	//Render the Actual Points on the Web Chart
	for(var s in this.Cdata.sets) {
		var points = "";
		for(var point = 0; point < parseInt(this.Cdata.sets[s].set.length); point++) {
			var angle = point * 2 * Math.PI / parseInt(this.Cdata.sets[s].set.length);
			var newx = xCenter + (radius * Math.cos(angle) * ((parseInt(this.Cdata.sets[s].set[point].value) - parseInt(this.Cdata.base.min)) / (parseInt(this.Cdata.base.max) - parseInt(this.Cdata.base.min))));
			var newy = yCenter + (radius * Math.sin(angle) * ((parseInt(this.Cdata.sets[s].set[point].value) - parseInt(this.Cdata.base.min)) / (parseInt(this.Cdata.base.max) - parseInt(this.Cdata.base.min))));
			points += newx + "," + newy + " ";
			var dataPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			dataPoint.setAttribute("cx", newx);
			dataPoint.setAttribute("cy", newy);
			dataPoint.setAttribute("style","fill:" + this.Cdata.sets[s].color + ";");
			dataPoint.setAttribute("r", parseInt(this.Cdata.base.nodeRadius));
			svg.appendChild(dataPoint);
		}
		var poly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		var isFill = parseInt(this.Cdata.sets[s].showFill);
		var styling = "";
		if(1== isFill) {
			styling = this.Cdata.sets[s].fillColor;
		}
		else {
			styling = "none";
		}
		poly.setAttribute("style", "stroke:" + this.Cdata.sets[s].color + ";stroke-width:" + this.Cdata.sets[s].width + ";fill:" + styling + ";");
		poly.setAttribute("points", points);
		svg.appendChild(poly);
	}
}