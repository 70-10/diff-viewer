import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ShareUrlSection } from '@/components/share-url-section';

describe('ShareUrlSection', () => {
  const mockOnCopy = vi.fn();
  const testUrl = 'https://example.com/test-url';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render share URL input field', () => {
    render(<ShareUrlSection shareUrl={testUrl} onCopy={mockOnCopy} />);

    const urlInput = screen.getByDisplayValue(testUrl);
    expect(urlInput).toBeInTheDocument();
    expect(urlInput).toHaveAttribute('readonly');
  });

  it('should render copy button', () => {
    render(<ShareUrlSection shareUrl={testUrl} onCopy={mockOnCopy} />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    expect(copyButton).toBeInTheDocument();
  });

  it('should call onCopy when copy button is clicked', () => {
    render(<ShareUrlSection shareUrl={testUrl} onCopy={mockOnCopy} />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it('should change button text to "Copied" after clicking', async () => {
    render(<ShareUrlSection shareUrl={testUrl} onCopy={mockOnCopy} />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  it('should revert button text back to "Copy" after 1 second', async () => {
    vi.useFakeTimers();
    
    render(<ShareUrlSection shareUrl={testUrl} onCopy={mockOnCopy} />);

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    expect(screen.getByText('Copied')).toBeInTheDocument();

    // Fast-forward time by 1 second
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(screen.getByText('Copy')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('should handle empty URL', () => {
    render(<ShareUrlSection shareUrl="" onCopy={mockOnCopy} />);

    const urlInput = screen.getByDisplayValue('');
    expect(urlInput).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    render(<ShareUrlSection shareUrl={testUrl} onCopy={mockOnCopy} />);

    const urlInput = screen.getByDisplayValue(testUrl);
    expect(urlInput).toHaveClass('bg-gray-100', 'border-gray-300', 'text-gray-900');
  });
});