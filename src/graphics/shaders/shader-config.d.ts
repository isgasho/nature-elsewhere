interface ShaderConfig {
  readonly uniforms: Readonly<Record<string, string>>
  readonly perVertex: readonly AttributeConfig[]
  readonly perInstance: readonly AttributeConfig[]
}

interface AttributeConfig {
  readonly type: GLDataType | string
  readonly name: string
  readonly length: number
}