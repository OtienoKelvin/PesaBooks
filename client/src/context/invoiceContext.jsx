import React, { 
  createContext, 
  useReducer, 
} from "react";
import { v4 as uuid } from "uuid";

const InvoiceStateContext = createContext();
const InvoiceDispatchContext = createContext();

const initialState = {
  invoiceNumber: "",
  companyCode: "",
  projectName: "",
  issueDate: "",
  dueDate: "",
  notes: "",
  client: {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    stateCountry: "",
    pincode: "",
    contact: "",
    paymentMode: ""
  },
  items: [
    { id: uuid(), description: "", qty: 1, unitPrice: 0 }
  ],
  taxPercent: 16,
  discount: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE_CLIENT":
      return { ...state, client: { ...state.client, [action.field]: action.value } };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, { id: uuid(), description: "", qty: 0, unitPrice: 0 }] };
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map(i => i.id === action.id ? { ...i, ...action.payload } : i)
      };
    case "SET_TAX":
      return { ...state, taxPercent: action.value };
    case "SET_DISCOUNT":
      return { ...state, discount: action.value };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function InvoiceProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <InvoiceStateContext.Provider value={state}>
      <InvoiceDispatchContext.Provider value={dispatch}>
        {children}
      </InvoiceDispatchContext.Provider>
    </InvoiceStateContext.Provider>
  );
}

export { InvoiceStateContext, InvoiceDispatchContext };

