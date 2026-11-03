
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Plus,
  X,
  Leaf,
  Clock,
  Utensils,
} from "lucide-react";

import RecipeDetails from "./RecipeDetails";

const dietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Dairy-free",
  "High-protein",
  "Keto",
];

const cookingTimes = [
  "Any time",
  "Under 15 min",
  "Under 30 min",
  "Under 60 min",
];

const recipeArt = [
  { emoji: "🥗", className: "salad-art", tag: "FRESH & LIGHT" },
  { emoji: "🍲", className: "soup-art", tag: "COMFORT FOOD" },
  { emoji: "🍝", className: "pasta-art", tag: "QUICK & EASY" },
];

export default function Generator() {
  const [ingredients, setIngredients] = useState([
    "Tomatoes",
    "Basil",
  ]);

  const [newIngredient, setNewIngredient] = useState("");
  const [diet, setDiet] = useState([]);
  const [time, setTime] = useState("Any time");
  const [servings, setServings] = useState(2);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const addIngredient = (event) => {
    event.preventDefault();

    const value = newIngredient.trim();

    if (!value) return;

    if (
      !ingredients.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setIngredients((current) => [...current, value]);
    }

    setNewIngredient("");
    setMessage("");
  };

  const removeIngredient = (item) => {
    setIngredients((current) =>
      current.filter((value) => value !== item)
    );
  };

  const toggleDiet = (option) => {
    setDiet((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  // Generate recipes using the real Gemini backend
  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      setMessage("Please add at least one ingredient.");
      setShowResults(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setSelectedRecipe(null);
    setShowResults(false);

    try {
      const response = await fetch(
        "https://pantrychef-backend-atrn.onrender.com/api/generate-recipes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredients,
            dietary_preferences: diet,
            cooking_time: time,
            servings: servings,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to generate recipes. Please try again."
        );
      }

      if (!data.recipes || data.recipes.length === 0) {
        throw new Error("No recipes were returned. Please try again.");
      }

      setRecipes(data.recipes);
      setShowResults(true);

      setTimeout(() => {
        document
          .getElementById("recipe-results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Recipe generation error:", error);

      if (error instanceof TypeError) {
        setMessage(
          "Cannot connect to PantryChef AI. Please check whether the backend server is running."
        );
      } else {
        setMessage(
          error.message || "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const openRecipe = (recipe) => {
    setSelectedRecipe(recipe);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <section className="generator-page" id="generator">
      <div className="generator-top">
        <a href="#home" className="back-link">
          <ArrowLeft size={17} />
          Back to home
        </a>

        <span className="generator-label">
          <Sparkles size={15} />
          YOUR PERSONAL AI CHEF
        </span>
      </div>

      <div className="generator-heading">
        <h1>
          What do you have <span>on hand?</span>
        </h1>

        <p>
          Tell us what&apos;s in your kitchen. We&apos;ll help you turn
          everyday ingredients into something delicious.
        </p>
      </div>

      <div className="generator-layout">
        <div className="generator-main-card">
          <div className="step-heading">
            <span className="step-number">01</span>

            <div>
              <h2>Your ingredients</h2>
              <p>Add everything you&apos;d like to cook with.</p>
            </div>
          </div>

          <form
            className="generator-input"
            onSubmit={addIngredient}
          >
            <Plus size={20} />

            <input
              value={newIngredient}
              onChange={(event) =>
                setNewIngredient(event.target.value)
              }
              placeholder="Type an ingredient (e.g. onions)"
            />

            <button type="submit">Add</button>
          </form>

          <div className="generator-chips">
            {ingredients.map((item) => (
              <span className="generator-chip" key={item}>
                {item}

                <button
                  type="button"
                  onClick={() => removeIngredient(item)}
                  aria-label={`Remove ${item}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}

            {ingredients.length === 0 && (
              <p className="empty-ingredients">
                Your ingredient list is empty. Add something above.
              </p>
            )}
          </div>

          <div className="generator-divider" />

          <div className="step-heading">
            <span className="step-number">02</span>

            <div>
              <h2>Any dietary preferences?</h2>
              <p>Select all that apply. You can skip this step.</p>
            </div>
          </div>

          <div className="diet-grid">
            {dietaryOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={`diet-option ${
                  diet.includes(option) ? "diet-selected" : ""
                }`}
                onClick={() => toggleDiet(option)}
              >
                {diet.includes(option) ? "✓" : "+"}
                {option}
              </button>
            ))}
          </div>

          <div className="generator-divider" />

          <div className="step-heading">
            <span className="step-number">03</span>

            <div>
              <h2>Make it your way</h2>
              <p>
                Choose how much time you have and how many to serve.
              </p>
            </div>
          </div>

          <label className="field-label">
            <Clock size={17} />
            How much time do you have?
          </label>

          <div className="time-options">
            {cookingTimes.map((option) => (
              <button
                type="button"
                key={option}
                className={`time-option ${
                  time === option ? "time-selected" : ""
                }`}
                onClick={() => setTime(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="servings-row">
            <div>
              <strong>
                <Utensils size={17} />
                Servings
              </strong>

              <p>How many people are eating?</p>
            </div>

            <div className="servings-control">
              <button
                type="button"
                onClick={() =>
                  setServings(Math.max(1, servings - 1))
                }
                aria-label="Decrease servings"
              >
                −
              </button>

              <span>{servings}</span>

              <button
                type="button"
                onClick={() =>
                  setServings(Math.min(12, servings + 1))
                }
                aria-label="Increase servings"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            className="generate-button generator-submit"
            onClick={handleGenerate}
            disabled={loading}
          >
            <Sparkles size={18} />

            {loading ? "Creating your recipes..." : "Generate 3 recipes"}

            {!loading && <ArrowRight size={18} />}
          </button>

          {loading && (
            <p className="generator-message" role="status">
              <span className="loading-spinner">✦</span>
              Your AI chef is preparing something delicious. Please wait...
            </p>
          )}

          {message && (
            <p className="generator-message" role="alert">
              {message}
            </p>
          )}
        </div>

        <aside className="generator-aside">
          <div className="aside-illustration">🥑</div>

          <span className="small-label">
            A LITTLE KITCHEN MAGIC
          </span>

          <h2>
            Less food waste. More delicious moments.
          </h2>

          <p>
            Your ingredients have more potential than you think.
            Let&apos;s find out what you can make.
          </p>

          <div className="aside-tip">
            <Leaf size={19} />

            <div>
              <strong>Smart cooking tip</strong>

              <p>
                Include ingredients that need to be used soon
                to reduce food waste.
              </p>
            </div>
          </div>

          <div className="aside-summary">
            <span>YOUR SELECTION</span>

            <strong>{ingredients.length} ingredients</strong>
            <strong>{diet.length} dietary preferences</strong>
            <strong>{servings} servings</strong>
          </div>
        </aside>
      </div>

      {/* AI-GENERATED RECIPE RESULTS */}

      {showResults && !selectedRecipe && (
        <section className="results-section" id="recipe-results">
          <div className="results-heading">
            <div>
              <span className="small-label">
                MADE FOR YOUR PANTRY
              </span>

              <h2>Here&apos;s what you can make!</h2>

              <p>
                AI-generated recipe ideas using {ingredients.join(", ")}.
              </p>
            </div>

            <span className="results-count">
              {recipes.length} recipes found
            </span>
          </div>

          <div className="results-grid">
            {recipes.map((recipe, index) => {
              const art = recipeArt[index % recipeArt.length];

              return (
                <article
                  className="result-card"
                  key={`${recipe.name}-${index}`}
                >
                  <div className={`result-art ${art.className}`}>
                    <span>{art.emoji}</span>

                    <span className="result-tag">
                      {art.tag}
                    </span>

                    <button
                      type="button"
                      className="result-heart"
                      onClick={(event) => {
                        event.currentTarget.classList.toggle("saved");
                      }}
                      aria-label={`Save ${recipe.name}`}
                    >
                      ♥
                    </button>
                  </div>

                  <div className="result-content">
                    <div className="result-meta">
                      <span>⏱ {recipe.time || "Time not specified"}</span>
                      <span>● {recipe.difficulty || "Easy"}</span>
                    </div>

                    <h3>{recipe.name}</h3>

                    <p>{recipe.description}</p>

                    <button
                      type="button"
                      className="view-recipe-button"
                      onClick={() => openRecipe(recipe)}
                    >
                      View recipe <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* RECIPE DETAILS */}

      {selectedRecipe && (
        <div className="recipe-details-overlay">
          <RecipeDetails
            recipe={selectedRecipe}
            onBack={closeRecipe}
          />
        </div>
      )}
    </section>
  );
}
