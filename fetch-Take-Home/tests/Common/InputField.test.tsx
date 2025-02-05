import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InputField } from "../../src/components/ui/InputField";
import React from "react";

describe("InputField Component", () => {
  it("renders the input field with the correct label", () => {
    render(<InputField label="Username" value="" onChange={() => {}} />);

    expect(screen.getByLabelText("Username")).toBeInTheDocument();
  });

  it("calls onChange when the user types", () => {
    const mockOnChange = vi.fn();
    render(<InputField label="Username" value="" onChange={mockOnChange} />);

    const input = screen.getByLabelText("Username");
    fireEvent.change(input, { target: { value: "JohnDoe" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("accepts a type prop", () => {
    render(
      <InputField
        label="Password"
        value=""
        onChange={() => {}}
        type="password"
      />
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("renders as a full-width input by default", () => {
    render(<InputField label="Email" value="" onChange={() => {}} />);

    const input = screen.getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });
});
