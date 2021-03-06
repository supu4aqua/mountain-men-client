import React from 'react';
import DriverBidCard from './DriverBidCard.js';
import { getAllBids, getAllJobs } from '../actions/jobs';

export default class DriverReviewBids extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  componentDidMount() {
    this.props.props.bids.bids = [];
    this.props.props.jobs.jobs = [];
    this.props.dispatch(getAllJobs());
    this.props.dispatch(getAllBids());
  }

  render() {

    let driverBids = this.props.props.bids.bids.filter(item => {
      return item.userId === this.props.props.auth.currentUser.id;
    })

    let jobs = this.props.props.jobs.jobs.filter(item => {
      return !item.completed && !item.accepted;
    })

    driverBids.map(item => {
      return jobs.forEach(job => {
        if (job.id === item.jobId && !job.completed && !job.accepted) {
          item.accepted = job.accepted;
          item.completed = job.completed;
          item.jobDescription = job.description;
          item.jobTitle = job.title;
          item.jobPosterId = job.userId;
          item.jobDate = job.date;
        }
      })
    })

    driverBids = driverBids.filter(item => {
      return item.jobPosterId;
    })

    
    if (jobs.length === 0) {
      driverBids = [];
    }


    driverBids = driverBids.map((bid, index) => {
      return <DriverBidCard bid={bid} key={index} dispatch={this.props.dispatch} />;
    });

    if (driverBids.length === 0) {
      driverBids = (
        <li>Nothing here yet. Click on 'Find a Job' above to find and bid on jobs.</li>
      )
    }

    return (
      <section style={{display: 'flex', justifyContent: 'center'}}>
        <ul style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', width: '800px'}}>
          {/* get all bids
          render a new component
            */}
          {driverBids}
        </ul>
      </section>
    );
  }
}

