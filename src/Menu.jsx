import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./Add.css";
import "./Menu.css";

const localImages = import.meta.glob("./assets/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const imageFiles = Object.keys(localImages).reduce((result, path) => {
  const filename = path.split("/").pop().toLowerCase();
  const extension = filename.split(".").pop();

  if (["jpg", "jpeg", "png", "webp", "avif"].includes(extension)) {
    result[filename] = localImages[path];
  }

  return result;
}, {});

const getLocalImage = (imagePath) => {
  const filename = imagePath.split("/").pop().toLowerCase();
  return imageFiles[filename] || "";
};

const CART_STORAGE_KEY = "theMixCart";
const WHATSAPP_NUMBER = "2349011445400";

function Menu() {
  const [openCategory, setOpenCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const categories = [
    {
      name: "Food",
      items: [
        { name: "Jollof Rice", price: 500, image: "/assets/jollof-rice.jpg" },
        { name: "Fried Rice", price: 500, image: "/assets/fried-rice.jpg" },
        { name: "Coconut Rice", price: 700, image: "/assets/coconut-rice.jpg" },
        { name: "Native Rice", price: 700, image: "/assets/white-rice.jpg" },
        { name: "Jollof Pasta", price: 500, image: "/assets/jollof-pasta.jpg" },
      ],
    },
    {
      name: "Pepper Soup & Grills",
      items: [
        { name: "Catfish Pepper Soup", price: 7000, image: "/assets/catfish-pepper-soup.jpg" },
        { name: "Beef Pepper Soup", price: 5000, image: "/assets/beef-pepper-soup.jpg" },
        { name: "Chicken Pepper Soup", price: 5000, image: "/assets/chicken-pepper-soup.jpg" },
        { name: "Grilled Chicken", price: 1000, image: "/assets/grilled-chicken.jpg" },
        { name: "Barbecue", price: 7000, image: "/assets/barbecue.jpg" },
      ],
    },
    {
      name: "Swallow & Soups",
      items: [
        { name: "Semo", price: 2700, image: "/assets/swallow.jpg" },
        { name: "Pounded Yam", price: 2700, image: "/assets/swallow.jpg" },
        { name: "Eba", price: 2700, image: "/assets/eba.jpg" },
        { name: "Amala", price: 2700, image: "/assets/swallow-fish.jpg" },
        { name: "Egusi Soup", price: 6000, image: "/assets/egusi-soup.jpg" },
      ],
    },
    {
      name: "Shawarma & Fast Food",
      items: [
        { name: "Double Sausage Shawarma", price: 3000, image: "/assets/shawarma.jpg" },
        { name: "Single Sausage Shawarma", price: 2800, image: "/assets/shawarma.jpg" },
        { name: "Shawarma + Extra Beef", price: 3500, image: "/assets/shawarma.jpg" },
        { name: "Shawarma + Grilled Chicken", price: 3500, image: "/assets/shawarma.jpg" },
        { name: "Burger", price: 3500, image: "/assets/burger.jpg" },
      ],
    },
    {
      name: "Pastries & Snacks",
      items: [
        { name: "Meat Pie", price: 1000, image: "/assets/meat-pie.jpg" },
        { name: "Chicken Pie", price: 1200, image: "/assets/chicken-pie.jpg" },
        { name: "Egg Roll", price: 700, image: "/assets/egg-roll.jpg" },
        { name: "Sausage Roll", price: 700, image: "/assets/frank-roll.jpg" },
        { name: "Croissant", price: 700, image: "/assets/croissant.jpg" },
      ],
    },
    {
      name: "Cakes & Desserts",
      items: [
        { name: "Fruit Cake", price: 1500, image: "/assets/fruit-cake.jpg" },
        { name: "Red Velvet Cake", price: 1500, image: "/assets/red-velvet-cake.jpg" },
        { name: "Chocolate Cake", price: 1500, image: "/assets/chocolate-cake.jpg" },
        { name: "Celebration Cake", price: 10000, image: "/assets/celebration-cake.jpg" },
        { name: "Ice Cream", price: 500, image: "/assets/ice-cream.jpg" },
      ],
    },
    {
      name: "Restaurant Drinks",
      items: [
        { name: "Water", price: 300, image: "/assets/water.jpg" },
        { name: "Pet Coke", price: 600, image: "/assets/coke.jpg" },
        { name: "Pet Fanta", price: 600, image: "/assets/fanta.jpg" },
        { name: "Zobo", price: 500, image: "/assets/zobo.jpg" },
        { name: "Pure Heaven", price: 2500, image: "/assets/pure-heaven.jpg" },
      ],
    },
    {
      name: "Lounge Drinks",
      items: [
        { name: "Energy Drinks", price: 0, unavailablePrice: true, image: "/assets/fearless.jpg" },
        { name: "Soft Drinks & Water", price: 0, unavailablePrice: true, image: "/assets/water.jpg" },
        { name: "Juices & Mixers", price: 0, unavailablePrice: true, image: "/assets/pulpy.jpg" },
      ],
    },
    {
      name: "Pizza",
      items: [
        { name: "Small Pizza", price: 4000, image: "/assets/pizza.jpg" },
        { name: "Medium Pizza", price: 6000, image: "/assets/pizza.jpg" },
        { name: "Large Pizza", price: 10000, image: "/assets/pizza.jpg" },
      ],
    },
  ];

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (!savedCart) return [];

      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Could not load cart:", error);
      return [];
    }
  });

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    orderType: "Pickup",
    address: "",
    notes: "",
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart]);

  useEffect(() => {
    const drawerIsOpen = showCart || showCheckout;

    document.body.style.overflow = drawerIsOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart, showCheckout]);

  useEffect(() => {
    const handleToggleCart = () => {
      setShowCheckout(false);
      setShowCart((current) => !current);
    };

    window.addEventListener("toggleCart", handleToggleCart);

    return () => {
      window.removeEventListener("toggleCart", handleToggleCart);
    };
  }, []);

  const toggleCategory = (index) => {
    setOpenCategory((current) =>
      current === index ? null : index
    );
  };

  const formatPrice = (price) =>
    `₦${price.toLocaleString("en-NG")}`;

  const addToCart = (item) => {
    if (item.unavailablePrice) return;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.name === item.name
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.name === item.name
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...currentCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });

    setShowCart(true);
    setShowCheckout(false);
  };

  const increaseQuantity = (itemName) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === itemName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemName) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemName) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.name !== itemName)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setShowCart(false);
    setShowCheckout(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!customer.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!customer.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (
      customer.orderType === "Delivery" &&
      !customer.address.trim()
    ) {
      alert("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    let orderMessage =
      "Hello, I'd like to place an order.\n\n";

    orderMessage += "ORDER DETAILS\n";
    orderMessage += "----------------------\n";

    cart.forEach((item) => {
      orderMessage +=
        `${item.name} x ${item.quantity} - ${formatPrice(
          item.price * item.quantity
        )}\n`;
    });

    orderMessage +=
      `\nTOTAL: ${formatPrice(cartTotal)}\n\n`;

    orderMessage += "CUSTOMER DETAILS\n";
    orderMessage += "----------------------\n";
    orderMessage += `Name: ${customer.name}\n`;
    orderMessage += `Phone: ${customer.phone}\n`;
    orderMessage += `Order Type: ${customer.orderType}\n`;

    if (customer.orderType === "Delivery") {
      orderMessage += `Address: ${customer.address}\n`;
    }

    if (customer.notes.trim()) {
      orderMessage += `Notes: ${customer.notes}\n`;
    }

    orderMessage +=
      "\nI'd like to proceed with payment.";

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        orderMessage
      )}`;

    window.open(whatsappUrl, "_blank");

    setShowCheckout(false);
  };

  const cartDrawer =
    showCart &&
    createPortal(
      <div
        className="shopping-overlay"
        onClick={() => setShowCart(false)}
      >
        <aside
          className="shopping-panel"
          onClick={(e) => e.stopPropagation()}
          aria-label="Shopping cart"
        >
          <div className="shopping-header">
            <div>
              <span>Your Order</span>
              <h3>Shopping Cart</h3>
            </div>

            <button
              type="button"
              className="shopping-close"
              onClick={() => setShowCart(false)}
              aria-label="Close shopping cart"
            >
              ×
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <span>🛒</span>
              <h3>Your cart is empty</h3>
              <p>Add something delicious from our menu.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.name}>
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <span>{formatPrice(item.price)} each</span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.name)}
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>

                        <strong>{item.quantity}</strong>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.name)}
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <strong className="cart-item-total">
                        {formatPrice(item.price * item.quantity)}
                      </strong>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => removeFromCart(item.name)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div>
                  <span>Items</span>
                  <strong>{cartCount}</strong>
                </div>

                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>

                <p>
                  Payment will be completed through WhatsApp.
                </p>

                <button
                  type="button"
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>

                <button
                  type="button"
                  className="clear-cart-button"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </aside>
      </div>,
      document.body
    );

  const checkoutDrawer =
    showCheckout &&
    createPortal(
      <div
        className="shopping-overlay"
        onClick={() => setShowCheckout(false)}
      >
        <aside
          className="checkout-panel"
          onClick={(e) => e.stopPropagation()}
          aria-label="Checkout"
        >
          <div className="shopping-header">
            <div>
              <span>Almost There</span>
              <h3>Checkout</h3>
            </div>

            <button
              type="button"
              className="shopping-close"
              onClick={() => setShowCheckout(false)}
              aria-label="Close checkout"
            >
              ×
            </button>
          </div>

          <form
            className="checkout-form"
            onSubmit={handlePlaceOrder}
          >
            <div className="checkout-section">
              <h4>Customer Information</h4>

              <label>
                Full Name
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleCustomerChange}
                  placeholder="Enter your name"
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleCustomerChange}
                  placeholder="Enter your phone number"
                  required
                />
              </label>
            </div>

            <div className="checkout-section">
              <h4>Order Type</h4>

              <div className="order-type-options">
                <label
                  className={
                    customer.orderType === "Pickup"
                      ? "selected"
                      : ""
                  }
                >
                  <input
                    type="radio"
                    name="orderType"
                    value="Pickup"
                    checked={customer.orderType === "Pickup"}
                    onChange={handleCustomerChange}
                  />
                  <span>Pickup</span>
                </label>

                <label
                  className={
                    customer.orderType === "Delivery"
                      ? "selected"
                      : ""
                  }
                >
                  <input
                    type="radio"
                    name="orderType"
                    value="Delivery"
                    checked={customer.orderType === "Delivery"}
                    onChange={handleCustomerChange}
                  />
                  <span>Delivery</span>
                </label>
              </div>
            </div>

            {customer.orderType === "Delivery" && (
              <div className="checkout-section">
                <label>
                  Delivery Address
                  <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleCustomerChange}
                    placeholder="Enter your delivery address"
                    rows="3"
                    required
                  />
                </label>
              </div>
            )}

            <div className="checkout-section">
              <label>
                Order Notes
                <span className="optional">Optional</span>

                <textarea
                  name="notes"
                  value={customer.notes}
                  onChange={handleCustomerChange}
                  placeholder="Any special instructions?"
                  rows="3"
                />
              </label>
            </div>

            <div className="checkout-total">
              <span>Order Total</span>
              <strong>{formatPrice(cartTotal)}</strong>
            </div>

            <p className="payment-note">
              You will be redirected to WhatsApp to confirm your
              order and arrange payment.
            </p>

            <button
              type="submit"
              className="place-order-button"
            >
              Proceed to Payment <span>→</span>
            </button>
          </form>
        </aside>
      </div>,
      document.body
    );

  return (
    <>
      <section id="menu" className="menu-preview">
        <div className="menu-header">
          <span className="menu-label">Discover</span>

          <h2>Our Menu</h2>

          <p>
            Explore some of our favourite meals, freshly prepared
            with quality ingredients and served with great taste.
          </p>
        </div>

        <div className="menu-categories">
          {categories.map((category, index) => (
            <div
              className={`menu-category ${
                openCategory === index ? "open" : ""
              }`}
              key={category.name}
            >
              <button
                type="button"
                className="category-header"
                onClick={() => toggleCategory(index)}
                aria-expanded={openCategory === index}
              >
                <span className="category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{category.name}</h3>

                <span className="category-icon">
                  {openCategory === index ? "−" : "+"}
                </span>
              </button>

              <div className="category-dropdown">
                <div className="category-items">
                  {category.items.map((item) => (
                    <div className="menu-item" key={item.name}>
                      <img
                        className="menu-item-image"
                        src={getLocalImage(item.image)}
                        alt={item.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

                      <div className="menu-item-details">
                        <h4>{item.name}</h4>

                        <span className="menu-price">
                          {item.unavailablePrice
                            ? "See Full Menu"
                            : formatPrice(item.price)}
                        </span>
                      </div>

                      {!item.unavailablePrice && (
                        <button
                          type="button"
                          className="add-to-cart-button"
                          onClick={() => addToCart(item)}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="menu-button-wrapper">
          <a href="/menu" className="menu-button">
            View Full Menu
          </a>
        </div>
      </section>

      {cartDrawer}
      {checkoutDrawer}
    </>
  );
}

export default Menu;
