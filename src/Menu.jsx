import { useState } from "react";
import "./Menu.css";

function Menu() {
  const [openCategory, setOpenCategory] = useState(null);

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

    /* ================================
       RESTAURANT DRINKS
    ================================= */

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

    /* ================================
       LOUNGE DRINKS
    ================================= */

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

      {/* ================================
          MENU HEADER
      ================================= */}

      <div className="menu-header">
        <span className="menu-label">
          Discover
        </span>

        <h2>
          Our Menu
        </h2>

        <p>
          Explore some of our favourite meals, freshly
          prepared with quality ingredients and served
          with great taste.
        </p>
      </div>


      {/* ================================
          MENU CATEGORIES
      ================================= */}

      <div className="menu-categories">

        {categories.map((category, index) => (

          <div
            className={`menu-category ${
              openCategory === index ? "open" : ""
            }`}
            key={category.name}
          >

            {/* CATEGORY HEADER */}

            <button
              type="button"
              className="category-header"
              onClick={() => toggleCategory(index)}
              aria-expanded={openCategory === index}
            >

              <span className="category-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3>
                {category.name}
              </h3>

              <span className="category-icon">
                {openCategory === index ? "−" : "+"}
              </span>

            </button>


            {/* CATEGORY DROPDOWN */}

            <div className="category-dropdown">

              <div className="category-items">

                {category.items.map((item) => (

                  <div
                    className="menu-item"
                    key={item.name}
                  >

                    <h4>
                      {item.name}
                    </h4>

                    <span className="menu-price">
                      {item.price}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ================================
          FULL MENU BUTTON
      ================================= */}

      <div className="menu-button-wrapper">

        <a
          href="/menu"
          className="menu-button"
        >
          View Full Menu
        </a>

      </div>

    </section>
  );
}

export default Menu;
