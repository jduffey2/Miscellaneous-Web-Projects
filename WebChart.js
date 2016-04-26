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
	var namespace = "http://www.w3.org/2000/svg";
	var svg = document.createElementNS(namespace, "svg");
	svg.setAttribute("xmlns",namespace);
	svg.setAttribute('width', 600);
	svg.setAttribute('height', 400);
	this.con.appendChild(svg);
	var xCenter = 600 / 2;
	var yCenter = 400 / 2;
	var radius = (400 - 50) / 2;
	var gridlines = [];
	//Add the background gradient
	var grad = this.Cdata.base.bgcolor.split(",");
	var def = document.createElementNS(namespace, "defs");
	var lg = document.createElementNS(namespace, "linearGradient");
	svg.appendChild(def);
	lg.setAttribute("id","bgGradient");
	lg.setAttribute("x1","0%");
	lg.setAttribute("y1","0%");	
	lg.setAttribute("x2","100%");
	lg.setAttribute("y2","0%");
	for(var a = 0; a < grad.length; a++) {
		var stop = document.createElementNS(namespace, "stop");
		stop.setAttribute("style","stop-opacity:" +  parseFloat(this.Cdata.base.bgAlpha) + ";stop-color:" + grad[a] + ";");
		stop.setAttribute("offset",(a * 100) + "%");
		lg.appendChild(stop);
	}
	def.appendChild(lg);
	var bg = document.createElementNS(namespace, "rect");
	bg.setAttribute("width","600");
	bg.setAttribute("height","400");
	bg.setAttribute("style","fill:url(#bgGradient)");
	svg.appendChild(bg);

	//Add the header caption
	var heading = document.createElementNS(namespace, "text");
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
	//Draw the spokes of the web, based on the heading.label's lenth, sets must have the same number of elements
	for(var i = 0; i < parseInt(this.Cdata.header.labels.length); i++) {
		var angle = (i * 2 * Math.PI / parseInt(this.Cdata.header.labels.length)) - (Math.PI / 2);
		var line = document.createElementNS(namespace, "line");
		line.setAttribute("x1", xCenter + (radius * Math.cos(angle)));
		line.setAttribute("y1", yCenter + (radius * Math.sin(angle)));
		line.setAttribute("x2", xCenter);
		line.setAttribute("y2", yCenter);
		line.setAttribute("style", "stroke:" + this.Cdata.base.color + ";stroke-width:" + this.Cdata.base.linewidth + ";");
		svg.appendChild(line);

		//Add the labels to the chart
		var nlabel = document.createElementNS(namespace, "text");
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
	var maximum = this.Cdata.numeral.max;
	var minimum = this.Cdata.numeral.min;
	for(var s in this.Cdata.sets) {
		for(var point = 0; point < this.Cdata.sets[s].set.length; point++) {
			maximum = Math.max(maximum, Math.ceil(parseInt(this.Cdata.sets[s].set[point].value)/5)*5);
			minimum = Math.min(minimum, Math.floor(parseInt(this.Cdata.sets[s].set[point].value)/5)*5);
		}
	}
	minimum = Math.max(minimum, 0);

	//Add the gridlines around the web
	for(var j = 0; j < parseInt(this.Cdata.base.gridlines); j++) {
		var poly = document.createElementNS(namespace, "polygon");
		poly.setAttribute("style", "stroke:" + this.Cdata.base.color + ";stroke-width:" + this.Cdata.base.linewidth + ";fill:none;");
		poly.setAttribute("points", gridlines[j]);
		svg.appendChild(poly);

		//Add gridline values
		var omega = -(Math.PI / parseInt(this.Cdata.header.labels.length));
		var gridLabel = document.createElementNS(namespace, "text");
		gridLabel.setAttribute("x", (xCenter + (radius * Math.cos(omega) *(1 - (j / parseInt(this.Cdata.base.gridlines))))));
		gridLabel.setAttribute("y",( yCenter + (radius * Math.sin(omega) *(1 - (j / parseInt(this.Cdata.base.gridlines))))));
		gridLabel.setAttribute("fill", this.Cdata.base.baseFontColor);
		gridLabel.setAttribute("style","font-family:" + this.Cdata.base.baseFont + ";");
		var text = document.createTextNode(this.Cdata.numeral.dataPrefix + (minimum + (maximum - minimum)) * (1 - (j / parseInt(this.Cdata.base.gridlines))).toFixed(parseInt(this.Cdata.numeral.decimals)) + this.Cdata.numeral.dataSuffix);
		gridLabel.appendChild(text);	
		svg.appendChild(gridLabel);
	}
	//Add label for the center
	var gridLabel = document.createElementNS(namespace, "text");
	gridLabel.setAttribute("x", xCenter + 5);
	gridLabel.setAttribute("y", yCenter - 5);
	gridLabel.setAttribute("fill", this.Cdata.base.baseFontColor);
	gridLabel.setAttribute("style","font-family:" + this.Cdata.base.baseFont + ";");
	var text = document.createTextNode(this.Cdata.numeral.dataPrefix + (minimum).toFixed(parseInt(this.Cdata.numeral.decimals)) + this.Cdata.numeral.dataSuffix);
	gridLabel.appendChild(text);	
	svg.appendChild(gridLabel);

	//Render the Actual Points on the Web Chart
	for(var s in this.Cdata.sets) {
		var points = "";
		for(var point = 0; point < this.Cdata.sets[s].set.length; point++) {
			var angle = (point * 2 * Math.PI / parseInt(this.Cdata.sets[s].set.length))  - (Math.PI / 2);
			var delta = (parseInt(this.Cdata.sets[s].set[point].value) - minimum) / (maximum - minimum);
			var newx = xCenter + (radius * Math.cos(angle) * delta);
			var newy = yCenter + (radius * Math.sin(angle) * delta);
			points += newx + "," + newy + " ";
			var dataPoint = document.createElementNS(namespace, "circle");
			dataPoint.setAttribute("cx", newx);
			dataPoint.setAttribute("cy", newy);
			dataPoint.setAttribute("style","fill:" + this.Cdata.sets[s].color + ";");
			dataPoint.setAttribute("r", parseInt(this.Cdata.base.nodeRadius));
			svg.appendChild(dataPoint);

			//Create the tooltip containing the label and value to the data points
			var tip = document.createElementNS(namespace, "title");
			tip.textContent = this.Cdata.sets[s].set[point].tipText + " | "  + this.Cdata.numeral.dataPrefix + this.Cdata.sets[s].set[point].value + this.Cdata.numeral.dataSuffix;
			dataPoint.appendChild(tip);
		}
		var poly = document.createElementNS(namespace, "polygon");
		var styling = "none";
		if(1== parseInt(this.Cdata.sets[s].showFill)) {
			styling = this.Cdata.sets[s].fillColor;
		}
		poly.setAttribute("style", "stroke:" + this.Cdata.sets[s].color + ";stroke-width:" + this.Cdata.sets[s].width + ";fill:" + styling + ";");
		poly.setAttribute("points", points);
		svg.appendChild(poly);
	}
}