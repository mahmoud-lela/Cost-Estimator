import { useEffect, useMemo, useRef, useState } from 'react'
import EstimatorForm from './components/EstimatorForm.jsx'
import CostSummary from './components/CostSummary.jsx'
import InvoicePreview from './components/InvoicePreview.jsx'
import ExportButtons from './components/ExportButtons.jsx'
import { calculateEstimate } from './lib/calc.js'

function useUrlState(defaults) {
  const [values, setValues] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    try {
      const raw = params.get('s')
      if (!raw) return defaults
      const parsed = JSON.parse(decodeURIComponent(atob(raw)))
      return { ...defaults, ...parsed }
    } catch {
      return defaults
    }
  })
  useEffect(() => {
    const encoded = btoa(encodeURIComponent(JSON.stringify(values)))
    const url = new URL(window.location.href)
    url.searchParams.set('s', encoded)
    window.history.replaceState({}, '', url.toString())
  }, [values])
  return [values, setValues]
}

function App() {
  const [values, setValues] = useUrlState({
    projectName: '',
    clientName: '',
    companyName: '',
    hours: 20,
    rate: 50,
    revisions: 2,
    platformComplexity: 'standard',
    addOns: { design: true, testing: true, deployment: false, analytics: false, auth: false },
    taxRate: 10,
    discount: 0,
    logoUrl: '/src/assets/image.png', // Use your assets logo
  })

  const estimate = useMemo(() => calculateEstimate(values), [values])
  const invoiceRef = useRef(null)
  const shareUrl = useMemo(() => window.location.href, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white no-print">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-semibold">Project Cost Estimator</h1>
          <ExportButtons targetRef={invoiceRef} shareUrl={shareUrl} />
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4 no-print">
            <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
              <h2 className="text-lg font-semibold mb-3">Inputs</h2>
              <EstimatorForm values={values} onChange={setValues} />
            </div>
            <CostSummary estimate={estimate} />
          </div>

          <div className="">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <InvoicePreview ref={invoiceRef} estimate={estimate} logoUrl={values.logoUrl} companyName={values.companyName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
