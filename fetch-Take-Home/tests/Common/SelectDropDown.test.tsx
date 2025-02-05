import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SelectDropdown } from "../../src/components/ui/SelectDropDown";

describe("SelectDropdown Component", () => {
  it("renders correctly with a label", () => {
    render(
      <SelectDropdown
        label="Select a breed"
        value=""
        options={["Labrador", "Bulldog", "Golden Retriever"]}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Select a breed")).toBeInTheDocument();
  });

  it("calls onChange when an option is selected", () => {
    const mockOnChange = vi.fn();
    render(
      <SelectDropdown
        label="Select a breed"
        value=""
        options={["Labrador", "Bulldog", "Golden Retriever"]}
        onChange={mockOnChange}
      />
    );

    const dropdown = screen.getByRole("combobox");

    fireEvent.mouseDown(dropdown);

    fireEvent.click(screen.getByText("Bulldog"));
    expect(mockOnChange).toHaveBeenCalledWith("Bulldog");
  });
});
