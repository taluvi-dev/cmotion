# containers/0.0.14 — render runner v0.0.14

Same driver and env-var contract as 0.0.13; the frozen interpreter and
viewer bundle change. See `containers/README.md` for the list of what
0.0.14 adds, and the stdlib page's "Runner 0.0.14 additions".

Sources opt in with `runner "0.0.14";`. Earlier runners' directories are
untouched, so rebuilding any of them reproduces its original output.

Refreeze the viewer after a web build with `bash freeze.sh`.
