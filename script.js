// Classe pour les produits
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  // Classe pour les éléments du panier
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // Classe pour le panier d'achat
  class ShoppingCart {
    constructor() {
      this.items = [];
      this.totalPriceElement = document.getElementById('total-price');
      this.initializeCart();
    }
  
    initializeCart() {
      const cartItemElements = document.querySelectorAll('.cart-item');
      
      cartItemElements.forEach((cartItem, index) => {
        const productName = cartItem.querySelector('.item-name').textContent;
        const productPrice = parseFloat(cartItem.querySelector('.price').getAttribute('data-unit-price'));
        const product = new Product(index + 1, productName, productPrice);
        const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
        const cartItemObj = new ShoppingCartItem(product, quantity);
  
        this.items.push(cartItemObj);
        this.addEventListeners(cartItem, cartItemObj);
      });
  
      this.updateTotalPrice();
    }
  
    addEventListeners(cartItem, cartItemObj) {
      cartItem.querySelector('.plus-btn').addEventListener('click', () => this.updateQuantity(cartItemObj, 1, cartItem));
      cartItem.querySelector('.minus-btn').addEventListener('click', () => this.updateQuantity(cartItemObj, -1, cartItem));
      cartItem.querySelector('.delete-btn').addEventListener('click', () => this.removeItem(cartItemObj, cartItem));
      cartItem.querySelector('.like-btn').addEventListener('click', () => this.toggleLike(cartItem));
    }
  
    updateQuantity(cartItemObj, change, cartItem) {
      cartItemObj.quantity += change;
      if (cartItemObj.quantity < 1) {
        cartItemObj.quantity = 1;
      }
      cartItem.querySelector('.quantity').textContent = cartItemObj.quantity;
      this.updateItemPrice(cartItemObj, cartItem);
      this.updateTotalPrice();
    }
  
    removeItem(cartItemObj, cartItem) {
      // Retirer l'élément du tableau items
      this.items = this.items.filter(item => item !== cartItemObj);
      // Retirer l'élément du DOM
      cartItem.remove();
      // Mettre à jour le total
      this.updateTotalPrice();
    }
  
    toggleLike(cartItem) {
      cartItem.querySelector('.like-btn').classList.toggle('active');
    }
  
    updateItemPrice(cartItemObj, cartItem) {
      const itemTotal = cartItemObj.getTotalPrice();
      cartItem.querySelector('.price').textContent = itemTotal.toFixed(2);
    }
  
    updateTotalPrice() {
      const totalPrice = this.getTotalPrice();
      // Afficher 0.00 si le panier est vide
      this.totalPriceElement.textContent = this.items.length === 0 ? '0.00' : totalPrice.toFixed(2);
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  }
  
  // Exemple d'utilisation
  const cart = new ShoppingCart();  