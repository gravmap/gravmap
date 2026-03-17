import type { ContractExtractionResult } from '@/types/extraction'

/**
 * Mock extraction result for testing UI
 * 
 * Use this to test the extraction review UI without making actual API calls
 */

export const mockExtractionResult: ContractExtractionResult = {
  closing_date: {
    value: '2024-04-15',
    confidence: 96,
    notes: 'Explicitly stated in Section 3',
  },
  contingency_dates: {
    inspection: {
      value: '2024-03-15',
      confidence: 92,
    },
    financing: {
      value: '2024-03-30',
      confidence: 88,
    },
    appraisal: {
      value: '2024-04-01',
      confidence: 85,
    },
  },
  buyer_name: {
    value: 'John Michael Smith',
    confidence: 98,
  },
  seller_name: {
    value: 'Sarah Jane Doe',
    confidence: 97,
  },
  property_address: {
    value: '1234 Oak Street, Springfield, IL 62701',
    confidence: 99,
  },
  purchase_price: {
    value: 485000,
    confidence: 99,
  },
  additional_dates: [
    {
      name: 'Earnest Money Deadline',
      date: '2024-02-28',
      confidence: 94,
    },
    {
      name: 'Title Search Completion',
      date: '2024-04-05',
      confidence: 78,
    },
    {
      name: 'Final Walkthrough',
      date: '2024-04-14',
      confidence: 91,
    },
  ],
  extraction_notes: 'Standard residential purchase agreement. All critical dates clearly stated. Minor uncertainty on title search date due to handwritten notation.',
  extraction_timestamp: new Date().toISOString(),
  model_version: 'gpt-4o-2024-05-13',
}

/**
 * Mock extraction result with low confidence fields
 */
export const mockLowConfidenceResult: ContractExtractionResult = {
  closing_date: {
    value: '2024-05-01',
    confidence: 65,
    notes: 'Date inferred from "30 days after acceptance" clause',
  },
  contingency_dates: {
    inspection: {
      value: null,
      confidence: 0,
    },
    financing: {
      value: '2024-04-20',
      confidence: 55,
    },
    appraisal: {
      value: null,
      confidence: 0,
    },
  },
  buyer_name: {
    value: 'J. Smith',
    confidence: 72,
    notes: 'Full name unclear - may be John or Jane Smith',
  },
  seller_name: {
    value: null,
    confidence: 0,
  },
  property_address: {
    value: 'Oak Street, Springfield',
    confidence: 45,
    notes: 'Street number not legible',
  },
  purchase_price: {
    value: 450000,
    confidence: 85,
  },
  additional_dates: [],
  extraction_notes: 'Document quality is poor - handwritten sections difficult to read. Several fields could not be extracted. Recommend manual verification of all data.',
  extraction_timestamp: new Date().toISOString(),
  model_version: 'gpt-4o-2024-05-13',
}

/**
 * Mock extraction result with multiple buyers/sellers
 */
export const mockMultiPartyResult: ContractExtractionResult = {
  closing_date: {
    value: '2024-06-30',
    confidence: 98,
  },
  contingency_dates: {
    inspection: {
      value: '2024-05-30',
      confidence: 95,
    },
    financing: {
      value: '2024-06-15',
      confidence: 94,
    },
    appraisal: {
      value: '2024-06-20',
      confidence: 93,
    },
  },
  buyer_name: {
    value: 'John Smith & Jane Smith (husband and wife)',
    confidence: 92,
    notes: 'Multiple buyers listed',
  },
  seller_name: {
    value: 'Robert Johnson Living Trust',
    confidence: 89,
  },
  property_address: {
    value: '5678 Maple Avenue, Chicago, IL 60601',
    confidence: 99,
  },
  purchase_price: {
    value: 750000,
    confidence: 99,
  },
  additional_dates: [
    {
      name: 'Home Sale Contingency',
      date: '2024-05-15',
      confidence: 88,
    },
    {
      name: 'HOA Document Delivery',
      date: '2024-05-20',
      confidence: 91,
    },
  ],
  extraction_notes: 'Multiple buyers identified. Property is being sold by a trust. Additional contingencies present.',
  extraction_timestamp: new Date().toISOString(),
  model_version: 'gpt-4o-2024-05-13',
}

/**
 * Utility function to simulate API delay
 */
export async function mockExtractionAPI(
  delay = 2000
): Promise<ContractExtractionResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockExtractionResult)
    }, delay)
  })
}

/**
 * Example: Using mock data in a component
 * 
 * ```typescript
 * import { mockExtractionResult } from '@/lib/test/mock-extraction-data'
 * 
 * // In your component:
 * const [extractedData, setExtractedData] = useState(mockExtractionResult)
 * 
 * // Or use the async version:
 * const data = await mockExtractionAPI(3000) // 3 second delay
 * ```
 */
