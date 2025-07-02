/*
 * MICHELIS, ALEJANDRO
 * Parcial 2 – Programación Web
 */

'use strict';

/* -------------------  Utilidades DOM  ------------------- */
const $ = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (typeof v === 'function' && k.startsWith('on')) node[k] = v;
    else node.setAttribute(k, v);
  }
  node.append(...children);
  return node;
}

/* -------------------  Formato de moneda ARS  ------------------- */
const formatPrice = v =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(v);

/* -------------------  Modelo ------------------- */
class Product {
  constructor(obj) { Object.assign(this, obj); }
}

class Cart {
  #items = new Map();
  constructor() { this.load(); }

  add(prod, q = 1) {
    const actual = this.#items.get(prod.id) ?? 0;
    if (actual + q > prod.stock) return;
    this.#items.set(prod.id, actual + q);
    this.save();
  }

  remove(id, q = 1) {
    const actual = this.#items.get(id);
    if (!actual) return;
    actual - q <= 0 ? this.#items.delete(id) : this.#items.set(id, actual - q);
    this.save();
  }

  clear() { this.#items.clear(); this.save(); }
  count() { return [...this.#items.values()].reduce((a, b) => a + b, 0); }

  total(list) {
    return [...this.#items.entries()].reduce((s, [id, q]) => {
      const p = list.find(x => x.id === id);
      return p ? s + p.precio * q : s;
    }, 0);
  }

  entries() { return this.#items.entries(); }

  save() {
    localStorage.setItem('cart', JSON.stringify([...this.#items]));
    updateMiniCart();
  }

  load() {
    const raw = localStorage.getItem('cart');
    if (raw) this.#items = new Map(JSON.parse(raw));
  }
}

const cart = new Cart();

/* -------------------  Carga de datos ------------------- */
let products = [];
fetch('/api/productos') // Lo cambié cuando le puse el server, antes era productos.json
  .then(r => r.json())
  .then(data => {
    products = data.map(o => new Product(o));
    fillCategoryFilter();
    renderProducts(products);
    updateMiniCart();
  });

/* -------------------  Renderizado ------------------- */
function fillCategoryFilter() {
  const sel = $('#categoryFilter');
  [...new Set(products.map(p => p.categoria))]
    .forEach(cat => sel.append(el('option', { value: cat, text: cat })));
}

function renderProducts(list) {
  const grid = $('#productGrid');
  grid.replaceChildren();
  list.forEach(p => grid.append(productCard(p)));
}

function productCard(p) {
  return el('article', { class: 'card' },
    el('img', {
      src: p.imagen,
      alt: p.nombre,
      onerror: "this.src='https://placehold.co/300x200?text=Sin+imagen';"
    }),
    el('div', { class: 'info' },
      el('h3', { text: p.nombre }),
      el('p', { text: p.descripcion }),
      el('span', { class: 'price', text: formatPrice(p.precio) }),
      el('button', {
        class: 'btn-primary',
        text: 'Agregar',
        onclick: () => openProductModal(p)
      })
    )
  );
}

/* ------------------- Modales ------------------- */
function openProductModal(p) {
  const backdrop = el('div', { class: 'modal-backdrop' });

  const modal = el('div', { class: 'modal' },
    el('button', {
      class: 'close',
      text: '✕',
      onclick: () => backdrop.remove()
    }),
    el('img', { src: p.imagen, alt: p.nombre }),
    el('h2', { text: p.nombre }),
    el('p', { text: p.descripcion }),
    el('p', { text: `Stock: ${p.stock}` }),
    el('h3', { text: formatPrice(p.precio) }),
    el('div', { class: 'actions' },
      el('button', {
        class: 'btn-primary',
        text: 'Agregar',
        onclick: () => { cart.add(p); backdrop.remove(); }
      }),
      el('button', {
        class: 'btn-secondary',
        text: 'Cerrar',
        onclick: () => backdrop.remove()
      })
    )
  );

  backdrop.appendChild(modal);
  $('#modalContainer').appendChild(backdrop);
}

$('#miniCartBtn').addEventListener('click', openCartModal);

/* ------------------- Modal Carrito ------------------- */
function openCartModal() {
  const md = el('div', { class: 'modal-backdrop' });
  const box = el('div', { class: 'modal' });

  box.append(
    el('button', { class: 'close', text: '✕', onclick: () => md.remove() }),
    el('h2', { text: 'Tu carrito' })
  );

  if (cart.count() === 0) {
    box.append(el('p', { text: 'El carrito está vacío' }));
  } else {
    const list = el('div');
    for (const [id, q] of cart.entries()) {
      const p = products.find(x => x.id === id);
      list.append(el('div', { class: 'cartItem' },
        el('img', {
          src: p.imagen,
          alt: p.nombre,
          style: 'width:50px',
          onerror: "this.src='https://placehold.co/50';"
        }),
        el('span', { text: `${p.nombre} × ${q}` }),
        el('span', { text: formatPrice(p.precio * q) }),
        el('button', {
          text: '−',
          onclick: () => { cart.remove(id); md.remove(); openCartModal(); }
        }),
        el('button', {
          text: '+',
          onclick: () => { cart.add(p); md.remove(); openCartModal(); }
        })
      ));
    }

    box.append(
      list,
      el('hr'),
      el('p', { text: `Artículos: ${cart.count()}` }),
      el('h3', { text: `Total: ${formatPrice(cart.total(products))}` }),
      el('div', { class: 'actions' },
        el('button', {
          class: 'btn-secondary',
          text: 'Vaciar',
          onclick: () => { cart.clear(); md.remove(); openCartModal(); }
        }),
        el('button', {
          class: 'btn-primary',
          text: 'Cerrar',
          onclick: () => md.remove()
        })
      )
    );
  }

  md.append(box);
  $('#modalContainer').append(md);
}

/* ------------------- Filtros ------------------- */
$('#categoryFilter').addEventListener('change', applyFilters);
$('#priceOrder').addEventListener('change', applyFilters);
$('#rangeBtn').addEventListener('click', applyFilters);

function applyFilters() {
  let list = [...products];
  const cat = $('#categoryFilter').value;
  if (cat !== 'all') list = list.filter(p => p.categoria === cat);

  const min = parseFloat($('#minPrice').value) || 0;
  const max = parseFloat($('#maxPrice').value) || Infinity;
  list = list.filter(p => p.precio >= min && p.precio <= max);

  const ord = $('#priceOrder').value;
  if (ord === 'asc') list.sort((a, b) => a.precio - b.precio);
  if (ord === 'desc') list.sort((a, b) => b.precio - a.precio);

  renderProducts(list);
}

/* ------------------- Mini-cart ------------------- */
function updateMiniCart() {
  $('#cartCount').textContent = cart.count();
  $('#cartTotal').textContent = formatPrice(cart.total(products));
}
