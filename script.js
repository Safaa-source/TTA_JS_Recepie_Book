let recipes = [];

const displayRecipe = () => {
    const recipeList = document.querySelector("#recipeList");
    recipeList.innerHTML = "";

    if (recipeList) {

        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("bg-white", "p-4", "rounded", "shadow", "mb-4");

            recipeCard.innerHTML = `
            <h2 class="text-lg font-bold" id="titleDisplay-${index}">${recipe.title}</h2>
            <input type="text" id="titleInput-${index}" class="hidden border p-2 w-full mb-2 rounded-lg" value="${recipe.title}">

            <h2 class="text-sm font-semithin text-gray-700" id="ingredientsDisplay-${index}"><strong>Ingredients: </strong>${recipe.ingredients}</h2>
            <textarea id="ingredientsInput-${index}" class="hidden border p-2 w-full mb-2 rounded-lg">${recipe.ingredients}</textarea>

            <h2 class="text-sm font-thin" id="stepsDisplay-${index}"><strong>Steps: </strong>${recipe.steps}</h2>
            <textarea id="stepsInput-${index}" class="hidden border p-2 w-full mb-2 rounded-lg">${recipe.steps}</textarea>
            
            <button class="bg-blue-500 text-white px-2 py-1 rounded mt-2" id="editBtn-${index}" onclick="editRecipe(${index})">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded mt-2" id="deleteBtn-${index}" onclick="deleteRecipe(${index})">Delete</button>

            <button class="bg-green-500 text-white px-2 py-1 rounded mt-2 hidden" id="saveBtn-${index}" onclick="saveRecipe(${index})">Save</button>
            <button class="bg-gray-500 text-white px-2 py-1 rounded mt-2 hidden" id="cancelBtn-${index}" onclick="cancelEdit(${index})">Cancel</button>
            `;
            recipeList.appendChild(recipeCard);
        })

    }
}

const saveRecipeToLocalStorage = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

const loadRecipesFromLocalStorage = () => {
    const storedRecipes = localStorage.getItem("recipes");

    if (storedRecipes) {
        recipes = JSON.parse(storedRecipes)
    }
}

const showError = (elementId, message) => {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.classList.remove("hidden");
    }
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

// const editRecipe = (index) => {
//     const updatedRecipeTitle = prompt("Enter the new recipe title", recipes[index].title);
//     const updatedRecipeIngredients = prompt("Enter the new recioe ingredients", recipes[index].ingredients);
//     const updatedRecipeSteps = prompt("Enter the new recipe steps", recipes[index].steps);

//     if (updatedRecipeTitle && updatedRecipeIngredients && updatedRecipeSteps) {
//         recipes[index].title = updatedRecipeTitle;
//         recipes[index].ingredients = updatedRecipeIngredients;
//         recipes[index].steps = updatedRecipeSteps;

//         saveRecipeToLocalStorage();
//         displayRecipe();
//     }
// }

const editRecipe = (index) => {
    document.getElementById(`titleDisplay-${index}`).classList.add("hidden");
    document.getElementById(`ingredientsDisplay-${index}`).classList.add("hidden");
    document.getElementById(`stepsDisplay-${index}`).classList.add("hidden");

    document.getElementById(`editBtn-${index}`).classList.add("hidden");
    document.getElementById(`deleteBtn-${index}`).classList.add("hidden");

    document.getElementById(`titleInput-${index}`).classList.remove("hidden");
    document.getElementById(`ingredientsInput-${index}`).classList.remove("hidden");
    document.getElementById(`stepsInput-${index}`).classList.remove("hidden");

    document.getElementById(`saveBtn-${index}`).classList.remove("hidden");
    document.getElementById(`cancelBtn-${index}`).classList.remove("hidden");
}

const saveRecipe = (index) => {
    const updatedRecipeTitle = document.getElementById(`titleDisplay-${index}`).value.trim();
    const updatedRecipeIngredients = document.getElementById(`ingredientsDisplay-${index}`).value.trim();
    const updatedRecipeSteps = document.getElementById(`stepsDisplay-${index}`).value.trim();

    if (updatedRecipeTitle && updatedRecipeIngredients && updatedRecipeSteps) {
        recipes[index].title = updatedRecipeTitle;
        recipes[index].ingredients = updatedRecipeIngredients;
        recipes[index].steps = updatedRecipeSteps;
        
        saveRecipeToLocalStorage();
        displayRecipe();
    } else{
        alert("Please enter all the fields")
    }
}

const cancelEdit = (index) => {
    document.getElementById(`titleDisplay-${index}`).classList.remove("hidden");
    document.getElementById(`ingredientsDisplay-${index}`).classList.remove("hidden");
    document.getElementById(`stepsDisplay-${index}`).classList.remove("hidden");

    document.getElementById(`editBtn-${index}`).classList.remove("hidden");
    document.getElementById(`deleteBtn-${index}`).classList.remove("hidden");

    document.getElementById(`titleInput-${index}`).classList.add("hidden");
    document.getElementById(`ingredientsInput-${index}`).classList.add("hidden");
    document.getElementById(`stepsInput-${index}`).classList.add("hidden");

    document.getElementById(`saveBtn-${index}`).classList.add("hidden");
    document.getElementById(`cancelBtn-${index}`).classList.add("hidden");
}

const deleteRecipe = (index) => {
    recipes.splice(index, 1);
    saveRecipeToLocalStorage();
    displayRecipe();
}

const recipeForm = document.getElementById("recipeForm");

if (recipeForm) {
    document.getElementById("recipeForm").addEventListener("submit", addRecipe);
}

loadRecipesFromLocalStorage();
displayRecipe();