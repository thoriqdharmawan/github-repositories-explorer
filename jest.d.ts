/// <reference types="@testing-library/jest-dom" />

import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveAttribute(attribute: string, value?: string): R;
      toBeDisabled(): R;
      toBeRequired(): R;
      toHaveFocus(): R;
      toHaveValue(value: string | number): R;
    }
  }
}
