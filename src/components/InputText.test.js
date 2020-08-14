import {mount} from '@vue/test-utils';
import InputText from '@/components/InputText';
import {capitalize} from '@/utils/strings';
import {isNumber, notEmpty} from '@/utils/validators';
import ErrorSpan from '@/components/ErrorSpan';

describe('InputText.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(InputText, {
      propsData: {
        validators: [notEmpty()]
      }
    });
  });

  it('InputText is mounted', async () => {
    const name = "test_case";
    await wrapper.setProps({name: name});
    expect(wrapper.html()).toContain(capitalize(name));
  });

  it('should emit input if no error', async () => {
    const inputElement = wrapper.find('input');
    const msg = 'some';
    await inputElement.setValue(msg);
    await inputElement.trigger('blur');
    const emitted = await wrapper.emitted();
    expect(emitted.input[0][0]).toBe(msg);
    expect(emitted['is-valid'][0][1]).toBeTruthy();
    expect(wrapper.vm.error).toBe('')
  });

  it('should not emit input if not valid on blur', async () => {
    const inputElement = wrapper.find('input');
    const msg = 'some';
    await inputElement.setValue(msg);
    await inputElement.setValue('');
    await inputElement.trigger('blur');
    const emitted = await wrapper.emitted();
    expect(emitted.input).not.toBeDefined();
    expect(emitted['is-valid'][0][1]).toBeFalsy();
  });

  it('error on validate non-number', async () => {
    const inputElement = wrapper.find('input');
    await wrapper.setProps({validators: [notEmpty(), isNumber()]})
    const msg = 'text';
    await inputElement.setValue(msg);
    await inputElement.trigger('blur');
    expect(wrapper.vm.error).toBe('Number expected')

  });

  it('should render ErrorSpan if not valid on blur', async () => {
    const inputElement = wrapper.find('input');
    await inputElement.setValue('msg');
    await inputElement.setValue('');
    await inputElement.trigger('blur');
    const errorSpan = wrapper.findComponent(ErrorSpan)
    expect(errorSpan.html()).toContain('Should not be empty');
  });
});
