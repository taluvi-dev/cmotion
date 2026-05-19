// Single-translation-unit definition of stb_truetype's implementation.
// Every other .c / .zig file just gets the declarations; this file owns
// the linker symbols. Native build only — the WASM build's text path
// stays on the bitmap font for now (stb_truetype pulls in libm symbols
// the freestanding target doesn't provide).
#define STB_TRUETYPE_IMPLEMENTATION
#include "stb_truetype.h"
