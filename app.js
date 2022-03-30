const form = document.querySelector("#searchForm");

form.addEventListener("submit", async function (evt) {
    evt.preventDefault();//prevent the default behaviour (refresh, in this case), when submitting
	
	//Removes any old images from the screen
	var images = document.getElementsByTagName('img');
	var l = images.length;
	for (var i = 0; i < l; i++) {
    images[0].parentNode.removeChild(images[0]);
	}

    const searchTerm = form.elements.query.value;

    const config = {
        params : {
            q : searchTerm
        }
    }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`,config);

    makeImages(res.data);

})

const makeImages = (shows) => {
    for (let result of shows) {

        if (result.show.image) { //if image exists
            const img = document.createElement("img");
            img.src = result.show.image.medium;
            document.body.append(img); // this will append <img> inside the <body> tag
        }

    }
}