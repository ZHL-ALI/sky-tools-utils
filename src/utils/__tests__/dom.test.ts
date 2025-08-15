/**
 * @jest-environment jsdom
 */

import { $, $$, addClass, removeClass, toggleClass, hasClass, setStyle, getElementPosition, scrollTo, scrollToElement } from '../dom';

describe('DOM Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test-element" class="initial-class">Test Element</div>
      <div class="multiple-elements">Element 1</div>
      <div class="multiple-elements">Element 2</div>
      <div class="multiple-elements">Element 3</div>
    `;
  });

  describe('$', () => {
    it('should select element by ID', () => {
      const element = $('#test-element');
      expect(element).toBeTruthy();
      expect(element?.id).toBe('test-element');
    });

    it('should select element by class', () => {
      const element = $('.initial-class');
      expect(element).toBeTruthy();
      expect(element?.classList.contains('initial-class')).toBe(true);
    });

    it('should return null for non-existent element', () => {
      const element = $('#non-existent');
      expect(element).toBeNull();
    });
  });

  describe('$$', () => {
    it('should select multiple elements', () => {
      const elements = $$('.multiple-elements');
      expect(elements.length).toBe(3);
      expect(elements[0]?.textContent).toBe('Element 1');
      expect(elements[1]?.textContent).toBe('Element 2');
      expect(elements[2]?.textContent).toBe('Element 3');
    });

    it('should return empty NodeList for non-existent elements', () => {
      const elements = $$('.non-existent');
      expect(elements.length).toBe(0);
    });
  });

  describe('addClass', () => {
    it('should add class to element', () => {
      const element = $('#test-element') as HTMLElement;
      addClass(element, 'new-class');
      expect(element.classList.contains('new-class')).toBe(true);
      expect(element.classList.contains('initial-class')).toBe(true);
    });

    it('should not duplicate existing class', () => {
      const element = $('#test-element') as HTMLElement;
      addClass(element, 'initial-class');
      expect(element.classList.length).toBe(1);
    });
  });

  describe('removeClass', () => {
    it('should remove class from element', () => {
      const element = $('#test-element') as HTMLElement;
      removeClass(element, 'initial-class');
      expect(element.classList.contains('initial-class')).toBe(false);
    });

    it('should not error when removing non-existent class', () => {
      const element = $('#test-element') as HTMLElement;
      expect(() => removeClass(element, 'non-existent')).not.toThrow();
    });
  });

  describe('toggleClass', () => {
    it('should toggle existing class', () => {
      const element = $('#test-element') as HTMLElement;
      toggleClass(element, 'initial-class');
      expect(element.classList.contains('initial-class')).toBe(false);
      
      toggleClass(element, 'initial-class');
      expect(element.classList.contains('initial-class')).toBe(true);
    });

    it('should add non-existing class', () => {
      const element = $('#test-element') as HTMLElement;
      toggleClass(element, 'new-class');
      expect(element.classList.contains('new-class')).toBe(true);
    });
  });

  describe('hasClass', () => {
    it('should return true for existing class', () => {
      const element = $('#test-element') as HTMLElement;
      expect(hasClass(element, 'initial-class')).toBe(true);
    });

    it('should return false for non-existing class', () => {
      const element = $('#test-element') as HTMLElement;
      expect(hasClass(element, 'non-existent')).toBe(false);
    });
  });

  describe('setStyle', () => {
    it('should set single style property', () => {
      const element = $('#test-element') as HTMLElement;
      setStyle(element, { color: 'red' });
      expect(element.style.color).toBe('red');
    });

    it('should set multiple style properties', () => {
      const element = $('#test-element') as HTMLElement;
      setStyle(element, {
        color: 'blue',
        fontSize: '16px',
        margin: '10px'
      });
      expect(element.style.color).toBe('blue');
      expect(element.style.fontSize).toBe('16px');
      expect(element.style.margin).toBe('10px');
    });
  });

  describe('getElementPosition', () => {
    it('should return element position', () => {
      const element = $('#test-element') as HTMLElement;
      
      // Mock getBoundingClientRect
      const mockRect = {
        top: 100,
        left: 50,
        width: 200,
        height: 30,
        right: 250,
        bottom: 130
      };
      element.getBoundingClientRect = jest.fn(() => mockRect as DOMRect);
      
      // Mock window scroll values
      Object.defineProperty(window, 'scrollY', { value: 20, writable: true });
      Object.defineProperty(window, 'scrollX', { value: 10, writable: true });

      const position = getElementPosition(element);
      expect(position).toEqual({
        top: 120,  // 100 + 20
        left: 60,  // 50 + 10
        width: 200,
        height: 30
      });
    });
  });

  describe('scrollTo', () => {
    it('should call window.scrollTo with correct parameters', () => {
      const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation();
      
      scrollTo(100);
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 100, behavior: 'smooth' });
      
      scrollTo(200, 'auto');
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 200, behavior: 'auto' });
      
      scrollToSpy.mockRestore();
    });
  });

  describe('scrollToElement', () => {
    it('should call element.scrollIntoView with correct parameters', () => {
      const element = $('#test-element') as HTMLElement;
      // Mock scrollIntoView method
      element.scrollIntoView = jest.fn();

      scrollToElement(element);
      expect(element.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
      
      scrollToElement(element, 'auto');
      expect(element.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto' });
    });
  });
});
