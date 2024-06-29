const imageContainer = document.getElementById("image-container");
const maxHeight = 600;
const maxWidth = 500;
const maxAngle = 20;
const maxImages = 50;

// Time intervals (milliseconds)
const imageInterval = 2500;
const animationInterval = 500;

fetch("output.json")
  .then(response => response.json())
  .then(data => {
    slideshow(data.paths);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

const createImage = (path, id) => {
  const image = document.createElement("img");
  image.src = "Images/" + path;
  image.id = "Image-" + id;

  // Resize image
  image.onload = () => {
    if (image.height > maxHeight){
      image.width = image.width * maxHeight / image.height;
      image.height = maxHeight;
    }
    if (image.width > maxWidth) {
      image.height = image.height * maxWidth / image.width;
      image.width = maxWidth;
    }

    // Set initial and random final position
    const finalTopPosition = Math.floor(Math.random() * (window.innerHeight - image.height)) + 'px';
    const finalLeftPosition = Math.floor(Math.random() * (window.innerWidth - image.width)) + 'px';
    image.style.position = 'absolute';
    image.style.top = '-500px';
    image.style.left = (window.innerWidth - image.width) / 2 + 'px';
  
    // Set random rotation
    const initialRotation = Math.floor(Math.random() * maxAngle) - maxAngle / 2;
    const finalRotation = Math.floor(Math.random() * maxAngle) - maxAngle / 2;
    image.style.transform = `rotate(${initialRotation}deg) scale(2)`; // Starts off with double the size

    // Set initial opacity and transition for fade-in effect
    image.style.opacity = 0;
    image.style.transition = 'top 1s, opacity 1s, transform 1s';

    // Append image to container
    imageContainer.appendChild(image);

    // Trigger drop, shrink, fade-in, and rotation change effect after a short delay
    setTimeout(() => {
      image.style.opacity = 1;
      image.style.top = finalTopPosition;
      image.style.left = finalLeftPosition;
      image.style.transform = `rotate(${finalRotation}deg) scale(1)`;
    }, animationInterval);
  };
};

const removeImageById = (id) => {
  const imageToRemove = document.getElementById(id);
  if (imageToRemove) {
    imageContainer.removeChild(imageToRemove);
  } else {
    console.warn(`Image with id '${id}' not found in imageContainer.`);
  }
};

const slideshow = (paths) => {
  for (let timeElapsed = 0; timeElapsed < 100; timeElapsed++) {
    let index = timeElapsed % paths.length;
    setTimeout(() => createImage(paths[index], timeElapsed), timeElapsed * imageInterval);

    // Only allow a set amount of images on the screen to avoid clutter and lag
    if (timeElapsed > maxImages){
      setTimeout(() => removeImageById(`Image-${timeElapsed - maxImages}`), timeElapsed * imageInterval + animationInterval);
    }
  }
};
