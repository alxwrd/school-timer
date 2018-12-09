const image = document.getElementById("image");
const frame = document.getElementById("frame");
const selector = document.getElementById("gifSelector");
const options = document.getElementById("gifSelectorOptions");
const addNewButton = document.getElementById("addNewGif");

selector.selected = false;


var lastImage = getStoreageItem("lastImage", "images/autumn_stream.gif")

if (lastImage) {
    image.src = lastImage;
}

if (getStoreageItem("timerImages", []).length == 0) {
    setStoreageItem("timerImages",
        [
            {
                name: "Autumn Stream",
                url: "images/autumn_stream.gif"
            },
            {
                name: "Foggy Forest",
                url: "images/foggy_forest.gif"
            },
            {
                name: "Forest Waterfall",
                url: "images/forest_waterfall.gif"
            },
            {
                name: "Leafy Path",
                url: "images/leafy_path.gif"
            },
            {
                name: "Moonlit City",
                url: "images/moonlit_city.gif"
            },
            {
                name: "Mountain Lake",
                url: "images/mountain_lake.gif"
            },
            {
                name: "Mountain Meadow",
                url: "images/mountain_meadow.gif"
            },
            {
                name: "Rainy Day",
                url: "images/rainy_day.gif"
            },
            {
                name: "Snowy Forest",
                url: "images/snowy_forest.gif"
            },
            {
                name: "Sunny Forest",
                url: "images/sunny_forest.gif"
            },
            {
                name: "Tropical Beach",
                url: "images/tropical_beach.gif"
            },
            {
                name: "Windy Hillside",
                url: "images/windy_hillside.gif"
            },
        ]
    );
}

function refreshSelector() {
    var i;
    for(i = selector.options.length - 1 ; i >= 0 ; i--) {
        selector.remove(i);
    }

    getStoreageItem("timerImages", []).forEach(element => {
        var option = document.createElement("option"); 
        option.text = element.name;
        option.value = element.url;
        selector.appendChild(option);
    });

    var option = document.createElement("option"); 
    option.text = "Add new...";
    option.value = "add-custom";
    selector.appendChild(option);
};

refreshSelector()


selector.addEventListener("change", function(event){
    if (selector.value === "add-custom") {
        options.classList.remove("hidden");
        return;
    } else {
        options.classList.add("hidden");
    }
    image.src = selector.value;
    setStoreageItem("lastImage", selector.value);
});


addNewButton.addEventListener("click", function(event) {
    var current_images = getStoreageItem("timerImages");

    var new_gif_name = document.getElementById("newGifName")
    var new_gif_url = document.getElementById("newGifUrl")

    current_images.push({
        name: new_gif_name.value,
        url: new_gif_url.value,
    });

    new_gif_name.value = "";
    new_gif_url.value = "";

    setStoreageItem("timerImages", current_images);
    options.classList.add("hidden");
    refreshSelector();
});


frame.addEventListener("click", function(event) {
    image.click();
})

image.addEventListener("click", function(event) {
    if (selector.selected) {
        selector.classList.add("hidden");
    } else {
        selector.classList.remove("hidden");
    }
    selector.selected = !selector.selected;
});