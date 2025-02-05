import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TabsContainer } from "../../src/components/ui/TabsContainer";

describe("TabsContainer Component", () => {
  const mockTabs = [
    { label: "Tab 1", content: <div data-testid="tab-content">Content 1</div> },
    { label: "Tab 2", content: <div data-testid="tab-content">Content 2</div> },
  ];

  it("renders tab labels correctly", () => {
    render(<TabsContainer tabs={mockTabs} />);

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("displays the correct content when switching tabs", () => {
    render(<TabsContainer tabs={mockTabs} />);

    expect(screen.getByText("Content 1")).toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Tab 2"));

    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });
});
