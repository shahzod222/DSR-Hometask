import React, { useState } from "react";
import image1 from "./assets/image1.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import "../styles/styles.scss";

const images = [image1, image2, image3, image4, image5];

function App() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="container">
      <header className="header">My React App</header>
      <main>
        <div className="carousel">
          <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
          <button className="navButton" onClick={prevImage}>
            Previous
          </button>
          <button className="navButton" onClick={nextImage}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
