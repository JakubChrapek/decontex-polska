require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    siteUrl: 'https://kryptonum.eu',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: process.env.DATOCMS_API_KEY,
        localeFallbacks: {
          'en-EN': 'pl',
          en: 'pl',
        },
      },
    },
  ],
};
