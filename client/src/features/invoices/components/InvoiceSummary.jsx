import React from "react";
import { useInvoiceState, useInvoiceDispatch } from "@/hooks/Invoicehooks";
import { subtotal, taxAmount, totalAmount } from "@/lib/calculations";
import { Input } from "@/components/ui/input";

export default function InvoiceSummary() {
  const state = useInvoiceState();
  const dispatch = useInvoiceDispatch();

  const sub = subtotal(state.items);
  const tax = taxAmount(sub, state.taxPercent);
  const total = totalAmount(sub, tax, state.discount);

  return (
    <div className="space-y-2 border p-4 rounded border-amber-400">
      <div className="flex justify-between">
        <div>Subtotal</div>
        <div> {sub.toFixed(2)}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div>Tax</div>
          <Input type="number" value={state.taxPercent} onChange={e => dispatch({ type: "SET_TAX", value: Number(e.target.value) })} className="w-20" />
          <div>%</div>
        </div>
        <div> {tax.toFixed(2)}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div>Discount</div>
          <Input type="number" value={state.discount} onChange={e => dispatch({ type: "SET_DISCOUNT", value: Number(e.target.value) })} className="w-28" />
        </div>
        <div>₹ {Number(state.discount || 0).toFixed(2)}</div>
      </div>

      <div className="flex justify-between font-bold text-lg pt-2 border-t">
        <div>Total Amount</div>
        <div>₹ {total.toFixed(2)}</div>
      </div>
    </div>
  );
}