export interface Technology {
  name: string
  altnames: string[]
  tags: string[]
  versions: Versions
  color: string
  aliases: AliasClass[]
}

export interface AliasClass {
  base: BaseElement
  alias: BaseElement
}

export enum BaseElement {
  Line = 'line',
  LineWordmark = 'line-wordmark',
  Original = 'original',
  OriginalWordmark = 'original-wordmark',
  Plain = 'plain',
  PlainWordmark = 'plain-wordmark',
}

export interface Versions {
  svg: BaseElement[]
  font: BaseElement[]
}
