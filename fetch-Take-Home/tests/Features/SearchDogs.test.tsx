import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchDogs } from "../../src/pages/search/SearchDogs";

describe("SearchDogs Component", () => {
  const mockToggleFavorite = vi.fn();
  const mockFavoriteDogs = [];

  it("renders search heading", async () => {
    render(
      <SearchDogs
        favoriteDogs={mockFavoriteDogs}
        toggleFavorite={mockToggleFavorite}
      />
    );
    expect(screen.getByText("Browse Available Dogs")).toBeInTheDocument();
  });

  it("renders Reset button", async () => {
    render(
      <SearchDogs
        favoriteDogs={mockFavoriteDogs}
        toggleFavorite={mockToggleFavorite}
      />
    );
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });
});
