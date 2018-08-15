import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
    Container, Label, Menu, Tab, Button, Form, Grid, Header,
    Image, Message, List, Segment, Icon
} from 'semantic-ui-react'

import axios from 'axios';

export default class TeacherStats extends React.Component {


render (){

  return(

    <Container text textAlign='justified' style={{height: 500, padding: 50, backgroundColor: 'white'}}>
      <h1 align='center'>Feedback</h1>

      <h4 align='left'>Most popular questions:</h4>

      <List ordered>
        <List.Item icon='thumbs up' content='Q1'/>
        <List.Item icon='thumbs up' content='Q2'/>
        <List.Item icon='thumbs down' content='Q3'/>
      </List>

      <h4 align='left'>Where you were most confused:</h4>
      <List ordered>
        <List.Item content='Slide 1'/>
        <List.Item  content='Slide two'/>
        <List.Item  content='Slide three'/>
      </List>

      <h4 align='left'>Your questions:</h4>
      <List ordered>
        <List.Item content='Q1'/>
        <List.Item  content='Q2'/>
        <List.Item  content='Q3'/>
      </List>

    </Container>
  )
}
}
