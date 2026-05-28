import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInvoiceDispatch, useInvoiceState } from "@/hooks/Invoicehooks";
import { CircleMinus } from "lucide-react";

export default function ItemRow({ item }) {
  const dispatch = useInvoiceDispatch();
  const state = useInvoiceState();

  const update = (payload) => dispatch({ type: "UPDATE_ITEM", id: item.id, payload });

  return (
    <div className="grid grid-cols-12 gap-2 items-center py-2">
      <div className="col-span-6">
        <Input value={item.description} onChange={e => update({ description: e.target.value })} placeholder="Item description" />
      </div>
      <div className="col-span-2">
        <Input type="number" value={item.qty} onChange={e => update({ qty: Number(e.target.value) })} min={0} />
      </div>
      <div className="col-span-2">
        <Input type="number" value={item.unitPrice} onChange={e => update({ unitPrice: Number(e.target.value) })} min={0} step="0.01" />
      </div>
      <div className="col-span-1 text-right">
        <div> {(item.qty * item.unitPrice).toFixed(2)}</div>
      </div>
      <div className="col-span-1 text-right">
        {state.items.length > 1 && (
          <Button variant="ghost" size="sm" onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}>
            <CircleMinus />
          </Button>
        )}
      </div>
    </div>
  );
}