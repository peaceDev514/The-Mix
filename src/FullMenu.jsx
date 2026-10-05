import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./FullMenu.css";

const menuCategories = [
  {
    id: "food",
    title: "Food Menu",
    subtitle: "Traditional favourites & everyday meals",
    emoji: "🍛",
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
    items: [
      ["Swallow", "Semo / Pando / Eba / Amala"],
      ["Soup", "Egusi / Vegetable / Okra"],
      ["A Plate of Swallow with Beef", "₦2,700"],
      ["A Plate of Swallow with Fish", "₦3,000"],
      ["A Plate of Swallow with Chicken", "₦4,000"],
      ["A Plate of Swallow with Turkey", "₦5,500 / ₦6,000"],
      ["1 Litre of Vegetable Soup", "₦6,000"],
      ["1 Litre of Egusi Soup", "₦6,000"],
      ["1 Litre of Okro Soup", "₦10,000"],
    ],
  },

  {
    id: "shawarma",
    title: "Shawarma Menu",
    subtitle: "Freshly prepared & generously filled",
    emoji: "🌯",
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
    items: [
      ["Butter Bread", "₦1,000"],
      ["Butter Bread — Small Size", "₦600"],
      ["Fruit Bread", "₦1,200"],
      ["Chocolate Bread", "₦1,000"],
      ["Chocolate Bread", "₦1,500"],
      ["Sardine Bread", "₦1,000"],
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
    id: "cakes",
    title: "Cake Menu",
    subtitle: "Sweet treats for every occasion",
    emoji: "🍰",
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
    emoji: "🥤",
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
      ["Zobo", "₦500"],
      ["Zobo", "₦1,000"],
      ["Smoove", "₦600"],
      ["Sprite", "₦600"],
    ],
  },
];

function FullMenu() {
  const [search, setSearch] = useState("");

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

  return (
    <main className="full-menu-page">

      <section className="full-menu-hero">
        <div className="full-menu-hero-content">

          <Link to="/" className="menu-back">
            ← Back to Home
          </Link>

          <span className="full-menu-label">
            TABLE MAMAS
          </span>

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

        {!search && (
          <nav className="menu-category-nav">
            {menuCategories.map((category) => (
              <a href={`#${category.id}`} key={category.id}>
                <span>{category.emoji}</span>
                {category.title}
              </a>
            ))}
          </nav>
        )}

        <div className="full-menu-list">

          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <section
                className="full-menu-category"
                id={category.id}
                key={category.id}
              >

                <div className="category-heading">

                  <div className="category-icon">
                    {category.emoji}
                  </div>

                  <div className="category-title">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p>{category.subtitle}</p>
                      <h2>{category.title}</h2>
                    </div>
                  </div>

                </div>

                <div className="menu-list">

                  {category.items.map(([name, price], itemIndex) => (
                    <div
                      className="full-menu-item"
                      key={`${category.id}-${name}-${price}-${itemIndex}`}
                    >
                      <h3>{name}</h3>

                      <div className="menu-dots" />

                      <span>{price}</span>
                    </div>
                  ))}

                </div>

              </section>
            ))
          ) : (
            <div className="no-results">
              <span>🔎</span>

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

      <section className="menu-cta">
        <span>Hungry already?</span>

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
