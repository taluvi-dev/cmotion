# Cmotion Grammar v0.2

A typed creative programming language for video, motion, audio, animation, and compositing workflows.

---

## Design Goals

- Strong static typing
- Timeline-aware primitives
- Declarative composition
- Functional-style transforms
- Native units (`ms`, `px`, `bpm`, `deg`, etc.)
- Parser-friendly grammar
- GPU/WASM/backend agnostic

---

## Grammar (EBNF)

```ebnf
(* -------------------------------------------------- *)
(* Cmotion Grammar v0.2                               *)
(* -------------------------------------------------- *)

program        = [ runner_decl ] , { import_decl } , { top_decl } ;

(* -------------------------------------------------- *)
(* Runner pin                                         *)
(* -------------------------------------------------- *)

(* Optional, must precede imports. Pins the runner-container       *)
(* version this source targets. Absent → API loader picks latest.  *)
(* Version is a string literal so it can carry semver pre-release  *)
(* tags later (`"0.1.0-beta"`).                                    *)

runner_decl    = "runner" , string_lit , ";" ;

(* -------------------------------------------------- *)
(* Imports                                            *)
(* -------------------------------------------------- *)

import_decl    = "use" , path , [ "as" , ident ] , ";" ;

path           = ident , { "." , ident } , [ "." , "*" ] ;

(* -------------------------------------------------- *)
(* Top-level declarations                             *)
(* -------------------------------------------------- *)

top_decl       = let_decl
               | component_decl
               | scene_decl
               | filter_decl
               | export_decl ;

let_decl       = "let" , ident , [ ":" , type ] , "=" , expr , ";" ;

component_decl = "component" , ident , param_list ,
                 "->" , type , block ;

scene_decl     = "scene" , ident , param_list ,
                 "->" , type , block ;

filter_decl    = "filter" , ident , param_list ,
                 "->" , type , block ;

export_decl    = "export" , ident ,
                 ":" , type ,
                 "=" , expr , ";" ;

(* -------------------------------------------------- *)
(* Parameters                                         *)
(* -------------------------------------------------- *)

param_list     = "(" , [ param , { "," , param } ] , ")" ;

param          = ident ,
                 ":" , type ,
                 [ "=" , expr ] ;

(* -------------------------------------------------- *)
(* Blocks                                             *)
(* -------------------------------------------------- *)

block          = "{" ,
                 { let_decl } ,
                 expr ,
                 "}" ;

(* -------------------------------------------------- *)
(* Types                                              *)
(* -------------------------------------------------- *)

type           = simple_type
               | tuple_type
               | record_type
               | function_type ;

simple_type    = ident , [ type_args ] ;

type_args      = "<" ,
                 type ,
                 { "," , type } ,
                 ">" ;

tuple_type     = "(" ,
                 type ,
                 { "," , type } ,
                 ")" ;

record_type    = "{" ,
                 record_field ,
                 { "," , record_field } ,
                 [ "," ] ,
                 "}" ;

record_field   = ident , ":" , type ;

function_type  = "(" ,
                 [ type , { "," , type } ] ,
                 ")" ,
                 "->" ,
                 type ;

(* -------------------------------------------------- *)
(* Expressions                                        *)
(* -------------------------------------------------- *)

expr           = logic_or ;

logic_or       = logic_and ,
                 { "||" , logic_and } ;

logic_and      = equality ,
                 { "&&" , equality } ;

equality       = comparison ,
                 { ( "==" | "!=" ) , comparison } ;

comparison     = term ,
                 { ( "<" | "<=" | ">" | ">=" ) , term } ;

term           = factor ,
                 { ( "+" | "-" ) , factor } ;

factor         = power ,
                 { ( "*" | "/" | "%" ) , power } ;

power          = unary_expr ,
                 [ "**" , power ] ;

unary_expr     = [ "-" | "!" ] ,
                 postfix_expr ;

postfix_expr   = primary ,
                 { postfix_op } ;

postfix_op     = "." , ident , [ arg_list ]
               | arg_list
               | "[" , expr , "]" ;

(* -------------------------------------------------- *)
(* Primary expressions                                *)
(* -------------------------------------------------- *)

primary        = literal
               | ident
               | lambda
               | if_expr
               | match_expr
               | animate_expr
               | compose_expr
               | record_expr
               | array_expr
               | block
               | "(" , expr , ")" ;

(* -------------------------------------------------- *)
(* Lambda                                             *)
(* -------------------------------------------------- *)

lambda         = "|" ,
                 [ param , { "," , param } ] ,
                 "|" ,
                 [ "->" , type ] ,
                 block ;

(* -------------------------------------------------- *)
(* Calls                                              *)
(* -------------------------------------------------- *)

arg_list       = "(" ,
                 [ arg , { "," , arg } ] ,
                 ")" ;

arg            = [ ident , ":" ] , expr ;

(* -------------------------------------------------- *)
(* Conditionals                                       *)
(* -------------------------------------------------- *)

if_expr        = "if" ,
                 expr ,
                 block ,
                 [ "else" ,
                   ( if_expr | block ) ] ;

(* -------------------------------------------------- *)
(* Match                                              *)
(* -------------------------------------------------- *)

match_expr     = "match" ,
                 expr ,
                 "{" ,
                 match_arm ,
                 { "," , match_arm } ,
                 [ "," ] ,
                 "}" ;

match_arm      = pattern ,
                 "=>" ,
                 expr ;

pattern        = literal
               | ident
               | "_" ;

(* -------------------------------------------------- *)
(* Animation                                          *)
(* -------------------------------------------------- *)

animate_expr   = "animate" ,
                 "{" ,
                 keyframe ,
                 { "," , keyframe } ,
                 [ "," ] ,
                 "}" ,
                 [ "with" , record_expr ] ;

keyframe       = expr ,
                 "=>" ,
                 expr ;

(* -------------------------------------------------- *)
(* Composition                                        *)
(* -------------------------------------------------- *)

compose_expr   = "compose" ,
                 "[" ,
                 [ expr , { "," , expr } ] ,
                 [ "," ] ,
                 "]" ;

(* -------------------------------------------------- *)
(* Arrays                                             *)
(* -------------------------------------------------- *)

array_expr     = "[" ,
                 [ expr , { "," , expr } ] ,
                 [ "," ] ,
                 "]" ;

(* -------------------------------------------------- *)
(* Records                                            *)
(* -------------------------------------------------- *)

record_expr    = "{" ,
                 record_init ,
                 { "," , record_init } ,
                 [ "," ] ,
                 "}" ;

record_init    = ident ,
                 ":" ,
                 expr ;

(* -------------------------------------------------- *)
(* Literals                                           *)
(* -------------------------------------------------- *)

literal        = number_lit
               | string_lit
               | bool_lit
               | color_lit ;

number_lit     = digits ,
                 [ "." , digits ] ,
                 [ unit ] ;

unit           = "s"
               | "ms"
               | "us"
               | "ns"

               | "hz"
               | "khz"

               | "deg"
               | "rad"
               | "turn"

               | "px"
               | "%"

               | "bpm"
               | "bars"
               | "beats" ;

string_lit     = '"' ,
                 { string_char } ,
                 '"' ;

bool_lit       = "true"
               | "false" ;

color_lit      = "#" , hex_digits
               | "oklch" ,
                 "(" ,
                 expr , "," ,
                 expr , "," ,
                 expr ,
                 ")"

               | "oklab" ,
                 "(" ,
                 expr , "," ,
                 expr , "," ,
                 expr ,
                 ")"

               | "srgb" ,
                 "(" ,
                 expr , "," ,
                 expr , "," ,
                 expr ,
                 ")" ;

(* -------------------------------------------------- *)
(* Lexical                                            *)
(* -------------------------------------------------- *)

ident          = letter ,
                 { letter | digit | "_" } ;

digits         = digit ,
                 { digit | "_" } ;

hex_digits     = hex_digit ,
                 { hex_digit } ;

letter         = "a"…"z"
               | "A"…"Z"
               | "_" ;

digit          = "0"…"9" ;

hex_digit      = digit
               | "a"…"f"
               | "A"…"F" ;

string_char    = ? any Unicode codepoint except unescaped '"' ? ;
```
