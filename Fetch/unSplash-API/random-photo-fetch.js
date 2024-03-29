// let randomImage = document.querySelector('.random-image');
// console.log('randomImage: ', randomImage);

// fetch('https://source.unsplash.com/random')
// .then(function(response) {
//     if(!response.ok) {
//         console.log(response);
//         return new Error(response);
//     }
//     console.log("Response: ", response);
//     return response.blob();
// })
// .then(function(photoBlob) {
//     console.log("My Blob: ", blob);
//     let objectURL = URL.createObjectURL(photoBlob);
//     console.log("Objects URL: ", objectURL);

//     randomImage.src = objectURL;
//     console.log("randomImage.src: ", randomImage.src);
// })
// .catch(function(err) {
//     console.log(err);
// })

// // **********************************************************
// From module:  Used to compare between mine.  Replaced "var" with "let".

let randomImage = document.querySelector('.random-image'); 
console.log("randomImage:", randomImage);

fetch('https://source.unsplash.com/random') 
.then(function(response) {
  if (!response.ok){ 
    console.log(response);
    return new Error(response); 
  } 
  console.log("Response:", response);
  return response.blob(); 
})
.then(function(photoBlob) { 
  console.log("My Blob:", photoBlob)
  let objectURL = URL.createObjectURL(photoBlob); 
  console.log("Object URL:", objectURL);
  randomImage.src = objectURL; 

  console.log("randomImage.src:", randomImage.src);
})
.catch(function(err) { 
  console.log(err); 
});