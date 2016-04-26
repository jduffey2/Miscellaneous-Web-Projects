/* SVGWrap.js
   Author: Jason Duffey
   Date: 07/2015
   A wrapper class to create shapes on an SVG element
   a single function call will create a shape, passing in the id of the SVG element and 
   the parameters to control the shape's look.
   Shapes include:
       Rectangle
       Circle (specifying center point and radius)
       Ellipse (specifying center and x and y radii)
       n-gon 
       Line
       Polyline
       Wedge (part of a circle)
       Right Triangle
       Triangle
       Diamond
       n-point Star
       Regular n-Polygon
       Plus sign
*/  

/* COMMON PARAMETER:
     surface: the id of the SVG element to draw the shape on (REQUIRED)
     color: fill color for the shape (OPTIONAL) Default: black
     stroke: color of the outline of the shape (OPTIONAL) Default: none
     stroke_width: width of the outline of the shape (OPTIONAL) Default: 0
     id: id to associate with the shape (OPTIONAL) Default: none
     style: additional stylings to add to the shape (OPTIONAL) Default: none
*/



function SVGWrap() {};
SVGWrap.namespace = "http://www.w3.org/2000/svg";

/* rect: creates a rectangle element
 * 	      x: (Required) the x coordinate of the top left corner
 *        y: (Required) the y coordinate of the top left corner
 *    	  height: (Required) the height in pixels of the rectangle to draw
 *     	  width: (Required) the width in pixels of the rectangle to draw
 *    	  color: (Optional) the fill color of the rectangle, (hex or rgba value)
*/
SVGWrap.rect = function(surface,x,y,width,height,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 0);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	//create and append the rectangle to the svg element
	var rec = document.createElementNS(SVGWrap.namespace,"rect");
	rec.setAttribute("x",x);
	rec.setAttribute("y",y);
	rec.setAttribute("height",height);
	rec.setAttribute("width",width);
	rec.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	rec.setAttribute("id",id);
	element.appendChild(rec);
};

/* circle: creates a circle element
 *        cx: (Required) the x coordinate of the center of the circle
 *        cy: (Required) the y coordinate of the center of the circle
 *        r: (Required) the radius of the circle
*/
SVGWrap.circle = function(surface,cx,cy,r,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 0);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var circ = document.createElementNS(this.namespace,"circle");
	circ.setAttribute("cx",cx);
	circ.setAttribute("cy",cy);	
	circ.setAttribute("r",r);
	circ.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	circ.setAttribute("id",id);
	element.appendChild(circ);
};

/* ellipse: creates an ellipse element
 *        cx: (Required) the x coordinate of the center of the ellipse
 *        cy: (Required) the y coordinate of the center of the ellipse
 *        rx: (Required) the radius in the x-direction of the ellipse
 *        ry: (Required) the radius in the y-direction of the ellipse
*/
SVGWrap.ellipse = function(surface,cx,cy,rx,ry,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 0);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var ellp = document.createElementNS(this.namespace,"ellipse");
	ellp.setAttribute("cx",cx);
	ellp.setAttribute("cy",cy);
	ellp.setAttribute("rx",rx);
	ellp.setAttribute("ry",ry);
	ellp.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	ellp.setAttribute("id",id);
	element.appendChild(ellp);
};

SVGWrap.polygon = function(surface,points,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 0);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var poly = document.createElementNS(this.namespace,"polygon");
	poly.setAttribute("points",points);
	poly.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	poly.setAttribute("id",id);
	element.appendChild(poly);
};

SVGWrap.line = function(surface,x1,y1,x2,y2,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 1);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var line = document.createElementNS(this.namespace,"line");
	line.setAttribute("x1",x1);
	line.setAttribute("y1",y1);
	line.setAttribute("x2",x2);
	line.setAttribute("y2",y2);
	line.setAttribute("style",";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	line.setAttribute("id",id);
	element.appendChild(line);
};

SVGWrap.polyline = function(surface,points,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 1);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var pli = document.createElementNS(SVGWrap.namespace,"polyline");
	pli.setAttribute("points",points);
	pli.setAttribute("style","fill:" + color + ";" + "stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	pli.setAttribute("id",id);
	element.appendChild(pli);
}

/* wedge: creates a portion of a circle from start angle to end angle
 *        cx: (Required) the x coordinate of the center of the circle
 *        cy: (Required) the y coordinate of the center of the circle
 *        r: (Required) the radius of the circle
 *        start: (Required) the angle in radians to start the wedge at
 *        end: (Required) the angle in radians to end the wedge at
*/
SVGWrap.wedge = function(surface,cx,cy,r,start,end,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 0);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);
	
	//set the big arc flag if the arc is greater than 1/2 a circle
	var a = 0;
	((end - start) > Math.PI) && (a = 1);

	var path = "M" + cx + "," + cy + " L" + (cx + (r * Math.cos(start))) + "," + (cy + (r * Math.sin(start))) + " "; //line from center of circle to edge at start angle
	path += "A" + r + "," + r + " 0 " + a + ",1 " + (cx + (r * Math.cos(end))) + "," + (cy + (r * Math.sin(end))) + " Z"; //line for the rounded arc part and closing the path
	var wed = document.createElementNS(this.namespace,"path");
	wed.setAttribute("d",path);
	wed.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	wed.setAttribute("id",id);
	element.appendChild(wed);
};

SVGWrap.rightTri = function(surface,x,y,theta,a,b,rot,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 0);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var hyp = Math.sqrt(a*a + b*b);
	var beta = Math.atan(b/a);
	var p1x = x + (a * Math.cos(theta + (rot * beta)));
	var p1y = y + (a * Math.sin(theta + (rot * beta)));
	var p2x = x + (hyp * Math.cos(theta));
	var p2y = y + (hyp * Math.sin(theta));
	var path =  "" + x + "," + y + " " + p1x + "," + p1y + " " + p2x + "," + p2y;
	var tri = document.createElementNS(this.namespace, "polygon");
	tri.setAttribute("points", path);
	tri.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	tri.setAttribute("id",id);
	element.appendChild(tri);
};

SVGWrap.triangle = function(surface,x,y,theta,alpha,a,b,rot,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof rot) && (rot = 1);
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = 0);
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var x1 = x + (a * Math.cos(theta));
	var y1 = y + (a * Math.sin(theta));
	var x2 = x + (b * Math.cos(theta + alpha * rot));
	var y2 = y + (b * Math.sin(theta + alpha * rot))
	var path = "" + x + "," + y + " " + x1 + "," + y1 + " " + x2 + "," + y2;
	var tri = document.createElementNS(this.namespace, "polygon");
	tri.setAttribute("points", path);
	tri.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	tri.setAttribute("id",id);
	element.appendChild(tri);
}

SVGWrap.diamond = function(surface,x,y,width,height,color,stroke,stroke_width,id,style) {
	//set defaults if optionals are not set
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = "0");
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	var element = document.getElementById(surface);

	var dia = document.createElementNS(this.namespace,"polygon");

	var path = "" + (x + width / 2) + "," + y + " " + (x + width) + "," + (y + height / 2) + " " + (x + width / 2) + "," + (y + height) +  " " + x + "," + (y + height / 2);
	dia.setAttribute("points",path);
	dia.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	dia.setAttribute("id",id);
	element.appendChild(dia);
}

SVGWrap.star = function(surface,cx,cy,rl,rs,spokes,theta,color,stroke,stroke_width,id,style) {
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = "0");
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	("undefined" === typeof theta) && (theta = 0);

	var delta = 2 * Math.PI / spokes;
	var path = "";
	for(var i = (-Math.PI / 2) + theta;i < ((Math.PI * 3/2) + theta); i += delta) {
		var x = cx + (rl * Math.cos(i));
		var y = cy + (rl * Math.sin(i));
		var sx = cx + (rs * Math.cos(i + delta/2));
		var sy = cy + (rs * Math.sin(i + delta/2));
		path += x + "," + y + " " + sx + "," + sy + " ";
	}
	var element = document.getElementById(surface);
	var str = document.createElementNS(this.namespace,"polygon");
	str.setAttribute("points",path);
	str.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	str.setAttribute("id",id);
	element.appendChild(str);
}

SVGWrap.regular = function(surface,cx,cy,r,sides,theta,color,stroke,stroke_width,id,style) {
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = "0");
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");
	("undefined" === typeof theta) && (theta = 0);

	var delta = 2 * Math.PI / sides;
	var path = "";
	for(var i = (- Math.PI / 2) + theta; i < ((Math.PI * 3/2) + theta); i += delta) {
		var x = cx + (r * Math.cos(i));
		var y = cy + (r * Math.sin(i));
		path += x + "," + y + " ";
	}
	var element = document.getElementById(surface);
	var reg = document.createElementNS(this.namespace,"polygon");
	reg.setAttribute("points",path);
	reg.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	reg.setAttribute("id",id);
	element.appendChild(reg);
}

SVGWrap.plus = function(surface,cx,cy,length,width,dx,dy,color,stroke,stroke_width,id,style) {
	("undefined" === typeof color) && (color = "#000000");
	("undefined" === typeof stroke) && (stroke = "#000000");
	("undefined" === typeof stroke_width) && (stroke_width = "0");
	("undefined" === typeof id) && (id = "");
	("undefined" === typeof style) && (style = "");

	var path = "";
	path += (cx - dx/2) + "," + (cy - width/2) + " ";
	path += (cx + dx/2) + "," + (cy - width/2) + " ";
	path += (cx + dx/2) + "," + (cy - dy/2) + " ";
	path += (cx + length/2) + "," + (cy - dy/2) + " ";
	path += (cx + length/2) + "," + (cy + dy/2) + " ";

	path += (cx + dx/2) + "," + (cy + dy/2) + " ";
	path += (cx + dx/2) + "," + (cy + width/2) + " ";
	path += (cx - dx/2) + "," + (cy + width/2) + " ";
	path += (cx - dx/2) + "," + (cy + dy/2) + " ";
	path += (cx - length/2) + "," + (cy + dy/2) + " ";

	path += (cx - length/2) + "," + (cy - dy/2) + " ";
	path += (cx - dx/2) + "," + (cy - dy/2) + " ";
	var element = document.getElementById(surface);
	var pls = document.createElementNS(this.namespace,"polygon");
	pls.setAttribute("points",path);
	pls.setAttribute("style","fill:" + color + ";stroke:" + stroke + ";stroke-width:" + stroke_width + ";" + style);
	pls.setAttribute("id",id);
	element.appendChild(pls);
}

SVGWrap.deg2rad = function(degrees) {
	return degrees * Math.PI / 180;
};

SVGWrap.rad2deg = function(radians) {
	return radians * 180 / Math.PI;
}
SVGWrap.rect("myElement",0,0,50,50);
SVGWrap.circle("myElement",25,75,25);
SVGWrap.ellipse("myElement",25,125,25,13);
SVGWrap.wedge("myElement",25,175,25,(Math.PI /6),(Math.PI * 11/6));
SVGWrap.rightTri("myElement",50,200,(Math.PI * 3/5),30,30,1);
SVGWrap.triangle("myElement",5,250,(Math.PI / 2),(Math.PI / 7),50,50,-1);
SVGWrap.diamond("myElement",0,300,50,50);
SVGWrap.star("myElement",25,375,25,10,5,0);
SVGWrap.regular("myElement",75,25,25,5,0);
SVGWrap.plus("myElement",75,75,50,50,10,10);
SVGWrap.line("myElement",50,100,100,150,"black",3);

SVGWrap.star("myElement",250,250,50,19,4,SVGWrap.deg2rad(0),"#9a1521","#144c77",3,"star1");
SVGWrap.plus("myElement",400,100,100,100,15,15,"lightblue","none",3);
SVGWrap.regular("myElement",200,100,60,6,0,"none","green",3);