import { Company } from './company';

export type DocumentCancelation = {
  payment_type_id: number | null;
  number: string;
  import: string | null;
  ctacte: string | null;
  imputation_date: any;
  bank: number | null;
  chequeOwner: string | null;
  chequeDate: any;
  chequeExpirate: any;
  comments: string | null;
  payment_type: string | null;
};

export type Pivot = {
  sale_invoices_id: number;
  receipt_id: number;
  percentage_payment: string;
  import_payment: string;
  percentage_paid_history: string;
  import_paid_history: string;
  created_at: string | null;
  updated_at: string | null;
};

export type PreviousPayment = {
  id: number;
  number: number;
  customer_id: number;
  company_id: number;
  user_id: number;
  total: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  saldo: string;
  pivot: Pivot;
};

export type InvoicesToCancel = {
  comprobante: string;
  created_at: string;
  importe: number;
  importe_previo_pagado: string;
  number: string | null;
  pto_vta?: number;
  percentage_paid_history: string;
  percentage_payment: string;
  saldo: number;
  toPayNow: string;
  total: number;
};

export type PrinteableReceiptDataAddress = {
  id: number;
  code: string | null;
  country_id: number;
  state_id: number;
  city: string;
  street: string;
  number: string | null;
  cp: string;
  obs: string | null;
  geocoder: string | null;
  addressable_id: number;
  addressable_type: string;
  type_id: number | null;
  active: number;
  between_streets: string | null;
  created_at: string;
  updated_at: string;
};

export type PrinteableReceiptDataCustomer = {
  id: number;
  name: string;
  lastname: string | null;
  email: string | null;
  phone: string | null;
  address: PrinteableReceiptDataAddress;
};

export type ReceiptData = {
  saldo: number;
  pto_vta_receipt: number;
  number: number;
  date: string;
};

export type PrinteableReceiptData = {
  company: Company;
  invoicesToCancel: InvoicesToCancel[];
  documentsCancelation: DocumentCancelation[];
  customer: PrinteableReceiptDataCustomer;
  receipt: ReceiptData;
  pdfName: string;
};
