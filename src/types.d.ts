/**
 * Utility Rule
 * ===========================================
 * Rule         .h-xl { height: 20px }
 * Selector     .h-xl
 * Declaration  { height: 20px }
 *   Property   height
 *   Value      20px
 * ===========================================
 *
 */

// Declaration
// height: 16px; o height: var(--size-xl);
export type DeclarationType = {
  property: string
  value: string
}

export type RuleType = {
  selector: string
  declaration: string
  props?: string
}

export type Data = {
  utilities: RuleType[]
  tokens: DeclarationType[]
}
