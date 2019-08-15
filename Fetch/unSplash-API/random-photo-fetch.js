let randomImage = document.querySelector('.random-image');
console.log('randomImage: ', randomImage);

fetch('https://source.unsplash.com/random')
.then(function(response) {
    if(!response.ok) {
        console.log(response);
        return new Error(response);
    }
    console.log("Response: " + response);
    return response.blob();
})
.then(function(photoBlob) {
    console.log("My Blob: ", blob);
    let objectURL = URL.createObjectURL(photoBlob);
    console.log("Objects URL: " + objectURL);
})