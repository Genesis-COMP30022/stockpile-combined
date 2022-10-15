const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
}, 
{
  rules: [
    {
      test: /\.(png|jpe?g|gif|PNG)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
  ],
},)
