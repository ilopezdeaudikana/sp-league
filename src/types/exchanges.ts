import { type Currency } from './currencies'

type CurrencyKey = keyof Currency

export interface Exchanges {
  [key : CurrencyKey | 'date']: Record<CurrencyKey, number> | string
}

