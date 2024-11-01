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
        <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
        `;
        recipeList.appendChild(recipeCard);
    })
}

const saveRecipeToLocalStorage = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

const loadRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem("recipes");

    if (storedRecipes){
        recipes = JSON.parse(storedRecipes);
    }
}

const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.classList.remove("hidden");
}

const hideError = (elementId) => {
    const errorElement = document.getElementById(elementId);
    errorElement.classList.add("hidden");
}

const addRecipe = (event) => {
    event.preventDefault();

    const recipeTitle = document.getElementById("recipeTitle").value.trim();
    const recipeIngredients = document.getElementById("recipeIngredients").value.trim();
    const recipeSteps = document.getElementById("recipeSteps").value.trim();

    // if (recipeTitle !== "" && recipeIngredients !== "" && recipeSteps !== "") {
    hideError("titleError");
    hideError("ingredientsError");
    hideError("stepsError");

    let isValid = true;

    if (recipeTitle === "") {
        showError("titleError", "Please enter the recipe title")
        isValid = false;
    }

    if (recipeIngredients === "") {
        showError("ingredientsError", "Please enter the recipe ingredients")
        isValid = false;
    }

    if (recipeSteps === "") {
        showError("stepsError", "Please enter the recipe steps")
        isValid = false;
    }

    if (isValid) {
        const isDuplicate = recipes.some((recipe) => recipe.title.toLowerCase === recipeTitle.toLowerCase);

        if (isDuplicate) {
            alert("Recipe already exists");
        } else {
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
        }
    }
    // } else {
    //     alert("Please fill out all the fields");
    // }
}

// const recipeForm = document.getElementById("recipeForm");
// recipeForm.addEventListener("submit", addRecipe);

document.getElementById("recipeForm").addEventListener("submit", addRecipe);

displayRecipe();