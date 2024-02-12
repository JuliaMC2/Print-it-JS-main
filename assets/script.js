const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
];

const previous_slide = document.getElementById("previous_slide");
const next_slide = document.getElementById("next_slide");
const dots = document.getElementById("dots");

//looks for image_source in slides and returns its index, -1 if not found
function getCurrentIndex(image_source) {
	var currentIndex = -1;
	// look for the filename in the slides array
	for (i=0 ; i< slides.length; i++) {
		if(slides[i].image === image_source) {
			//console.log("found at "+i);
			currentIndex = i;
			break;
		}
	}
	return currentIndex;	
}


function computeDots() {

	// setting up variables
	const numberOfDots = slides.length;
	const banner_img = document.getElementById("banner_img");
	const currentIndex = getCurrentIndex(banner_img.src.substr(banner_img.src.lastIndexOf('/')+1));
	var computedInnerHTML = "";

	// building the spans, adding the dot selected class when the current index is reached
	for (i = 0 ; i < numberOfDots ; i++) {
		computedInnerHTML += "<span class=\"dot";
		if (i === currentIndex)
			computedInnerHTML += " dot_selected";
		computedInnerHTML += "\"></span>";

	}
	//console.log("computed dots inner HTML :" + computedInnerHTML);
	dots.innerHTML = computedInnerHTML;
}


// provide the function with an offset (-1 or 1 but not limited to)
// being the jump you want to make in the carousel,
//
// the function will set the banner and tag line to their new values.
function updateCarouselInfo(offset) {

	// setting up variables
	var currentIndex=-1;
	var banner_img = document.getElementById("banner_img");

	// extract the filename (the image attribute in the slides array)
	const image_source = banner_img.src.substr(banner_img.src.lastIndexOf('/')+1);

	// extract the path
	const pathToImage = banner_img.src.substr(0, banner_img.src.lastIndexOf('/')+1);

	//console.log('extracted from DOM : ' + pathToImage + image_source);

	// get the current index in the array
	currentIndex = getCurrentIndex(image_source);

	// if the filename could be found
	if (currentIndex != -1) {
		currentIndex += offset;

		// the result is greater than the array size => go back to the first element
		if (currentIndex >= slides.length)
			currentIndex = 0;
		// the result is below zero => ga back to the last element
		else if (currentIndex < 0)
			currentIndex = slides.length - 1;

		// change the image source
		banner_img.src=pathToImage+slides[currentIndex].image;

		// change the inner HTML of the paragraph to process inner span correctly
		document.getElementById("tagLine").innerHTML = slides[currentIndex].tagLine;

		// change the bullet points
		computeDots();
	}
}

previous_slide.onclick = function() {
	updateCarouselInfo(-1);
}

next_slide.onclick = function() {
	updateCarouselInfo(+1);
}

dots.onload = computeDots();