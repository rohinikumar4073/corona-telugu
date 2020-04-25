import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function createLegends () {
  return <div className='bar-chart-legend col-sm-12'>
    <div className='legend-wrapper'>
      <span><FormattedMessage id="cases" /></span>
      <span className="cases-legend legend"></span>
    </div>
    <div className='legend-wrapper'>
      <span><FormattedMessage id="recovered" /></span>
      <span className="cases-recovered legend"></span>
    </div>
    <div className='legend-wrapper'>
      <span><FormattedMessage id="deaths" /></span>
      <span className="cases-deaths legend"></span>
    </div>

  </div>

}