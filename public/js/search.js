// search.js

const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
  const productName = card.querySelector('.product-brand').textContent.toLowerCase();

  if (!productName.includes(query)) {
    card.style.display = 'none';
  } else {
    card.style.display = 'block';
  }
});



