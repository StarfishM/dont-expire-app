import React, { Component } from "react";
import Calendar from "react-calendar";
import { connect, useSelector } from "react-redux";

const TileContent = ({ date, view }) =>
  view === "month" && date.getDay() === 0 ? <p>It's Sunday!</p> : null;
class ExpiryCalendar extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }
  componentDidMount() {
    // const expiryCalendarEvent = console.log(date.getDay());
    console.log("TileContent in Calendar", TileContent);
    console.log(this.props.expiryDates);
  }

  onChange = date => this.setState({ date });

  render() {
    return (
      <div className="main-content">
        <Calendar onChange={this.onChange} value={this.state.date} />
        <TileContent value={new Date()} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    items: state.items,
    expiryDates: state.expiryItems.expires_after_date_bought
  };
};

export default connect(mapStateToProps)(ExpiryCalendar);
