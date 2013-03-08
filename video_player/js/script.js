window.onload = function() 
{
	// Make the padding around the video fill with the average color from the video to make a more immersive ambience
	var objAmbience = new ambience('MainViewer','scratch');
	objAmbience.initCanvas();

	// Make the padding around the video fill with the average color from the video to make a more immersive ambience
	var objReflection = new reflection('MainViewer','scratch');
	objReflection.initCanvas();
	
	videoControls();
	
	$('#mainVideo')[0].addEventListener("volumechange",animateStickman,false);
}

$(document).ready(function()
{
	// Set Volume graphic to match current volume
	$('#mainVideo')[0].volume = .1;
	var percentage = $('#mainVideo')[0].volume * 100;
	$("#volume").css('height', percentage+'%');	
});

function animateStickman()
{
	video     = $('#mainVideo')[0]; //dom version	
	mute      = $("#mute");
	volumeBar = $('#volumebar');
	vol       = $("#volume");
	volUp     = $("#volUp");
	volDown   = $("#volDown");
	
	var percentage = Math.round(video.volume * 100);

	if(video.muted)
	{
		stopAnimation();
		$('.eyes').addClass('SleepyBlink');
		$('.head').addClass('SleepyHeadRoll');				
	}
	else if(percentage <= 20)
	{
		stopAnimation();
		$('.leftArm').addClass('shrugLeft');
		$('.rightArm').addClass('shrugRight');	
	}
	else if(percentage <= 30)
	{
		stopAnimation();
		$('.leftArm').addClass('waveLeft');
	}	
	else if(percentage <= 40)
	{
		stopAnimation();
		$('.leftArm').addClass('waveRight');
		$('.RightArm').addClass('waveRight');
		$('.RightArm').css('-webkit-animation-delay','2s')
	}
	else if(percentage <= 50)
	{
		stopAnimation();
		$(".mouth").addClass('ooMouth');
		$('.leftArm').addClass('shrugLeft');
		$('.rightArm').addClass('shrugRight');	
		$('.RightArm').css({
			'-webkit-animation-duration':'1s',
			'-webkit-animation-iteration-count':'infinite'
		});
		$('.leftArm').css({
			'-webkit-animation-duration':'.5s',
			'-webkit-animation-iteration-count':'infinite'
		});
		
		$('.leftLeg').addClass('waveLeft');
		$('.RightLeg').addClass('waveRight');
		$('.RightBody').addClass('waveBody');
	}
	else if(percentage <= 70)
	{
		stopAnimation();
		$('.leftArm').addClass('waveLeft');
		$('.rightLeg').addClass('waveRight');	
		$('.leftLeg').addClass('waveLeft');
		$('.rightArm').addClass('waveRight');
		$('.body').addClass('waveBody');		
	}	
	else if(percentage >= 71)
	{
		stopAnimation();
		$('.head').addClass('crazyHead');
		$('.eyes').addClass('excited');		
		$(".mouth").addClass('openMouth');
		$('.mouth').addClass('excited');
		$('.leftArm').addClass('waveLeft');
		$('.rightLeg').addClass('crazyRight');	
		$('.leftLeg').addClass('crazyLeft');
		$('.rightArm').addClass('waveRight');
		$('.body').addClass('waveBody');
	}		
}
function stopAnimation()
{
	$('.shrugLeft').removeClass('shrugLeft');
	$('.shrugRight').removeClass('shrugRight');	
	$('.SleepyBlink').removeClass('SleepyBlink');
	$('.SleepyHeadRoll').removeClass('SleepyHeadRoll');	
	$('.waveLeft').removeClass('waveLeft');	
	$('.waveRight').removeClass('waveRight');
	$('.waveBody').removeClass('waveBody');	
	$('.excited').removeClass('excited');
	$('.crazyHead').removeClass('crazyHead');
	$('.crazyRight').removeClass('crazyRight');
	$('.crazyLeft').removeClass('crazyLeft');
	$('.openMouth').removeClass('openMouth');
	$('.ooMouth').removeClass('ooMouth');		
}


/* Based on: http://html5videoguide.net/code_c4_20.html
 * Create Custom Buttons
 * Functions like play() are not part of jQuery, they are DOM. adding [0] after the jquery selector gives them that access.
 */
function videoControls()
{
	mainVideo = $('#mainVideo');// jQuery version
	video     = $('#mainVideo')[0]; //dom version
	progressBar=$('#progressBar');
	progress  = $("#progress");
	curTime   = $("#curTime");
	endTime   = $("#duration");
	progTimeDrag  = false;
	volTimeDrag  = false;
	timer     = '';
	
	play      = $("#play");
	stop      = $("#stop");
	
	mute      = $("#mute");
	volumeBar = $('#volumebar');
	vol       = $("#volume");
	volUp     = $("#volUp");
	volDown   = $("#volDown");
	
	// This doesn't work all of the time, why does everyone suggest using it???
	mainVideo.on('loadedmetadata', function() 
	{
		displayTime = video.duration*100;
		displayTime = Math.round(displayTime)/100;		
		endTime.text(displayTime);
	});
    
    mainVideo.bind("timeupdate", function(event)
	{
    	displayTime = video.currentTime*100;
    	displayTime = Math.round(displayTime.toFixed(2))/100;
    	curTime.html(displayTime);
    	
    	var percentage = 100 * video.currentTime / video.duration;
    	progress.css('width', percentage+'%');
	});
	
    /* PROGRESS BAR */
    progressBar.mousedown(function(event) 
    {
    	progTimeDrag = true;
	   updateProgressBar(event.pageX);
    });	
    
    progressBar.mouseup(function(event) 
    {
	   if(progTimeDrag) 
	   {
		   progTimeDrag = false;
	      updateProgressBar(event.pageX);
	   }
	});
    
    progressBar.mousemove(function(event) 
	{
	   if(progTimeDrag) 
		   updateProgressBar(event.pageX);
	}); 
  
	//update Progress Bar control
	var updateProgressBar = function(x) 
	{
	   var maxduration = video.duration;
	   var position    = x - progress.offset().left; //Click pos
	   var percentage  = 100 * position / progressBar.width();

	   //Check within range
	   if(percentage > 100) 
	      percentage = 100;

	   if(percentage < 0)
	      percentage = 0;
	 
	   //Update progress bar and video currenttime
	   progress.css('width', percentage+'%');
	   video.currentTime = maxduration * percentage / 100;
	};  
    /* END PROGRESS BAR */	
	
    play.click(function(event) 
	{
		if (video.paused == false) {
			video.pause();
			stopAnimation();
			this.style.backgroundPosition = "0 0";
			$(this).removeClass('icon-pause');
			$(this).addClass('icon-play');
		} else {
			video.play();
			animateStickman();
			this.style.backgroundPosition = "0 -151px";
			$(this).removeClass('icon-play');
			$(this).addClass('icon-pause');
		}
	});

	stop.click(function(event) 
	{
		if (video.paused == false) {
			video.pause();
			stopAnimation();;
			this.style.backgroundPosition = "0 0";
			play.removeClass('icon-pause');
			play.addClass('icon-play');
		}
	});
	
	/* VOLUME CONTROLS */	
	mute.click(function(event)
	{
	   video.muted = !video.muted;
	   return false;
	});
	
	volUp.click(function(event)
	{
		var V = video.volume + .10;
		setVolume(V);
	});
	
	volDown.click(function(event)
	{
		var V = video.volume - .10;
		setVolume(V);
	});
	
	volumeBar.mousedown(function(event) 
    {
		volTimeDrag = true;
	   updateVolumeBar(event.pageY);
    });	
    
	volumeBar.mouseup(function(event) 
    {
	   if(volTimeDrag) 
	   {
		  volTimeDrag = false;
	      updateVolumeBar(event.pageY);
	   }
	});
    
	volumeBar.mousemove(function(event) 
	{
	   if(volTimeDrag) 
		   updateVolumeBar(event.pageY);
	});  
	
	var setVolume = function(V) 
	{
		var percentage = V * 100;
		
	   //Check within range
	   if(percentage > 100) 
	      percentage = 100;

	   if(percentage < 0)
	      percentage = 0;
		   
		vol.css('height', percentage+'%');
		video.volume = percentage / 100;
	}
	//update Progress Bar control
	var updateVolumeBar = function(Y) 
	{
		var position   = Y - volumeBar.offset().top;
		var percentage = 100 - (100 * position / volumeBar.height());

	   //Check within range
	   if(percentage > 100) 
	      percentage = 100;

	   if(percentage < 0)
	      percentage = 0;
	   
	   //Update progress bar and video currenttime
	   vol.css('height', percentage+'%');
	   video.volume = percentage / 100;
	};	
	/* END VOLUME CONTROLS */
}

function reflection(VideoWrapper, Canvas)
{
	var context, rctxt, video, videoW, videoH;

	var objReflection = this; // So we don't lose it.
    this.initCanvas = function() 
    {
	      video      = $('#mainVideo')[0];
	      reflection = $("#reflection")[0];	      
	  	  videoW     = $('#mainVideo').width();
	  	  videoH     = $('#mainVideo').height();		
	      rctxt      = reflection.getContext("2d");
	      
	      // flip canvas
	      rctxt.translate(0,videoH);
	      rctxt.scale(1,-1);
	      
	      // create gradient
	      gradient = rctxt.createLinearGradient(0, 0, 0, videoH);
	      gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
	      gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)");
	      rctxt.fillStyle = gradient;
	      rctxt.rect(0, 0, videoW, videoH);
	      video.addEventListener("play", objReflection.paintFrame, false);	      
    }
    
    this.paintFrame = function() 
    {
	      // draw frame, and fill with the opacity gradient mask
	      rctxt.drawImage(video, 0, 0, videoW, videoH);
	      rctxt.globalCompositeOperation = "destination-out";
	      rctxt.fill();
	      
	      // restore composition operation for next frame draw
	      rctxt.globalCompositeOperation = "source-over";
	      if (video.paused || video.ended)
	         return;
	      
	      setTimeout(function () 
	      {
	    	  objReflection.paintFrame();
	      }, 0);
    }
}

/* This is based on: http://html5videoguide.net/code_c6_9.html
 * VideoWrapper is the ID of the wrapper around the video. It's padded area with change color.
 * Canvas is the ID of the hidden canvas that the average color will be calculated from. 
 */
function ambience(VideoWrapper, Canvas)
{
	var sctxt, video, ambience;
	var objAmbience = this; // So we don't lose it.
	
	this.initCanvas = function() 
	{
	  ambience = document.getElementById(VideoWrapper);
	  body    = document.getElementsByTagName("body")[0];
	  video    = document.getElementsByTagName("video")[0];
	  scratch  = document.getElementById(Canvas);
	  sctxt    = scratch.getContext("2d");// Returns an object that provides methods and properties for drawing on the canvas
	  // Listen for when they play the video and start the paintAmbience function
	  video.addEventListener("play", objAmbience.paintAmbience, false);
	}
	
	this.paintAmbience = function() 
	{
	  // Draws the video frame onto the canvas	  
	  sctxt.drawImage(video, 0, 0, 320, 160);
	  // Gets the image of that frame back off the canvas
	  frame = sctxt.getImageData(0, 0, 320, 160);
	  // gets the average color from the image we took off the canvas
	  color = objAmbience.getColorAvg(frame);
	  // Sets the background to that color, the transition effect is applied by the CSS
	  ambience.style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
	  // body.style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
	  
	  // Stops painting if they pause the video or it ends.
	  if (video.paused || video.ended)
	    return;
	
	  // Keep running this function every second
	  setTimeout(function () 
	  {
		  objAmbience.paintAmbience();
	  }, 1000);
	}
	
	/*
	  Does all the funky math to calc the average color.
	 */
	this.getColorAvg = function(frame) 
	{
	  r = 0;
	  g = 0;
	  b = 0;
	  // calculate average color from image in canvas
	  for (var i = 0; i < frame.data.length; i += 4) 
	  {
	    r += frame.data[i];
	    g += frame.data[i + 1];
	    b += frame.data[i + 2];
	  }
	  r = Math.ceil(r / (frame.data.length / 4));
	  g = Math.ceil(g / (frame.data.length / 4));
	  b = Math.ceil(b / (frame.data.length / 4));
	  return Array(r, g, b);
	}	
}