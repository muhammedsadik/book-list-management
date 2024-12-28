const mainMenuMsg = "İptal: Exist\n\nSelect the action you want to perform:\n1 - Add New Book\n2 - List book\n3 - Delete Book";
const invalidEntry = "Invalid Entry, Try again.";
const notFound = "The book not found.";
const noBookInList = "There is no book on the list.";
const bookExist = "Your input already exist.";
const deleteBookMsg = "Enter the book you want to delete."
const exitBookApp = "You exited the books management.";
const bookInputMsg = "İptal: Exist\n\nEnter a book:";
const authorInputMsg = "İptal: Exist\n\nEnter author:";
const bookGenreInputMsg = "İptal: Exist\n\nEnter genre:";
const successful = "Successful";
const continueMsg = "İptal: Exist\n\nDo you want to continue: (Y/N)";
const continueOptions = ["y", "n"];
const actionOption = ["1", "2", "3"];

let bookList = [];

if (localStorage.bookList) {
  bookList = JSON.parse(localStorage.bookList);
}

function addingValue(msg) {
  let value = prompt(msg);

  if (value === null) {
    return false;
  }

  value = value.trim();

  if (!value) {
    alert(invalidEntry);
    return addingValue(msg);
  }

  return value;
}

function addBook() {
  let book = addingValue(bookInputMsg);
  if (book === false) {
    return false;
  }

  const result = bookList.find(x => x.book === book);

  if (result) {
    alert(bookExist);
    return addBook();
  }

  let author = addingValue(authorInputMsg);
  if (author === false) {
    return false;
  }

  let bookGenre = addingValue(bookGenreInputMsg);
  if (bookGenre === false) {
    return false;
  }

  bookList.push({
    book,
    author,
    bookGenre
  });

  localStorage.bookList = JSON.stringify(bookList);

}

function getList() {

  if (bookList.length === 0) {
    alert(noBookInList);
    return;
  }

  const listOfBooks = bookList.map((b, index) => `${index + 1} - Book: ${b.book}, Author: ${b.author}, Genre: ${b.bookGenre}`).join("\n");
  alert(listOfBooks);
}

function deleteBook() {
  if (bookList.length === 0) {
    alert(noBookInList);
    return;
  }

  let deleteValue = addingValue(deleteBookMsg);
  if (deleteValue === false) {
    return false;
  }

  const result = bookList.find(x => x.book === deleteValue);

  if (!result) {
    alert(notFound);
    return;
  }

  const updatedBooks = bookList.filter(b => b.book !== result.book);


  bookList = updatedBooks;
  localStorage.bookList = JSON.stringify(bookList);
  alert(successful);
  return true;
}

function optionSelection(msg, ...options) {
  let value = prompt(msg);

  if (value === null) {
    return false;
  }

  value = value.trim();
  if (!value) {
    alert(invalidEntry);
    return optionSelection(msg, ...options);
  }

  value = value.toLowerCase();

  if (!options.includes(value)) {
    alert(invalidEntry);
    return optionSelection(msg, ...options);
  }

  return value
}


function mainMenu() {
  let value = optionSelection(mainMenuMsg, ...actionOption);

  if (value === false) {
    alert(exitBookApp);
    return;
  }

  if (value == "1") {
    let result = addBook();

    if (result === false) {
      alert(exitBookApp);
      return;
    }

    let isContinue = optionSelection(continueMsg, ...continueOptions);

    if (isContinue === false || isContinue == "n") {
      alert(exitBookApp);
      return;
    }

    mainMenu();
  }

  if (value == "2") {
    getList();
    let isContinue = optionSelection(continueMsg, ...continueOptions);

    if (isContinue === false || isContinue == "n") {
      alert(exitBookApp);
      return
    }

    mainMenu();
  }

  if (value == "3") {
    deleteBook();
    let isContinue = optionSelection(continueMsg, ...continueOptions);

    if (isContinue === false || isContinue == "n") {
      alert(exitBookApp);
      return
    }

    mainMenu();
  }
}

mainMenu(); 