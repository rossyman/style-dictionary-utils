import JSON5 from 'json5'
/**
 * @name w3cTokenJson5Parser
 * @description parses json5 and replace `$value` with `value` and `$description` with `comment` to make it work with style dictionary
 */
export const w3cTokenJson5Parser = {
  pattern: /\.json$/,
  parse: ({ contents }: { contents: string }) => {
    // replace $value with value so that style dictionary recognizes it
    contents = (contents || "{}").replace(/"\$(value)":/g, '"value":')
      // convert $description to comment
      .replace(/"\$description":/g, '"comment":')
    //
    return JSON5.parse(contents)
  }
}