import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DogsHomePage } from "../../src/pages/home/DogsHome";

describe("DogsHomePage Component", () => {
  it("renders Search Dogs and Matches tabs", () => {
    render(<DogsHomePage />);

    expect(screen.getByText("Search Dogs")).toBeInTheDocument();
    expect(screen.getByText("Matches")).toBeInTheDocument();
  });

  it("switches between tabs correctly", () => {
    render(<DogsHomePage />);

    fireEvent.click(screen.getByText("Matches"));
    expect(screen.getByText("Favorite Dogs")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Search Dogs"));
    expect(screen.getByText("Browse Available Dogs")).toBeInTheDocument();
  });
});
