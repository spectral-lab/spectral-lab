export type Option = {
  label: string,
  click({ context: string, id: string }): void
}
