import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import WysiwygEditor from "./WysiwygEditor";
import { mockServer } from "../../test/mockServer";
import { ContentState, EditorState } from "draft-js";
import { http, HttpResponse } from "msw";
import "@testing-library/jest-dom";
describe("WysiwygEditor Toolbar", () => {
  it("renders toolbar buttons correctly", () => {
    const mockOnChange = vi.fn();
    render(
      <WysiwygEditor
        value={EditorState.createEmpty()}
        onChange={mockOnChange}
      />
    );

    // Verify all toolbar buttons are rendered
    const boldButton = screen.getByText("B");
    const italicButton = screen.getByText("I");
    const underlineButton = screen.getByText("U");

    expect(boldButton).toBeInTheDocument();
    expect(italicButton).toBeInTheDocument();
    expect(underlineButton).toBeInTheDocument();
  });

  it("triggers onToggle for Bold correctly", () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();
    render(<WysiwygEditor value={editorState} onChange={mockOnChange} />);

    const boldButton = screen.getByText("B");
    fireEvent.mouseDown(boldButton);

    // Since onChange is mocked, it should be called
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("triggers onToggle for Italic correctly", () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();
    render(<WysiwygEditor value={editorState} onChange={mockOnChange} />);

    const italicButton = screen.getByText("I");
    fireEvent.mouseDown(italicButton);

    // Since onChange is mocked, it should be called
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("triggers onToggle for Underline correctly", () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createEmpty();
    render(<WysiwygEditor value={editorState} onChange={mockOnChange} />);

    const underlineButton = screen.getByText("U");
    fireEvent.mouseDown(underlineButton);

    // Since onChange is mocked, it should be called
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("Should Save the editor content", async () => {
    const mockOnChange = vi.fn();
    const editorState = EditorState.createWithContent(
      ContentState.createFromText("Test content to save")
    );

    // Mock server response setup
    mockServer.use(
      http.post(
        "https://dummyjson.com/products/add",
        async ({ request }) => {
          // Extract the request body
          const requestBody = await request.json();

          // Ensure the request body matches the editor's content
          expect(requestBody).toEqual({
            content: editorState.getCurrentContent().getPlainText(),
          });

          return HttpResponse.json({ msg: "Content saved successfully" });
        }
      )
    );

    render(<WysiwygEditor value={editorState} onChange={mockOnChange} />);

    // Simulate clicking the save button
    const saveFakePostButton = screen.getByText("Save Fake Post");
    fireEvent.click(saveFakePostButton);

    // Optionally, check the UI response after saving
    const successMessage = await screen.findByText(
      "Content saved successfully"
    );
    expect(successMessage).toBeInTheDocument();
  });
});
