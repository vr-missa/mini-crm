import React from 'react';
import { render, screen } from "@testing-library/react";
import CustomerGrid from "../components/CustomerGrid";
import { describe, it, expect } from "vitest";

describe("CustomerGrid Component", () => {
  it("renders customer data correctly", () => {
    const mockCustomers = [
      { id: 1, name: "Mortada", createdDate: "2025-11-04T08:03:22.193649" },
      { id: 2, name: "Wissam", createdDate: "2025-11-04T08:05:22.193649" },
    ];

    render(
      <CustomerGrid
        customers={mockCustomers}
        onView={() => {}}
        onDelete={() => {}}
      />
    );

    // Ensure the table headers exist
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Created Date")).toBeInTheDocument();

    // Verify that customer IDs and names are rendered
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Mortada")).toBeInTheDocument();
    expect(screen.getByText("Wissam")).toBeInTheDocument();
  });

  it("renders message when no customers exist", () => {
    render(
      <CustomerGrid
        customers={[]}
        onView={() => {}}
        onDelete={() => {}}
      />
    );

    expect(screen.getByText("No customers found.")).toBeInTheDocument();
  });
});
