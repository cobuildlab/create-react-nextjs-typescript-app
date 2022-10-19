import { PROJECT_ID } from '../constants';

type LocalStorageHookType = {
  init: () => void;
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  clearAll: () => void;
};

/**
 * Local storage hook.
 *
 * @returns {LocalStorageHookType} - Hook state/methods.
 */
export const useLocalStorage = (): LocalStorageHookType => {
  const prefix = PROJECT_ID;

  /**
   *
   * @param name - Variable name.
   * @returns {string | null} - Current value.
   */
  const getItem = (name: string): string | null =>
    localStorage.getItem(`${prefix}-${name}`);

  /**
   *
   * @param name - Variable name.
   * @param value - Variable value.
   */
  const setItem = (name: string, value: string): void => {
    localStorage.setItem(`${prefix}-${name}`, value);

    // Update variables
    let variables = localStorage.getItem(prefix);

    if (variables !== null && variables.search(`${prefix}-${name}`) === -1) {
      variables = `${variables.length ? `${variables},` : ''}${prefix}-${name}`;
      localStorage.setItem(prefix, variables);
    }
  };

  /**
   * Method to init local storage variables.
   */
  const init = (): void => {
    localStorage.setItem(prefix, '');
  };

  /**
   * Method to clear all local storage variables.
   */
  const clearAll = (): void => {
    const variables = localStorage.getItem(prefix);
    if (variables) {
      variables.split(',').forEach((variable) => {
        localStorage.removeItem(variable);
      });
    }
    localStorage.removeItem(prefix);
  };

  return {
    init,
    getItem,
    setItem,
    clearAll,
  };
};
