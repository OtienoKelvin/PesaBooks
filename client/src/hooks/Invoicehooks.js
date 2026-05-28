import { useContext } from "react";
import {
    InvoiceStateContext,
    InvoiceDispatchContext,
} from "@/context/invoiceContext";


export function useInvoiceState() {
  return useContext(InvoiceStateContext);
}

export function useInvoiceDispatch() {
  return useContext(InvoiceDispatchContext);
}