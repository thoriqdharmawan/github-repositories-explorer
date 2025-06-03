import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../accordion";

describe("Accordion Components", () => {
  describe("Accordion", () => {
    it("renders accordion root element", () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const accordion = screen.getByRole("presentation");
      expect(accordion).toBeInTheDocument();
      expect(accordion).toHaveAttribute("data-slot", "accordion");
    });
  });

  describe("AccordionItem", () => {
    it("renders accordion item with correct styling", () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" data-testid="accordion-item">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const item = screen.getByTestId("accordion-item");
      expect(item).toBeInTheDocument();
      expect(item).toHaveAttribute("data-slot", "accordion-item");
      expect(item).toHaveClass("border-b", "last:border-b-0");
    });
  });

  describe("AccordionTrigger", () => {
    it("renders trigger button with chevron icon", () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute("data-slot", "accordion-trigger");
      expect(trigger).toHaveTextContent("Test Trigger");

      const chevron = trigger.querySelector("svg");
      expect(chevron).toBeInTheDocument();
    });

    it("toggles accordion when clicked", () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("data-state", "closed");

      fireEvent.click(trigger);
      expect(trigger).toHaveAttribute("data-state", "open");
    });
  });

  describe("AccordionContent", () => {
    it("renders content when accordion is open", () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const content = screen.getByText("Test Content");
      expect(content).toBeInTheDocument();

      const contentContainer = content.closest(
        '[data-slot="accordion-content"]',
      );
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveAttribute(
        "data-slot",
        "accordion-content",
      );
    });

    it("applies correct styling classes", () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent className="custom-class">
              Test Content
            </AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const content = screen.getByText("Test Content");
      const wrapper = content.parentElement;

      expect(wrapper).toHaveClass(
        "data-[state=closed]:animate-accordion-up",
        "data-[state=open]:animate-accordion-down",
        "overflow-hidden",
      );
    });
  });

  describe("Integration", () => {
    it("handles multiple accordion items", () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>First Content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>Second Content</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const triggers = screen.getAllByRole("button");
      expect(triggers).toHaveLength(2);
      expect(triggers[0]).toHaveTextContent("First Item");
      expect(triggers[1]).toHaveTextContent("Second Item");
    });

    it('allows multiple items to be open with type="multiple"', () => {
      render(
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>First Content</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>Second Content</AccordionContent>
          </AccordionItem>
        </Accordion>,
      );

      const triggers = screen.getAllByRole("button");

      fireEvent.click(triggers[0]);
      fireEvent.click(triggers[1]);

      expect(triggers[0]).toHaveAttribute("data-state", "open");
      expect(triggers[1]).toHaveAttribute("data-state", "open");
    });
  });
});
