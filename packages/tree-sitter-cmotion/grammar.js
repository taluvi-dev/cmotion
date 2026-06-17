/**
 * @file Tree-sitter grammar for the cmotion DSL.
 *
 * Authoritative spec: GRAMMAR.md at the repo root. The rules below mirror
 * its EBNF rule names so the two stay diffable.
 *
 * Naming convention:
 *   - Public rule names match the EBNF rule names in GRAMMAR.md.
 *   - Rule names prefixed with `_` are inlined and not exposed in the CST.
 */

const PREC = {
  or:         1,
  and:        2,
  equality:   3,
  comparison: 4,
  term:       5,
  factor:     6,
  power:      7,
  unary:      8,
  postfix:    9,
  call:       10,
};

module.exports = grammar({
  name: 'cmotion',

  extras: $ => [
    /\s/,
    $.line_comment,
    $.block_comment,
  ],

  word: $ => $.identifier,

  rules: {
    program: $ => seq(
      optional($.runner_decl),
      repeat($.import_decl),
      repeat($._top_decl),
    ),

    //
    // Runner pin (optional, must precede imports). Pins the
    // container-runner version this source targets. Absent → the
    // API loader picks the latest available runner.
    //
    runner_decl: $ => seq(
      'runner',
      field('version', $.string_lit),
      ';',
    ),

    //
    // Imports
    //
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

    //
    // Top-level declarations
    //
    _top_decl: $ => choice(
      $.let_decl,
      $.component_decl,
      $.scene_decl,
      $.filter_decl,
      $.export_decl,
    ),

    let_decl: $ => seq(
      'let',
      field('name', $.identifier),
      optional(seq(':', field('type', $._type))),
      '=',
      field('value', $._expr),
      ';',
    ),

    component_decl: $ => seq(
      'component',
      field('name', $.identifier),
      field('params', $.param_list),
      '->',
      field('return_type', $._type),
      field('body', $.block),
    ),

    scene_decl: $ => seq(
      'scene',
      field('name', $.identifier),
      field('params', $.param_list),
      '->',
      field('return_type', $._type),
      field('body', $.block),
    ),

    filter_decl: $ => seq(
      'filter',
      field('name', $.identifier),
      field('params', $.param_list),
      '->',
      field('return_type', $._type),
      field('body', $.block),
    ),

    export_decl: $ => seq(
      'export',
      field('name', $.identifier),
      ':',
      field('type', $._type),
      '=',
      field('value', $._expr),
      ';',
    ),

    //
    // Parameters
    //
    param_list: $ => seq(
      '(',
      optional(seq($.param, repeat(seq(',', $.param)), optional(','))),
      ')',
    ),

    param: $ => seq(
      field('name', $.identifier),
      ':',
      field('type', $._type),
      optional(seq('=', field('default', $._expr))),
    ),

    //
    // Blocks
    //
    block: $ => seq(
      '{',
      repeat($.let_decl),
      field('result', $._expr),
      '}',
    ),

    //
    // Types
    //
    _type: $ => choice(
      $.simple_type,
      $.tuple_type,
      $.record_type,
      $.function_type,
    ),

    simple_type: $ => seq(
      $.identifier,
      optional($.type_args),
    ),

    type_args: $ => seq(
      '<',
      $._type,
      repeat(seq(',', $._type)),
      '>',
    ),

    tuple_type: $ => seq(
      '(',
      $._type,
      repeat1(seq(',', $._type)),
      optional(','),
      ')',
    ),

    record_type: $ => seq(
      '{',
      $.record_type_field,
      repeat(seq(',', $.record_type_field)),
      optional(','),
      '}',
    ),

    record_type_field: $ => seq(
      field('name', $.identifier),
      ':',
      field('type', $._type),
    ),

    function_type: $ => seq(
      '(',
      optional(seq($._type, repeat(seq(',', $._type)))),
      ')',
      '->',
      $._type,
    ),

    //
    // Expressions (precedence-climbing, mirroring GRAMMAR.md)
    //
    _expr: $ => $._logic_or,

    _logic_or: $ => choice(
      $.binary_expr_or,
      $._logic_and,
    ),
    binary_expr_or: $ => prec.left(PREC.or, seq(
      field('left',  $._logic_or),
      field('op',    '||'),
      field('right', $._logic_and),
    )),

    _logic_and: $ => choice(
      $.binary_expr_and,
      $._equality,
    ),
    binary_expr_and: $ => prec.left(PREC.and, seq(
      field('left',  $._logic_and),
      field('op',    '&&'),
      field('right', $._equality),
    )),

    _equality: $ => choice(
      $.binary_expr_eq,
      $._comparison,
    ),
    binary_expr_eq: $ => prec.left(PREC.equality, seq(
      field('left',  $._equality),
      field('op',    choice('==', '!=')),
      field('right', $._comparison),
    )),

    _comparison: $ => choice(
      $.binary_expr_cmp,
      $._term,
    ),
    binary_expr_cmp: $ => prec.left(PREC.comparison, seq(
      field('left',  $._comparison),
      field('op',    choice('<', '<=', '>', '>=')),
      field('right', $._term),
    )),

    _term: $ => choice(
      $.binary_expr_add,
      $._factor,
    ),
    binary_expr_add: $ => prec.left(PREC.term, seq(
      field('left',  $._term),
      field('op',    choice('+', '-')),
      field('right', $._factor),
    )),

    _factor: $ => choice(
      $.binary_expr_mul,
      $._power,
    ),
    binary_expr_mul: $ => prec.left(PREC.factor, seq(
      field('left',  $._factor),
      field('op',    choice('*', '/', '%')),
      field('right', $._power),
    )),

    _power: $ => choice(
      $.binary_expr_pow,
      $._unary,
    ),
    binary_expr_pow: $ => prec.right(PREC.power, seq(
      field('left',  $._unary),
      field('op',    '**'),
      field('right', $._power),
    )),

    _unary: $ => choice(
      $.unary_expr,
      $._postfix,
    ),
    unary_expr: $ => prec(PREC.unary, seq(
      field('op',     choice('-', '!')),
      field('operand', $._postfix),
    )),

    _postfix: $ => choice(
      $.field_access,
      $.method_call,
      $.call_expr,
      $.index_expr,
      $._primary,
    ),

    field_access: $ => prec.left(PREC.postfix, seq(
      field('receiver', $._postfix),
      '.',
      field('name', $.identifier),
    )),

    method_call: $ => prec.left(PREC.call, seq(
      field('receiver', $._postfix),
      '.',
      field('name', $.identifier),
      field('args', $.arg_list),
    )),

    call_expr: $ => prec.left(PREC.call, seq(
      field('callee', $._postfix),
      field('args',   $.arg_list),
    )),

    index_expr: $ => prec.left(PREC.postfix, seq(
      field('receiver', $._postfix),
      '[',
      field('index', $._expr),
      ']',
    )),

    arg_list: $ => seq(
      '(',
      optional(seq($.arg, repeat(seq(',', $.arg)), optional(','))),
      ')',
    ),

    arg: $ => seq(
      optional(seq(field('name', $.identifier), ':')),
      field('value', $._expr),
    ),

    //
    // Primary expressions
    //
    _primary: $ => choice(
      $._literal,
      $.identifier,
      $.lambda,
      $.if_expr,
      $.match_expr,
      $.animate_expr,
      $.compose_expr,
      $.record_expr,
      $.array_expr,
      $.block,
      $.paren_expr,
    ),

    paren_expr: $ => seq('(', $._expr, ')'),

    //
    // Lambda
    //
    lambda: $ => seq(
      '|',
      optional(seq($.param, repeat(seq(',', $.param)), optional(','))),
      '|',
      optional(seq('->', field('return_type', $._type))),
      field('body', $.block),
    ),

    //
    // Conditionals
    //
    if_expr: $ => prec.right(seq(
      'if',
      field('condition', $._expr),
      field('then',      $.block),
      optional(seq(
        'else',
        field('else', choice($.if_expr, $.block)),
      )),
    )),

    //
    // Match
    //
    match_expr: $ => seq(
      'match',
      field('subject', $._expr),
      '{',
      $.match_arm,
      repeat(seq(',', $.match_arm)),
      optional(','),
      '}',
    ),

    match_arm: $ => seq(
      field('pattern', $._pattern),
      '=>',
      field('body', $._expr),
    ),

    _pattern: $ => choice(
      $._literal,
      $.identifier,
      $.wildcard_pattern,
    ),

    wildcard_pattern: _ => '_',

    //
    // Animation
    //
    animate_expr: $ => seq(
      'animate',
      '{',
      $.keyframe,
      repeat(seq(',', $.keyframe)),
      optional(','),
      '}',
      optional(seq('with', field('opts', $.record_expr))),
    ),

    keyframe: $ => seq(
      field('at',    $._expr),
      '=>',
      field('value', $._expr),
    ),

    //
    // Composition
    //
    compose_expr: $ => seq(
      'compose',
      '[',
      optional(seq($._expr, repeat(seq(',', $._expr)), optional(','))),
      ']',
    ),

    //
    // Arrays
    //
    array_expr: $ => seq(
      '[',
      optional(seq($._expr, repeat(seq(',', $._expr)), optional(','))),
      ']',
    ),

    //
    // Records
    //
    record_expr: $ => seq(
      '{',
      $.record_init,
      repeat(seq(',', $.record_init)),
      optional(','),
      '}',
    ),

    record_init: $ => seq(
      field('name', $.identifier),
      ':',
      field('value', $._expr),
    ),

    //
    // Literals
    //
    _literal: $ => choice(
      $.number_lit,
      $.string_lit,
      $.bool_lit,
      $.color_lit,
    ),

    number_lit: _ => token(seq(
      /[0-9][0-9_]*/,
      optional(seq('.', /[0-9][0-9_]*/)),
      optional(choice(
        's', 'ms', 'us', 'ns',
        'hz', 'khz',
        'deg', 'rad', 'turn',
        'px', '%',
        'bpm', 'bars', 'beats',
      )),
    )),

    // Two forms: a normal escaped "..." string, and a raw triple-quoted
    // """..."""  string whose body may contain unescaped quotes and
    // newlines (it ends at the first """). The triple form lets a source
    // paste a verbatim SVG / JSON blob — e.g. svg("""<svg ...>...</svg>""")
    // — without escaping its inner double quotes. Longest-match lexing
    // picks the triple form when three quotes open.
    string_lit: _ => choice(
      token(seq(
        '"""',
        /([^"]|"[^"]|""[^"])*/,
        '"""',
      )),
      token(seq(
        '"',
        repeat(choice(
          /[^"\\]/,
          seq('\\', /./),
        )),
        '"',
      )),
    ),

    bool_lit: _ => choice('true', 'false'),

    color_lit: $ => choice(
      $._hex_color,
      $._oklch_color,
      $._oklab_color,
      $._srgb_color,
    ),

    _hex_color: _ => token(seq('#', /[0-9a-fA-F]+/)),

    _oklch_color: $ => seq(
      'oklch', '(',
      field('l', $._expr), ',',
      field('c', $._expr), ',',
      field('h', $._expr),
      ')',
    ),

    _oklab_color: $ => seq(
      'oklab', '(',
      field('l', $._expr), ',',
      field('a', $._expr), ',',
      field('b', $._expr),
      ')',
    ),

    _srgb_color: $ => seq(
      'srgb', '(',
      field('r', $._expr), ',',
      field('g', $._expr), ',',
      field('b', $._expr),
      ')',
    ),

    //
    // Lexical
    //
    identifier: _ => /[A-Za-z_][A-Za-z0-9_]*/,

    line_comment:  _ => token(seq('//', /.*/)),
    block_comment: _ => token(seq('/*', /[^*]*\*+([^/*][^*]*\*+)*/, '/')),
  },
});
