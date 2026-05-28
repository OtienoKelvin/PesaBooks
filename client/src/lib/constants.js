const invoiceStatusColor = (status) => {
    switch (status) {
    case "Paid":
    return "bg-green-100 text-green-700"
    case "Pending":
    return "bg-yellow-100 text-yellow-700"
    case "Overdue":
    return "bg-red-100 text-red-700"
    default:
    return "bg-gray-100 text-gray-700"
    }
}

const ActionTypes = {
    ADD_ITEM: "ADD_ITEM",
    UPDATE_ITEM: "UPDATE_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    UPDATE_INVOICE: "UPDATE_INVOICE",
    SET_TAX: "SET_TAX",
    SET_DISCOUNT: "SET_DISCOUNT"
}

export { 
    invoiceStatusColor, 
    ActionTypes 

}