import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.scss';

function Waves(): React.JSX.Element {
  return (
    <div className={styles.wavesBackground}>
      <svg className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shape-rendering="auto"
      >
        <defs>
          <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g className={styles.parallax}>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="var(--ifm-color-primary-dark)" />
          <use xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="var(--ifm-color-primary-darkest)" />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="var(--ifm-color-primary-light)" />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill='var(--ifm-card-background-color)' />
        </g>
      </svg>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://try.logship.io">
            Try it now
          </Link>
        </div>

      </div>
    </header>
    
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Logship: The Ultimate Observability Platform">
      <HomepageHeader />
      <Waves />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
