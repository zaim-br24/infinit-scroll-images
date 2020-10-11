const DOM = {
    imageContainer:document.getElementById('image-container'),
    loader:document.getElementById('loader')
}
let imgLoaded = 0;
let totalImages = 0;
let ready = false;

let count = 5;
const apiKey = 'DvIGRE2qgP9GVftNq4fLmNNEC6T-k2BZUvKCfPEI55Q';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// check if  all image were loaded
function imageLoaded(){
    imgLoaded++
     if(imgLoaded === totalImages){
         ready = true;
         DOM.loader.hidden = true;
         count = 30;
         apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
     } 
};

// /:::::::::: create dynamic setAttribute :::::::::////////
function setAttributes(element, attributes){
    for(const key in attributes){
        
        element.setAttribute(key , attributes[key])
    }
};
// /:::::::::: the long way to create img :::::::::////////
function createPhoto1(photo){
    totalImages = photo.length
    const item = document.createElement('a');
    setAttributes(item, {
        href:photo.links.html,
        target:'_blank'
    })
  //  create <img> tag
    const img = document.createElement('img');
    // event listener check each time img loaded
    img.addEventListener('load', imageLoaded);

    setAttributes(img, {
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description
    });

  //   add img to  it's parent item
    item.appendChild(img);
  //   add item to it's parent container
    DOM.imageContainer.appendChild(item)
};

function displayPhoto(photosArr) {
    imgLoaded = 0
    photosArr.forEach(createPhoto1);
};
const getImages = async ()=>{
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayPhoto(data)
    }catch(error){
        console.log("whooo no image ", error)
    }
};
//  scroll event
this.addEventListener('scroll', ()=>{
    if(this.innerHeight + this.scrollY >= document.body.offsetHeight - 1000 , ready){
        ready = false ;
        getImages()
    }
});
// getImages()






























// /:::::::::: the easy way to create img :::::::::////////

// function createPhoto(photo){
//   let image =`<a href="${photo.links.html}" target="_blank">
//                  <img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}">
//               </a> 
//              `;  
//     DOM.imageContainer.insertAdjacentHTML('afterbegin', image) 
// }