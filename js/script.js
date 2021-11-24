const bookSpinner = document.getElementById("book-spinner")
bookSpinner.style.display = "none"

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // Spinner Start
    const bookSpinner = document.getElementById("book-spinner")
    bookSpinner.style.display = "block"
    //Clear Data
    searchField.value = '';

    //Load Data with error massage
    const errorMassage = document.getElementById('error-message');
    if (searchText === '') {
        errorMassage.innerText = 'Something went wrong please try again later';
        const bookSpinner = document.getElementById("book-spinner")
        bookSpinner.style.display = "none"
    } else {
        errorMassage.innerText = '';
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.docs))

    }
}


//  book search area
const displaySearch = books => {
    // Spinner
    const bookSpinner = document.getElementById("book-spinner")
    bookSpinner.style.display = "none"

    const searchResult = document.getElementById('search-result');
    searchResult.innerText = '';
    let loopCount = 0;
    books.forEach(book => {
        console.log(book)
        if (book.cover_i !== undefined) {
            loopCount = loopCount + 1;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img style="width: 100%; height: 300px;"  src="https://covers.openlibrary.org/b/id/${book.cover_i}.jpg" class="card-img-top img-fluid mx-auto" alt="">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <address>
                        Written by ${book.author_name}.<br>
                        Publist Date:${book.first_publish_year} <br>
                    </address>
                    <button onclick="loadBookDetails(${book.cover_i})" class="btn btn-primary">View Details</button>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        }
    });
    const count = document.getElementById('count')
    count.innerText = `Total ${loopCount} Result Found`;
}


// Load single book details
const loadBookDetails = bookId => {
    const url = `https://openlibrary.org/search.json?q=${bookId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs[0]))

}


// Show single book details
const displayBook = books => {
    const bookDetails = document.getElementById('book-details');
    bookDetails.innerText = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <h1 class="text-center">${books.title} Book Details</h1>
            <div class="card">
                <img style="width: 100%; height: 500px;" src="https://covers.openlibrary.org/b/id/${books.cover_i}.jpg" class="card-img-top mx-auto" alt="">
                <div class="card-body">
                    <h5 class="card-title">${books.title}</h5>
                    <address>
                        Written by <b>${books.author_name}</b>.<br>
                        Publist Date:${books.first_publish_year} <br>
                    </address>
                    <p>Publisher: ${books.publisher}</p>
                    <p>ISBN: ${books.isbn}</p>
                </div>
            </div>
        `;
    bookDetails.appendChild(div);

}