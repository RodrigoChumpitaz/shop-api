/**
 * Babel configuration file for the backend of the Control Password App.
 * @module babel.config.js
 */

module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: false,
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript',
        '@babel/preset-flow'
    ],
    plugins: [
        '@babel/plugin-transform-modules-commonjs',
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true
            }
        ],
        ['@babel/plugin-transform-flow-strip-types'],
        ['@babel/plugin-proposal-class-properties', {loose: true}],
        [
            'module-resolver',
            {
                /**
                 * Alias configuration for absolute paths in the project.
                 * @property {Object} alias - The alias object containing the configured absolute paths.
                 * @property {string} alias.'@config' - The absolute path for the 'config' directory.
                 * @property {string} alias.'@controllers' - The absolute path for the 'controllers' directory.
                 * @property {string} alias.'@routes' - The absolute path for the 'routes' directory.
                 */
                root: ['.'],   
                alias: {
                    '@category': './src/modules/category',
                    '@products': './src/modules/product',
                    '@sale': './src/modules/sales',
                    '@server': './src/server',
                    '@core': './src/core'
                }
            }
        ]
    ],
    ignore: ['**/*.spec.ts']
};