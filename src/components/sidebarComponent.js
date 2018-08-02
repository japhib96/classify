import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'


  const SegmentRaised = () => (
  <div>
    <Segment raised className='ui segment' size='massive' raised>Current Session <Icon name='add circle' size='large' /></Segment>
    <Segment raised className='ui segment' size='massive' raised>Recently <Icon name='time' size='large' /></Segment>
    <Segment raised className='ui segment' size='massive' raised>Chat Room <Icon name='chat' size='large' /></Segment>
  </div>

  )

export default SegmentRaised
