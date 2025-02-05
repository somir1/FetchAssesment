import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DogCard } from "../../src/components/dogs/DogCard";
import React from "react";

describe("DogCard Component", () => {
  const mockDog = {
    id: "1",
    img: "dog.jpg",
    name: "Buddy",
    age: 3,
    zip_code: "12345",
    breed: "Golden Retriever",
  };

  it("renders dog details correctly", () => {
    render(
      <DogCard dog={mockDog} isFavorited={false} onToggleFavorite={() => {}} />
    );

    expect(screen.getByText("Buddy")).toBeInTheDocument();
    expect(screen.getByText("Golden Retriever")).toBeInTheDocument();

    const ageElement = screen.getAllByText((content) =>
      content.includes("3")
    )[0];

    expect(ageElement).toBeInTheDocument();
  });

  it("calls onToggleFavorite when the favorite button is clicked", () => {
    const mockToggleFavorite = vi.fn();
    render(
      <DogCard
        dog={mockDog}
        isFavorited={false}
        onToggleFavorite={mockToggleFavorite}
      />
    );

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
