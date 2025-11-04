export default function CostSummary({ estimate }) {
  return (
    <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Cost Summary</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-gray-600">Computed hours</div>
        <div className="text-right">{estimate.hours} h</div>
        <div className="text-gray-600">Rate</div>
        <div className="text-right">${estimate.rate}/h</div>
        <div className="text-gray-600">Subtotal</div>
        <div className="text-right">${estimate.subtotal.toFixed(2)}</div>
        <div className="text-gray-600">Discount</div>
        <div className="text-right">-${estimate.discount.toFixed(2)}</div>
        <div className="text-gray-600">Tax ({estimate.taxRate}%)</div>
        <div className="text-right">${estimate.tax.toFixed(2)}</div>
      </div>
      <div className="mt-4 flex justify-between items-center border-t pt-4">
        <div className="text-base font-medium">Total</div>
        <div className="text-2xl font-bold">${estimate.total.toFixed(2)}</div>
      </div>
    </div>
  )
}


