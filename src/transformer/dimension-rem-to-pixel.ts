import StyleDictionary from 'style-dictionary'
/**
 * dimensionRemToPixel
 * @description convert all dimensions that use rem value to pixels, uses `platform.options.basePxFontSize`
 * as the base font, or `16` if not provided
 */
export const dimensionRemToPixel: StyleDictionary.Transform = {
  type: `value`,
  transitive: true,
  matcher: (token: StyleDictionary.TransformedToken) => token.$type === 'dimension' && token.value.substring(token.value.length - 3) === 'rem',
  transformer: (token: StyleDictionary.TransformedToken, platform: StyleDictionary.Platform | undefined) => {
    const baseFont = platform?.options?.basePxFontSize || 16;
    const floatVal = parseFloat(token.value)

    if (isNaN(floatVal)) {
      throw `Invalid Number: '${token.name}: ${token.value}' is not a valid number, cannot transform to rem \n`;
    }

    if (floatVal === 0) {
      return '0';
    }

    return `${baseFont * floatVal}px`;
  }
}