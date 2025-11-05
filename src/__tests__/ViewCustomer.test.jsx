import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import ViewCustomer from "../components/ViewCustomer";
import Modal from "../components/Modal";
import { describe, it, expect, vi } from "vitest";
import api from "../api/axios";

// ✅ Mock the axios module
vi.mock("../api/axios");

describe("ViewCustomer inside Modal", () => {
  it("renders customer data correctly inside the modal", async () => {
    // Arrange mock data returned by the API
    const mockCustomer = {
      id: 2,
      name: "Mortada",
      createdDate: "2025-11-04T08:03:22.193649",
      modifiedDate: null,
    };
    api.get.mockResolvedValueOnce({ data: mockCustomer });

    // Render the Modal with ViewCustomer inside it
    render(
      <Modal onClose={() => {}}>
        <ViewCustomer id={2} />
      </Modal>
    );

    // Verify loading state appears first
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the customer data to be displayed
    await waitFor(() => {
      expect(screen.getByText("Customer")).toBeInTheDocument();
    });

    // Verify that customer details are shown correctly
    expect(screen.getByText("ID:")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Name:")).toBeInTheDocument();
    expect(screen.getByText("Mortada")).toBeInTheDocument();
    expect(screen.getByText("Created Date:")).toBeInTheDocument();
    expect(screen.getByText("2025-11-04T08:03:22.193649")).toBeInTheDocument();
    expect(screen.getByText("Modified Date:")).toBeInTheDocument();
    expect(screen.getByText("—")).toBeInTheDocument(); // since modifiedDate is null
  });

  it("renders 'No data' when no customer is loaded", async () => {
    api.get.mockResolvedValueOnce({ data: null });

    render(
      <Modal onClose={() => {}}>
        <ViewCustomer id={99} />
      </Modal>
    );

    await waitFor(() => {
      expect(screen.getByText("No data")).toBeInTheDocument();
    });
  });
});
