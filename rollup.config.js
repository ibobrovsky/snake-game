import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import scss from 'rollup-plugin-scss'

export const inputFileName = 'index'
export const outputFileName = 'snake'
export const outputName = 'Snake'

const base = {
    input: `src/${inputFileName}.js`,
    output: {
        name: outputName,
        format: 'umd',
        file: `dist/${outputFileName}.js`,
        exports: 'default',
    },
    plugins: [
        babel({
            babelrc: false,
            babelHelpers: 'bundled',
            presets: [['@babel/preset-env', { modules: false, loose: true }]],
            plugins: [['@babel/plugin-proposal-object-rest-spread', { loose: true }]],
            exclude: 'node_modules/**',
        }),
        scss({
            output: `dist/${outputFileName}.css`
        })
    ],
}

const minify = {
    ...base,
    output: {
        ...base.output,
        format: 'umd',
        file: `dist/${outputFileName}.min.js`,
    },
    plugins: [
        babel({
            babelrc: false,
            babelHelpers: 'bundled',
            presets: [['@babel/preset-env', { modules: false, loose: true }]],
            plugins: [['@babel/plugin-proposal-object-rest-spread', { loose: true }]],
            exclude: 'node_modules/**',
        }),
        scss({
            output: `dist/${outputFileName}.min.css`,
            outputStyle: "compressed"
        }),
        terser()
    ],
}

const es = {
    ...base,
    output: {
        ...base.output,
        format: 'es',
        file: `dist/${outputFileName}.es.js`,
    },
}

export default [base, minify, es]