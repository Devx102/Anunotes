// Getting ElementById
const nameInput = document.getElementById("nameInput");
const titleInput = document.getElementById("titleInput");
const noteInput = document.getElementById("noteInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const disappear = document.getElementById("disappear");
const StartWriting = document.getElementById("IntroBtn");
const IntroDiv = document.getElementById("IntroDiv");
const inputBoxMaster = document.getElementById("inputBoxes");
const plus = document.getElementById("plus");
let isEditing = false;

StartWriting.addEventListener("click", () => {
  inputBoxMaster.classList.remove("hidden");
  inputBoxMaster.classList.add("flex", "flex-col");
  IntroDiv.classList.add("hidden");
});

//MODAL  ELEMENT

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("ModalTitle");
const modalDate = document.getElementById("modalDate");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");
const editBtn = document.getElementById("editBtn");

//hope
let selectedIndex = null;

//HAPPY SUNDAY FAM
//ARRAY / BOX WHERE
let notes = [];

function renderNote() {
  //getting container By Id
  const container = document.getElementById("noteCon");

  //
  container.innerHTML = "";

  //for each notes do this
  notes.forEach((note, index) => {
    //create a div Element
    const div = document.createElement("div");

    //Design the div
    div.classList.add(
      "p-4",
      "bg-gray-200",
      "rounded-lg",
      "mb-3",
      "w-full",
      "text-2xl",
      "break-words",
      
    );

    //In the div Element add title and note as H
    div.innerHTML = `
            <h2>${note.title}</h2>
            <p>${note.date}</p>
            `;

    // clickable div
    div.addEventListener("click", () => {
      modalTitle.textContent = note.title;
      modalDate.textContent = note.date;
      modalContent.textContent = note.content;
      selectedIndex = index;

      modal.classList.remove("hidden");
      disappear.classList.add("hidden");
    });

    //Add the div o the container
    container.appendChild(div);
  });
}

//Close modal
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  disappear.classList.remove("hidden");
});

plus.addEventListener("click", () => {
  disappear.classList.add("hidden");
  inputBoxMaster.classList.remove("hidden");
});
//Edit Button
editBtn.addEventListener("click", () => {
  if (selectedIndex === null) return;
  inputBoxMaster.classList.remove("hidden");
  disappear.classList.add("hidden");
  const note = notes[selectedIndex];

  titleInput.value = note.title;
  noteInput.value = note.content;
  isEditing = true; // 👈 THIS fixes your issue

  modal.classList.add("hidden");
});

//addBtn button
addBtn.addEventListener("click", () => {
  //Remove spaces form the input.value
  const name = nameInput.value.trim();
  const title = titleInput.value.trim();
  const content = noteInput.value.trim();
  const date = new Date().toLocaleDateString();

  //If title is empty don't run the button
  if (title === "" || content === "") return;
  disappear.classList.remove("hidden");
  inputBoxMaster.classList.add("hidden");
  if (isEditing) {
    notes[selectedIndex].title = title;
    notes[selectedIndex].content = content;
    notes[selectedIndex].date = date;

    isEditing = false; // 🔥 THIS WAS MISSING
    selectedIndex = null;
  } else {
    //Storing note details in an object
    const newNote = {
      name,
      title,
      content,
      date,
    };
    //Add the note details to the notes array
    notes.push(newNote);
  }

  //debug notes
  console.log(notes);

  //Clear all input when add button is clicked
  nameInput.value = "";
  titleInput.value = "";
  noteInput.value = "";
localStorage.setItem("myNote",notes)
  renderNote();
});
