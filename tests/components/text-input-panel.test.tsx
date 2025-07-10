import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextInputPanel } from '@/components/text-input-panel';

describe('TextInputPanel', () => {
  const mockOnText1Change = vi.fn();
  const mockOnText2Change = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render two text areas', () => {
    render(
      <TextInputPanel
        text1=""
        text2=""
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');

    expect(text1Area).toBeInTheDocument();
    expect(text2Area).toBeInTheDocument();
  });

  it('should display provided text values', () => {
    const text1Value = 'First text content';
    const text2Value = 'Second text content';

    render(
      <TextInputPanel
        text1={text1Value}
        text2={text2Value}
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');

    expect(text1Area).toHaveValue(text1Value);
    expect(text2Area).toHaveValue(text2Value);
  });

  it('should call onText1Change when first textarea changes', () => {
    render(
      <TextInputPanel
        text1=""
        text2=""
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const text1Area = screen.getByPlaceholderText('Text 1');
    const newValue = 'New text for area 1';

    fireEvent.change(text1Area, { target: { value: newValue } });

    expect(mockOnText1Change).toHaveBeenCalledTimes(1);
    expect(mockOnText1Change).toHaveBeenCalledWith(newValue);
  });

  it('should call onText2Change when second textarea changes', () => {
    render(
      <TextInputPanel
        text1=""
        text2=""
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const text2Area = screen.getByPlaceholderText('Text 2');
    const newValue = 'New text for area 2';

    fireEvent.change(text2Area, { target: { value: newValue } });

    expect(mockOnText2Change).toHaveBeenCalledTimes(1);
    expect(mockOnText2Change).toHaveBeenCalledWith(newValue);
  });

  it('should apply correct CSS classes', () => {
    render(
      <TextInputPanel
        text1=""
        text2=""
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');

    expect(text1Area).toHaveClass('flex-1', 'h-96');
    expect(text2Area).toHaveClass('flex-1', 'h-96');
  });

  it('should have correct container layout classes', () => {
    const { container } = render(
      <TextInputPanel
        text1=""
        text2=""
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const containerDiv = container.firstChild;
    expect(containerDiv).toHaveClass('flex', 'mb-4', 'space-x-4');
  });

  it('should handle empty strings', () => {
    render(
      <TextInputPanel
        text1=""
        text2=""
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');

    expect(text1Area).toHaveValue('');
    expect(text2Area).toHaveValue('');
  });

  it('should handle multiline text', () => {
    const multilineText1 = 'Line 1\nLine 2\nLine 3';
    const multilineText2 = 'Another line 1\nAnother line 2';

    render(
      <TextInputPanel
        text1={multilineText1}
        text2={multilineText2}
        onText1Change={mockOnText1Change}
        onText2Change={mockOnText2Change}
      />
    );

    const text1Area = screen.getByPlaceholderText('Text 1');
    const text2Area = screen.getByPlaceholderText('Text 2');

    expect(text1Area).toHaveValue(multilineText1);
    expect(text2Area).toHaveValue(multilineText2);
  });
});