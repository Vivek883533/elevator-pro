# Elevator Quotation Pro

Build a simple, professional, and highly dynamic Quotation Maker module for Aayush Elevator in React with Vite and TypeScript, populated with realistic dummy data.

Key requirements:
1. Core Concept: Create Template Once → Save It → Reuse It → Modify When Required → Generate Quotation. Include pre-built templates for Aayush Elevator (Standard Installation, Modernization, Elevator AMC Comprehensive/Non-Comprehensive, Repair Work).
2. Quotation Structure & Configurable Sections:
- Company Header & Logo (Aayush Elevator branding, contact, GSTIN)
- Quotation Number, Date, Validity
- Customer & Site Details (Society/Project Name, Contact Person, Address, GST)
- Elevator Technical Specifications (Load/Capacity in persons & kg, Speed, Number of Stops/Openings, Travel, Drive Type, Door Type, Car Finishes)
- Item / Service Table with automated calculations: Description, HSN/SAC, Quantity, Unit Rate, Total Amount
- Subtotal, Discount, CGST & SGST (9% + 9%) or IGST (18%), and Grand Total with Indian number formatting and words conversion
- Milestone-based Payment Terms (e.g. 30% Advance, 50% on Delivery, 15% on Erection, 5% on Handover)
- Terms & Conditions, Warranty, Exclusions
- Bank Details (NEFT/RTGS/IMPS/UPI)
- Authorized Signature & Company Stamp
- Footer
3. Dynamic Customization & Styling:
- Highly flexible styling: allow changing background colors, text colors, font sizes, alignments, borders, and margins on sections and individual table cells so the user isn't restricted.
- Section management: add, remove, reorder, hide/show sections.
- Add and edit custom fields and columns.
4. Quotation Workflow & Live Preview:
- Split-screen workspace: structured editor controls on the left and a live, zoomable 1:1 A4 print-ready sheet preview on the right.
- Actions: Save Template, Duplicate, Export/Download PDF, Print, Share.
- Quotation History dashboard to view, edit, duplicate, or print previously created quotations.
- Clean, intuitive interface with sensible defaults designed for business users.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e8c49896-4dbc-49d3-b023-7448119f22bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
