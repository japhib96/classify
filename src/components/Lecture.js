import React from 'react'
import { Table, Grid } from 'semantic-ui-react'

const Lecture = () => (
  <Grid.Column  width={12} floated="right" className="style">
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Lecture Name</Table.HeaderCell>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell>Time Created</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.Cell selectable>Math 1</Table.Cell>
          <Table.Cell selectable>Linear Algebra</Table.Cell>
          <Table.Cell selectable>Today 10:08 AM</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </Grid.Column>

)

export default Lecture;
