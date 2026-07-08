const rimraf = require('rimraf')
const spawn = require('cross-spawn')

rimraf.sync('dist')
rimraf.sync('release')

spawn.sync('nest', ['build'], { stdio: 'inherit' })
spawn.sync(
  'deno',
  'compile -A --node-modules-dir --unstable-detect-cjs --target x86_64-unknown-linux-gnu -o release/server dist/main.js'.split(
    ' ',
  ),
  { stdio: 'inherit' },
)
