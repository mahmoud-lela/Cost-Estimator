import { forwardRef } from 'react'

const InvoicePreview = forwardRef(function InvoicePreview({ estimate, logoUrl, companyName, invoiceNumber }, ref) {
  const today = new Date().toLocaleDateString()
  
  // Check if we're in mobile view
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  
  // PDF-compatible styles with mobile responsiveness
  const pdfStyles = {
    container: {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: isMobile ? '16px' : '32px',
      width: '100%',
      maxWidth: isMobile ? '100%' : '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      fontSize: isMobile ? '14px' : '16px'
    },
    grayText: { color: '#6b7280' },
    grayBg: { backgroundColor: '#f9fafb' },
    grayBorder: { borderColor: '#e5e7eb' },
    logoPlaceholder: {
      width: isMobile ? '40px' : '48px',
      height: isMobile ? '40px' : '48px',
      backgroundColor: '#e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '12px' : '14px',
      fontWeight: '600'
    },
    headerContainer: {
      display: 'flex',
      alignItems: isMobile ? 'flex-start' : 'center',
      justifyContent: 'space-between',
      marginBottom: '24px',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '16px' : '0'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '12px'
    },
    invoiceTitle: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: 'bold'
    },
    projectSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '12px' : '16px',
      marginBottom: '24px',
      fontSize: isMobile ? '13px' : '14px'
    },
    tableContainer: {
      width: '100%',
      overflowX: isMobile ? 'auto' : 'visible',
      marginBottom: '16px'
    },
    table: {
      width: '100%',
      fontSize: isMobile ? '12px' : '14px',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      borderCollapse: 'collapse',
      minWidth: isMobile ? '400px' : 'auto'
    },
    tableHeader: {
      padding: isMobile ? '6px 8px' : '8px 12px',
      borderBottom: '1px solid #e5e7eb'
    },
    tableCell: {
      padding: isMobile ? '6px 8px' : '8px 12px'
    },
    summaryContainer: {
      marginTop: '16px',
      width: '100%',
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-end'
    },
    summaryBox: {
      width: isMobile ? '100%' : '288px',
      fontSize: isMobile ? '13px' : '14px',
      maxWidth: isMobile ? '320px' : 'none'
    }
  }
  
  return (
    <div ref={ref} style={pdfStyles.container}>
      <div style={pdfStyles.headerContainer}>
        <div style={pdfStyles.headerLeft}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" style={{ width: pdfStyles.logoPlaceholder.width, height: pdfStyles.logoPlaceholder.height, objectFit: 'contain' }} />
          ) : (
            <div style={pdfStyles.logoPlaceholder}>LOGO</div>
          )}
          <div>
            <div style={pdfStyles.invoiceTitle}>{companyName || 'Planktor'}</div>
            <div style={{ fontSize: isMobile ? '12px' : '14px', ...pdfStyles.grayText }}>#{invoiceNumber || 'DRAFT'}</div>
          </div>
        </div>
        <div style={{ textAlign: isMobile ? 'left' : 'right', fontSize: isMobile ? '12px' : '14px' }}>
          <div style={pdfStyles.grayText}>Date</div>
          <div>{today}</div>
        </div>
      </div>

      <div style={pdfStyles.projectSection}>
        <div>
          <div style={pdfStyles.grayText}>Project</div>
          <div style={{ fontWeight: '500' }}>{estimate.projectName || 'Untitled Project'}</div>
        </div>
        <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
          <div style={pdfStyles.grayText}>Bill To</div>
          <div style={{ fontWeight: '500' }}>{estimate.clientName || 'Client'}</div>
        </div>
      </div>

      <div style={pdfStyles.tableContainer}>
        <table style={pdfStyles.table}>
          <thead>
            <tr style={{ textAlign: 'left', backgroundColor: '#f9fafb' }}>
              <th style={pdfStyles.tableHeader}>Description</th>
              <th style={{ ...pdfStyles.tableHeader, textAlign: 'right' }}>Hours</th>
              <th style={{ ...pdfStyles.tableHeader, textAlign: 'right' }}>Rate</th>
              <th style={{ ...pdfStyles.tableHeader, textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={pdfStyles.tableCell}>Project Work (incl. revisions & add-ons)</td>
              <td style={{ ...pdfStyles.tableCell, textAlign: 'right' }}>{estimate.hours}</td>
              <td style={{ ...pdfStyles.tableCell, textAlign: 'right' }}>${estimate.rate}</td>
              <td style={{ ...pdfStyles.tableCell, textAlign: 'right' }}>${estimate.subtotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={pdfStyles.summaryContainer}>
        <div style={pdfStyles.summaryBox}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span>Subtotal</span><span>${estimate.subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span>Discount</span><span>-${estimate.discount.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
            <span>Tax ({estimate.taxRate}%)</span><span>${estimate.tax.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #e5e7eb', marginTop: '8px', fontWeight: '600', fontSize: isMobile ? '15px' : '16px' }}>
            <span>Total</span><span>${estimate.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px', fontSize: isMobile ? '11px' : '12px', ...pdfStyles.grayText }}>
        <div style={{ marginBottom: '4px' }}>Complexity: {estimate.complexity}</div>
        <div style={{ marginBottom: '4px' }}>Revisions: {estimate.revisions}</div>
        <div>Add-ons: {Object.entries(estimate.addOns).filter(([,v])=>v).map(([k])=>k).join(', ') || 'None'}</div>
      </div>
    </div>
  )
})

export default InvoicePreview


