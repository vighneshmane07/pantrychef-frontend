
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  ArrowLeft,
  Clock3,
  ChefHat,
  Users,
  Heart,
  CheckCircle2,
  Utensils,
  Sparkles,
} from "lucide-react";

function RecipeDetails({ recipe, onBack }) {
  const defaultRecipe = {
    name: "Fresh Tomato Basil Salad",
    description:
      "A refreshing combination of juicy tomatoes and aromatic basil with a simple dressing.",
    time: "15 min",
    difficulty: "Easy",
    servings: 2,
    ingredients: [
      "3 medium tomatoes",
      "10 fresh basil leaves",
      "1 tablespoon olive oil",
      "1 teaspoon lemon juice",
      "Salt and black pepper to taste",
    ],
    instructions: [
      "Wash the tomatoes and fresh basil leaves thoroughly.",
      "Cut the tomatoes into small wedges.",
      "Tear the basil leaves into smaller pieces.",
      "Combine tomatoes and basil in a mixing bowl.",
      "Add olive oil, lemon juice, salt and black pepper.",
      "Mix gently and serve fresh.",
    ],
  };

  const currentRecipe = recipe || defaultRecipe;

  const baseServings = Number.parseInt(currentRecipe.servings, 10) || 2;

  const [servings, setServings] = useState(baseServings);
  const [saved, setSaved] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Format ingredient quantities according to selected servings
  const scaleIngredient = (ingredient) => {
    const match = ingredient.match(
      /^(\d+(?:\.\d+)?|\d+\/\d+)(\s+)(.*)$/
    );

    if (!match) return ingredient;

    const originalQuantity = match[1].includes("/")
      ? (() => {
          const [numerator, denominator] = match[1].split("/");
          return Number(numerator) / Number(denominator);
        })()
      : Number(match[1]);

    const newQuantity = (originalQuantity * servings) / baseServings;

    const formattedQuantity = Number.isInteger(newQuantity)
      ? String(newQuantity)
      : String(Number(newQuantity.toFixed(2)));

    return `${formattedQuantity}${match[2]}${match[3]}`;
  };

  // Toggle ingredient checklist
  const toggleIngredient = (index) => {
    setCompleted((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  // Toggle cooking instruction completion
  const toggleStep = (index) => {
    setCompletedSteps((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  const ingredientProgress = currentRecipe.ingredients.length
    ? Math.round(
        (completed.length / currentRecipe.ingredients.length) * 100
      )
    : 0;

  return (
    <section className="recipe-details">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={18} />
        Back to recipes
      </button>

      {/* Recipe Header */}
      <div className="details-header">
        <span className="small-label">YOUR NEXT DELICIOUS MEAL</span>

        <h1>{currentRecipe.name}</h1>

        <p>{currentRecipe.description}</p>

        <div className="details-meta">
          <span>
            <Clock3 size={17} />
            {currentRecipe.time}
          </span>

          <span>
            <ChefHat size={17} />
            {currentRecipe.difficulty}
          </span>

          <span>
            <Users size={17} />
            {servings} servings
          </span>
        </div>

        <button
          className={`save-button ${saved ? "is-saved" : ""}`}
          onClick={() => setSaved(!saved)}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
          {saved ? "Saved to favourites" : "Save this recipe"}
        </button>
      </div>

      {/* Preparation Section */}
      <div className="preparation-heading">
        <div>
          <span className="small-label">LET&apos;S GET PREPARED</span>
          <h2>Everything you need</h2>
          <p>Gather your ingredients and follow the simple steps.</p>
        </div>

        <div className="progress-summary">
          <strong>{ingredientProgress}%</strong>
          <span>Ingredients ready</span>
        </div>
      </div>

      <div className="details-layout">

        {/* Ingredients */}
        <div className="ingredients-panel">
          <div className="panel-heading">
            <span className="panel-icon">
              <Utensils size={23} />
            </span>
            <div>
              <h2>Ingredients</h2>
              <p>Tick them off as you prepare.</p>
            </div>
          </div>

          <div className="servings-control">
            <span>Adjust servings</span>

            <div className="servings-buttons">
              <button
                type="button"
                onClick={() =>
                  setServings((value) => Math.max(1, value - 1))
                }
                disabled={servings <= 1}
                aria-label="Decrease servings"
              >
                −
              </button>

              <strong>{servings}</strong>

              <button
                type="button"
                onClick={() => setServings((value) => value + 1)}
                aria-label="Increase servings"
              >
                +
              </button>
            </div>
          </div>

          <div className="ingredient-checklist">
            {currentRecipe.ingredients.map((item, index) => (
              <button
                type="button"
                key={index}
                className={`detail-ingredient ${
                  completed.includes(index) ? "completed" : ""
                }`}
                onClick={() => toggleIngredient(index)}
              >
                <CheckCircle2 size={21} />
                <span>{scaleIngredient(item)}</span>
              </button>
            ))}
          </div>

          <div className="ingredient-progress">
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${ingredientProgress}%` }}
              />
            </div>

            <p>
              {completed.length} of {currentRecipe.ingredients.length} ingredients ready
            </p>
          </div>
        </div>

        {/* Cooking Instructions */}
        <div className="instructions-panel">
          <div className="panel-heading">
            <span className="panel-icon">
              <ChefHat size={23} />
            </span>

            <div>
              <h2>Cooking instructions</h2>
              <p>Follow each step at your own pace.</p>
            </div>
          </div>

          <div className="instruction-list">
            {currentRecipe.instructions.map((step, index) => {
              const isCompleted = completedSteps.includes(index);

              return (
                <button
                  type="button"
                  key={index}
                  className={`instruction-step ${
                    isCompleted ? "completed" : ""
                  }`}
                  onClick={() => toggleStep(index)}
                  aria-pressed={isCompleted}
                >
                  <span className="step-number">
                    {isCompleted ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </span>

                  <span className="step-text">{step}</span>

                  <span className="step-status">
                    {isCompleted ? "Completed" : "Mark done"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="chef-tip">
            <Sparkles size={19} />
            <div>
              <strong>A little chef&apos;s tip</strong>
              <p>
                Prepare your ingredients before starting to make cooking
                easier and more enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RecipeDetails;
