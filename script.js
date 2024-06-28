const imageContainer = document.getElementById("image-container")

const createImage = (path) => {
  const image = document.createElement("img");
  image.src = "Images/" + path;
  image.width = 200;
  image.height = 200;
  imageContainer.appendChild(image)
}

fetch("output.json")
  .then(response => response.json())
  .then(data => {
      data.paths.forEach(path => createImage(path));
  })
  .catch(error => {
      console.error('Error fetching JSON:', error);
  });
