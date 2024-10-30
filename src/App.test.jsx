// import {describe, expect, test} from 'vitest';
// import {fireEvent, render, screen} from '@testing-library/react';
// import App from './App';

// describe('counter tests', () => {
    
//   test("Counter should be 0 at the start", () => {
//     render(<App />);
//     expect(screen.getByText('count is: 0')).toBeDefined();
//   });

//   test("Counter should increment by one when clicked", async () => {
//     render(<App />);
//     const counter = screen.getByRole('button');
//     fireEvent.click(counter);
//     expect(await screen.getByText('count is: 1')).toBeDefined();
//   });

// });

// import {describe, it,} from 'vitest';
// import {render, screen} from '@testing-library/react';
// import App from './App';

// describe('launching', () => {
//   it('should show the current year', () => {
//     render(<App />);
//     screen.getByText(/CS/);
//   });
// });

// import {describe, it,} from 'vitest';
// import {render, screen} from '@testing-library/react';
// import App from './App';

// describe('launching', () => {
//   it('should show the current year', async () => {
//     render(<App />);
//     screen.findByText(/Coursdsfses/);
//   });
// });

import {describe, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';
import {useAuthState, useDbData} from './utilities/firebase';

const mockSchedule = {
  "title": "CS Courses for 1850-1851",
  "courses": {
  }
};

vi.mock('./utilities/firebase');

beforeEach(() => {
  useDbData.mockReturnValue([mockSchedule, null]);
  useAuthState.mockReturnValue([null]);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('launching', () => {
  it('should show the current year', () => {
    render(<App />);
    screen.getByText(/1850/);
  });
});





