import Generator from "./components/Generator";
import { useState } from "react";
import {
  Search,
  ArrowRight,
  Heart,
  Clock3,
  ChefHat,
  Sparkles,
  Plus,
  Menu,
  Leaf,
  Utensils,
} from "lucide-react";
import "./App.css";

const suggestions = ["Tomatoes", "Chickpeas", "Eggs", "Spinach"];

const moods = [
  { emoji: "⚡", title: "Quick & Easy", subtitle: "Ready in 15 minutes", color: "mood-peach" },
  { emoji: "🥗", title: "Light & Healthy", subtitle: "Fresh and nourishing", color: "mood-green" },
  { emoji: "🍝", title: "Comfort Food", subtitle: "A little extra love", color: "mood-yellow" },
  { emoji: "✨", title: "Something New", subtitle: "Try something different", color: "mood-lilac" },
];

function App() {
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState([
    "Tomatoes",
    "Chickpeas",
    "Eggs",
  ]);
  const [saved, setSaved] = useState(false);

  const addIngredient = (value) => {
    const cleanValue = value.trim();

    if (
      cleanValue &&
      !ingredients.some(
        (item) => item.toLowerCase() === cleanValue.toLowerCase()
      )
    ) {
      setIngredients([...ingredients, cleanValue]);
    }

    setIngredient("");
  };

  const removeIngredient = (item) => {
    setIngredients(ingredients.filter((value) => value !== item));
  };

  const handleGenerate = () => {
    alert(
      ingredients.length
        ? `Ready to find recipes with: ${ingredients.join(", ")}`
        : "Please add at least one ingredient."
    );
  };

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-icon">
            <ChefHat size={23} />
          </span>
          <span>
            <span className="brand-name">pantrychef</span>
            <span className="brand-ai">AI</span>
          </span>
        </a>

        <nav className="nav-links">
          <a className="active" href="#home">Home</a>
          <a href="#discover">Discover</a>
          <a href="#moods">Cook by mood</a>
        </nav>

        <a href="#generator" className="nav-button">
          Start cooking <ArrowRight size={16} />
        </a>

        <button className="mobile-menu" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={15} />
              YOUR PERSONAL AI CHEF
            </div>

            <h1>
              Make something
              <br />
              <span>wonderful.</span>
            </h1>

            <p className="hero-description">
              Turn what you have into a meal worth remembering.
              Delicious ideas start right in your kitchen.
            </p>

            <div className="search-panel">
              <div className="search-heading">
                <div>
                  <span className="small-label">LET'S GET COOKING</span>
                  <h2>What's in your kitchen?</h2>
                </div>
                <span className="search-icon"><Search size={21} /></span>
              </div>

              <form
                className="ingredient-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  addIngredient(ingredient);
                }}
              >
                <input
                  type="text"
                  placeholder="Add an ingredient..."
                  value={ingredient}
                  onChange={(event) => setIngredient(event.target.value)}
                />
                <button type="submit" aria-label="Add ingredient">
                  <Plus size={21} />
                </button>
              </form>

              <div className="ingredient-list">
                {ingredients.map((item) => (
                  <button
                    className="ingredient-chip selected"
                    key={item}
                    onClick={() => removeIngredient(item)}
                    title="Click to remove"
                  >
                    {item} <span>×</span>
                  </button>
                ))}
              </div>

              <div className="suggestion-row">
                <span>TRY:</span>
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => addIngredient(item)}
                    disabled={ingredients.includes(item)}
                  >
                    + {item}
                  </button>
                ))}
              </div>

              <button className="generate-button" onClick={handleGenerate}>
                <Sparkles size={17} />
                Find my recipes
                <ArrowRight size={18} />
              </button>
              <p className="privacy-note">
                Made for your ingredients, your taste, your kitchen.
              </p>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <div className="hero-food-art">
                <span className="food-emoji">🥑</span>
                <span className="food-emoji tomato">🍅</span>
                <span className="food-emoji greens">🥬</span>
                <span className="food-emoji lemon">🍋</span>
                <span className="food-emoji herbs">🌿</span>
              </div>
              <div className="image-caption">
                <span>FRESH IDEAS, EVERY DAY</span>
                <h3>A little inspiration<br />goes a long way.</h3>
              </div>
            </div>

            <div className="floating-note">
              <span className="note-icon">✦</span>
              <div>
                <strong>Made just for you</strong>
                <p>AI-powered meal inspiration</p>
              </div>
            </div>

            <div className="decor decor-one">✳</div>
            <div className="decor decor-two">✦</div>
          </div>
        </section>

        <section className="featured-section" id="discover">
          <div className="section-heading">
            <div>
              <span className="small-label">A LITTLE INSPIRATION</span>
              <h2>Fresh from your pantry</h2>
            </div>
            <a href="#moods" className="text-link">
              Explore ideas <ArrowRight size={16} />
            </a>
          </div>

          <article className="featured-card">
            <div className="featured-art">
              <span>🍋</span>
              <span>🌿</span>
              <span>🍗</span>
            </div>
            <div className="featured-content">
              <span className="featured-tag">CHEF'S PICK</span>
              <h3>Lemon Herb<br />Chicken</h3>
              <p>
                Bright, fresh flavours and a deliciously simple
                dinner idea for any day of the week.
              </p>
              <div className="recipe-meta">
                <span><Clock3 size={15} /> 30 min</span>
                <span><Utensils size={15} /> Easy</span>
              </div>
              <button
                className={`save-button ${saved ? "is-saved" : ""}`}
                onClick={() => setSaved(!saved)}
                aria-label="Save recipe"
              >
                <Heart size={19} fill={saved ? "currentColor" : "none"} />
                {saved ? "Saved" : "Save recipe"}
              </button>
            </div>
          </article>
        </section>

        <section className="moods-section" id="moods">
          <div className="section-heading">
            <div>
              <span className="small-label">WHAT ARE YOU IN THE MOOD FOR?</span>
              <h2>Cook by mood</h2>
            </div>
          </div>

          <div className="mood-grid">
            {moods.map((mood) => (
              <button
                className={`mood-card ${mood.color}`}
                key={mood.title}
                onClick={() => alert(`${mood.title} recipes coming soon!`)}
              >
                <span className="mood-emoji">{mood.emoji}</span>
                <span className="mood-title">{mood.title}</span>
                <span className="mood-subtitle">{mood.subtitle}</span>
                <ArrowRight className="mood-arrow" size={18} />
              </button>
            ))}
          </div>
        </section>

        <section className="bottom-banner">
          <div className="banner-icon"><Leaf size={24} /></div>
          <div>
            <h2>Good food starts with what you have.</h2>
            <p>Let your pantry surprise you today.</p>
          </div>
          <ChefHat size={44} className="banner-chef" />
        </section>
      </main>
      <Generator />
      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon"><ChefHat size={20} /></span>
          <span className="brand-name">pantrychef <span className="brand-ai">AI</span></span>
        </a>
        <p>Made with ♡ for everyday home cooks.</p>
        <span>© 2026 PantryChef AI</span>
      </footer>
    </div>
  );
}

export default App;
