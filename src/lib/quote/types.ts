export type Align = "left" | "center" | "right";

export interface BoxStyle {
  bg?: string | undefined;
  color?: string | undefined;
  fontSize?: number | undefined;
  align?: Align | undefined;
  borderColor?: string | undefined;
  borderWidth?: number | undefined;
  padding?: number | undefined;
  marginTop?: number | undefined;
  bold?: boolean | undefined;
}

export type SectionType =
  | "header"
  | "meta"
  | "customer"
  | "specs"
  | "items"
  | "totals"
  | "payment"
  | "terms"
  | "warranty"
  | "exclusions"
  | "bank"
  | "signature"
  | "footer"
  | "custom"
  | "custom_table";

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  style: BoxStyle;
  content?: string | undefined; // for custom
  columns?: Column[] | undefined; // for custom_table
  items?: Item[] | undefined; // for custom_table
}

export interface Field {
  id: string;
  label: string;
  value: string;
}
export interface Column {
  id: string;
  label: string;
  align: Align;
  width?: number;
}
export interface Item {
  id: string | undefined;
  cells: Record<string, string>;
}
export interface Milestone {
  id: string;
  label: string;
  pct: number;
}

export type QuoteLayout =
  | "classic" // Logo left, info right, solid header bar — professional corporate
  | "bold-banner" // Full-width colored banner header, large logo, centered company name
  | "minimal" // Clean left-aligned header, thin accent line, no table borders
  | "split-header" // Two-column header: left=logo+name, right=colorblock with quote details
  | "modern-card" // Dark sidebar accent strip on left, card-based sections
  | "formal"; // Centered logo+name, double ruled lines, numbered sections;

export interface Quote {
  id: string;
  kind: "template" | "quotation";
  name: string;
  templateName?: string | undefined;
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
  createdAt: string;
  updatedAt: string;
  layout?: QuoteLayout | undefined;
  theme: {
    primary: string;
    accent: string;
    text: string;
    font: string;
    baseSize: number;
  };
  company: {
    name: string;
    tagline: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    gstin: string;
    logo?: string | undefined;
  };
  meta: {
    number: string;
    date: string;
    validityDays: number;
    reference: string;
    extra: Field[];
  };
  customer: {
    society: string;
    contact: string;
    phone: string;
    email: string;
    address: string;
    gstin: string;
    extra: Field[];
  };
  specs: Field[];
  columns: Column[];
  items: Item[];
  cellStyles: Record<string, BoxStyle>;
  discountPct: number;
  taxMode: "intra" | "inter";
  milestones: Milestone[];
  terms: string;
  warranty: string;
  exclusions: string;
  bank: {
    accountName: string;
    bank: string;
    account: string;
    ifsc: string;
    branch: string;
    upi: string;
  };
  signatory: { name: string; designation: string };
  footer: string;
  sections: Section[];
  offsets?: Record<string, { x: number; y: number }> | undefined;
  hiddenFields?: string[];
  fieldStyles?: Record<string, BoxStyle>;
}
