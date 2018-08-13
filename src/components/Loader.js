import React from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

const Loading = () => (
  <div>
      <Dimmer active>
        <Loader inverted> <h1>Retrieving lectures</h1></Loader>
      </Dimmer>
      <Image src='/images/wireframe/short-paragraph.png' />
  </div>
)

export default Loading
