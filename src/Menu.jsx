import { useState } from "react";
import "./Menu.css";

function Menu() {
  const [openCategory, setOpenCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const whatsappNumber = "2349011445400";

  const handleMenuClick = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmOrder = () => {
    if (!selectedItem) return;

    const message = `Hello, I'd like to order ${selectedItem.name} (${selectedItem.price}).`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setSelectedItem(null);
  };

  const handleCancelOrder = () => {
    setSelectedItem(null);
  };

  const categories = [
    {
      name: "Food",
      items: [
        { name: "Jollof Rice", price: "₦500" },
        { name: "Fried Rice", price: "₦500" },
        { name: "Coconut Rice", price: "₦700" },
        { name: "Native Rice", price: "₦700" },
        { name: "Jollof Pasta", price: "₦500" },
      ],
    },

    {
      name: "Pepper Soup & Grills",
      items: [
        { name: "Catfish Pepper Soup", price: "₦7,000 / ₦10,000" },
        { name: "Beef Pepper Soup", price: "₦5,000 / ₦7,000" },
        { name: "Chicken Pepper Soup", price: "₦5,000 / ₦7,000" },
        { name: "Grilled Chicken", price: "₦1,000 / ₦2,000 / ₦3,000" },
        { name: "Barbecue", price: "₦7,000" },
      ],
    },

    {
      name: "Swallow & Soups",
      items: [
        { name: "Semo", price: "₦2,700" },
        { name: "Pounded Yam", price: "₦2,700" },
        { name: "Eba", price: "₦2,700" },
        { name: "Amala", price: "₦2,700" },
        { name: "Egusi Soup", price: "₦6,000 / litre" },
      ],
    },

    {
      name: "Shawarma & Fast Food",
      items: [
        { name: "Double Sausage Shawarma", price: "₦3,000" },
        { name: "Single Sausage Shawarma", price: "₦2,800" },
        { name: "Shawarma + Extra Beef", price: "₦3,500" },
        { name: "Shawarma + Grilled Chicken", price: "₦3,500" },
        { name: "Burger", price: "₦3,500 / ₦5,000" },
      ],
    },

    {
      name: "Pastries & Snacks",
      items: [
        { name: "Meat Pie", price: "₦1,000" },
        { name: "Chicken Pie", price: "₦1,200" },
        { name: "Egg Roll", price: "₦700" },
        { name: "Sausage Roll", price: "₦700" },
        { name: "Croissant", price: "₦700" },
      ],
    },

    {
      name: "Cakes & Desserts",
      items: [
        { name: "Fruit Cake", price: "₦1,500" },
        { name: "Red Velvet Cake", price: "₦1,500" },
        { name: "Chocolate Cake", price: "₦1,500" },
        { name: "Celebration Cake", price: "₦10,000" },
        { name: "Ice Cream", price: "₦500+" },
      ],
    },

    {
      name: "Restaurant Drinks",
      items: [
        { name: "Water", price: "₦300" },
        { name: "Pet Coke", price: "₦600" },
        { name: "Pet Fanta", price: "₦600" },
        { name: "Zobo", price: "₦500 / ₦1,000" },
        { name: "Pure Heaven", price: "₦2,500" },
      ],
    },

    {
      name: "Lounge Drinks",
      items: [
        { name: "Energy Drinks", price: "See Full Menu" },
        { name: "Soft Drinks & Water", price: "See Full Menu" },
        { name: "Juices & Mixers", price: "See Full Menu" },
      ],
    },

    {
      name: "Pizza",
      items: [
        { name: "Small Pizza", price: "₦4,000" },
        { name: "Medium Pizza", price: "₦6,000" },
        { name: "Large Pizza", price: "₦10,000" },
      ],
    },
  ];

  const toggleCategory = (index) => {
    setOpenCategory(
      openCategory === index ? null : index
    );
  };

  return (
    <section id="menu" className="menu-preview">

      <div className="menu-header">
        <span className="menu-label">
          Discover
        </span>

        <h2>Our Menu</h2>

        <p>
          Explore some of our favourite meals, freshly
          prepared with quality ingredients and served
          with great taste.
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
                  <button
                    type="button"
                    className="menu-item"
                    key={item.name}
                    onClick={() => handleMenuClick(item)}
                  >
                    <h4>{item.name}</h4>

                    <span className="menu-price">
                      {item.price}
                    </span>
                  </button>
                ))}

              </div>
            </div>

          </div>
        ))}

      </div>

      <div className="menu-button-wrapper">
        <a
          href="/menu"
          className="menu-button"
        >
          View Full Menu
        </a>
      </div>


      {/* ORDER CONFIRMATION MODAL */}

      {selectedItem && (
        <div
          className="order-modal-overlay"
          onClick={handleCancelOrder}
        >
          <div
            className="order-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="order-modal-close"
              onClick={handleCancelOrder}
              aria-label="Close"
            >
              ×
            </button>

            <span className="order-modal-icon">
              🛍
            </span>

            <h3>
              Continue with order?
            </h3>

            <p>
              You selected:
            </p>

            <div className="selected-order">
              <strong>
                {selectedItem.name}
              </strong>

              <span>
                {selectedItem.price}
              </span>
            </div>

            <p className="order-modal-note">
              Continue to WhatsApp to place your order.
            </p>

            <div className="order-modal-actions">

              <button
                type="button"
                className="order-cancel"
                onClick={handleCancelOrder}
              >
                Cancel
              </button>

              <button
                type="button"
                className="order-confirm"
                onClick={handleConfirmOrder}
              >
                Yes, Continue
              </button>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

export default Menu;
