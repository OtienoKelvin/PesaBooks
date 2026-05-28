import React from "react";
import ItemRow from "./ItemRow";
import { Button } from "@/components/ui/button";
import { useInvoiceState, useInvoiceDispatch } from "@/hooks/Invoicehooks";

export default function ItemsTable() {
  const state = useInvoiceState();
  const dispatch = useInvoiceDispatch();

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-2 font-semibold border-b pb-2">
        <div className="col-span-6">Item Description</div>
        <div className="col-span-2">Qty</div>
        <div className="col-span-2">Unit Price</div>
        <div className="col-span-1 text-right">Total</div>
        <div className="col-span-1" />
      </div>

      {state.items.map(item => <ItemRow key={item.id} item={item} />)}

      <div className="pt-2">
        <Button onClick={() => dispatch({ type: "ADD_ITEM" })}>Add Item</Button>
      </div>
    </div>
  );
}