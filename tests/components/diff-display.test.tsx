import React from 'react';
import { render, screen } from '@testing-library/react';
import { DiffDisplay } from '@/components/diff-display';

describe('DiffDisplay', () => {
  it('should display added lines with green background', () => {
    const diffs = [
      { added: true, value: 'added line\n' }
    ];

    render(<DiffDisplay diffs={diffs} />);

    expect(screen.getByText('+ added line')).toBeInTheDocument();
    expect(screen.getByText('+ added line')).toHaveClass('bg-green-100', 'text-green-700');
  });

  it('should display removed lines with red background', () => {
    const diffs = [
      { removed: true, value: 'removed line\n' }
    ];

    render(<DiffDisplay diffs={diffs} />);

    expect(screen.getByText('- removed line')).toBeInTheDocument();
    expect(screen.getByText('- removed line')).toHaveClass('bg-red-100', 'text-red-700');
  });

  it('should display unchanged lines without background', () => {
    const diffs = [
      { value: 'unchanged line\n' }
    ];

    render(<DiffDisplay diffs={diffs} />);

    expect(screen.getByText('unchanged line')).toBeInTheDocument();
    expect(screen.getByText('unchanged line')).not.toHaveClass('bg-green-100');
    expect(screen.getByText('unchanged line')).not.toHaveClass('bg-red-100');
  });

  it('should handle multiple lines in a single diff part', () => {
    const diffs = [
      { added: true, value: 'line1\nline2\n' }
    ];

    render(<DiffDisplay diffs={diffs} />);

    expect(screen.getByText('+ line1')).toBeInTheDocument();
    expect(screen.getByText('+ line2')).toBeInTheDocument();
  });

  it('should handle empty diff array', () => {
    const diffs: any[] = [];

    render(<DiffDisplay diffs={diffs} />);

    const preElement = document.querySelector('pre');
    expect(preElement).toBeInTheDocument();
  });

  it('should apply correct CSS classes to container', () => {
    const diffs = [{ value: 'test' }];

    render(<DiffDisplay diffs={diffs} />);

    const preElement = document.querySelector('pre');
    expect(preElement).toHaveClass('border', 'mt-4', 'p-4', 'whitespace-pre-wrap', 'bg-card', 'rounded-md');
  });
});