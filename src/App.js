import React, { Component } from 'react';

var PropTypes = React.PropTypes;

var style = {
   grid: {
     borderCollapse: "collapse"
   },
   header: {
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #000"
  },
  cell: {
    padding: "5px",
    border: "1px solid #000"
  }
};

class Grid extends Component {
  propTypes: {
      dataSource: PropTypes.object.isRequired,
      renderRow: PropTypes.func.isRequired,
      renderHeader: PropTypes.func,
      renderFooter: PropTypes.func
  };
  renderBody(data) {
    var body = data.map(function(row){
      return this.props.renderRow(row)
    },this)
    return body
  }
  render() {
    var header;
    var footer;
    var body = this.renderBody(this.props.dataSource);
    if (this.props.renderHeader) {
      header = this.props.renderHeader();
    }
    if (this.props.renderFooter) {
      footer = this.props.renderFooter();
    }
    return (
        <table style={style.grid}>
          <tbody>
              {header}
              {body}
              {footer}
          </tbody>
        </table>
    );
  }
}

export default class DatePicker extends Component {
  propTypes: {
      currentDate: PropTypes.object.isRequired,
      dayNames: PropTypes.array.isRequired,
      monthNames: PropTypes.array.isRequired
  };

  getDate(year, month, day){
    return new Date(year,month,day).getDate();
  }
  renderHeader(){
    var month = this.props.currentDate.getMonth();
    var monthName = this.props.monthNames[month];
    var year = this.props.currentDate.getFullYear();
    var header = monthName + ' ' + year;
    return  <tr>
              <td colSpan="7" style={style.header}>{header}</td>
            </tr>;
  }
  renderRow(content){
    var row = content.map(function(item){
      return <td style={style.cell}> {item} </td>;
    });
    return <tr>{row}</tr>;
  }
  setDatepickerContent(year,month,dayNames){
    var firstDay = new Date(year, month, 1).getDay(),
        table = [],
        week = [],
        day,
        start;
    table[0] = dayNames;
    if (firstDay==0) {firstDay = 7;}
    if (firstDay>=1) {start = 1-firstDay+1;}

    for (var i=1,k=0;i<6;i++){
      week=[];
      for (var j=1;j<=7;j++){
        day = this.getDate(year,month,start+k);
        week.push(day);
        k++;
      }
      table[i] = week;
    }
    return table;
  }
  render() {
    var month = this.setDatepickerContent(this.props.currentDate.getFullYear(),this.props.currentDate.getMonth(),this.props.dayNames);
    return (
        <Grid
            renderHeader={this.renderHeader.bind(this)}
            renderRow={this.renderRow}
            dataSource={month}
        />
    );
  }
}

