import React from 'react';
import { connect } from 'react-redux';
import TableView from './TableView';
import LineGraphView from './LineGraphView';
import {  fetchSuccess, fetchError }  from '../actions/data';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tableData : [],
            lineChartData : [],
            metrics : [],
            isLoaded : false
        }
        
    }

    componentDidMount() {
        this.fetchData();
    }
    
    render() {
        return (
          <div>
            {this.state.isLoaded ? 
                (
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            <Col><TableView data={this.state.tableData} /></Col>
                            <Col><LineGraphView data={this.state.lineChartData} metricKeys={this.state.metrics}/></Col>
                        </Row>
                    </Container>) : 

                ''}

            </div>
            );
    }

    fetchData() {
        this.setState(() => ({isLoaded : false}))
        fetch(`https://reference.intellisense.io/thickenernn/v1/referencia`)
        .then(res => res.json())
        .then((data) => {
            console.log(this);
            this.props.fetchSuccess(data);
            this.populateTargetMetrics();
            this.populateTableData();
            this.populateLineChartData();
        })
        .catch(error => {
            console.log(this.props  );
            this.props.fetchError(error) 
        });
      }

      populateTargetMetrics() {

        let keys =  Object.keys(this.props.data);
        let targetString = new RegExp(/^RD:647/i);
        let keysStartingWithRD = keys.filter(key => targetString.test(key))
      
        let metrics = keysStartingWithRD.map(metricKey =>  { 
            return  {
                key : metricKey,
                color :'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'
            }
        });

        this.setState(() => ({metrics }))

      }

      populateTableData() {
        
        let tableData = [];
        this.state.metrics.forEach((key) => {
            let metricKey = key["key"];
            let values = this.props.data[metricKey]["values"];
            tableData.push({key : metricKey, value : this.round(values[values.length -1], 2)})
        });

        this.setState(() => ({ tableData  : tableData}));
        console.log("Table Data");
        console.log(this.state.tableData);
      }

      populateLineChartData() {
          let lineChartData = [];
        let times = this.props.data[this.state.metrics[0]["key"]]["times"];
        times.forEach((time, index) => {

            let row = {};
            row["time"] = time;

            this.state.metrics.forEach((metric) => {
                let metricKey = metric["key"];
                row[metricKey] = this.round(this.props.data[metricKey]["values"][index], 2)
            });
            lineChartData.push(row)
        });

        this.setState(() => ({ lineChartData  : lineChartData}));
        this.setState(() => ({isLoaded : true}))
      }

       round(value, decimals) {
        return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
      }

}



const mapStateToProps = state => ({
    data: state.apiData
})

const mapDispatchToProps = (dispatch) => ({
    fetchSuccess: (data) => dispatch(fetchSuccess(data)),
    fetchError: (err)=> dispatch(fetchError(err)),
    setTargetKey : (key) => dispatch(setTargetKey)
});
  
export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
  
