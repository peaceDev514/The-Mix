import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./FullMenu.css";

const menuCategories = [
  {
    id: "food",
    title: "Food Menu",
    subtitle: "Traditional favourites & everyday meals",
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
      ["Chicken", "₦1,000 / ₦2,000 / ₦3,000"],
      ["Turkey", "₦3,500 / ₦4,000 / ₦4,500 / ₦6,000"],
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
    items: [
      ["Catfish Pepper Soup", "₦7,000 / ₦10,000"],
      ["Beef Pepper Soup", "₦5,000 / ₦7,000"],
      ["Chicken Pepper Soup", "₦5,000 / ₦7,000"],
      ["Turkey Pepper Soup", "₦5,300 / ₦10,000"],
      ["Goat Meat Pepper Soup", "₦5,300 / ₦8,000"],
    ],
  },

  {
    id: "swallow",
    title: "Swallow & Soups",
    subtitle: "Classic Nigerian combinations",
    items: [
      ["Semo + Beef", "₦2,700"],
      ["Pando + Beef", "₦2,700"],
      ["Eba + Beef", "₦2,700"],
      ["Amala + Beef", "₦2,700"],
      ["Swallow + Fish", "₦3,000"],
      ["Swallow + Chicken", "₦4,000"],
      ["Swallow + Turkey", "₦5,500 / ₦6,000"],
      ["Egusi Soup — 1 Litre", "₦6,000"],
      ["Vegetable Soup — 1 Litre", "₦6,000"],
      ["Okro Soup — 1 Litre", "₦10,000"],
    ],
  },

  {
    id: "shawarma",
    title: "Shawarma",
    subtitle: "Freshly prepared & generously filled",
    items: [
      ["Double Sausage", "₦3,000"],
      ["Single Sausage", "₦2,800"],
      ["No Sausage", "₦2,600"],
      ["Double Sausage + Extra Beef", "₦3,500"],
      ["No Sausage + Extra Beef", "₦3,100"],
      ["Shawarma + Grilled Chicken", "₦3,500"],
    ],
  },

  {
    id: "bread",
    title: "Bread & Bakery",
    subtitle: "Freshly baked favourites",
    items: [
      ["Butter Bread", "₦1,000"],
      ["Small Butter Bread", "₦600"],
      ["Fruit Bread", "₦1,200"],
      ["Chocolate Bread", "₦1,000 / ₦1,500"],
      ["Sardine Bread", "₦1,000 / ₦1,500"],
      ["Banana Bread", "₦2,000"],
      ["Coconut Bread", "₦1,000 / ₦1,500"],
      ["Burger", "₦3,500 / ₦5,000"],
    ],
  },

  {
    id: "snacks",
    title: "Snacks",
    subtitle: "Perfect for a quick bite",
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
      ["Cookies", "₦1,500 / ₦2,000"],
      ["Honey Roll", "₦700"],
      ["Pancake", "₦700"],
      ["Chinchin", "₦500"],
      ["Popcorn", "₦500"],
    ],
  },

  {
    id: "cakes",
    title: "Cakes",
    subtitle: "Sweet treats for every occasion",
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
    title: "Ice Cream",
    subtitle: "Cool, creamy & delicious",
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
    title: "Pizza",
    subtitle: "Freshly baked & made to order",
    items: [
      ["Small Pizza", "₦4,000"],
      ["Medium Pizza", "₦6,000"],
      ["Large Pizza", "₦10,000"],
    ],
  },

  {
    id: "drinks",
    title: "Restaurant Drinks",
    subtitle: "Refreshing drinks & beverages",
    items: [
      ["Big Hollandia Yoghurt", "₦2,500"],
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
      ["Zobo", "₦500 / ₦1,000"],
      ["Smoove", "₦600"],
      ["Sprite", "₦600"],
    ],
  },
];

function FullMenu() {
  const [search, setSearch] = useState("");

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return menuCategories;
    }

    return menuCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(([name]) =>
          name.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [search]);

  return (
    <main className="full-menu-page">

      {/* HERO */}
      <section className="full-menu-hero">
        <div className="full-menu-hero-content">

          <a href="/" className="menu-back">
            ← Back to Home
          </a>

          <span className="full-menu-label">
            The Mix
          </span>

          <h1>
            Our
            <span> Menu</span>
          </h1>

          <p>
            Discover our selection of freshly prepared meals,
            delicious treats and refreshing drinks.
          </p>

        </div>
      </section>


      {/* MENU CONTENT */}
      <section className="full-menu-content">

        {/* SEARCH */}
        <div className="menu-search-wrapper">

          <div className="menu-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search our menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

        </div>


        {/* CATEGORY NAVIGATION */}
        {!search && (
          <nav className="menu-category-nav">
            {menuCategories.map((category) => (
              <a
                href={`#${category.id}`}
                key={category.id}
              >
                {category.title}
              </a>
            ))}
          </nav>
        )}


        {/* MENU SECTIONS */}
        <div className="full-menu-list">

          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <section
                className="full-menu-category"
                id={category.id}
                key={category.id}
              >

                <div className="category-heading">

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <p>{category.subtitle}</p>
                    <h2>{category.title}</h2>
                  </div>

                </div>


                <div className="menu-list">

                  {category.items.map(([name, price]) => (
                    <div
                      className="full-menu-item"
                      key={`${category.id}-${name}-${price}`}
                    >

                      <h3>{name}</h3>

                      <div className="menu-dots"></div>

                      <span>{price}</span>

                    </div>
                  ))}

                </div>

              </section>
            ))
          ) : (
            <div className="no-results">
              <span>Nothing Found</span>

              <h2>
                No menu item matches
                <br />
                your search.
              </h2>

              <button onClick={() => setSearch("")}>
                View Full Menu
              </button>
            </div>
          )}

        </div>

      </section>


      {/* BOTTOM CTA */}
      <section className="menu-cta">

        <span>Ready to order?</span>

        <h2>
          Good food is
          <br />
          <em>waiting for you.</em>
        </h2>

        <Link to="/#contact" className="get-in-touch">
	    Get in Touch
	  </Link>

      </section>

    </main>
  );
}

export default FullMenu;
