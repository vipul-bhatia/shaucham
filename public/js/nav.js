const createNav = () => {
  let nav = document.querySelector('.navbar');

  nav.innerHTML = `
    <div class="nav">
      <img src="../images/logo-removebg-preview.png" class="brand-logo" alt="">
      <div class="nav-item">
        <div class="search">
          <input type="text" class="search-box" placeholder="search brand,product">
          <button class="search-btn">search</button>
        </div>
        <a>
          <img src="../images/user.png" id="user-img" alt="">
          <div class="login-logout-popup hide">
              <p class="account-info">Log in as, name</p>
              <button class="btn" id="user-btn">Log out</button>
          </div>
        </a>
        <a href="/cart"><img src="../images/cart.png" alt=""></a>
      </div>
    </div>
    <ul class="links-container">
      <li class="link-item"><a href="../mainpage.html" class="link">home</a></li>
     <li class="link-item"><a href="../bath&body.html" class="link">Bath&Body</a></li>
      <li class="link-item"><a href="../facewash&oil.html" class="link">facewash</a></li>
      <li class="link-item"><a href="../cream&lipbalm.html" class="link">cream</a></li>
      <li class="link-item"><a href="../cream&lipbalm.html" class="link">lipbalm</a></li>
       <li class="link-item"><a href="../facewash&oil.html" class="link">Oil</a></li>
      <li class="link-item"><a href="../review.html" class="link">REVIEWS</a></li>
      
  </ul>
    `;
}

createNav();

//nav popup
const userImageButton = document.querySelector('#user-img'); 
const userPopup = document.querySelector('.login-logout-popup');
const popuptext = document.querySelector('.account-info');
const actionBtn = document.querySelector('#user-btn');

userImageButton.addEventListener('click', () => {
  userPopup.classList.toggle('hide');
})

window.onload = () => {  
  let user = JSON.parse(sessionStorage.user || null);
  if (user != null) {
    //means user is logged in   
    popuptext.innerHTML = `login as, ${user.name}`;
    actionBtn.innerHTML = 'log out';
    actionBtn.addEventListener('click', () => {
      sessionStorage.clear();
      location.reload();
    })
  }
  else {
    //user is logged out
    popuptext.innerHTML = 'log in to place order';
    actionBtn.innerHTML = 'log in';
    actionBtn.addEventListener('click', () => {
      location.href = '/login';
    })
  }
}


function handleSearch() {
  const searchBox = document.querySelector('.search-box');
  const searchQuery = searchBox.value.trim(); // get the search query

  if (searchQuery) {
    // if search query is not empty, redirect to search.html with the query
    location.href = `search.html?query=${searchQuery}`;
  }
}

// Add an event listener to the search button
document.querySelector('.search-btn').addEventListener('click', handleSearch);

