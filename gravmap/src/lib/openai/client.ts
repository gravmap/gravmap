import OpenAI from 'openai'

/**
 * OpenAI Client Configuration
 * 
 * Server-side only - API key should never be exposed to client
 * Used for contract extraction and other AI features
 */

// Lazy initialization to avoid build-time errors
let openaiInstance: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set in environment variables')
    }
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiInstance
}

// Export a proxy that lazily initializes the client
export const openai = new Proxy({} as OpenAI, {
  get(target, prop) {
    return getOpenAI()[prop as keyof OpenAI]
  }
})

/**
 * Default model configuration for contract extraction
 */
export const EXTRACTION_CONFIG = {
  model: 'gpt-4o', // Latest GPT-4 with vision capabilities
  maxTokens: 2000,
  temperature: 0.1, // Low temperature for consistent, factual extraction
} as const

/**
 * Vision model configuration
 */
export const VISION_CONFIG = {
  model: 'gpt-4o',
  maxTokens: 4096,
  temperature: 0.1,
  detail: 'high' as const, // High detail for document analysis
} as const
