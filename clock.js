/* clock.js
   Author: Jason Duffey
   Date: 11/2014
   A shitter count down/up clock
   Has the ability to switch directions after counting down
   Will not accurately keep time as it is based on setTimeout
   not on system time, as of 4/26/2016 currently working on
   a version that is based on system time and will accurately keep
   track of time

*/
var ticker = new Array();
function clock(min, sec, isUp, updateField, clockNum) {
	//OBJECT VARIABLES
	this.minutes = min;
	this.seconds = sec;
	this.tenths = 0;
	this.hundredths = 0;
	this.up = isUp;
	this.field = updateField;
	this.isRunning = false;
	this.clockNum = clockNum;
	this.advantage = "neutral";
	this.isAdv = false;
}
	
	/********** 'PUBLIC' FUNCTIONS **********/
	function setClock(min, sec, aclock) {
		aclock.minutes = min;

		if (sec >= 60 || sec < 0) {
			aclock.seconds = 0;
		}
		else {
			aclock.seconds = sec;
		}
		aclock.tenths = 0;
	}

	function clockStart(aclock) {
		ticker[aclock.clockNum] = setInterval(function() { tick(aclock); }, 10);
		aclock.isRunning = true;		
	}

	function clockStop(aclock) {
		clearInterval(ticker[aclock.clockNum]);
		aclock.isRunning = false;	
	}
	function getTime(aclock) {
		var time =  aclock.minutes + ":";
		if(aclock.seconds < 10) {
			time += "0";
		}
		time += aclock.seconds + "."  + aclock.tenths;
		return time;
	}

	function setUp(aclock) {
		aclock.up = true;
	}

	function setDown(aclock) {
		aclock.up = false;
	}

	function toggleUp(aclock) {
		aclock.up = !aclock.up;
	}

	function isAdv (aclock, isAd) {
		aclock.isAdv = isAd;
	}

	/********** 'PRIVATE' FUNCTIONS **********/
	function tick(aclock) {
		if(aclock.up) {
			countUp(aclock);
		}
		else {
			countDown(aclock);
		}

		document.getElementById(aclock.field).value = getTime(aclock);
	}

	function countUp(aclock) {
		aclock.hundredths++;
		if( 10 == aclock.hundredths) {
			aclock.hundredths = 0;
			aclock.tenths++;
		}
		if( 10 == aclock.tenths) {
			aclock.tenths = 0;
			aclock.seconds++;
			if(aclock.seconds == 1 && aclock.minutes == 0) {
				if(getControl() == 'red') {
					redAdv();
				} 
				else if(getControl() == 'green') {
					grnAdv();
				}
			}
		}
		if( 60 == aclock.seconds) {
			aclock.seconds = 0;
			aclock.minutes++;
		}
	}
	function countDown(aclock) {
		if( 0 == aclock.hundredths) {
			if(0 == aclock.tenths) {
				if(0 == aclock.seconds) {
					if(0 == aclock.minutes) {
						if(isAdv()) {
							setUp(aclock);
						}
						else {
							clockStop(aclock);
						}
						ntrAdv(aclock);
						return;
					}
					aclock.seconds = 60;
					aclock.minutes--;
				}
				else {
					aclock.tenths = 10;
					aclock.seconds--;
				}
			}
			else {
				aclock.hundredths = 10;
				aclock.tenths--;
			}
		}
		else {
			aclock.hundredths--;
		}
	}

	function grnAdv(aclock) {
		aclock.advantage = "green";
	}

	function redAdv(aclock) {
		aclock.advantage = "red";
	}

	function ntrAdv(aclock) {
		aclock.advantage = "neutral";
	}

	function toggleAdv(aclock) {
		if(aclock.advantage == "red") {
			aclock.advantage = "green";
		}
		else {
			aclock.advantage = "red";
		}
	}

	function getAdv(aclock) {
		return aclock.advantage;
	}