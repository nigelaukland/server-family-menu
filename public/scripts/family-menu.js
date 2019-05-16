function addRecipe() {
  console.log("click to addRecipe")
};

function addNote() {
  console.log("click to addNote")
};

function deleteRecipe() {
  const recipeId = this.parentNode.querySelector('[name=recipeId]').value;
  const csrf = this.parentNode.querySelector('[name=_csrf]').value;
  const recipeElement = this.closest('.item');

  console.log(`This will delete recipe ${recipeId}`);
  fetch(`http://localhost:3000/recipe/${recipeId}`, {
    method: 'DELETE',
    headers: {'csrf-token': csrf}
  })
  .then(res => {
    return res.json(); // this returns the buffer as a complete json response body
  })
  .then(data => {
    console.log(data);
    recipeElement.parentNode.removeChild(recipeElement);
  })
  .catch(err => {
    console.log(err);
  });
};

$(document).ready(function() {
  $('.ui.dropdown').dropdown();
  $('.pencil.icon').on('click', addNote);
  $('.deleteRecipe').on('click', deleteRecipe);
});
