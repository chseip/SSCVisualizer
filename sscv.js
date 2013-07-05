var jsondata = [];
var message = "Beginning message...";

	String.prototype.replaceAll = function(character,replaceChar){
		var word = this.valueOf();

		while(word.indexOf(character) != -1)
			word = word.replace(character,replaceChar);

		return word;
	}
	
	/**
	* @url: http://www.peterkropff.de/tutorials/javascript_arrays/funktionen.htm
	* produces an error in getScores() but I don't know why
	*/
	/*
	Array.prototype.inArray = function (find)
	{
	  for(var i in this) 
	  {
		if (find == this[i]) 
		{
		  return true;
		}
	  }
	  return false;
	}
	*/
	
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
	* SideBySide Bars Plugin
	* @url: http://en.benjaminbuffet.com/labs/flot/
	*/
	/*
	$(function () {
		var previousPoint;
	 
		var d1 = [["0", 10], [1, 8], [2, 4]];
		var d2 = [[0, 5], [1, 6], [2, "8"]];
		var d3 = [[0, 7], [1, 4], [2, 10]];
		/*
		var d1 = [];
		for (var i = 0; i <= 10; i += 1)
			d1.push([i, parseInt(Math.random() * 30)]);
	 
		var d2 = [];
		for (var i = 0; i <= 10; i += 1)
			d2.push([i, parseInt(Math.random() * 30)]);
	 
		var d3 = [];
		for (var i = 0; i <= 10; i += 1)
			d3.push([i, parseInt(Math.random() * 30)]);
		*/
		/*
		var ds = new Array();
	 
		ds.push({
			label:"d1",
			data:d1,
			bars: {
				show: true, 
				barWidth: 0.2, 
				order: 1,
				lineWidth : 2
			}
		});
		ds.push({
			data:d2,
			bars: {
				show: true, 
				barWidth: 0.2, 
				order: 2
			}
		});
		ds.push({
			data:d3,
			bars: {
				show: true, 
				barWidth: 0.2, 
				order: 3
			}
		});
		  //Display graph
		$.plot($("#placeholder1"), ds, {
			grid:{
				hoverable:true
			},
			xaxis: { ticks:[[0,'Bob'],[1,'Chris'],[2,'Joe']]}
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
		$("#placeholder1").bind("plothover", function (event, pos, item) {
			if (item) {
				if (previousPoint != item.datapoint) {
					previousPoint = item.datapoint;
		 
					//delete de précédente tooltip
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
		 
					showTooltip(item.pageX+5, item.pageY+5,x + " = " + y);
		 
				}
			}
			else {
				$('.tooltip-with-bg').remove();
				previousPoint = null;
			}
		 
		});
	});
	*/
	
	/**
	* Flot
	*/
	/*
	$(function() {
		var data = [ ["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9] ];

		$.plot("#placeholder", [ data ], {
			series: {
				bars: {
					show: true,
					barWidth: 0.2,
					align: "center"
				}
			},
			yaxis: {
				ticks: [1.5, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20]
			},
			xaxis: {
				mode: "categories",
				tickLength: 0
			}
		});
	});
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
	
	function jsonptest() {
		//Deactivate other buttons
		document.getElementById('ListBtn').disabled = true;
		document.getElementById('ScoreBtn').disabled = true;
	
		var authentication = $('#auth').val();
		var reqtype = $('#type').val();
		if(document.getElementById('period1').checked) var timeperiod = "7";
		if(document.getElementById('period2').checked) var timeperiod = "14";
		if(document.getElementById('period3').checked) var timeperiod = "2500";
		var fromDate = transformDateToNum(dateSubstract(new Date(), 'd', timeperiod));
		//new Date() = today!
		var toDate = transformDateToNum(new Date());
		
		if(document.getElementById('period4').checked) {
			var fromDate = $('#from').val();
			var toDate = $('#to').val();
		}
		
		document.getElementById("console").textContent = "Requesting data with "+ authentication + " and of type " + reqtype + " since " + fromDate;
		/**
		* Creating a <script> element at runtime
		*/
		function jsonp(url) {
		  
		  //Creating the <script> element
		  var script = document.createElement("script");

		  //Setting �src� attribute to the URL of the remote script (the jsonp request)
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
			document.getElementById('ListBtn').disabled = false;
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
		document.getElementById("test").innerHTML=testOut;
		document.getElementById('ScoreBtn').disabled = false;
	}
	
	/*
	function showScores() {
	//var data = [ ["January", 10], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9] ];
		var selServices = [];
		selServices = $('#services').val();
		$('#test').html(selServices[0]);
		var scores = [];
		
		var scoreOutput="<ul>";
		for (var i in jsondata.data) {
			for (var j in selServices) {
				var score = [];
				score.push(jsondata.data[i].date);
				if (jsondata.data[i].summary.scoredTest.currentScore == "-99.99") score.push("0");
				else score.push(jsondata.data[i].summary.scoredTest.currentScore);

				if (jsondata.data[i].id == selServices[j]) {
					scoreOutput+="<li>" +  jsondata.data[i].id + " - " + removeTime(jsondata.data[i].date) + " - " + jsondata.data[i].summary.scoredTest.currentScore + "</li>";
					scores.push(score);
				}
			}
		scoreOutput+="</ul>";
		$('#test').html(scoreOutput);
		}
		$.plot("#placeholder", [ scores ], {
			series: {
				bars: {
					show: true,
					barWidth: 0.2,
					align: "center"
				}
			},
			yaxis: {
				ticks: [96, 98, 99, 100],
				min: 95,
				max: 100
			},
			xaxis: {
				mode: "categories",
				tickLength: 0
			}
		});
	}
	*/
	
	//Transforms scores[] into data[] suitable for flot
	//Attention "for.. in" does not work here! http://stackoverflow.com/questions/500504/javascript-for-in-with-arrays
	//scores = [A][B][C], A = entry number, B = allways 0, C=0 = date, C=1 = score, C=2 = service id
	//TODO: display name instead of id as label
	//TODO: could be made easier using the inArray() function
	function transformScores(scores) {
		var ids = [];
		var idtemp = "empty";
		var ds = new Array();
		
		for (var i = 0, j = scores.length; i < j; i++) {
			//console.log(i + "ter schleifendurchlauf in transformScores()");
			//1. Fall: Allererster Durchlauf, also auf jedenfall neue id, ids[] is empty
			if (typeof(ids[0]) == 'undefined') {
				//console.log("fill ids[] with first id, create and fill temp[] with 1st score => " + scores[i][0][2] + " value: " + scores[i][0][1]);
				//fill ids[] with first id
				ids.push(scores[i][0][2]);
				//create and fill temp[] with 1st score
				var temp = [];
				temp.push([scores[i][0][0], scores[i][0][1]]);
			}
			//2. case: there is something in ids[]
			else {
				for (var k in ids) {
					if(scores[i][0][2] == ids[k]) {
						//console.log("found an existing id -> add score to temp => " + scores[i][0][2]+ " value: " + scores[i][0][1]);
						//found an existing id -> add score to temp
						temp.push([scores[i][0][0], scores[i][0][1]]);
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
								barWidth: 0.05, 
								order: 1,
								lineWidth : 1
							}
						});
						//create and fill temp[] with 1st score for the new id
						var temp = [];
						temp.push([scores[i][0][0], scores[i][0][1]]);
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
						barWidth: 0.05, 
						order: 1,
						lineWidth : 1
					}
				});
			}
		}
		return ds;
	}
	
	//returns the dates, scores, id and anames for the selected services
	//TODO: could be made easier using the inArray() function
	function getScores() {
		var selServices = [];
		selServices = $('#services').val();
		
		//TODO: error handling!
		$('#console').html(JSON.stringify(selServices));
		$('#console').html(selServices.length);
		if (selServices.length == 'null') $('#console').html("<b>Error:</b> No service selected");
		
		$('#test').html(selServices[0]);
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
						if(scores[k][0][0] == removeTime(jsondata.data[i].date).replaceAll('-','')) {
							if (jsondata.data[i].summary.scoredTest.currentScore == "-99.99") score.push([removeTime(jsondata.data[i].date).replaceAll('-','')+".5", 0, jsondata.data[i].id]);
							else score.push([removeTime(jsondata.data[i].date).replaceAll('-','')+".5", jsondata.data[i].summary.scoredTest.currentScore, jsondata.data[i].id, jsondata.data[i].name]);
							//message+=("Building array for exisisting time i=" + i + " and j=" + j +  " and k=" + k + " contents" + JSON.stringify(score) + "<br>");
						}
						//date+time is new
						else {
							if (jsondata.data[i].summary.scoredTest.currentScore == "-99.99") score.push([removeTime(jsondata.data[i].date).replaceAll('-',''), 0, jsondata.data[i].id]);
							else score.push([removeTime(jsondata.data[i].date).replaceAll('-',''), jsondata.data[i].summary.scoredTest.currentScore, jsondata.data[i].id, jsondata.data[i].name]);
							//message+=("Building array for new time i=" + i + " and j=" + j +  " and k=" + k + " contents" + JSON.stringify(score) + "<br>");
						}
					
					}
				}
				//initially set up the scores array and fill it with the first object
				else {
					var score = [];
					//score.push(jsondata.data[i].date);
					if (jsondata.data[i].summary.scoredTest.currentScore == "-99.99") score.push([removeTime(jsondata.data[i].date).replaceAll('-',''), 0, jsondata.data[i].id]);
					else score.push([removeTime(jsondata.data[i].date).replaceAll('-',''), jsondata.data[i].summary.scoredTest.currentScore, jsondata.data[i].id, jsondata.data[i].name]);
					
					//message+=("Building array i=" + i + " and j=" + j + " contents" + JSON.stringify(score) + "<br>");
				}
				if (jsondata.data[i].id == selServices[j]) {
					dates.push(removeTime(jsondata.data[i].date));
					scoreOutput+="<li>" +  jsondata.data[i].id + " - " + removeTime(jsondata.data[i].date) + " - " + jsondata.data[i].summary.scoredTest.currentScore + "</li>";
					scores.push(score);

					//message+=("<b>Adding to array scores</b> i=" + i + " and j=" + j + " contents" + JSON.stringify(score) + "<br>");
				}
			}
			if (typeof scores !== 'undefined' && scores.length > 0) {
				//message+=("Adding array " + i + " contents" + JSON.stringify(scores[0][0][0]));
				//message+=("Adding array " + i + " contents" + JSON.stringify(scores));
			}
			scoreOutput+="</ul>";
			$('#test').html(scoreOutput);
		}
		return scores;
	}
	
	//tickMarks array [[20130624,"Bob"],[20130624.5,"Chris"],[20130625,"Joe"],[20130625.5,"Bill"]]
	function getTickmarks(scores) {
		var tickMarks = [];
		var dates = [];
		for (var i = 0, j = scores.length; i < j; i++) {
			//1. case: first run, date is new, dates[] is empty
			if (typeof(dates[0]) == 'undefined') {
				dates.push(scores[i][0][0]);
				//TODO: Funktion, die Datum wieder lesbar macht
				tickMarks.push([scores[i][0][0],transformDateForTicks(scores[i][0][0])]);
			}
			//2. case: there is something in dates[] -> check is current date is already in dates[]
			else if(!inArray(dates,scores[i][0][0])) {
				//found a new date -> add it to dates[]
				dates.push(scores[i][0][0]);
				//TODO: Funktion, die Datum wieder lesbar macht
				tickMarks.push([scores[i][0][0],transformDateForTicks(scores[i][0][0])]);
			}
		}
		console.log("tickMarks: " + JSON.stringify(tickMarks));
		return tickMarks;
	}
	
	function showScores() {
		var scores = getScores();
		
		message+=("<p>Scores array " + JSON.stringify(scores));
		message+=("<p>Ds array " + JSON.stringify(transformScores(scores)));
		
		var tm = getTickmarks(scores);
		
		message+=("<p>Ds array " + JSON.stringify(tm));

		$('#test').html(message);
		
		$.plot($("#scoreGraph"), transformScores(scores), {
			grid:{
				hoverable:true
			},
			legend: {
				container: document.getElementById("legend"),
				position: "se"
			},
			yaxis: {
				ticks: [96, 97, 98, 99, 100],
				min: 95,
				max: 100
			},
			//             x wert, 'label'
			//xaxis: { ticks:[[4,'Bob'],[5,'Chris'],[6,'Joe'],[7,'Bill']]}
			//xaxis: { ticks:[[20130624,scores[0][0][0]],[20130624.5,scores[1][0][0]],[20130625,scores[2][0][0]],[20130625.5,scores[3][0][0]]]}
			xaxis: { ticks: getTickmarks(scores) }
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
		 
					//delete de précédente tooltip
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
		 
					showTooltip(item.pageX+5, item.pageY+5,x + " = " + y);
		 
				}
			}
			else {
				$('.tooltip-with-bg').remove();
				previousPoint = null;
			}
		 
		});
	}
	
	function test2() {
	
		/*
		var date = "20130624";
		
		//var date = "20130625.5";
		var dateFormat;
		
		if (date.indexOf('.5') > -1) {
			dateFormat = date.substr(0, 4) + "-" + date.substr(4, 2)  + "-" + date.substr(6, 2) + " 2nd";
			$('#test').html(dateFormat);
		}
		else {
			dateFormat = date.substr(0, 4) + "-" + date.substr(4, 2)  + "-" + date.substr(6, 2) + " 1st";
			$('#test').html(dateFormat);
		}
		
		/*
		var a = [[['a','b','c'],['d','d','f'],['g','h','i']],[['j','k','l'],['m','n','o'],['p','q','r']]]
		var b = [[["a","b"]],[["c","d"]],[["e","f"]],[["g","h"]]];
		var c = [[["20130624",98.73,"WMS_BfN_Schutzgebiete_AWZ"]],[["20130624.5",98.66,"WMS_BfN_Schutzgebiete_AWZ"]],[["20130625",98.76,"WMS_BfN_Schutzgebiete_AWZ"]],[["20130625.5",98.74,"WMS_BfN_Schutzgebiete_AWZ"]],[["20130624",99.78,"WMS_LLUR_MSRL-D5-Eutrophierung"]],[["20130624.5",99.78,"WMS_LLUR_MSRL-D5-Eutrophierung"]],[["20130625",99.78,"WMS_LLUR_MSRL-D5-Eutrophierung"]],[["20130625.5",99.78,"WMS_LLUR_MSRL-D5-Eutrophierung"]]]
		console.log(typeof(c[50]));

		if (c[0][0][2] == c[1][0][2]) $('#test').html("Success!!!");
		else $('#test').html("Error!!!");
		
		/*
		if (typeof(c[50]) !== 'undefined') {
			if (c[50].length > 0) $('#test').html(c[50][0][2]);
		}
		else $('#test').html("<b>ERROR</b>");
		
		var from = $('#from').val();
		var to = $('#to').val();
		$('#test').html(from + " to " + to);
		*/
	}