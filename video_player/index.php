<html>
<title>My Video Player of DOOOOM</title>
<head>
<link rel='stylesheet' href='font/css/videoplayer.css' type='text/css' />
<link rel='stylesheet' href='css/style.css' type='text/css' />
</head>
<body>

<div id='VideoPlayer' class='video_player '>
        <div id="volumecontrol" class='wrapper'>        
          <div id="volumebar">
              <div id="volume" style='height: 0px;'></div>
          </div>             
        </div>        
        <div id='MainViewer' class='main_viewer ambience'>
            <video id='mainVideo' width='770'>
                <source src="/jordan/8020/video_player/video/video1.mp4" type="video/mp4"><!-- MP4 -->
                <source src="/jordan/8020/video_player/video/video1.ogv" type="video/ogg"><!-- OGG -->
            </video>
            <canvas id="reflection" width='770' height='55' style="vertical-align: top;"></canvas>
    
              <div id="positionview" class='wrapper'>        
                  <div id="progressBar">
                      <div id="progress" style='width: 0px;'></div>
                  </div>
                  <!--<div id="time"><span id="curTime"></span> / <span id="duration"></span></div>-->
              </div> 
    
        </div><!-- End Main Viewer Block -->

    <div id='Controls' class='controls wrapper'>    
            
        <span id='play' class='ctrbtn icon-play'></span>
        <span id='stop' class='ctrbtn icon-stop'></span>        
        <span id="mute"  class='ctrbtn icon-volume-off'></span>
        <span id="volDown"  class='ctrbtn icon-volume-down'></span>
        <span id="volUp"  class='ctrbtn icon-volume-up'></span>
        
        <div class='stickman wrapper'>
            <span class='head'>
                <span class='eyes leftEye'></span>
                <span class='eyes rightEye'></span>
                <span class='mouth'></span>
            </span>
            <span class='body'></span>
            <span class='left leftArm limb'>
                <span class='segment_1'></span>
            </span>
            <span class='right rightArm limb'>
                <span class='segment_1'></span>
            </span>
            <span class='left leftLeg limb'>
                <span class='segment_1'></span>
            </span>
            <span class='right rightLeg limb'>
                <span class='segment_1'></span>
            </span>
        </div>
       
                 
    </div><!-- End Controls Block -->
        
</div>


<canvas id="scratch" width="320" height="160" style='display:none;'></canvas>

</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script><!-- jQuery -->
<script type='text/javascript' src='js/script.js'></script><!-- Custom JS -->
</html>