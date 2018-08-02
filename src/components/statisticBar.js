import React from 'react'
import { Statistic, Icon } from 'semantic-ui-react'

const StatisticValueShorthand = () => (
  <div>
    <Statistic horizontal floated='left'>
      <Statistic.Value>
        <i class="em em---1"></i>
      </Statistic.Value>
      <Statistic.Label className='statistic'>Good paste!</Statistic.Label>
    </Statistic>
    <Statistic horizontal floated='left'>
      <Statistic.Value>
        <i class="em em--1"></i>
      </Statistic.Value>
      <Statistic.Label className='statistic'>Too fast!</Statistic.Label>
    </Statistic>
  </div>

)

export default StatisticValueShorthand
