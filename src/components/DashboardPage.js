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
            lineChartData : [],
            metrics : [],
            isLoaded : false
        }
        
    }

    componentDidMount() {
        this.fetchData();
    }

    handleCheck = (event) =>{

        let targetMetricKey = event.target.id;

        let metrics = [...this.state.metrics];
        metrics.forEach(metric => {
            if(metric["key"] === targetMetricKey ) {
                metric["isEnabled"] = !metric["isEnabled"];
            }
        })
       
        this.setState(prevState => ({
            metrics
        }));
    }

    render() {
        return (
          <div>
            {this.state.isLoaded ? 
                (
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            <Col><TableView data={this.state.metrics} handleCheck={this.handleCheck} /></Col>
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
            this.setState(() => ({isLoaded : true}))
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
                color :'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
                isEnabled : false
            }
        });

        this.setState(() => ({metrics }))
      }

      populateTableData() {
        
        let metrics = [...this.state.metrics];
        metrics.forEach((key) => {
            let metricKey = key["key"];
            let values = this.props.data[metricKey]["values"];
            key["value"] = this.round(values[values.length -1], 2)
        });

        this.setState(() => ({ metrics}));
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
  
