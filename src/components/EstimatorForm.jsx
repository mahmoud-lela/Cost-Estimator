import { useId } from 'react'

export default function EstimatorForm({ values, onChange }) {
  const id = useId()

  const handle = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    onChange({ ...values, [key]: value })
  }

  const handleAddOn = (key) => (e) => {
    onChange({ ...values, addOns: { ...values.addOns, [key]: e.target.checked } })
  }

  return (
    <form className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${id}-project`} className="block text-sm font-medium">Project name</label>
          <input id={`${id}-project`} value={values.projectName} onChange={handle('projectName')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" placeholder="Website Redesign" />
        </div>
        <div>
          <label htmlFor={`${id}-client`} className="block text-sm font-medium">Client name</label>
          <input id={`${id}-client`} value={values.clientName} onChange={handle('clientName')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" placeholder="Acme Inc." />
        </div>
        <div>
          <label htmlFor={`${id}-logo`} className="block text-sm font-medium">Logo URL</label>
          <input id={`${id}-logo`} value={values.logoUrl} onChange={handle('logoUrl')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" placeholder="/src/assets/image.png" />
        </div>
        <div>
          <label htmlFor={`${id}-hours`} className="block text-sm font-medium">Estimated hours</label>
          <input id={`${id}-hours`} type="number" min="0" value={values.hours} onChange={handle('hours')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
        <div>
          <label htmlFor={`${id}-rate`} className="block text-sm font-medium">Rate per hour ($)</label>
          <input id={`${id}-rate`} type="number" min="0" value={values.rate} onChange={handle('rate')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
        <div>
          <label htmlFor={`${id}-revisions`} className="block text-sm font-medium">Revisions</label>
          <input id={`${id}-revisions`} type="number" min="0" value={values.revisions} onChange={handle('revisions')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
        <div>
          <label htmlFor={`${id}-complexity`} className="block text-sm font-medium">Platform complexity</label>
          <select id={`${id}-complexity`} value={values.platformComplexity} onChange={handle('platformComplexity')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white">
            <option value="simple">Simple</option>
            <option value="standard">Standard</option>
            <option value="complex">Complex</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      <fieldset className="border border-gray-200 rounded-lg p-4 bg-gray-50/60">
        <legend className="text-sm font-medium">Add-ons</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900 transition-colors">
            <input className="accent-black w-4 h-4 flex-shrink-0" type="checkbox" checked={!!values.addOns.design} onChange={handleAddOn('design')} />
            <span>Design</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900 transition-colors">
            <input className="accent-black w-4 h-4 flex-shrink-0" type="checkbox" checked={!!values.addOns.testing} onChange={handleAddOn('testing')} />
            <span>Testing</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900 transition-colors">
            <input className="accent-black w-4 h-4 flex-shrink-0" type="checkbox" checked={!!values.addOns.deployment} onChange={handleAddOn('deployment')} />
            <span>Deployment</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900 transition-colors">
            <input className="accent-black w-4 h-4 flex-shrink-0" type="checkbox" checked={!!values.addOns.analytics} onChange={handleAddOn('analytics')} />
            <span>Analytics</span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-gray-900 transition-colors">
            <input className="accent-black w-4 h-4 flex-shrink-0" type="checkbox" checked={!!values.addOns.auth} onChange={handleAddOn('auth')} />
            <span>Auth</span>
          </label>
        </div>
      </fieldset>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${id}-tax`} className="block text-sm font-medium">Tax rate (%)</label>
          <input id={`${id}-tax`} type="number" min="0" step="0.01" value={values.taxRate} onChange={handle('taxRate')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
        <div>
          <label htmlFor={`${id}-discount`} className="block text-sm font-medium">Discount ($)</label>
          <input id={`${id}-discount`} type="number" min="0" step="0.01" value={values.discount} onChange={handle('discount')} className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
        </div>
      </div>
    </form>
  )
}


