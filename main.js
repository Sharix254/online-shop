// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    brand: "Chanel",
    name: "Coco Mademoiselle",
    desc: "Цэцэгтэй, тунгалаг анхны үнэр. Зоригтой, орчин үеийн эмэгтэйд зориулсан.",
    price: 180000,
    original: 220000,
    badge: "Хит",
    colors: { neck: "#B8860B", body: "#D4AF37", bodyText: "#5C4500", base: "#A0760A" },
    tag: "Эмэгтэй"
  },
  {
    id: 2,
    brand: "Dior",
    name: "Sauvage",
    desc: "Давирхай, амберт үнэр. Эрчүүлэг, байгалийн бүтээгдэхүүн.",
    price: 195000,
    original: null,
    badge: "Шинэ",
    colors: { neck: "#2C4A7C", body: "#1A3A6B", bodyText: "#C4D4F0", base: "#122A55" },
    tag: "Эрэгтэй"
  },
  {
    id: 3,
    brand: "Yves Saint Laurent",
    name: "Black Opium",
    desc: "Кофе, ваниль, цагаан цэцгийн зохицол. Орой болон шөнийн хэрэглэлд тохиромжтой.",
    price: 165000,
    original: 200000,
    badge: "Хямдарсан",
    colors: { neck: "#2D1A1A", body: "#4A0A0A", bodyText: "#F5C0C0", base: "#1A0A0A" },
    tag: "Эмэгтэй"
  },
  {
    id: 4,
    brand: "Versace",
    name: "Eros",
    desc: "Нана, лимон, ваниль. Тод, гялалзсан, эрэгтэй дүрийг тодотгосон үнэр.",
    price: 145000,
    original: 175000,
    badge: null,
    colors: { neck: "#1A4A3A", body: "#0D6B4A", bodyText: "#A0FFD8", base: "#0A3D2A" },
    tag: "Эрэгтэй"
  },
  {
    id: 5,
    brand: "Lancôme",
    name: "La Vie Est Belle",
    desc: "Ирисийн үндэс, жодоо, ваниль. Аз жаргалын тухай чиглэлийн ил тод үнэр.",
    price: 170000,
    original: null,
    badge: "Шилдэг",
    colors: { neck: "#9B2A6B", body: "#C43B8A", bodyText: "#FFD4EE", base: "#7A1F54" },
    tag: "Эмэгтэй"
  },
  {
    id: 6,
    brand: "Tom Ford",
    name: "Oud Wood",
    desc: "Ховор модны утаа, зандан, кардамон. Тансаг, давтагдашгүй үнэр.",
    price: 285000,
    original: 340000,
    badge: "Тансаг",
    colors: { neck: "#5C3A1E", body: "#8B5A2B", bodyText: "#FFE4B0", base: "#3E2010" },
    tag: "Унисекс"
  }
];

let cart = [];

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map(p => `
    <div class="product-card" onclick="addToCart(${p.id})">
      <div class="product-img" style="background: linear-gradient(135deg, ${p.colors.body}22, ${p.colors.neck}33)">
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        <div class="prod-bottle">
          <div class="prod-bottle-neck" style="background: ${p.colors.neck}; width:20px;"></div>
          <div class="prod-bottle-body" style="background: linear-gradient(135deg, ${p.colors.neck}, ${p.colors.body}); color: ${p.colors.bodyText}">
            <span style="font-family: 'Cormorant Garamond', serif; font-size: 0.6rem; letter-spacing: 0.06em; position: relative; z-index:2;">${p.brand.split(' ')[0]}</span>
          </div>
          <div class="prod-bottle-base" style="background: ${p.colors.base};"></div>
        </div>
      </div>
      <div class="product-info">
        <div class="product-brand">${p.brand} · ${p.tag}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">
            ${p.original ? `<span class="original">₮${p.original.toLocaleString()}</span>` : ''}
            ₮${p.price.toLocaleString()}
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== CART =====
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
  showToast(`"${product.name}" сагсанд нэмэгдлээ ✦`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCart();
}

function updateCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const countEl = document.getElementById('cartCount');
  countEl.textContent = count;
  if (count > 0) {
    countEl.classList.add('visible');
  } else {
    countEl.classList.remove('visible');
  }

  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Сагс хоосон байна</p>';
    footerEl.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartTotal').textContent = `₮${total.toLocaleString()}`;

  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-swatch" style="background: linear-gradient(135deg, ${item.colors.neck}, ${item.colors.body})"></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} ${item.qty > 1 ? `×${item.qty}` : ''}</div>
        <div class="cart-item-price">₮${(item.price * item.qty).toLocaleString()}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `).join('');
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

function checkout() {
  showToast('Захиалга баталгаажлаа! Удахгүй холбогдоно ✦');
  cart = [];
  updateCart();
  toggleCart();
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ===== FORM =====
function submitForm(e) {
  e.preventDefault();
  showToast('Мессеж илгээгдлээ! Удахгүй холбогдоно ✦');
  e.target.reset();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeUp 0.7s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .testi-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initScrollAnimations();
});
