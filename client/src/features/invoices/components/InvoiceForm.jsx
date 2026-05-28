import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ItemsTable from "./ItemsTable";
import { useInvoiceState, useInvoiceDispatch } from "@/hooks/Invoicehooks";

export default function InvoiceForm() {
  const state = useInvoiceState();
  const dispatch = useInvoiceDispatch();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Input type="datetime-local" value={state.issueDate} onChange={e => dispatch({ type: "UPDATE_FIELD", field: "issueDate", value: e.target.value })} />
        <Input type="datetime-local" value={state.dueDate} onChange={e => dispatch({ type: "UPDATE_FIELD", field: "dueDate", value: e.target.value })} />
      </div>

      <ItemsTable />

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Textarea placeholder="Write a note & service descriptions." value={state.notes} onChange={e => dispatch({ type: "UPDATE_FIELD", field: "notes", value: e.target.value })} />
      </div>
    </div>
  );
}