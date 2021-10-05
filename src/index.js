module.exports = (async () => {
// require csvtojson
    const csv = require("csvtojson");

//Use async / await, convert a csv file with csvtojson
    const jsonArray = await csv({
        noheader: true,
        headers: ['isbn', 'title', 'author', 'publicationDate']
    }).fromFile('./src/catalog.csv');

    const libraryMap = new Map(jsonArray.map(({isbn, ...props}) => [isbn, props]));

    const lookup = (isbn) => {
        const book = libraryMap.get(isbn);
        if (book) {
            const {author, publicationDate, title} = book;
            return `${title}, by ${author} (${publicationDate})`;
        }
        return 'book not found';
    };

    const add = (isbn, copies = 1) => {
        const book = libraryMap.get(isbn);
        if (book) {
            const {copies: bookCopies = 0} = book;
            libraryMap.set(isbn, {...book, copies: bookCopies + copies});
        }
    };

    const alterAvailabilityOfBook = (isbn, setCount) => {
        const book = libraryMap.get(isbn);
        if (book) {
            const {copies = 1, available = copies} = book;
            const newAvailableCount = setCount(available);
            if (newAvailableCount < 0) {
                return 'No more copies available';
            }
            libraryMap.set(isbn, {...book, copies, available: newAvailableCount});
        }
    };

    const borrow = (isbn) => {
        const decrement = count => count - 1;
        return alterAvailabilityOfBook(isbn, decrement);
    };

    const returnBook = (isbn) => {
        const increment = count => count + 1;
        alterAvailabilityOfBook(isbn, increment);
    };

    const stock = () => {
        let stockString = '';
        libraryMap.forEach(({available = 0, copies = 0}, isbn) => {
            stockString += `${isbn}, Copies: ${copies}, Available: ${available}\n`
        });
        return stockString;
    };

    return {
        add,
        borrow,
        lookup,
        return: returnBook,
        stock
    };
})();