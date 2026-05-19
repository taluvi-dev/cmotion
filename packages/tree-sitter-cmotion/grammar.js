/**
 * @file Tree-sitter grammar for the cmotion DSL.
 * @see GRAMMAR.md at the repo root for the authoritative EBNF.
 *
 * This is a stub. It recognises an empty program plus `use` imports so the
 * CLI has something to link against while the real grammar is built out
 * stage by stage (see the cmotion roadmap in README.md).
 */

module.exports = grammar({
  name: 'cmotion',

  extras: $ => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ],

  rules: {
    source_file: $ => seq(
      repeat($.import_decl),
      repeat($._top_decl),
    ),

    import_decl: $ => seq(
      'use',
      field('path', $.path),
      optional(seq('as', field('alias', $.identifier))),
      ';',
    ),

    path: $ => seq(
      $.identifier,
      repeat(seq('.', $.identifier)),
      optional(seq('.', '*')),
    ),

    _top_decl: $ => choice(
      // Filled in by later grammar stages.
    ),

    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,

    line_comment:  _ => token(seq('//', /.*/)),
    block_comment: _ => token(seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')),
  },
});
