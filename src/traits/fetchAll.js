import {reactive} from '@vue/composition-api';
import {mockAuthors, mockBooks} from '../mock';

const fetchAll = () => {
  const state = reactive({
    books: [],
    authors: [],
  });

  const loadData = () => {
    state.books = mockBooks;
    state.authors = mockAuthors;
  };

  return {
    state,
    loadData,
  };
};

export default fetchAll;
