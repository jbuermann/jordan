onmessage = function (event) {
  // receive the image data
  var frame = event.data;
  
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
  
  color = Array(r, g, b);

  // send the image data back to main thread
  postMessage(color);

}