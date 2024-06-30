const createFooter = () => {
    let footer = document.querySelector('footer');

    footer.innerHTML = `
    <div class="footer-container">
    <div class="row">
      <div class="footer-col">
        <h4>About us</h4>
        <ul>
          <li><a href="../whyshaucham.html">why shaucham</a></li>
        <!--  <li><a href="#">our services</a></li> -->
          <li><a href="#">privacy policy</a></li>
         <!--  <li><a href="#">affiliate program</a></li> -->
        </ul>
      </div>
      <div class="footer-col">
        <h4>get help</h4>
        <ul>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">shipping</a></li>
          <!-- <li><a href="#">returns</a></li> -->
          <li><a href="#">order status</a></li>
          <li><a href="#">payment options</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Quick links</h4>
        <ul>
          <li><a href="../bath&body.html">Soaps</a></li>
          <li><a href="../cream&lipbalm.html">Cream</a></li>
          <li><a href="../facewash&oil.html">Facewash</a></li>
          <li><a href="../cream&lipbalm.html">Lipbalm</a></li>
          <li><a href="../facewash&oil.html">Oil</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact us</h4>
        <div class="social-links">
          <a href="#"><i class="fab fa-facebook-f"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/shauchamofficial/" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
        </div>
        <br>
        <span class="Contact-us" >Z2-09046, Dr. Nohria Street, \n Guru Kashi Marg, \n Bathinda-151001, Punjab </span>
        <br>
        <span class="Contact-us" >Tell no. : +91 74512-78956 </span>
      </div>
    </div>
  </div>
  `;
}

createFooter();