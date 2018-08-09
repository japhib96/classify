import React from 'react';
import StatisticSection from '../ClassStatistics'
import PDFViewer from './PDFViewer'
import EmotionBar from '../EmotionBar'




class TeacherView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {

    return (
      <div>
        <PDFViewer class={this.props.class}/>
        <StatisticSection user={this.props.user} class={this.props.class} />
        <EmotionBar user={this.props.user} class={this.props.class}/>

      </div>
    );
  }
}

export default TeacherView;
