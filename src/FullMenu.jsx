
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./FullMenu.css";

const CART_STORAGE_KEY = "theMixCart";
const WHATSAPP_NUMBER = "2349011445400";

const menuCategories = [
  {
    id: "food",
    title: "Food Menu",
    subtitle: "Traditional favourites & everyday meals",
    emoji: "🍛",
    images: [
      "photo-1512621776951-a57141f2eefd",
      "photo-1546069901-ba9599a7e63c",
      "photo-1512058564366-18510be2db19",
      "photo-1516684732162-798a0062be99",
    ],
    items: [
      ["Jollof Rice", "₦500"],
      ["Fried Rice", "₦500"],
      ["Rice & Beans", "₦400"],
      ["Ewa", "₦400"],
      ["White Rice", "₦400"],
      ["Coconut Rice", "₦700"],
      ["Native Rice", "₦700"],
      ["Suya Rice", "₦700"],
      ["Jollof Pasta", "₦500"],
      ["Stir Fry Pasta", "₦500"],
      ["Plantain with Egg Sauce", "₦2,800"],
      ["Yamarita with Egg Sauce", "₦2,800"],
      ["Noodles with Egg Sauce", "₦2,800"],
      ["Plantain", "₦400"],
      ["Beef", "₦700"],
      ["Fish", "₦1,200"],
      ["Chicken", "₦1,000"],
      ["Chicken", "₦2,000"],
      ["Chicken", "₦3,000"],
      ["Turkey", "₦3,500"],
      ["Turkey", "₦4,000"],
      ["Turkey", "₦4,500"],
      ["Turkey", "₦6,000"],
      ["Ponmo", "₦500"],
      ["Moinmoin", "₦500"],
      ["Salad", "₦700"],
      ["Gizzard", "₦1,500"],
      ["Asun", "₦700"],
      ["Pepper Meat", "₦3,500"],
      ["Barbecue", "₦7,000"],
      ["Grilled Chicken", "₦1,000 / ₦2,000 / ₦3,000"],
    ],
  },
  {
    id: "pepper-soup",
    title: "Pepper Soup",
    subtitle: "Rich, spicy & freshly prepared",
    emoji: "🌶️",
    images: [
      "photo-1547592180-85f173990554",
      "photo-1547592166-23ac45744acd",
    ],
    items: [
      ["Catfish Pepper Soup", "₦7,000 / ₦10,000"],
      ["Beef Pepper Soup", "₦5,000 / ₦7,000"],
      ["Chicken Pepper Soup", "₦5,000 / ₦70,000"],
      ["Turkey Pepper Soup", "₦5,300 / ₦10,000"],
      ["Goat Meat Pepper Soup", "₦5,300 / ₦8,000"],
    ],
  },
  {
    id: "swallow",
    title: "Swallow Menu",
    subtitle: "Classic Nigerian swallow combinations",
    emoji: "🥣",
    images: [
      "photo-1547592180-85f173990554",
      "photo-1547592166-23ac45744acd",
    ],
    items: [
      ["Swallow", "Semo / Pando / Eba / Amala"],
      ["Soup", "Egusi / Vegetable / Egusi & Okra"],
      ["A Plate of Swallow with Beef", "₦2,700"],
      ["A Plate of Swallow with Fish", "₦3,000"],
      ["A Plate of Swallow with Chicken", "₦4,000"],
      ["A Plate of Swallow with Turkey", "₦5,500 / ₦6,000"],
      ["1 Litre of Vegetable / Egusi Soup", "₦6,000"],
      ["1 Litre of Okro Soup", "₦10,000"],
    ],
  },
  {
    id: "shawarma",
    title: "Shawarma Menu",
    subtitle: "Freshly prepared & generously filled",
    emoji: "🌯",
    images: [
      "photo-1529006557810-274b9b2fc783",
      "photo-1565299624946-b28f40a0ae38",
    ],
    items: [
      ["Double Sausage", "₦3,000"],
      ["Single Sausage", "₦2,800"],
      ["No Sausage", "₦2,600"],
      ["Double Sausage with Extra Beef", "₦3,500"],
      ["No Sausage with Extra Beef", "₦3,100"],
      ["Shawarma with Grilled Chicken", "₦3,500"],
    ],
  },
  {
    id: "bread",
    title: "Bread Menu",
    subtitle: "Freshly baked favourites",
    emoji: "🍞",
    images: [
      "photo-1509440159596-0249088772ff",
      "photo-1549931319-a545dcf3bc73",
    ],
    items: [
      ["Butter Bread", "₦1,000"],
      ["Butter Bread — Small Size", "₦600"],
      ["Fruit Bread", "₦1,200"],
      ["Chocolate Bread", "₦1,000"],
      ["Chocolate Bread", "₦1,500"],
      ["Sandine Bread", "₦1,000"],
      ["Sardine Bread", "₦1,500"],
      ["Banana Bread", "₦2,000"],
      ["Coconut Bread", "₦1,000"],
      ["Coconut Bread", "₦1,500"],
      ["Burger", "₦3,500 / ₦5,000"],
    ],
  },
  {
    id: "snacks",
    title: "Snacks Menu",
    subtitle: "Perfect for a quick bite",
    emoji: "🥐",
    images: [
      "photo-1509440159596-0249088772ff",
      "photo-1555507036-ab1f4038808a",
      "photo-1555507036-ab1f4038808a",
    ],
    items: [
      ["Egg Roll", "₦700"],
      ["Doughnut", "₦600"],
      ["Jam Doughnut", "₦700"],
      ["Milky Doughnut", "₦1,000"],
      ["Frank Roll", "₦700"],
      ["Sausage Roll", "₦700"],
      ["Meat Pie", "₦1,000"],
      ["Chicken Pie", "₦1,200"],
      ["Egg Burger", "₦1,000"],
      ["Croissant", "₦700"],
      ["Cookies", "₦1,500"],
      ["Cookies", "₦2,000"],
      ["Honey Roll", "₦700"],
      ["Pancake", "₦700"],
      ["Chinchin", "₦500"],
      ["Popcorn", "₦500"],
    ],
  },
  {
    id: "cake",
    title: "Cake Menu",
    subtitle: "Sweet treats for every occasion",
    emoji: "🍰",
    images: [
      "photo-1578985545062-69928b1d9587",
      "photo-1578985545062-69928b1d9587",
    ],
    items: [
      ["Fruit Cake", "₦1,500"],
      ["Banana Cake", "₦1,500"],
      ["Coconut Cake", "₦1,500"],
      ["Foil Cake", "₦1,500"],
      ["Red Velvet Cake", "₦1,500"],
      ["Chocolate Cake", "₦1,500"],
      ["Celebration Cake", "₦10,000"],
    ],
  },
  {
    id: "ice-cream",
    title: "Ice Cream Menu",
    subtitle: "Cool, creamy & delicious",
    emoji: "🍦",
    images: [
      "photo-1563805042-7684c019e1cb",
      "photo-1497034825429-c343d7c6a68f",
    ],
    items: [
      ["Sachet Ice Cream", "₦500"],
      ["120ml", "₦750"],
      ["250ml", "₦1,500"],
      ["450ml", "₦3,500"],
      ["900ml", "₦4,700"],
      ["Go Slo", "₦5,500"],
      ["Vanilla / Strawberry Fantasy", "₦1,800"],
      ["Chocolate Fantasy", "₦2,000"],
      ["Frosty Byte 150ml", "₦1,000"],
      ["Frosty Byte 250ml", "₦1,800"],
      ["Frosty Byte 550ml", "₦3,500"],
    ],
  },
  {
    id: "pizza",
    title: "Pizza Menu",
    subtitle: "Freshly baked & made to order",
    emoji: "🍕",
    images: [
      "photo-1513104890138-7c749659a591",
      "photo-1571407970349-bc81e7e96d47",
    ],
    items: [
      ["Small Pizza", "₦4,000"],
      ["Medium Pizza", "₦6,000"],
      ["Large Pizza", "₦10,000"],
    ],
  },
  {
    id: "restaurant-drinks",
    title: "Restaurant Drinks",
    subtitle: "Refreshing drinks & beverages",
    emoji: "🥤",
    images: [
      "photo-1544145945-f90425340c7e",
      "photo-1513558161293-cdaf765edfd7",
    ],
    items: [
      ["Big Hollandia Yoghourt", "₦2,500"],
      ["Big Exotic", "₦2,500"],
      ["Big Active", "₦2,500"],
      ["Small Active", "₦1,200"],
      ["Small Hollandia", "₦1,200"],
      ["Small Exotic", "₦1,200"],
      ["Pet Coke", "₦600"],
      ["Pet Fanta", "₦600"],
      ["Can Coke", "₦800"],
      ["Can Fanta", "₦800"],
      ["Monster", "₦2,000"],
      ["Pulpy", "₦2,000"],
      ["Berry Blast", "₦2,000"],
      ["Pure Heaven", "₦2,500"],
      ["Vita Milk", "₦3,000"],
      ["Water", "₦300"],
      ["Can Malt", "₦1,000"],
      ["Fayrouz", "₦1,000"],
      ["Climax", "₦1,000"],
      ["Predator", "₦700"],
      ["Fearless", "₦700"],
      ["Viju Wheat", "₦1,500"],
      ["Viju Chocolate", "₦1,500"],
      ["Viju Milk", "₦800"],
      ["Nutri Milk", "₦800"],
      ["Zobo", "₦500"],
      ["Zobo", "₦1,000"],
      ["Smoove", "₦600"],
      ["Sprite", "₦600"],
    ],
  },
];

/* =========================================
   HELPERS
========================================= */

function getPrices(priceText) {
  if (!priceText) return [];

  const matches = priceText.match(/₦\s*[\d,]+/g);

  if (!matches) return [];

  return matches.map((value) =>
    Number(value.replace(/[₦,\s]/g, ""))
  );
}

function formatPrice(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

function getItemImage(category, index) {
  const photo = category.images[index % category.images.length];

  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=480&q=80`;
}

/* =========================================
   COMPONENT
========================================= */

function FullMenu() {
  const [search, setSearch] = useState("");

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (!savedCart) return [];

      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  });

  const [priceSelector, setPriceSelector] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch {
      // Ignore storage errors.
    }
  }, [cart]);

  const addToCart = (name, price) => {
    const numericPrice = Number(price);
    if (!numericPrice || numericPrice <= 0) return;

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.name === name && item.price === numericPrice
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.name === name && item.price === numericPrice
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: `${name}-${numericPrice}-${Date.now()}`,
          name,
          displayPrice: formatPrice(numericPrice),
          price: numericPrice,
          quantity: 1,
        },
      ];
    });
  };

  const handlePriceSelection = (price) => {
    if (!priceSelector) return;

    addToCart(priceSelector.name, price);
    setPriceSelector(null);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return menuCategories;

    return menuCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(([name, price]) =>
          `${name} ${price}`.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [search]);

  const orderViaWhatsApp = () => {
    if (cart.length === 0) return;

    const orderLines = cart
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ${formatPrice(
            item.price * item.quantity
          )}`
      )
      .join("\n");

    const message = `
Hello The Mix, I would like to place an order.

${orderLines}

Estimated Total: ${formatPrice(cartTotal)}

Please confirm my order and final price.

Thank you.
    `.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="full-menu-page">
      <section className="full-menu-hero">
        <div className="full-menu-hero-content">
          <Link to="/" className="menu-back">
            ← Back to Home
          </Link>

          <span className="full-menu-label">THE MIX</span>

          <h1>
            Our <span>Menu</span>
          </h1>

          <p>
            Delicious meals, freshly prepared favourites,
            sweet treats and refreshing drinks.
          </p>
        </div>
      </section>

      <section className="full-menu-content">
        <div className="menu-search-wrapper">
          <div className="menu-search">
            <span className="search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search our menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search menu"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="full-menu-cart-bar">
          <div className="cart-bar-left">
            <span className="full-menu-cart-icon">🛒</span>

            <div>
              <strong>Your Cart</strong>
              <small>
                {cartCount} {cartCount === 1 ? "item" : "items"}
              </small>
            </div>
          </div>

          <div className="full-menu-cart-summary">
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
        </div>

        {!search && (
          <nav className="menu-category-nav" aria-label="Menu categories">
            {menuCategories.map((category) => (
              <a href={`#${category.id}`} key={category.id}>
                <span>{category.emoji}</span>
                {category.title}
              </a>
            ))}
          </nav>
        )}

        <div className="full-menu-list">
          {filteredCategories.length === 0 ? (
            <div className="menu-no-results">
              <span>🔎</span>
              <h2>No menu items found</h2>
              <p>Try searching for another meal or drink.</p>
            </div>
          ) : (
            filteredCategories.map((category, index) => (
              <section
                className="full-menu-category"
                id={category.id}
                key={category.id}
              >
                <div className="category-heading">
                  <div className="category-icon">{category.emoji}</div>

                  <div className="category-title">
                    <span>{String(index + 1).padStart(2, "0")}</span>

                    <div>
                      <p>{category.subtitle}</p>
                      <h2>{category.title}</h2>
                    </div>
                  </div>
                </div>

                <div className="menu-list">
                  {category.items.map(([name, price], itemIndex) => {
                    const prices = getPrices(price);
                    const isOrderable = prices.length > 0;
                    const hasMultiplePrices = prices.length > 1;
                    const image = getItemImage(category, itemIndex);

                    return (
                      <article
                        className="full-menu-item"
                        key={`${category.id}-${name}-${price}-${itemIndex}`}
                      >
                        <img
                          className="full-menu-item-image"
                          src={image}
                          alt={name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.visibility = "hidden";
                          }}
                        />

                        <div className="full-menu-item-name">
                          <h3>{name}</h3>
                        </div>

                        <div className="menu-dots" aria-hidden="true" />

                        <div className="full-menu-price">{price}</div>

                        {isOrderable ? (
                          <button
                            type="button"
                            className="full-menu-add-btn"
                            onClick={() => {
                              if (hasMultiplePrices) {
                                setPriceSelector({ name, prices });
                              } else {
                                addToCart(name, prices[0]);
                              }
                            }}
                          >
                            {hasMultiplePrices ? "Select" : "Add"}
                          </button>
                        ) : (
                          <span className="full-menu-info">
                            See options
                          </span>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>

        <section className="full-menu-cart">
          <div className="cart-section-header">
            <div>
              <span className="cart-section-label">YOUR ORDER</span>
              <h2>Shopping Cart</h2>
            </div>

            <span className="cart-item-count">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add something delicious from the menu above.</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <span>{item.displayPrice} each</span>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>

                      <strong>
                        {formatPrice(item.price * item.quantity)}
                      </strong>

                      <button
                        type="button"
                        className="remove-cart-item"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-bottom">
                <div className="cart-total-row">
                  <span>Estimated Total</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>

                <button
                  type="button"
                  className="whatsapp-order-btn"
                  onClick={orderViaWhatsApp}
                >
                  Order via WhatsApp <span>→</span>
                </button>
              </div>
            </>
          )}
        </section>

        <div className="full-menu-cta">
          <span>THE MIX</span>
          <h2>Hungry already?</h2>
          <p>
            Choose your favourites and send your order directly to us.
          </p>
          <a href="#food" className="full-menu-cta-btn">
            Start Ordering
          </a>
        </div>
      </section>

      {priceSelector && (
        <div
          className="price-selector-overlay"
          onClick={() => setPriceSelector(null)}
        >
          <div
            className="price-selector-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="price-selector-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="price-selector-close"
              onClick={() => setPriceSelector(null)}
              aria-label="Close price selector"
            >
              ×
            </button>

            <span className="price-selector-label">SELECT OPTION</span>

            <h2 id="price-selector-title">{priceSelector.name}</h2>

            <p>Choose the price option you want to add to your cart.</p>

            <div className="price-selector-options">
              {priceSelector.prices.map((price, index) => (
                <button
                  type="button"
                  className="price-option"
                  key={`${price}-${index}`}
                  onClick={() => handlePriceSelection(price)}
                >
                  <span>{formatPrice(price)}</span>
                  <span className="price-option-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default FullMenu;

