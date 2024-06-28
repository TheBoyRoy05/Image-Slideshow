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
  image.style.position = 'absolute';
  image.style.top = Math.floor(Math.random() * (window.innerHeight - image.height)) + 'px';
  image.style.left = Math.floor(Math.random() * (window.innerWidth - image.width)) + 'px';

  // Set random rotation
  const randomRotation = Math.floor(Math.random() * maxRotationAngle) - maxRotationAngle / 2;
  image.style.transform = `rotate(${randomRotation}deg)`;

  // Set initial opacity and transition for fade-in effect
  image.style.opacity = 0;
  image.style.transition = 'opacity 1s';

  // Append image to container
  imageContainer.appendChild(image);

  // Trigger fade-in effect after a short delay
  setTimeout(() => {
    image.style.opacity = 1;
  }, 50 + index * 100); // Adjust timing to stagger the fade-in effect
};

const slideshow = (paths) => {
  for (let i = 0; i < paths.length; i++){
    setTimeout(() => createImage(paths[i], i), i * 1000);
  }
};
