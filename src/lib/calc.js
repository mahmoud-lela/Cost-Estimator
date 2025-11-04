export function calculateEstimate(input) {
  const {
    projectName,
    clientName,
    hours = 0,
    rate = 0,
    revisions = 0,
    platformComplexity = 'standard',
    addOns = {},
    taxRate = 0,
    discount = 0,
  } = input;

  const baseHours = Number(hours) || 0;
  const hourlyRate = Number(rate) || 0;
  const revisionHours = (Number(revisions) || 0) * 1.5; 

  const complexityMultiplier = (() => {
    switch (platformComplexity) {
      case 'simple':
        return 0.9;
      case 'complex':
        return 1.35;
      case 'enterprise':
        return 1.7;
      default:
        return 1.0;
    }
  })();

  const addOnHours = [
    addOns?.design && 6,
    addOns?.testing && 4,
    addOns?.deployment && 3,
    addOns?.analytics && 2,
    addOns?.auth && 5,
  ].filter(Boolean).reduce((a, b) => a + b, 0);

  const computedHours = (baseHours + revisionHours + addOnHours) * complexityMultiplier;
  const subtotal = computedHours * hourlyRate;

  const discountValue = Math.min(Math.max(Number(discount) || 0, 0), subtotal);
  const taxableBase = Math.max(subtotal - discountValue, 0);
  const tax = taxableBase * ((Number(taxRate) || 0) / 100);
  const total = taxableBase + tax;

  return {
    projectName,
    clientName,
    hours: round2(computedHours),
    rate: hourlyRate,
    subtotal: round2(subtotal),
    discount: round2(discountValue),
    taxRate: Number(taxRate) || 0,
    tax: round2(tax),
    total: round2(total),
    complexity: platformComplexity,
    addOns: {
      design: !!addOns?.design,
      testing: !!addOns?.testing,
      deployment: !!addOns?.deployment,
      analytics: !!addOns?.analytics,
      auth: !!addOns?.auth,
    },
    revisions: Number(revisions) || 0,
  };
}

function round2(n) {
  return Math.round((Number(n) || 0) * 100) / 100;
}


