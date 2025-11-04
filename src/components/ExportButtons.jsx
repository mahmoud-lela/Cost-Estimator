export default function ExportButtons({ targetRef, shareUrl }) {
  const handlePdf = async () => {
    try {
      if (!targetRef?.current) {
        alert('Invoice preview not found. Please try again.')
        return
      }

      const element = targetRef.current
      
      // Show loading state
      const button = document.querySelector('[data-pdf-button]')
      if (button) {
        button.textContent = 'Generating PDF...'
        button.disabled = true
      }

      // Dynamic import with better error handling
      let html2pdf
      try {
        const mod = await import('html2pdf.js')
        html2pdf = mod.default || mod
      } catch (importErr) {
        console.error('Failed to load html2pdf library:', importErr)
        alert('PDF library failed to load. Please refresh the page and try again.')
        return
      }

      // Generate PDF with optimized settings
      await html2pdf()
        .from(element)
        .set({
          margin: [15, 15, 15, 15],
          filename: `invoice-${new Date().toISOString().split('T')[0]}.pdf`,
          image: { 
            type: 'jpeg', 
            quality: 0.95 
          },
          html2canvas: { 
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            letterRendering: true
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
          },
        })
        .save()

    } catch (err) {
      console.error('PDF export failed:', err)
      alert(`PDF generation failed: ${err.message || 'Unknown error'}. Please try again.`)
    } finally {
      // Reset button state
      const button = document.querySelector('[data-pdf-button]')
      if (button) {
        button.textContent = 'Download PDF'
        button.disabled = false
      }
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopyLink = async () => {
    if (!shareUrl) return
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl)
      } else {
        const ta = document.createElement('textarea')
        ta.value = shareUrl
        ta.setAttribute('readonly', '')
        ta.style.position = 'absolute'
        ta.style.left = '-9999px'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      alert('Link copied to clipboard')
    } catch (err) {
      console.error('Copy failed', err)
      prompt('Copy this link:', shareUrl)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <button type="button" onClick={handlePdf} className="px-3 py-2 rounded bg-black text-white cursor-pointer transition-all duration-200 hover:bg-gray-800 hover:scale-105 active:scale-95" data-pdf-button>Download PDF</button>
      <button type="button" onClick={handlePrint} className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 active:scale-95">Print</button>
      <button type="button" onClick={handleCopyLink} className="px-3 py-2 rounded border border-gray-300 bg-white text-gray-700 cursor-pointer transition-all duration-200 hover:bg-gray-100 hover:border-gray-400 hover:scale-105 active:scale-95">Copy Link</button>
    </div>
  )
}


