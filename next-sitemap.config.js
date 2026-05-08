/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://saren.ai',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: [
    '/halcyon',
    '/halcyon/*',
    '/api/*',
    '/llms.txt',
    '/llms-full.txt',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/halcyon' },
      { userAgent: '*', disallow: '/api' },
    ],
  },
};
