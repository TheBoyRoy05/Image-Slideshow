const imageContainer = document.getElementById("image-container");
const maxHeight = 600;
const maxWidth = 500;
const maxAngle = 20;

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
  if (image.height > maxHeight){
    image.width = image.width * maxHeight / image.height;
    image.height = maxHeight;
  }
  if (image.width > maxWidth) {
    image.height = image.height * maxWidth / image.width;
    image.width = maxWidth;
  }

  // Set intial and random final position
  const finalPosition = Math.floor(Math.random() * (window.innerHeight - image.height)) + 'px';
  image.style.position = 'absolute';
  image.style.top = '-500px';
  image.style.left = Math.floor(Math.random() * (window.innerWidth - image.width)) + 'px';
  
  // Set random rotation
  const initialRotation = Math.floor(Math.random() * maxAngle) - maxAngle / 2;
  const finalRotation = Math.floor(Math.random() * maxAngle) - maxAngle / 2;
  image.style.transform = `rotate(${initialRotation}deg) scale(2)`; // Still not sure if scale(2) is best, but basically doubles the size

  // Set initial opacity and transition for fade-in effect
  image.style.opacity = 0;
  image.style.transition = 'top 1s, opacity 1s, transform 1s'; // I think I added the time correctly for movement and change in size

  // Append image to container
  imageContainer.appendChild(image);

  // Trigger drop, shrink, fade-in, and rotation change effect after a short delay
  setTimeout(() => {
    image.style.opacity = 1;
    image.style.top = finalPosition
    image.style.transform = `rotate(${finalRotation}deg) scale(1)`;
  }, 500);
};

const slideshow = (paths) => {
  let timeElapsed = 0;
  while (timeElapsed < 100) {
    let index = timeElapsed % paths.length;
    setTimeout(() => createImage(paths[index], index), timeElapsed * 1000);
    timeElapsed++;
  }
};

// Also as a reminder, for the final product: all comments should explain useful chunks of code, so we kinda need to clean up the repository