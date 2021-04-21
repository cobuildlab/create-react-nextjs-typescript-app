import { render } from '@testing-library/react';
import crypto from 'crypto';
import App from './App';

Object.defineProperty(global, 'crypto', {
  value: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length),
  },
});
global.crypto.subtle = {};
// eslint-disable-next-line jest/expect-expect
test('renders learn react link', () => {
  render(<App />);
});
