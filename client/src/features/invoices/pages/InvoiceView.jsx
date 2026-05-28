import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import ClientCard from "../components/ClientCard";
import InvoiceSummary from "../components/InvoiceSummary";
// import InvoiceForm from "./InvoiceForm";
// import ClientDetails from "./ClientDetails";
// import InvoiceSummary from "./InvoiceSummary";
import { Button } from "@/components/ui/button";
import { InvoiceProvider } from "@/context/invoiceContext";

export default function InvoicePage() {
  return (
    <InvoiceProvider>
      <div className=" mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 ">
          <div className="lg:col-span-8 col-span-12">
            <div className="bg-card p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
              <InvoiceForm />
            </div>
          </div>

          <div className="lg:col-span-4 col-span-12">
              <ClientCard />
          </div>
        </div>
      </div>
    </InvoiceProvider>
  );
}