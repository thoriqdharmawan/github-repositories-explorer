import { render, screen, fireEvent } from '@testing-library/react';
import DetailWrapper from '../DetailWrapper';

describe('DetailWrapper', () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    title: 'Test Title',
    onClose: mockOnClose,
    children: <div>Test Content</div>,
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders with title and children', () => {
    render(<DetailWrapper {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<DetailWrapper {...defaultProps} />);

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('hides header when hideHeader is true', () => {
    render(<DetailWrapper {...defaultProps} hideHeader={true} />);

    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DetailWrapper {...defaultProps} className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies border-l class when header is visible', () => {
    const { container } = render(<DetailWrapper {...defaultProps} />);

    expect(container.firstChild).toHaveClass('border-l');
  });

  it('does not apply border-l class when header is hidden', () => {
    const { container } = render(<DetailWrapper {...defaultProps} hideHeader={true} />);

    expect(container.firstChild).not.toHaveClass('border-l');
  });
});