// Next 16 removed `next lint`, so ESLint runs directly against the repo:
// `npm run lint`. eslint-config-next ships native flat config, which is why
// these spread straight in rather than going through FlatCompat.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

const config = [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      // Two deliberate idioms in this codebase, not oversights:
      //
      //   const { hasSlot, hasPrice, ...rest } = lead   // drop a field
      //   const { paidOn: _dropped, ...rest } = job     // drop a field
      //
      // Destructuring to omit a key is how both are written, and a leading
      // underscore is how a discarded binding is marked. Flagging either just
      // trains people to ignore the linter.
      '@typescript-eslint/no-unused-vars': ['warn', {
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
    },
  },
]

export default config
