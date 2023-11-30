// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path');

function getNthWeekdayOfMonth(year, month, weekday, n) {
  const date = new Date(year, month, 1);
  date.setDate(1 + (weekday - date.getDay() + 7) % 7 + (n - 1) * 7);
  return date;
}

const logo = (() => {
  const now = new Date();
  const tgiving = getNthWeekdayOfMonth(now.getFullYear(), 10, 4, 4); // Thanksgiving Day - Fourth Thursday in November

  if (now > tgiving && now.getDate() > tgiving.getDate()) {
      return 'img/homepage/logo_christmas.svg';
  } else if (now.getMonth() === 6 && now.getDate() >= 1 && now.getDate() <= 7) {
      return 'img/homepage/logo_usa.svg';
  } else if (now.getMonth() === 10 && now.getDate() >= 10) {
      return 'img/homepage/logo_thanksgiving.svg';
  } else if (now.getMonth() === 1 && now.getDate() >= 10 && now.getDate() <= 20) {
      return 'img/homepage/logo_valentines.svg';
  } else {
      return 'img/homepage/logo.svg';
  }
})();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'logship.io',
  tagline: 'Logs aggregation for the masses',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://logship.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'logsink', // Usually your GitHub org/user name.
  projectName: 'logsink.github.io', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    path.resolve(__dirname, './plugins/logship-analytics'),
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocs: true,
        indexBlog: true,
        language: ["en"],
      },
    ]
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/logsink/logsink.github.io/tree/master/Logship',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/logsink/logsink.github.io/tree/master/Logship',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Logship',
        logo: {
          alt: 'Logship Logo',
          src: logo,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Getting Started',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/pricing', label: 'Pricing', position: 'left'},
          {
            href: 'https://github.com/logsink/logsink.github.io/',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/logsink/logsink.github.io/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Logship LLC.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
