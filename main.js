

//pulled from main.js of solarize module example (resouce 2 in README)
//@author Robert C. Duvall
//@author Jonathan Browning

// convenience variable to avoid repeatedly getting it in each method
let canvas = document.getElementById('imagecanvas');
// global state to keep track of between user interactions
let originalImage = null;
// not strictly needed - cache this version of the image to make it a little faster for interaction
let filteredImage = null;


// load image using user selected by file chooser input element and draw it using SimpleImage class
function loadImage () {
    originalImage = new SimpleImage(document.getElementById('fileInput'));
    originalImage.drawTo(canvas);
}

function resetImage (){
    if (originalImage != null){
        filteredImage = null;
        originalImage.drawTo(canvas);
    }

}

//function called from html file
function alterRGB() {
    
    if (originalImage != null){
        if (filteredImage == null){
            filteredImage = new SimpleImage(originalImage.getWidth(), originalImage.getHeight());
        }
        
        let thresholdRed = document.getElementById('thresholdRed').value;
        let thresholdGreen = document.getElementById('thresholdGreen').value;
        let thresholdBlue = document.getElementById('thresholdBlue').value;
        alterRGBValue(originalImage, filteredImage, thresholdRed, thresholdGreen, thresholdBlue);
        filteredImage.drawTo(canvas);
    }
}

function alterRGBValue(source, result, thresholdRed, thresholdGreen, thresholdBlue){
    result.forEachPixel(pixel => {
        let srcPixel = source.getPixel(pixel.getX(), pixel.getY());
        pixel.setRed(alterValue(srcPixel.getRed(),thresholdRed));
        pixel.setGreen(alterValue(srcPixel.getRed(),thresholdGreen));
        pixel.setBlue(alterValue(srcPixel.getRed(),thresholdBlue));
    });
}

function alterValue(value,threshold){
    if (value+threshold < 255){
        return value+threshold;
    }
    else{
        return Math.max(value, threshold) - Math.min(value, threshold);
    }
    
}

// erase image from canvas by drawing a rectangle over it
function clearCanvas () {
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    // forget selected image
    originalImage = null;
    filteredImage = null;
}


