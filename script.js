const imageContainer = document.getElementById("image-container");
const maxImageHeight = 600;
const maxImageWidth = 500;
const maxRotationAngle = 20;

fetch("output.json")
  .then(response => response.json())
  .then(data => {
    slideshow(data.paths);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

const createImage = (path, index) => {
  const image = document.createElement("img");
  image.src = "Images/" + path;
  image.id = "Image-" + index;

  // Resize image
  if (image.height > maxImageHeight){
    image.width = image.width * maxImageHeight / image.height;
    image.height = maxImageHeight;
  }
  if (image.width > maxImageWidth) {
    image.height = image.height * maxImageWidth / image.width;
    image.width = maxImageWidth;
  }

  // Set random position
  const initialRotation = Math.floor(Math.random() * maxRotationAngle) - maxRotationAngle / 2; // These 2 lines are for the varied rotation
  const finalRotation = Math.floor(Math.random() * maxRotationAngle) - maxRotationAngle / 2; // I used Math.Floor based off what you said Issac
  image.style.position = 'absolute';
  image.style.top = '-500px'; // I set the image above the screen so it can 'drop off'
  image.style.left = Math.floor(Math.random() * (window.innerWidth - image.width)) + 'px';
  
  // Set random rotation
  // const randomRotation = Math.floor(Math.random() * maxRotationAngle) - maxRotationAngle / 2; (Old Line, didn't use 1 rotation)

  image.style.transform = `rotate(${initialRotation}deg) scale(2)`; // Still not sure if scale(2) is best, but basically doubles the size

  // Set initial opacity and transition for fade-in effect
  image.style.opacity = 0;
  image.style.transition = 'top 1s, opacity 1s, transform 1s'; // I think I added the time correctly for movement and change in size

  // Append image to container
  imageContainer.appendChild(image);

  // Trigger drop, shrink, fade-in, and rotation change effect after a short delay
  setTimeout(() => {
    image.style.opacity = 1;
    image.style.top = Math.floor(Math.random() * (window.innerHeight - image.height)) + 'px'; // This just basically is how I made the initial size before it goes down
    image.style.transform = `rotate(${finalRotation}deg) scale(1)`; // Shrink to actual size with final rotation
  }, 50 + index * 1000); // Adjust timing to stagger the fade-in effect, also I made it 1 SEC instead of 0.1 SEC
};

const slideshow = (paths) => {
  for (let i = 0; i < paths.length; i++){
    setTimeout(() => createImage(paths[i], i), i * 1000);
  }
};

// Also as a reminder, for the final product: all comments should explain useful chunks of code, so we kinda need to clean up the repository