const imageContainer = document.getElementById("image-container");
const maxHeight = 600;
const maxWidth = 500;
const maxAngle = 25;
const maxImages = 4;
const imageInterval = 1000;

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

  // Set random position
  image.style.position = 'absolute';
  image.style.top = Math.floor(Math.random() * (window.innerHeight - image.height)) + 'px';
  image.style.left = Math.floor(Math.random() * (window.innerWidth - image.width)) + 'px';

  // Set random rotation
  const randomRotation = Math.floor(Math.random() * maxAngle) - maxAngle / 2;
  image.style.transform = `rotate(${randomRotation}deg)`;

  // Set initial opacity and transition for fade-in effect
  image.style.opacity = 0;
  image.style.transition = 'opacity 1s';

  // Append image to container
  imageContainer.appendChild(image);

  // Trigger fade-in effect after a short delay
  setTimeout(() => {
    image.style.opacity = 1;
  }, index * 100); // Adjust timing to stagger the fade-in effect
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
  for (let i = 0; i < paths.length; i++){
    setTimeout(() => createImage(paths[i], i), i * imageInterval);
    if (i > maxImages - 1){
      setTimeout(() => removeImageById(`Image-${i - maxImages - 1}`), i * imageInterval);
    }
  }
};
