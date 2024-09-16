
export const validateBook = (book: any) => {
    console.log("validateBook: ", book);
    const errors = [];
    const currentYear = new Date().getFullYear();
    
    if (book.published_year === null || book.published_year === undefined ||
        !Number.isInteger(book.published_year) ||
        book.published_year < 0 ||
        book.published_year > currentYear) {
        errors.push({field: 'published_year', message: 'Invalid published year!'});
    }
 
    if (!book.title || book.title == null) {
        errors.push({field: 'title', message:'Titolo necessario'});
    }
 
    if (!book.author || book.author == null) {
        errors.push({field: 'author', message:'Autore necessario'});
    }
 
    if (errors.length > 0) {
        throw {
            name: 'ValidationError',
            errors: errors
 
        };
    }
 
};