module.exports = {
    extensions: ['.ts', '.tsx'],
    include: [
        './src/**/*',
    ],
    exclude: [
        '**/*/*.d.ts',
        '**/contracts/**/*.ts',
    ],
    reporter: ['text'],
    all: true,
};