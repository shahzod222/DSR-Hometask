import React, { useState } from "react";
import image1 from "./assets/image1.jpeg";
import image2 from "./assets/image2.jpeg";
import image3 from "./assets/image3.jpeg";
import image4 from "./assets/image4.jpeg";
import image5 from "./assets/image5.jpeg";
import "../styles/styles.scss";
var images = [image1, image2, image3, image4, image5];
function App() {
    var _a = useState(0), currentImage = _a[0], setCurrentImage = _a[1];
    var nextImage = function () {
        setCurrentImage(function (prev) { return (prev + 1) % images.length; });
    };
    var prevImage = function () {
        setCurrentImage(function (prev) { return (prev - 1 + images.length) % images.length; });
    };
    return (React.createElement("div", { className: "container" },
        React.createElement("header", { className: "header" }, "My React App"),
        React.createElement("main", null,
            React.createElement("div", { className: "carousel" },
                React.createElement("img", { src: images[currentImage], alt: "Image ".concat(currentImage + 1) }),
                React.createElement("button", { className: "navButton", onClick: prevImage }, "Previous"),
                React.createElement("button", { className: "navButton", onClick: nextImage }, "Next")))));
}
export default App;
