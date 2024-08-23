// Management Sections
let AddBook = document.getElementById('AddBook');
let EditBookCopy = document.getElementById('EditBookCopy');
let SearchBooks = document.getElementById('SearchBooks');
let DeleteBooks = document.getElementById('DeleteBooks');


// Management Sections Buttons
const AddBookSelector = document.getElementById('AddBookSelector');
const EditCopySelector = document.getElementById('EditCopySelector');
const SearchBookSelector = document.getElementById('SearchBookSelector');
const DeleteBookSelector = document.getElementById('DeleteBookSelector');


// Listeners to change the display to 
AddBookSelector.addEventListener('click', () => {
    EditBookCopy.style.display = 'none';
    SearchBooks.style.display = 'none';
    DeleteBooks.style.display = 'none';
    AddBook.style.display = 'flex';
});

EditCopySelector.addEventListener('click', () => {
    EditBookCopy.style.display = 'flex';
    SearchBooks.style.display = 'none';
    DeleteBooks.style.display = 'none';
    AddBook.style.display = 'none';
});

SearchBookSelector.addEventListener('click', () => {
    EditBookCopy.style.display = 'none';
    SearchBooks.style.display = 'flex';
    DeleteBooks.style.display = 'none';
    AddBook.style.display = 'none';
});

DeleteBookSelector.addEventListener('click', () => {
    EditBookCopy.style.display = 'none';
    SearchBooks.style.display = 'none';
    DeleteBooks.style.display = 'flex';
    AddBook.style.display = 'none';
});



// Loading Functionality 

const MainDisplay = document.getElementsByClassName("MainDisplay");
const LoadingIndicator = document.createElement("h1");

function DisplayLoadingScreen() {
    LoadingIndicator.innerHTML = "Loading";
    LoadingIndicator.style.color = "white";
    LoadingIndicator.style.textAlign = "center";

    for(let i=0; i<MainDisplay.length; i++){
        if(MainDisplay[i].style.display === "flex"){
            MainDisplay[i].appendChild(LoadingIndicator);
            break;
        }
    }
}


function RemoveLoadingScreen(message) {
    LoadingIndicator.innerHTML = message;

    setTimeout(() => {
        for(let i=0; i<MainDisplay.length; i++){
            if(MainDisplay[i].style.display === "flex"){
                MainDisplay[i].removeChild(LoadingIndicator);
                break;
            }
        }
    }, 3000);
}



// Add Book Section

const AddBookButton = document.getElementById("AddBookButton");
const Title = document.getElementById("Title");
const Author = document.getElementById("Author");
const Publish = document.getElementById("Publish");
const Genre = document.getElementById("Genre");
const Copies = document.getElementById("Copies");


async function AddBookFunc(title, author, publish, genre, copies) {
    console.log(copies);
    try{
        const response = await fetch('http://localhost:5000/AddBook', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Title: title,
                Author: author,
                Publish: publish,
                Genre: genre,
                Copies: copies
            })
        });
        const data = await response.json();
        if(JSON.parse(data).Status === "Successful"){
            RemoveLoadingScreen("Book Added");
        }
        else {
            RemoveLoadingScreen("Database error \nFailed to add Book");
        }
    }
    catch(err){
        RemoveLoadingScreen("Failed to Send Data");
    }
}


AddBookButton.addEventListener("click", () => {
    AddBookFunc(Title.value, Author.value, Publish.valueAsNumber, Genre.value.trim().split(",").map(gen => {return gen.trim()}), Copies.valueAsNumber);
    DisplayLoadingScreen();
});




// Delete Book Section

const DeleteBookButton = document.getElementById("DeleteBookButton");
const ToDeleteBook = document.getElementById("ToDeleteBook");


async function DeleteBookFunc(title) {
    try{
        const response = await fetch('http://localhost:5000/DeleteBook', {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Title: title,
            })
        });
        if(response.status === 204){
            RemoveLoadingScreen("Book Deleted");
        }
        else if (response.status === 404){
            RemoveLoadingScreen(`No Book called ${title}`)
        }
        else {
            RemoveLoadingScreen("Database error \nFailed to delete Book");
        }
    }catch(err){
        RemoveLoadingScreen("Failed to Send Data");
    }
}


DeleteBookButton.addEventListener("click", () => {
    DeleteBookFunc(ToDeleteBook.value);
    DisplayLoadingScreen();
});



// Search Book Section
const SearchBookButton = document.getElementById("SearchBookButton");
const ToSearchBook = document.getElementById("ToSearchBook");


function AddBooksToPage(bookArray) {
    const SearchedBooksSection = document.getElementById("SearchedBooksSection");

    bookArray.forEach(book => {
        let SearchedBooks = document.createElement("div");
        SearchedBooks.className = "SearchedBooks";

        let BookTitle = document.createElement("p");
        let BookAuthor = document.createElement("p");
        let BookPublishYear = document.createElement("p");
        let BookGenres = document.createElement("p");
        let BookCopies = document.createElement("p");

        BookTitle.innerHTML = "Title: " + book.Title;
        BookAuthor.innerHTML = "Author: " + book.Author;
        BookPublishYear.innerHTML = "Publish Year: " + book.Publish;
        BookCopies.innerHTML = "Number of Copies: " + book.NumberOfCopies;
        BookGenres.innerHTML = "Genres: " + book.Genre.reduce((acc, cur) => {
            return acc + ", " + cur;
        });


        SearchedBooks.appendChild(BookTitle);
        SearchedBooks.appendChild(BookAuthor);
        SearchedBooks.appendChild(BookPublishYear);
        SearchedBooks.appendChild(BookGenres);
        SearchedBooks.appendChild(BookCopies);
        
        SearchedBooksSection.appendChild(SearchedBooks);

    });
}


async function SearchBookFunc(title) {
    try{

        const response = await fetch(`http://localhost:5000/SearchBook/${title}`);
        const data = await response.json();
        if(JSON.parse(data).Status === "Successful"){
            RemoveLoadingScreen("Searched Books");
            console.log(JSON.parse(data).books);
            AddBooksToPage(JSON.parse(data).books);
        }
        else {
            RemoveLoadingScreen("Database error \nFailed to Find Book");
        }
        console.log(data);
    }
    catch(err){
        RemoveLoadingScreen("Failed to Send Data");
        console.log(err);
    }
}


SearchBookButton.addEventListener("click", () => {
    SearchBookFunc(ToSearchBook.value);
    DisplayLoadingScreen();
});



// Edit Copies Section


const ToEditTitle = document.getElementById("ToEditTitle");
const ToEditCopies = document.getElementById("ToEditCopies");
const EditCopyButton = document.getElementById("EditCopyButton");


async function EditCopyFunc(title, copies) {
    try{
        const response = await fetch('http://localhost:5000/EditCopy', {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                Title: title,
                Copies: copies
            })
        });
        if(response.status === 204){
            RemoveLoadingScreen("Book Copy Changed");
        }
        else if (response.status === 404){
            RemoveLoadingScreen(`No Book called ${title}`)
        }
        else {
            RemoveLoadingScreen("Database error \nFailed to delete Book");
        }
    }catch(err){
        RemoveLoadingScreen("Failed to Send Data");
    }
}


EditCopyButton.addEventListener("click", () => {
    EditCopyFunc(ToEditTitle.value, ToEditCopies.value);
    DisplayLoadingScreen();
});