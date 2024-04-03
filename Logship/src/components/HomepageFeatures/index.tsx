import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

const FeatureList = [
  {
    title: 'Make data driven decisions',
    Svg: require('@site/static/img/homepage/upwardschart.svg').default,
    description: (
      <>
        Search, Chart, and Alert so that you can make the best choices for your business.
      </>
    ),
  },
  {
    title: 'Take control of your data',
    Svg: require('@site/static/img/homepage/Spaceship.svg').default,
    description: (
      <>
        Nothing leaves your network unless you want it to. Hosted on-premise or in the cloud, the power is in your hands.
      </>
    ),
  },
  {
    title: 'Scale as you grow',
    Svg: require('@site/static/img/homepage/SearchChart.svg').default,
    description: (
      <>
        Pull in as many logs and metrics as your infrastructure can handle. Expand to fill your needs as you improve your infrastructure.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
