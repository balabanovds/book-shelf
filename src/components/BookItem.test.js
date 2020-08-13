import {createLocalVue, shallowMount} from '@vue/test-utils';
import Vuex from 'vuex';
import BookItem from '@/components/BookItem';
import {testBooks, testAuthors} from '../../tests/testData'

const localVue = createLocalVue();
localVue.use(Vuex);

const actions = {
  delete: jest.fn()
}

const store = new Vuex.Store({
  modules: {
    books: {
      namespaced: true,
      getters: {
        getAuthors: () => () => {
          return testAuthors;
        }
      },
      actions
    }
  }
});

const book = testBooks[0];

describe('BookItem.vue template', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BookItem, {
      propsData: {
        book
      },
      store,
      localVue
    });
  });

  afterEach(() => {
    wrapper.destroy()
  })

  it('BookItem did mount', () => {
    expect(wrapper.html()).toContain('ISBN:');
  });

  it('BookItem contains proper url', () => {
    const el = wrapper.find('.book__content img');
    expect(el.exists()).toBeTruthy();
    expect(el.attributes('src')).toBe(book.url);
  });
  it('BookItem contains proper author formatting', () => {
    const el = wrapper.find('.book__text ul > li');
    expect(el.text()).toBe(`${testAuthors[0].firstName} ${testAuthors[0].lastName}`);
  });
  it('BookItem contains proper price formatting', () => {
    const el = wrapper.find('.book__price');
    expect(el.text()).toBe(`$ ${book.price / 100}`);
  });
});

describe('BookItem.vue test vuex calls', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BookItem, {
      propsData: {
        book
      },
      store,
      localVue
    });
  });

  it('dispatch "delete" on click', () => {
    wrapper.find('.book__delete').trigger('click')
    expect(actions.delete).toHaveBeenCalled()
  })
});
