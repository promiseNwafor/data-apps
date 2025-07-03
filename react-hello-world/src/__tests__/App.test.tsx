import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders Hello World and the Sun icon', () => {
    render(<App />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    expect(screen.getByTestId('lucide-icon')).toBeInTheDocument();
  });
}); 