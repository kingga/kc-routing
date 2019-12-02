module.exports = {
    extensions: ['.ts', '.tsx'],
    include: [
        './src/**/*',
        './src/*',
    ],
    exclude: [
        '**/*/*.d.ts',
        '**/contracts/**/*.ts',
    ],
    reporter: ['text'],
    all: true,
};
