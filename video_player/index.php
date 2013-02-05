<html>
<title>My Video Player of DOOOOM</title>
<head>
<link rel='stylesheet' href='font/css/videoplayer.css' type='text/css' />
<link rel='stylesheet' href='css/style.css' type='text/css' />
</head>
<body>

<div id='VideoPlayer' class='video_player'>
        
    <div id='MainViewer' class='main_viewer'
        <video>
            <source src=""></source><!-- MP4 -->
            <source src=""></source><!-- OGG -->
        </video>
    </div><!-- End Main Viewer Block -->
      
    <div id='Controls' class='controls wrapper'>
        <span class='ctrbtn icon-shuffle'></span>
        <span class='ctrbtn icon-fast-backward'></span>            
        <span class='ctrbtn icon-stop'></span>
        <span class='ctrbtn icon-play'></span>
        <span class='ctrbtn icon-pause'></span>        
        <span class='ctrbtn icon-fast-forward'></span>
        
        <!-- <span class='ctrbtn icon-volume-off'></span>
        <span class='ctrbtn icon-volume-down'></span>
        <span class='ctrbtn icon-volume-up'></span>  -->                    
    </div><!-- End Controls Block -->
        
</div>

</body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script><!-- jQuery -->
<script type='text/javascript' src='js/script.js'></script><!-- Custom JS -->
</html>