window.onload = function() 
{
	// Make the padding around the video fill with the average color from the video to make a more immersive ambience
	var objAmbience = new ambience('MainViewer','scratch');
	// Make the padding around the video fill with the average color from the video to make a more immersive ambience
	var objReflection = new reflection('MainViewer','scratch');
	
	$('#mainVideo')[0].addEventListener('canplay', function () {
		objAmbience.initCanvas();
		objReflection.initCanvas();	
		videoControls();
	});
}

$(document).ready(function()
{
	$('#mainVideo')[0].addEventListener("volumechange",animateStickman,false);
	
	// Set Volume graphic to match current volume
	$('#mainVideo')[0].volume = .1; //  Set current volume to really low
	var percentage = $('#mainVideo')[0].volume * 100;
	$("#volume").css('height', percentage+'%');	
	
	$('#mainVideo')[0].addEventListener('play', function () {
		$('#play').addClass('icon-pause');
		$('#play').removeClass('icon-play');
	}, false);
	$('#mainVideo')[0].addEventListener('pause', function () {
		$('#play').removeClass('icon-pause');
		$('#play').addClass('icon-play');
	}, false);
	$('#mainVideo')[0].addEventListener('ended', function () {
		  this.pause();
	}, false);
		
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
		mute.addClass('mute_active');	
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
		$('.rightLeg').addClass('crazyRight');	
		$('.leftLeg').addClass('crazyLeft');
		$('.rightArm').addClass('waveRight');
		$('.body').addClass('waveBody');
		$('.stickman').addClass('spin');
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
		$('.stickman').addClass('flip');
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
	$('.flip').removeClass('flip');	
	$('.spin').removeClass('spin');
	$('.mute_active').removeClass('mute_active');
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
	progTimeDrag  = false;
	volTimeDrag  = false;
	TimeOfError = 0;
		
	play      = $("#play");
	stop      = $("#stop");
	
	mute      = $("#mute");
	volumeBar = $('#volumebar');
	vol       = $("#volume");
	volUp     = $("#volUp");
	volDown   = $("#volDown");
	
	// Error Handling
	video.onerror = function(e) 
	{
		console.log(video.error.code);
	  // Sometimes when skipping ahead or back using the progress bar it will kick a MEDIA_ERR_DECODE, when that happens reload the video.
	  if(video.error.code == video.error.MEDIA_ERR_DECODE)
	  {  	
		    var TimeOfError = video.currentTime;	
			video.load();
			mainVideo.on('loadedmetadata', function(e) 
			{
				setProgress(TimeOfError);
				video.currentTime = TimeOfError;
			});
	  }
  	}
	
    mainVideo.bind("timeupdate", function(event)
	{   	
    	var percentage = 100 * video.currentTime / video.duration;
    	progress.css('width', percentage+'%');
	});

    mainVideo.bind("volumechange", function(event)
	{   	
		setVolume(video.volume);
		if(video.muted == false && video.volume <= 0)
			mute.trigger('click');
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
  
	var setProgress = function(P) 
	{
		var percentage = P * 100;
		
	   //Check within range
	   if(percentage > 100) 
	      percentage = 100;

	   if(percentage < 0)
	      percentage = 0;
		   
		vol.css('width', percentage+'%');
		video.volume = percentage / 100;
	}
	
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
	
	//update Volume Bar control
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
	  	  videoW     = $('#reflection').width();
	  	  videoH     = $('#mainVideo').height();		
	      rctxt      = reflection.getContext("2d");
	      
	      // flip canvas
	      rctxt.translate(0,videoH);
	      rctxt.scale(1,-1);
        
	      video.addEventListener("play", objReflection.paintFrame, false);	      
    }
    
    this.paintFrame = function() 
    {
	      //draw frame
	      rctxt.drawImage(video, 0, 0, videoW, videoH);	          
	      
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
	var worker = new Worker("js/ambiance.js")
	
	this.initCanvas = function() 
	{
	  ambience = document.getElementById(VideoWrapper);
	  video    = document.getElementsByTagName("video")[0];
	  scratch  = document.getElementById(Canvas);
	  sctxt    = scratch.getContext("2d");// Returns an object that provides methods and properties for drawing on the canvas
	  // Listen for when they play the video and start the paintAmbience function	  
      video.addEventListener("play", objAmbience.postFrame, false);
      worker.addEventListener("message", objAmbience.drawFrame, false);
	}
	
    this.postFrame = function() 
    {
		// Stops painting if they pause the video or it ends.
		if (video.paused || video.ended)
		  return;
		
    	w = 320; h = 160;
  	  	// Draws the video frame onto the canvas	  
  	  	sctxt.drawImage(video, 0, 0, w, h);
  	  	// Gets the image of that frame back off the canvas
  	  	frame = sctxt.getImageData(0, 0, w, h);  	  	
		
  	  	// Pass the frame information to our worker
        worker.postMessage(frame);
  	  	
		// Keep running this function every second
		postFrameTimer = setTimeout(function () 
		{
			objAmbience.postFrame();
		}, 1000);
     }
    
     this.drawFrame = function(event) 
     {
    	// The worker has done all of the work, and passed us back our color settings.
		color = event.data; 
		// Now we adjust the colors on the page, each of these elements has transition listeners in the css so the color changes will animate nicely.
		ambience.style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
		$('#progressBar')[0].style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
		$('#volumebar')[0].style.backgroundColor = 'rgb('+color[0]+','+color[1]+','+color[2]+')';
	}	
}