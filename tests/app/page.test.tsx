import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useSearchParams } from 'next/navigation';
import Home from '@/app/page';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn()
}));

// Mock navigator.clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn()
  }
});

describe('Home Page', () => {
  const mockUseSearchParams = useSearchParams as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'location', {
      value: { href: 'http://localhost:3000' },
      writable: true
    });
  });

  it('should render page title', () => {
    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue(null)
    } as any);

    render(<Home />);

    expect(screen.getByText('Diff Viewer')).toBeInTheDocument();
  });

  it('should render two text input areas', () => {
    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue(null)
    } as any);

    render(<Home />);

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');
    expect(text1Area).toBeInTheDocument();
    expect(text2Area).toBeInTheDocument();
  });

  it('should load data from URL parameters', () => {
    const compressedData = 'N4IgLgpgHmCCIC5zTARhAGmTAQo7YATCAL5A'; // "text1" and "text2" compressed
    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockImplementation((key) => key === 'data' ? compressedData : null)
    } as any);

    render(<Home />);

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');
    expect(text1Area).toHaveValue('text1');
    expect(text2Area).toHaveValue('text2');
  });

  it('should calculate diff when text changes', () => {
    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue(null)
    } as any);

    render(<Home />);

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');
    
    fireEvent.change(text1Area, { target: { value: 'hello' } });
    fireEvent.change(text2Area, { target: { value: 'world' } });

    // Should show diff output
    expect(screen.getByText('- hello')).toBeInTheDocument();
    expect(screen.getByText('+ world')).toBeInTheDocument();
  });

  it('should handle empty initial state', () => {
    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue(null)
    } as any);

    render(<Home />);

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');
    expect(text1Area).toHaveValue('');
    expect(text2Area).toHaveValue('');
  });

  it('should render share URL section', () => {
    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue(null)
    } as any);

    render(<Home />);

    expect(screen.getByRole('button', { name: /copy/i })).toBeInTheDocument();
  });

  it('should handle copy URL functionality', () => {
    const writeTextMock = vi.fn();
    (navigator.clipboard.writeText as any) = writeTextMock;

    mockUseSearchParams.mockReturnValue({
      get: vi.fn().mockReturnValue(null)
    } as any);

    render(<Home />);

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');
    fireEvent.change(text1Area, { target: { value: 'test1' } });
    fireEvent.change(text2Area, { target: { value: 'test2' } });

    const copyButton = screen.getByRole('button', { name: /copy/i });
    fireEvent.click(copyButton);

    expect(writeTextMock).toHaveBeenCalled();
  });
});