let recipes = [];

const displayRecipe = () => {
    const recipeList = document.querySelector("#recipeList");
    recipeList.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4");

        recipeCard.innerHTML = `
        <h2 class="text-lg font-bold">${recipe.title}</h2>
        <h2 class="text-sm font-semithin text-gray-700"><strong>Ingredients: </strong>${recipe.ingredients}</h2>
        <h2 class="text-sm font-thin"><strong>Steps: </strong>${recipe.steps}</h2>
        <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2" onclick="editRecipe(${index})">Edit</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" onclick="deleteRecipe(${index})">Delete</button>
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
        recipes = JSON.parse(storedRecipes)
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
        const isDuplicate = recipes.some((recipe) => recipe.title.toLowerCase() === recipeTitle.toLowerCase());

        if (isDuplicate) {
            alert("Recipe already exists");
        } else {
            const newRecipe = {
                title: recipeTitle,
                ingredients: recipeIngredients,
                steps: recipeSteps
            }
            recipes.push(newRecipe);

            document.getElementById("recipeTitle").value = "";
            document.getElementById("recipeIngredients").value = "";
            document.getElementById("recipeSteps").value = "";

            saveRecipeToLocalStorage();
            displayRecipe();
        }
    }
}

const editRecipe = (index) => {
    const updatedRecipeTitle = prompt("Enter the new recipe title", recipes[index].title);
    const updatedRecipeIngredients = prompt("Enter the new recioe ingredients", recipes[index].ingredients);
    const updatedRecipeSteps = prompt("Enter the new recipe steps", recipes[index].steps);

    if (updatedRecipeTitle && updatedRecipeIngredients && updatedRecipeSteps){
        recipes[index].title = updatedRecipeTitle;
        recipes[index].ingredients = updatedRecipeIngredients;
        recipes[index].steps = updatedRecipeSteps;

        saveRecipeToLocalStorage();
        displayRecipe();
    }
}

const deleteRecipe = (index) => {
    recipes.splice(index, 1);
    saveRecipeToLocalStorage();
    displayRecipe();
}

document.getElementById("recipeForm").addEventListener("submit", addRecipe);

loadRecipesFromLocalStorage();
displayRecipe();