import { themes as prismThemes } from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

function getNthWeekdayOfMonth(year, month, weekday, n): Date {
  const date = new Date(year, month, 1);
  date.setDate(1 + (weekday - date.getDay() + 7) % 7 + (n - 1) * 7);
  return date;
}

const logo: () => string = (() => {
  const now = new Date();
  const tgiving = getNthWeekdayOfMonth(now.getFullYear(), 10, 4, 4); // Thanksgiving Day - Fourth Thursday in November
  if (now > tgiving && (now.getMonth() == 11 || now.getDate() > tgiving.getDate())) {
      return 'img/homepage/logo_christmas.svg';
  } else if (now.getMonth() === 6 && now.getDate() >= 1 && now.getDate() <= 7) {
      return 'img/homepage/logo_usa.svg';
  } else if (now.getMonth() === 10 && now.getDate() >= 10) {
      return 'img/homepage/logo_thanksgiving.svg';
  } else if (now.getMonth() === 1 && now.getDate() >= 10 && now.getDate() <= 15) {
      return 'img/homepage/logo_valentines.svg';
  } else {
      return 'img/homepage/logo.svg';
  }
});

const config: Config = {
  title: 'logship',
  tagline: 'Data Analytics for the Masses',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://logship.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    'docusaurus-plugin-sass',
    './plugins/logship-analytics'
  ],

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/scss/custom.scss',
        },
      } satisfies Preset.Options),
    ],
  ],
  themeConfig:
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Logship',
        logo: {
          alt: 'Logship Logo',
          src: logo(),
        },
        items: [
          { to: '/docs/getting-started/prerequisites', label: 'Get Started ⇥', position: 'left' },
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'BlogShip', position: 'left'},
          { to: '/products', label: 'Products', position: 'left'},
          { to: '/contact', label: 'Contact', position: 'left'},
          {
            href: 'https://github.com/logship-io',
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
                label: 'Docs',
                to: '/docs/intro',
              },
            { to: '/docs/getting-started/prerequisites', label: 'Get Started ⇥', position: 'left' },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'BlogShip',
                to: '/blog',
              },
              {
                label: 'Contact',
                to: '/contact',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/logship-io',
              },
              
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Logship LLC.`,
      },
      prism: {
        additionalLanguages: ['powershell', 'kusto'],
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    } satisfies Preset.ThemeConfig),
};

export default config;
