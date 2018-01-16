$(document).ready(function (){
	$(".getQuote").on("click", function(){
		$.getJSON("https://talaikis.com/api/quotes/random/",function(a){
			$("#quote").html(a.quote+"<br>"+"<br>"+a.author);
		});
	});
	getLocation();
	$(".getWeather").on("click",function(){
		$.getJSON("https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long,function(a){
			$("#location").html(a.name);
			$("#typeWeather").html(a.weather.main);
			$("#temp").html(a.main.temp);
			$("#wind").html("Speed of wind "+a.wind.speed+"<br>");
		});
	});
	function getTimeRemaining(endtime){
		var t=Date.parse(endtime)-Date.parse(new Date());
		var seconds=Math.floor((t/1000)%60);
		var minutes=Math.floor((t/1000/60)%60);
		return {
			'total': t,
			'seconds': seconds,
			'minutes': minutes
		};
	}
	function initClock(endtime){
				function updateClock(){
					var t = getTimeRemaining(endtime);		
	  				$(".pomodoro").html('<p>minutes: '+t.minutes +'</p>'+'<p>seconds: '+t.seconds+'</p>');
					if(t.total<=0){
						alert("TIME IS UP!!! Take a break!");
	    				clearInterval(timeinterval);
	 				 }						
	 				 $('.reset').on('click', function(){
						$('.doStart').prop('disabled',false);
						$('.doStart').on('click',function(){
								start();
							});
						clearInterval(timeinterval);
						});
	 			}
	 	updateClock();
		var timeinterval=setInterval(updateClock,1000);	
		}

		$('.doStart').on('click',function(){
			start();
			});
		
		function start(){
			var deadline=new Date(Date.parse(new Date())+60*25*1000);
			if($('.doStart').prop('disabled')==true)
				$('.doStart').prop('disabled',false);
			else
				$('.doStart').prop('disabled',true);
			initClock(deadline);
	}
});

var lat;
var long;
function getLocation(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(getPosition);
	}
}
function getPosition(position){
	lat=position.coords.latitude;
	long=position.coords.longitude;
}

console.log(lat);
console.log(long);

