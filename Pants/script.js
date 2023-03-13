// //Get the products section
// const productsSection = document.getElementById("products");

// // Fetch the product data from the JSON file
// fetch("products.json")
//   .then(response => response.json())
//   .then(products => {
//     // Loop through the products and create product cards
//     for (let product of products) {
//       // Create a product card
//       const productCard = document.createElement("div");
//       productCard.classList.add("product");
//       productsSection.appendChild(productCard);

//       // Add the product image
//       const productImage = document.createElement("img");
//       productImage.setAttribute("src", product.image);
//       productImage.setAttribute("alt", product.name);
//       productImage.setAttribute("class","grow")
//       productCard.appendChild(productImage);

//       // Add the product name
//       const productName = document.createElement("h2");
//       productName.innerText = product.name;
//       productCard.appendChild(productName);

//       // Add the product description
//       const productDescription = document.createElement("p");
//       productDescription.innerText = product.description;
//       productCard.appendChild(productDescription);

//       // Add the product rating
//       const productRating = document.createElement("div");
//       productRating.classList.add("rating");
//       productCard.appendChild(productRating);

//       // Add the stars to the rating div
//       for (let i = 1; i <= 5; i++) {
//         const star = document.createElement("span");
//         star.innerText = "★";
//         star.setAttribute("data-rating", i);
//         productRating.appendChild(star);
//       }

//       // Set the initial rating
//       const initialRating = product.rating || 0;
//       setRating(productRating, initialRating);

//       // Add event listeners to the stars
//       const stars = productRating.querySelectorAll("span");
//       stars.forEach(star => {
//         star.addEventListener("mouseover", function() {
//           setRating(productRating, star.getAttribute("data-rating"));
//         });
//         star.addEventListener("mouseout", function() {
//           setRating(productRating, initialRating);
//         });
//         star.addEventListener("click", function() {
//           product.rating = star.getAttribute("data-rating");
//         });
//       });

  
//       // Add the product price
//       const productPrice = document.createElement("p");
//       productPrice.innerText = `$${product.price}`;
//       productCard.appendChild(productPrice);

//       // Add the "Add to Cart" button
//       const addToCartButton = document.createElement("button");
//       addToCartButton.innerText = "Add to Cart";
//       productCard.appendChild(addToCartButton);

//       // Add event listener for the "Add to Cart" button
//       addToCartButton.addEventListener("click", function() {
//         alert(`Added ${product.name} to cart!`);
//       });
//     }
//   });

// // Helper function to set the rating
// function setRating(ratingContainer, rating) {
//   const stars = ratingContainer.querySelectorAll("span");
//   stars.forEach(star => {
//     if (star.getAttribute("data-rating") <= rating) {
//       star.classList.add("filled");
//     } else {
//       star.classList.remove("filled");
//     }
//   }
//   );
// }


//Get the products section
const productsSection = document.getElementById("products");

// Fetch the product data from the JSON file
fetch("products.json")
  .then(response => response.json())
  .then(products => {
    // Loop through the products and create product cards
    for (let product of products) {
      // Create a product card
      const productCard = document.createElement("div");
      productCard.classList.add("product");
      productsSection.appendChild(productCard);

      // Add the product image
      const productImage = document.createElement("img");
      productImage.setAttribute("src", product.image);
      productImage.setAttribute("alt", product.name);
      productImage.setAttribute("class", "grow");
      productCard.appendChild(productImage);

      // Add the product name
      const productName = document.createElement("h2");
      productName.innerText = product.name;
      productCard.appendChild(productName);

      // Add the product description
      const productDescription = document.createElement("p");
      productDescription.innerText = product.description;
      productCard.appendChild(productDescription);

      // Add the product rating
      const productRating = document.createElement("div");
      productRating.classList.add("rating");
      productCard.appendChild(productRating);

      // Add the stars to the rating div
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.innerText = "★";
        star.setAttribute("data-rating", i);
        productRating.appendChild(star);
      }

      // Set the initial rating
      const initialRating = product.rating || 0;
      setRating(productRating, initialRating);

      // Add event listeners to the stars
      const stars = productRating.querySelectorAll("span");
      stars.forEach(star => {
        star.addEventListener("click", function() {
          product.rating = star.getAttribute("data-rating");
          setRating(productRating, product.rating);
        });
      });

      // Add the product price
      const productPrice = document.createElement("p");
      productPrice.innerText = `$${product.price}`;
      productCard.appendChild(productPrice);

      // Add the "Add to Cart" button
      const addToCartButton = document.createElement("button");
      addToCartButton.innerText = "Add to Cart";
      productCard.appendChild(addToCartButton);

      // Add event listener for the "Add to Cart" button
      addToCartButton.addEventListener("click", function() {
        alert(`Added ${product.name} to cart!`);
      });
    }
  });

// Helper function to set the rating
function setRating(ratingContainer, rating) {
  const stars = ratingContainer.querySelectorAll("span");
  stars.forEach(star => {
    if (star.getAttribute("data-rating") <= rating) {
      star.classList.add("filled");
    } else {
      star.classList.remove("filled");
    }
  });
}

