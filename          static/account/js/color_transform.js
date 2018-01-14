//function to transform emotion to hsl
function setPixelColor(image, x, y, color, alpha) {
    alpha = (alpha !== undefined ? alpha : 255);

    var NUM_CHANNELS = 4;
	var rowByteOffset = y * image.width * NUM_CHANNELS;
	var colByteOffset = x * NUM_CHANNELS;
	var pixelByteOffset = rowByteOffset + colByteOffset;
	image.data[pixelByteOffset + 0] = color['r'];
	image.data[pixelByteOffset + 1] = color['g'];
	image.data[pixelByteOffset + 2] = color['b'];
	image.data[pixelByteOffset + 3] = alpha;
}



function emoTorgb(val, ar, stringi=true){
  var rad = Math.atan2(ar, val)
  var deg = (rad)/2/Math.PI;
  var h = -deg+5/12
  if(h<0){
    h=h+1;
  }
  //console.log(h)
  var s = Math.sqrt(val*val+ar*ar)
  return hslToRgb(h,s,0.7, stringi)
}

//function to transform hsl to rgb
function hslToRgb(h, s, l, stringi=true){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    if(stringi){
      return "rgb("+Math.round(r * 255).toString()+","+ Math.round(g * 255).toString()+","+Math.round(b * 255)+")";
  }else{
    return {'r': Math.round(r*255),'g':Math.round(g*255),'b':Math.round(b*255)}
  }
}
