var jsondata = [];
var selServices = [];
var fromDate;
var toDate;
var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
var message = "Beginning message...";

	String.prototype.replaceAll = function(character,replaceChar){
		var word = this.valueOf();

		while(word.indexOf(character) != -1)
			word = word.replace(character,replaceChar);

		return word;
	}
	
	/**
	* http://www.smart-webentwicklung.de/2012/12/javascript-eigene-inarray-funktion-schreiben/
	*/
	function inArray(array,value)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i] === value)
			{
				return true;
			}
		}
		return false;
	}
	
	/**
	*
	*/
	function checkRadio() {
		document.getElementById("period4").checked = true;
	}
	
	/**
	* SideBySide Bars Plugin
	* @url: http://en.benjaminbuffet.com/labs/flot/
	*/

	
	/**
	* datepicker: http://jqueryui.com/datepicker/
	*/
	$(function() {
		$( "#from" ).datepicker({
			changeMonth: true,
			numberOfMonths: 3,
			maxDate: 0,
			dateFormat: "yy-mm-dd",
			onClose: function( selectedDate ) {
				$( "#to" ).datepicker( "option", "minDate", selectedDate );
			}
		});
		$( "#to" ).datepicker({
			changeMonth: true,
			numberOfMonths: 3,
			maxDate: 0,
			dateFormat: "yy-mm-dd",
			onClose: function( selectedDate ) {
				$( "#from" ).datepicker( "option", "maxDate", selectedDate );
			}
		});
	});

	
	function transformDateForTicks(date) {
		var dateFormat;
		
		if (date.indexOf('.5') > -1) dateFormat = date.substr(0, 4) + "-" + date.substr(4, 2)  + "-" + date.substr(6, 2) + " 2nd";
		else dateFormat = date.substr(0, 4) + "-" + date.substr(4, 2)  + "-" + date.substr(6, 2) + " 1st";
		return dateFormat;
	}
	
	function removeTime(dateTime) {
		var date = dateTime.substring(0, 10);
		return date;
	}
	
	/**
	* http://stackoverflow.com/questions/1531093/how-to-get-current-date-in-javascript
	*/
	function transformDateToNum(date) {
		//var today = new Date();
		var dd = date.getDate();
		var mm = date.getMonth()+1; //January is 0!
		var yyyy = date.getFullYear();
		
		if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} date = yyyy+'-'+mm+'-'+dd;
		return date;
	}
	

	/**
	* http://stackoverflow.com/questions/1296358/subtract-days-from-a-date-in-javascript
	*/
	function dateSubstract(date, type, amount){
		var y = date.getFullYear(),
			m = date.getMonth(),
			d = date.getDate();
		if(type === 'y'){
			y -= amount;
		};
		if(type === 'm'){
			m -= amount;
		};
		if(type === 'd'){
			d -= amount;
		};
		return new Date(y, m, d);
	}
	
	/**
	* make YYYY-MM-DD a  valid date
	*/
	function parseDate(from){
		from = from.replace(/-/g,'/');
		return new Date(from);
	}
	
	/**
	* Makes sure that approx. 5 days are displayed at first
	*/
	function calcMin() {
		//Display 5 days
		var diffDays = Math.round(Math.abs((parseDate(fromDate)).getTime() - parseDate(toDate).getTime())/(oneDay));
		if (diffDays >= 4) {
			var middleDay = dateSubstract(parseDate(toDate), 'd', diffDays/2);
			var minDate = dateSubstract(middleDay, 'd', '2');
		}
		else var minDate = (parseDate(fromDate)).getTime();
		return minDate;
	}
	
	/**
	* Makes sure that approx. 5 days are displayed at first
	*/
	function calcMax() {
		//Display 5 days
		var diffDays = Math.round(Math.abs((parseDate(fromDate)).getTime() - parseDate(toDate).getTime())/(oneDay));
		if (diffDays >= 4) {
			var middleDay = dateSubstract(parseDate(toDate), 'd', diffDays/2);
			var maxDate = dateSubstract(middleDay, 'd', '-2');;
		}
		else {
			//Add one day because the last day is not shown in the graph (reason unknown)
			var maxDate = (dateSubstract(parseDate(toDate), 'd', '-1')).getTime();
		}
		return maxDate;
	}
	
	function jsonptest() {
		//Deactivate other buttons
		//document.getElementById('ListBtn').disabled = true;
		document.getElementById('ScoreBtn').disabled = true;
	
		var authentication = $('#auth').val();
		var reqtype = $('#type').val();
		if(document.getElementById('period1').checked) {
			var timeperiod = "7";
			fromDate = transformDateToNum(dateSubstract(new Date(), 'd', timeperiod));
			//new Date() = today!
			toDate = transformDateToNum(new Date());
		}
		if(document.getElementById('period2').checked) {
			var timeperiod = "14";
			fromDate = transformDateToNum(dateSubstract(new Date(), 'd', timeperiod));
			//new Date() = today!
			toDate = transformDateToNum(new Date());
		}
		if(document.getElementById('period3').checked) {
			var timeperiod = "2500";
			fromDate = transformDateToNum(dateSubstract(new Date(), 'd', timeperiod));
			//new Date() = today!
			toDate = transformDateToNum(new Date());
		}
		
		if(document.getElementById('period4').checked) {
			fromDate = $('#from').val();
			toDate = $('#to').val();
		}
		
		document.getElementById("console").textContent = "Requesting data with "+ authentication + " and of type " + reqtype + " since " + fromDate;
		/**
		* Creating a <script> element at runtime
		*/
		function jsonp(url) {
		  
		  //Creating the <script> element
		  var script = document.createElement("script");

		  //Setting “src” attribute to the URL of the remote script (the jsonp request)
		  script.setAttribute("src", url);
		  
		  //Add the new <script> element to the head of the document so that it gets executed
		  var head = document.head;
		  head.appendChild(script);
		  //Delete the script (jsonp request) to save memory) -- really useful for me?
		  head.removeChild(script);
		}

		jsonp("http://registry.fgdc.gov/statuschecker/api/v2/results?callback=jsonpCallback"+"&auth=" + authentication + "&type=" + reqtype + "&from=" + fromDate + "&to=" + toDate);
		document.getElementById("reqLink").innerHTML = "<a href=\"http://registry.fgdc.gov/statuschecker/api/v2/results?auth=" + authentication + "&type=" + reqtype + "&from=" + fromDate + "&to=" + toDate + "\">Request link</a>";
	}
	
	function jsonpCallback(data) {
		jsondata = data;
		 if(data == ''){

            $('#console').html("No data...");

         } else {
            $('#console').html("Success! Your data is here! " + data.returnedRecords + " recods were returned");
			getServices();
			//document.getElementById('ListBtn').disabled = false;
		 }
		  //document.getElementById("response").textContent = JSON.stringify(data);
		  //document.getElementById("response").textContent = JSON.stringify(data.apiVersion); //mit ""
		  //document.getElementById("response").textContent = data.data[0].name; //ohne ""
		}
	
	function getServices() {
		var testOut = "Beginning...";
		var output="<h3>Select Services</h3><select id=\"services\" name=\"services\" size=\"15\" multiple=\"multiple\" style=\"width:18.5em\">";
		var serviceIDs = [];
		serviceIDs.push("empty");
		//logic to show only "unique" services (services are listed one time for each date, e.g. 3 days = 3 times the same service appears in JSON)
		var alreadyIn = false;
		for (var i in jsondata.data) {
			testOut+= "<b>Initiate compare sequence with " + jsondata.data[i].id + "</b><br>";
			alreadyIn = false;
			for (var j in serviceIDs) {
				if(serviceIDs[j] == jsondata.data[i].id) {
					alreadyIn = true;
					testOut+= "Same id found" + jsondata.data[i].id + "Set alreadyIn = true<br>";
				}
				else if(alreadyIn == false) {
					alreadyIn = false;
					testOut+= "No same id found" + jsondata.data[i].id + "Set alreadyIn = false<br>";
				}
			}
			if(alreadyIn == false) output+="<option value=" +  jsondata.data[i].id + ">" + jsondata.data[i].name + "</option>";
			testOut+= "Push service with id " + jsondata.data[i].id + "<br>";
			serviceIDs.push(jsondata.data[i].id);
		}
		output+="</select>";
		document.getElementById("serviceList").innerHTML=output;
		//document.getElementById("test").innerHTML=testOut;
		document.getElementById('ScoreBtn').disabled = false;
		document.getElementById('SpeedBtn').disabled = false;
	}
	
	//Transforms scores[] into data[] suitable for flot
	//Attention "for.. in" does not work here! http://stackoverflow.com/questions/500504/javascript-for-in-with-arrays
	//scores = [A][B][C], A = entry number, B = allways 0, C=0 = date, C=1 = score, C=2 = service id, C=3 service label, C=4 = currentSpeed
	//TODO: display name instead of id as label
	//TODO: could be made easier using the inArray() function
	function transformScores(scores, type) {
		var ids = [];
		var idtemp = "empty";
		var ds = new Array();
		
		var barWidth = calcBarWidth();
		
		for (var i = 0, j = scores.length; i < j; i++) {
			//console.log(i + "ter schleifendurchlauf in transformScores()");
			//1. Fall: Allererster Durchlauf, also auf jedenfall neue id, ids[] is empty
			if (typeof(ids[0]) == 'undefined') {
				//console.log("fill ids[] with first id, create and fill temp[] with 1st score => " + scores[i][0][2] + " value: " + scores[i][0][1]);
				//fill ids[] with first id
				ids.push(scores[i][0][2]);
				//create and fill temp[] with 1st score
				var temp = [];
				if (type=='score') temp.push([scores[i][0][0], scores[i][0][1]]);
				if (type=='speed') temp.push([scores[i][0][0], scores[i][0][4]]);
			}
			//2. case: there is something in ids[]
			else {
				for (var k in ids) {
					if(scores[i][0][2] == ids[k]) {
						//console.log("found an existing id -> add score to temp => " + scores[i][0][2]+ " value: " + scores[i][0][1]);
						//found an existing id -> add score to temp
						if (type=='score') temp.push([scores[i][0][0], scores[i][0][1]]);
						if (type=='speed') temp.push([scores[i][0][0], scores[i][0][4]]);
					}
					else if (idtemp !== scores[i][0][2]){
						//console.log("found a new id -> put new id in ids[], create and fill temp[] with 1st score for the new id => " + scores[i][0][2]+ " value: " + scores[i][0][1]);
						//found a new id -> put new id in ids[]
						ids.push(scores[i][0][2]);
						//push old scoreData in temp into ds[];
						ds.push({
							label:scores[i-1][0][3],
							data:temp,
							bars: {
								show: true, 
								barWidth: calcBarWidth(), 
								order: 1,
								lineWidth : 1
							}
						});
						//create and fill temp[] with 1st score for the new id
						var temp = [];
						if (type=='score') temp.push([scores[i][0][0], scores[i][0][1]]);
						if (type=='speed') temp.push([scores[i][0][0], scores[i][0][4]]);
						//save last new found id so the in future loops it does not get recognized as a new id
						idtemp = scores[i][0][2];
					}
				}
			}
			//3. case: last run of the outer for loop -> temp[] has to be pushed into ds[]
			if (typeof(scores[i+1]) == 'undefined') {
				//push old scoreData in temp into ds[];
				ds.push({
					label:scores[i-1][0][3],
					data:temp,
					bars: {
						show: true, 
						barWidth: calcBarWidth(), 
						order: 1,
						lineWidth : 1
					}
				});
			}
		}
		return ds;
	}
	
	/**
	* Calaculates the width of the bars depending on the number of selected services)
	*/
	function calcBarWidth() {
		selServices = $('#services').val();
		var barWidth=0;
		//XX hours * 60 minutes * 60 seconds * 1000 (milliseconds)
		if (selServices.length <= 2) barWidth=2.5*60*60*1000;
		if (selServices.length == 3) barWidth=1.75*60*60*1000;
		if (selServices.length == 4) barWidth=1.25*60*60*1000;
		if (selServices.length == 5) barWidth=1*60*60*1000;
		if (selServices.length >= 6) barWidth=0.5*60*60*1000;
		return barWidth;
	}
	
	//returns the dates, scores, id and anames for the selected services
	//TODO: could be made easier using the inArray() function
	function getScores() {
		selServices = $('#services').val();
		
		//TODO: error handling!
		//$('#console').append(JSON.stringify(selServices));
		//$('#console').append("selServices.length: "+selServices.length);
		if (selServices.length == 'null') $('#console').html("<b>Error:</b> No service selected");
		
		//$('#test').html(selServices[0]);
		var scores = [];
		
		var dates = [];
			
		var scoreOutput="<ul>";
		for (var i in jsondata.data) {
			for (var j in selServices) {
				
				//Check if score for a date already exists (there 2 measurements per day)
				//the array scores is defined and has at least one element
				if (typeof scores !== 'undefined' && scores.length > 0) {
					for (var k in scores) {
						var score = [];
						//date+time exists -> add .5 at the end of the date
						//21600000 = 6h hinzufügen beim 2. Wert (vorher hinten + ".5" -> nachguckn!!)
						if(scores[k][0][0] == removeTime(jsondata.data[i].date).replaceAll('-','')) {
							if (jsondata.data[i].summary.scoredTest.currentScore == "-99.99") score.push([parseDate(jsondata.data[i].date).getTime()+21600000, 0, jsondata.data[i].id]);
							else score.push([parseDate(jsondata.data[i].date).getTime()+21600000, jsondata.data[i].summary.scoredTest.currentScore, jsondata.data[i].id, jsondata.data[i].name, jsondata.data[i].summary.scoredTest.currentSpeed]);
							//message+=("Building array for exisisting time i=" + i + " and j=" + j +  " and k=" + k + " contents" + JSON.stringify(score) + "<br>");
						}
						//date+time is new
						else {
							if (jsondata.data[i].summary.scoredTest.currentScore == "-99.99") score.push([parseDate(jsondata.data[i].date).getTime(), 0, jsondata.data[i].id]);
							else score.push([parseDate(jsondata.data[i].date).getTime(), jsondata.data[i].summary.scoredTest.currentScore, jsondata.data[i].id, jsondata.data[i].name, jsondata.data[i].summary.scoredTest.currentSpeed]);
							//message+=("Building array for new time i=" + i + " and j=" + j +  " and k=" + k + " contents" + JSON.stringify(score) + "<br>");
						}
					
					}
				}
				//initially set up the scores array and fill it with the first object
				else {
					var score = [];
					//score.push(jsondata.data[i].date);
					if (jsondata.data[i].summary.scoredTest.currentScore == "-99.99") score.push([parseDate(jsondata.data[i].date).getTime(), 0, jsondata.data[i].id]);
					else score.push([parseDate(jsondata.data[i].date).getTime(), jsondata.data[i].summary.scoredTest.currentScore, jsondata.data[i].id, jsondata.data[i].name, jsondata.data[i].summary.scoredTest.currentSpeed]);
					
					//message+=("Building array i=" + i + " and j=" + j + " contents" + JSON.stringify(score) + "<br>");
				}
				if (jsondata.data[i].id == selServices[j]) {
					dates.push(removeTime(jsondata.data[i].date));
					scoreOutput+="<li>" +  jsondata.data[i].id + " - " + parseDate(jsondata.data[i].date).getTime() + " - " + jsondata.data[i].summary.scoredTest.currentScore + "</li>";
					scores.push(score);

					//message+=("<b>Adding to array scores</b> i=" + i + " and j=" + j + " contents" + JSON.stringify(score) + "<br>");
				}
			}
			if (typeof scores !== 'undefined' && scores.length > 0) {
				//message+=("Adding array " + i + " contents" + JSON.stringify(scores[0][0][0]));
				//message+=("Adding array " + i + " contents" + JSON.stringify(scores));
			}
			scoreOutput+="</ul>";
			//$('#test').html(JSON.stringify(scores));
		}
		return scores;
	}
		
	/**
	* scores = [A][B][C], A = entry number, B = allways 0, C=0 = date, C=1 = score, C=2 = service id, C=3 service label
	*/
	function getMinScore(scores, type) {
		var min;
		if (type=='score') {
			min = scores[0][0][1];
			for (var i = 0, j = scores.length; i < j; i++) {
				if (min>scores[i][0][1]) min=scores[i][0][1];
			}
		}
		//this actually gives max
		if (type=='speed') {
			min = scores[0][0][4];
			for (var i = 0, j = scores.length; i < j; i++) {
				if (min<scores[i][0][4]) min=scores[i][0][4];
			}
		}
		//$('#test').append("min: " + min);
		return min;
	}
	
	function getYTicks(scores, type) {
		var scores = getScores();
		
		//compute min
		min = getMinScore(scores, type);
		var ticks = [];
		if (type=='score') {
			//Show 3 more in bottom direction
			for (var i = Math.round(min)-3, j = 101; i < j; i++) {
				ticks.push(i);
			}
		}
		if (type=='speed') {
			//Show 0 and 2 more secnds than max
			for (var i = 0, j = Math.round(min)+2; i < j; i++) {
				ticks.push(i);
			}
		}
		
		//$('#test').append("ticks: " + JSON.stringify(ticks));
		return ticks;
	}
	
	/**
	* heavily inspired by: http://www.pikemere.co.uk/blog/tutorial-flot-how-to-create-bar-charts/
	*/
	function showResults(type) {
		var scores = getScores();
		
		message+=("<p>Scores array " + JSON.stringify(scores));
		message+=("<p>Ds array " + JSON.stringify(transformScores(scores)));
		
		//var tm = getTickmarks(scores);
		//message+=("<p>Ds array " + JSON.stringify(tm));

		//$('#test').html(message);
		var max;
		var yaxislabel;
		if (type=='score') {
			max = 100;
			yaxislabel = 'Score';
		}
		if (type=='speed') {
			max = getMinScore(scores, type)+2;
			yaxislabel = 'Response time [s]';
		}
		
		$.plot($("#scoreGraph"), transformScores(scores, type), {
			grid:{
				hoverable:true,
				clickable: false,
				borderWidth: 1
			},
			pan:{
				interactive: true
				//left: -100,
				//top: 20
			},
			zoom: {
				interactive: true
			},
			legend: {
				container: document.getElementById("legend")
			},
			xaxis: {
				//Stellschraube für Anzeigebereich
				min: calcMin(),
				max: calcMax(),
				mode: "time",
				timeformat: "%y-%m-%d",
				//day displayed only once
				tickSize: [1, "day"],
				//hide gridlines
				tickLength: 0,
				axisLabel: 'Date',
				axisLabelUseCanvas: true,
				axisLabelFontSizePixels: 12,
				axisLabelFontFamily: 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
				axisLabelPadding: 5,
				//Stellschraube für pan Bereich
				//Add two days so that in all cases all bars are visible
				panRange: [(dateSubstract(parseDate(fromDate), 'd', '2')).getTime(), (dateSubstract(parseDate(toDate), 'd', '-2')).getTime()]
			},
			yaxis: {
				axisLabel: yaxislabel,
				ticks: getYTicks(scores, type),
				//Show 3 more in bottom direction
				min: getMinScore(scores, type)-3,
				max: max,
				zoomRange: false,
				panRange: false
			}
		});
		
		
		//tooltip function
		function showTooltip(x, y, contents, areAbsoluteXY) {
			var rootElt = 'body';
		
			$('<div id="tooltip" class="tooltip-with-bg">' + contents + '</div>').css( {
				position: 'absolute',
				display: 'none',
				'z-index':'1010',
				top: y,
				left: x
			}).prependTo(rootElt).show();
		}
		
		//add tooltip event
		$("#scoreGraph").bind("plothover", function (event, pos, item) {
			if (item) {
				if (previousPoint != item.datapoint) {
					previousPoint = item.datapoint;
		 
					//delete de prÃ©cÃ©dente tooltip
					$('.tooltip-with-bg').remove();
		 
					var x = item.datapoint[0];
		 
					//All the bars concerning a same x value must display a tooltip with this value and not the shifted value
					if(item.series.bars.order){
						for(var i=0; i < item.series.data.length; i++){
							if(item.series.data[i][3] == item.datapoint[0])
								x = item.series.data[i][0];
						}
					}
		 
					var y = item.datapoint[1];
		 
					//showTooltip(item.pageX+5, item.pageY+5,x + " = " + y);
					showTooltip(item.pageX+5, item.pageY+5,y);	
				}
			}
			else {
				$('.tooltip-with-bg').remove();
				previousPoint = null;
			}
		 
		});
	}	
		
	function test2() {
		var date = jsondata.data[0].date;
		$("#test").html(date + "-" + parseDate(date).getTime());
	}
	
	
	function blubb() {
				//Display 5 days
		var diffDays = Math.round(Math.abs((parseDate(fromDate)).getTime() - parseDate(toDate).getTime())/(oneDay));
		if (diffDays >= 4) {
			var middleDay = dateSubstract(parseDate(toDate), 'd', diffDays/2);
			var minDate = dateSubstract(middleDay, 'd', '2');
			var maxDate = dateSubstract(middleDay, 'd', '-2');;
		}
		else {
			var minDate = (parseDate(fromDate)).getTime();
			//Add one day because the last day is not shown in the graph (reason unknown)
			var maxDate = (dateSubstract(parseDate(toDate), 'd', '-1')).getTime();
		}
		$("#test").append("diffDays/2: "+diffDays/2+"<p>");
		$("#test").append("fromDate: "+fromDate+"<p>");
		$("#test").append("toDate: "+toDate+"<p>");
		$("#test").append("Middleday: "+middleDay+"<p>");
		$("#test").append("minDate: "+minDate+"<p>");
		$("#test").append("maxDate: "+maxDate+"<p>");
	}