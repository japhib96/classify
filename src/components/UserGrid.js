import Divider from './divider';
import Headercomp from './Headercomponent';
import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import Comment from './Comments';
import Emotions from './EmotionBar';

const UserInterface = () => (

<div>
  <Grid columns='equal' className="usergrid">
    <Grid.Column>
      <Emotions />
    </Grid.Column>
    <Grid.Column width={8} className="usergrid">
        <Comment />
    </Grid.Column>
    <Grid.Column>
      <Emotions />
    </Grid.Column>
  </Grid>
</div>

)

export default UserInterface
