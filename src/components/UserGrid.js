import Divider from './divider';
import Headercomp from './Headercomponent';
import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import Comment from './Comments';
import Emotions from './EmotionBar';
import Statistics from './ClassStatistics';
import axios from 'axios'


const UserInterface = (props) => (

<div>
  <Grid columns='equal' className="usergrid">
    <Grid.Column>
      <Statistics user={props.user} class={props.class} />
    </Grid.Column>
    <Grid.Column width={8} className="usergrid">
        <Comment user={props.user} class={props.class} />
    </Grid.Column>
    <Grid.Column>
      <Emotions user={props.user} class={props.class} />
    </Grid.Column>
  </Grid>

</div>

)

export default UserInterface
