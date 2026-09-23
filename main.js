/* ===== Namaste Spiceland — shared interactivity ===== */

/* ---------- Mobile nav ---------- */
const menuToggle = document.getElementById('menuToggle');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    document.getElementById('mainNav').classList.toggle('open');
  });
}

/* ---------- Cart (persists across pages via localStorage) ---------- */
const CART_KEY = 'namasteCart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}
function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(i => i.name === name);
  if (existing) existing.qty += 1;
  else cart.push({ name, price, qty: 1 });
  saveCart(cart);
  openCart();
}
function changeQty(name, delta) {
  let cart = getCart();
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
  saveCart(cart);
}
function removeItem(name) {
  saveCart(getCart().filter(i => i.name !== name));
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.qty * i.price, 0);
}
function renderCart() {
  const badge = document.getElementById('cartBadge');
  const count = cartCount();
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  const list = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!list) return;
  const cart = getCart();
  if (cart.length === 0) {
    list.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
  } else {
    list.innerHTML = cart.map(i => `
      <div class="cart-line">
        <div>
          <div>${i.name}</div>
          <div class="qty-ctrl">
            <button onclick="changeQty('${i.name.replace(/'/g, "\\'")}',-1)">−</button>
            <span>${i.qty}</span>
            <button onclick="changeQty('${i.name.replace(/'/g, "\\'")}',1)">+</button>
          </div>
          <button class="remove" onclick="removeItem('${i.name.replace(/'/g, "\\'")}')">remove</button>
        </div>
        <div>$${(i.price * i.qty).toFixed(2)}</div>
      </div>
    `).join('');
  }
  if (totalEl) totalEl.textContent = '$' + cartTotal().toFixed(2);
}
function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('authModal')?.classList.remove('open');
}
document.addEventListener('DOMContentLoaded', renderCart);

/* ---------- Auth modal ---------- */
function openAuth(tab) {
  document.getElementById('authModal').classList.add('open');
  document.getElementById('overlay').classList.add('open');
  showAuthTab(tab || 'login');
}
function showAuthTab(tab) {
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('signupForm').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabSignup').classList.toggle('active', tab === 'signup');
}

/* ---------- Random menu-item slideshow (Groceries) ---------- */
/* Pool of every grocery item — a random handful is shown up top instead of a fixed combo list */
const GROCERY_SLIDE_POOL = [
  { title: 'Garam Masala, 100g', desc: 'House-blended warm spice mix.', price: 3.99, img: 'assets/groceries/garam-masala.jpg' },
  { title: 'Curry Masala, 100g', desc: 'All-purpose curry spice blend.', price: 3.99, img: 'assets/groceries/curry-masala.jpg' },
  { title: 'Turmeric Powder, 200g', desc: 'Bright, earthy ground turmeric.', price: 2.99, img: 'assets/groceries/turmeric-powder.jpg' },
  { title: 'Mango Pickle, 400g', desc: 'Tangy, spiced traditional pickle.', price: 4.99, img: 'assets/groceries/mango-pickle.jpg' },
  { title: 'Basmati Rice, 10lb', desc: 'Long-grain, aged aromatic basmati.', price: 18.99, img: 'assets/groceries/basmati-rice.jpg' },
  { title: 'Toor Dal, 4lb', desc: 'Split pigeon peas, everyday staple.', price: 7.99, img: 'assets/groceries/toor-dal.jpg' },
  { title: 'Moong Dal, 4lb', desc: 'Split mung lentils, quick-cooking.', price: 7.99, img: 'assets/groceries/moong-dal.jpg' },
  { title: 'Chapati Atta, 10lb', desc: 'Whole wheat flour for rotis & parathas.', price: 12.99, img: 'assets/groceries/chapatti-atta.jpg' },
  { title: 'Curry Leaves, bunch', desc: 'Fresh-cut, fragrant curry leaves.', price: 1.99, img: 'assets/groceries/curry-leaves.jpg' },
  { title: 'Fresh Cilantro, bunch', desc: 'Locally sourced coriander leaves.', price: 1.49, img: 'assets/groceries/cilantro.jpg' },
  { title: 'Frozen Malabar Paratha, 5pc', desc: 'Ready-to-griddle layered flatbread.', price: 5.99, img: 'assets/groceries/malabar-parata.jpg' },
  { title: 'Paneer, 400g', desc: 'Fresh, firm Indian cottage cheese.', price: 5.49, img: 'assets/groceries/paneer.jpg' },
  { title: 'Bombay Mixture, 200g', desc: 'Classic crunchy savory mix.', price: 3.49, img: 'assets/groceries/bombay-mixture.jpg' },
  { title: 'Aloo Bhujia, 200g', desc: 'Crispy spiced potato noodles.', price: 3.49, img: 'assets/groceries/aloo-bhuja.jpg' },
  { title: 'Papad, pack of 10', desc: 'Thin lentil wafers, ready to roast or fry.', price: 3.99, img: 'assets/groceries/papad.jpg' },
  { title: 'Banana Chips, 200g', desc: 'Coconut-oil fried, lightly salted.', price: 3.99, img: 'assets/groceries/banana-chips.jpg' },
  { title: 'Assorted Mithai Box, 500g', desc: "Chef's selection of boxed sweets.", price: 12.99, img: 'assets/groceries/assorted-mithai-box.jpg' },
  { title: 'Soan Papdi, 250g', desc: 'Flaky, saffron-scented sweet.', price: 4.99, img: 'assets/groceries/soan-papadi.jpg' },
  { title: 'Incense Sticks, pack', desc: 'Traditional temple fragrance.', price: 2.49, img: 'assets/groceries/incence-stick.jpg' },
  { title: 'Diya Set, 6 pc', desc: 'Hand-painted clay oil lamps.', price: 4.99, img: 'assets/groceries/diya-set.jpg' },
  { title: 'Masala Chai, 250g', desc: 'Loose-leaf spiced black tea blend.', price: 5.99, img: 'assets/groceries/masala-chai.jpg' },
  { title: 'Rose Syrup, 750ml', desc: 'For sharbat, lassi & desserts.', price: 6.99, img: 'assets/groceries/rose-syrup.jpg' },
  { title: 'Mango Lassi Mix', desc: 'Just blend with yogurt & ice.', price: 4.99, img: 'assets/groceries/mango-lasi-mix.jpg' },
  { title: 'Coconut Water, 6-pack', desc: 'Natural, no sugar added.', price: 8.99, img: 'assets/groceries/coconut-water.jpg' }
];
function buildRandomSlideshow(container, pool, count) {
  const track = container.querySelector('#slidesTrack');
  if (!track) return;
  const picks = [...pool].sort(() => Math.random() - 0.5).slice(0, count);
  track.innerHTML = picks.map(item => `
    <div class="slide">
      <div class="slide-img" style="background-image:url('${item.img}')"></div>
      <div class="slide-info">
        <span class="kicker">FROM THE SHELF</span>
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <span class="price">$${item.price.toFixed(2)}</span>
        <button class="add-btn" style="width:fit-content" onclick="addToCart('${item.title.replace(/'/g, "\\'")}',${item.price})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('[data-random-slideshow="groceries"]');
  if (el) buildRandomSlideshow(el, GROCERY_SLIDE_POOL, 5);
});

/* ---------- Slideshow ---------- */
function initSlideshow() {
  const track = document.getElementById('slidesTrack');
  if (!track) return;
  const slides = track.children.length;
  let idx = 0;
  const dotsWrap = document.getElementById('slideDots');
  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  function update() {
    track.style.transform = `translateX(-${idx * 100}%)`;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  function goTo(i) { idx = (i + slides) % slides; update(); }
  document.getElementById('slidePrev').addEventListener('click', () => goTo(idx - 1));
  document.getElementById('slideNext').addEventListener('click', () => goTo(idx + 1));
  setInterval(() => goTo(idx + 1), 6000);
}
document.addEventListener('DOMContentLoaded', initSlideshow);

/* ---------- Sidebar active-link highlight on scroll ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.shop-sidebar a');
  if (!links.length) return;
  const groups = [...document.querySelectorAll('.shop-group')];
  window.addEventListener('scroll', () => {
    let current = groups[0]?.id;
    groups.forEach(g => { if (window.scrollY >= g.offsetTop - 140) current = g.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  });
});
