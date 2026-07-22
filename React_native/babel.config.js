module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: ['react-native-worklets/plugin'], // الاسم الصح للـ plugin في reanimated v4 (لازم يفضل آخر واحد)
  };
};