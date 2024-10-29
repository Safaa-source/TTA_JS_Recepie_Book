const recipes = [
    {
        title: "Spaghetti Bolognese",
        ingredients: "Spaghetti, Ground Beef, Tomato Sauce, Garlic, Onions, Olive Oil",
        steps: "1. Boil pasta. 2. Cook ground beef. 3. Add sauce and garlic. 4. Mix with pasta."
    },
    {
        title: "Chicken Curry",
        ingredients: "Chicken, Curry Powder, Coconut Milk, Onions, Garlic, Ginger",
        steps: "1. Cook chicken. 2. Add onions, garlic, ginger. 3. Add coconut milk and curry powder. 4. Simmer."
    },
    {
        title: "Vegetable Stir-fry",
        ingredients: "Broccoli, Carrots, Bell Peppers, Soy Sauce, Garlic, Olive Oil",
        steps: "1. Stir-fry vegetables in olive oil. 2. Add garlic and soy sauce. 3. Serve with rice."
    }
];

const displayRecipe = () => {
    const recipeList = document.querySelector("#recipeList");
    recipeList.innerHTML = "";

    recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4");

        recipeCard.innerHTML = `
        <h2 class="text-lg font-bold">${recipe.title}</h2>
        <h2 class="text-sm font-semithin text-gray-700"><strong>Ingredients: </strong>${recipe.ingredients}</h2>
        <h2 class="text-sm font-thin"><strong>Steps: </strong>${recipe.steps}</h2>
        `;
        recipeList.appendChild(recipeCard);
    })
}

const addRecipe = (event) => {
    event.preventDefault();

    const recipeTitle = document.getElementById("recipeTitle").value;
    const recipeIngredients = document.getElementById("recipeIngredients").value;
    const recipeSteps = document.getElementById("recipeSteps").value;

    if (recipeTitle.trim() !== "" && recipeIngredients.trim() !== "" && recipeSteps.trim() !== "") {
        const newRecipe = {
            title: recipeTitle,
            ingredients: recipeIngredients,
            steps: recipeSteps
        }
        recipes.push(newRecipe);

        recipeTitle.value = "";
        recipeIngredients.value = "";
        recipeSteps.value = "";

        displayRecipe();
    } else {
        alert("Please fill out all the fields");
    }
}

const recipeForm = document.getElementById("recipeForm");
recipeForm.addEventListener("submit", addRecipe);

displayRecipe();