import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MatchedDogs } from "../../src/pages/matches/MatchedDogs";

describe("MatchedDogs Component", () => {
  const mockToggleFavorite = vi.fn();
  const mockFavoriteDogs = ["1", "2"];

  it("renders Find a Match button when there are favorite dogs", () => {
    render(
      <MatchedDogs
        favoriteDogs={mockFavoriteDogs}
        toggleFavorite={mockToggleFavorite}
      />
    );

    expect(screen.getByText("Find a Match")).toBeInTheDocument();
  });

  it("renders Favorite Dogs section", () => {
    render(
      <MatchedDogs
        favoriteDogs={mockFavoriteDogs}
        toggleFavorite={mockToggleFavorite}
      />
    );

    expect(screen.getByText("Favorite Dogs")).toBeInTheDocument();
  });

  it("renders no favorite dogs message when list is empty", () => {
    render(
      <MatchedDogs favoriteDogs={[]} toggleFavorite={mockToggleFavorite} />
    );

    expect(screen.getByText("No favorite dogs yet.")).toBeInTheDocument();
  });

  it("calls handleFindMatch when Find a Match button is clicked", () => {
    render(
      <MatchedDogs
        favoriteDogs={mockFavoriteDogs}
        toggleFavorite={mockToggleFavorite}
      />
    );

    fireEvent.click(screen.getByText("Find a Match"));
  });
});
