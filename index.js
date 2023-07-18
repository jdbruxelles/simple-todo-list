const todoListContainer = document.getElementById("todo-list");
const todoInput = document.querySelector(".todo-input");
const addItemBtn = document.querySelector(".add-item");
const MAX_ITEMS = 10; // Nombre maximum d'items

/**
 * Crée un élément HTML et le retourne
 * @param {string} name Nom de l'élément HTML
 * @param {object} props Propriétés de l'élément
 * @returns {HTMLElement} L'élément HTML créé
 */
function element(name, props) {
  // Créer un élément HTML
  const el = document.createElement(name);

  if (props) { // Si props existe
    // Pour chaque clé de props
    Object.keys(props).forEach((key) => {
      // Ajouter la propriété à l'élément
      el[key] = props[key];
    });
  }

  // Retourner l'élément créé
  return el;
}

/**
 * Ajoute un item à la liste
 * @returns {void}
 */
function addListItem() {
  // Le nombre d'items dans la liste
  let itemLength = todoListContainer.querySelectorAll("li").length;

  // Eviter d'ajouter une valeur vide
  if (todoInput.value === "") return;

  // Eviter d'ajouter plus de MAX_ITEMS items
  if (itemLength >= MAX_ITEMS) return;

  // Supprimer le message initial (disant que la liste est vide)
  if (itemLength === 0) todoListContainer.innerHTML = "";

  // Créer un élément li
  const listItem = element("li");

  // Créer un élément span
  const content = element("span", {
    // Ajouter la valeur de l'input comme texte
    innerText: todoInput.value
  });

  // Créer un élément span servant de bouton pour supprimer l'item
  const removeBtn = element("span", {
    innerHTML: "&times;", // le X pour supprimer
    // Ajouter un événement au clic sur le bouton
    onclick: (event) => {
      // stocker le parent du bouton (le li)
      const parent = event.target.parentNode;

      // Supprimer le li de la liste à partir du parent du parent (ul)
      parent.parentNode.removeChild(parent);

      // Afficher un message si la liste est vide
      showEmptyMessage();
    }
  });

  // Créer un élément input de type checkbox (case à cocher)
  listItem.appendChild(element("input", {
    type: "checkbox",
    // Ajouter un événement au changement d'état de la case à cocher
    onchange: (event) => {
      // stocker le parent de la case à cocher (le li)
      const parent = event.target.parentNode;

      // Ajouter ou supprimer la classe "checked" au parent
      // selon que la case à cocher est cochée ou non
      if (event.target.checked) {
        parent.classList.add("checked");
      } else {
        parent.classList.remove("checked");
      }
    }
  }));

  // Ajouter les classes CSS aux éléments
  content.classList.add("value");
  removeBtn.classList.add("remove-item");

  // Ajouter les éléments à l'élément li
  listItem.appendChild(content);
  listItem.appendChild(removeBtn);

  // Vider l'input
  todoInput.value = "";

  // Ajouter l'élément li à la liste
  todoListContainer.appendChild(listItem);
}

/**
 * Affiche un message si la liste est vide
 * @return {void}
 */
function showEmptyMessage() {
  // Si la liste est vide
  if (!todoListContainer.querySelectorAll("li").length) {
    // Afficher un message
    todoListContainer.innerHTML = `<p>Il n'y a aucune tâche.</p>`;
  }
}

// Afficher un message initial si la liste est vide
showEmptyMessage();

// Ajouter un événement au clic sur le bouton d'ajout d'item
addItemBtn.addEventListener("click", addListItem);

// Ajouter un événement à l'appui sur les touches du clavier
todoInput.addEventListener("keyup", (event) => {
  // Si la touche appuyée est Entrée
  if (event.keyCode === 13) addListItem();

  // Désactiver le bouton d'ajout si l'input est vide
  addItemBtn.disabled = event.target.value === "";
});

/*
  En savoir plus sur le JavaScript :
  https://www.w3schools.com/js/default.asp
*/
