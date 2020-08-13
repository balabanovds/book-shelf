const testBooks = [
  {
    id: 1,
    isbn: "9780134190440",
    title: "The Go Programming Language",
    promo: "The book features hundreds of interesting and practical examples of well-written Go code that cover the whole language",
    url: "https://www.informit.com/ShowCover.aspx?isbn=9780134190440&type=f",
    tags: [
      "go",
      "golang"
    ],
    price: 3300,
    year: 2015,
    category: "programming"
  },
  {
    id: 2,
    isbn: "9780133086225",
    title: "C Programming Language",
    promo: "One of the best-selling programming books published in the last fifty years",
    url: "https://www.informit.com/ShowCover.aspx?isbn=9780133086225&type=f",
    tags: [
      "c"
    ],
    price: 2499,
    year: 1988,
    category: "programming"
  }
]

const testAuthors = [
  {
    id: 1,
    firstName: "Brian",
    lastName: "Kernigan",
    birthday: "1942-01-01",
    gender: "male",
    country: "Canada",
    books: [
      1,
      2
    ]
  },
  {
    id: 2,
    firstName: "Alan",
    lastName: "Donovan",
    birthday: "1970-01-01",
    gender: "male",
    country: "USA",
    books: [
      1
    ]
  },
  {
    id: 3,
    firstName: "Dennis",
    lastName: "Ritchie",
    birthday: "1941-09-09",
    gender: "male",
    country: "USA",
    books: [
      2
    ]
  }
]

export {testAuthors, testBooks}
