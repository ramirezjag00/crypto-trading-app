module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@customtypes': './src/types',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
