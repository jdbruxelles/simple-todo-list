"use strict";

const pendingListContainer = document.getElementById("pending-list");
const completedListContainer = document.getElementById("completed-list");
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
 * Déplace une tâche vers la liste des tâches terminées
 * @param {HTMLElement} listItem L'élément li à déplacer
 */
function moveToCompleted(listItem) {
  pendingListContainer.removeChild(listItem);
  completedListContainer.appendChild(listItem);
  showEmptyMessages();
}

/**
 * Déplace une tâche vers la liste des tâches en attente
 * @param {HTMLElement} listItem L'élément li à déplacer
 */
function moveToPending(listItem) {
  completedListContainer.removeChild(listItem);
  pendingListContainer.appendChild(listItem);
  showEmptyMessages();
}

/**
 * Ajoute un item à la liste
 * @returns {void}
 */
function addListItem() {
  // Le nombre d'items dans les deux listes
  let itemLength = pendingListContainer.querySelectorAll("li").length +
    completedListContainer.querySelectorAll("li").length;

  // Eviter d'ajouter une valeur vide
  if (todoInput.value === "") return;

  // Eviter d'ajouter plus de MAX_ITEMS éléments
  if (itemLength >= MAX_ITEMS)
    return alert("Vous avez atteint le nombre maximum d'éléments.");

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
    title: "Supprimer cette tâche",
    // Ajouter un événement au clic sur le bouton
    onclick: (event) => {
      // stocker le parent du bouton (le li)
      const parent = event.target.parentNode;

      // Supprimer le li de la liste à partir du parent du parent (ul)
      parent.parentNode.removeChild(parent);

      // Afficher un message si les listes sont vides
      showEmptyMessages();
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
        // Déplacer vers la liste des tâches terminées
        moveToCompleted(parent);
      } else {
        parent.classList.remove("checked");
        // Déplacer vers la liste des tâches en attente
        moveToPending(parent);
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

  // Ajouter l'élément li à la liste des tâches en attente
  pendingListContainer.appendChild(listItem);

  // Désactiver le bouton d'ajout si l'input est vide
  addItemBtn.disabled = todoInput.value === "";

  // Mettre à jour les messages d'état
  showEmptyMessages();
}

/**
 * Affiche des messages si les listes sont vides
 * et gère la visibilité des sections
 * @return {void}
 */
function showEmptyMessages() {
  const completedTasksSection = document.getElementById("completed-tasks");
  const completedTasks = completedListContainer.querySelectorAll("li");
  const pendingTasks = pendingListContainer.querySelectorAll("li");
  const pendingEmptyMessage = document.getElementById("empty-message");

  // Gérer le message pour la liste des tâches en attente
  if (!pendingTasks.length) {
    pendingEmptyMessage.style.display = "block";
  } else {
    pendingEmptyMessage.style.display = "none";
  }

  // Gérer la visibilité de la section des tâches terminées
  if (!completedTasks.length) {
    // Cacher la section si aucune tâche terminée
    completedTasksSection.style.display = "none";
  } else {
    // Afficher la section s'il y a des tâches terminées
    completedTasksSection.style.display = "block";
  }
}

// Afficher les messages initiaux si les listes sont vides
showEmptyMessages();

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
