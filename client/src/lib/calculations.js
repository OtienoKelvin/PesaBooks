export function subtotal(items) {
  return items.reduce((s, it) => s + (Number(it.qty || 0) * Number(it.unitPrice || 0)), 0);
}

export function taxAmount(subtotalValue, taxPercent) {
  return (subtotalValue * (Number(taxPercent || 0) / 100));
}

export function totalAmount(subtotalValue, taxValue, discount) {
  return subtotalValue + taxValue - Number(discount || 0);
}