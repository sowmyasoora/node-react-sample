import React from 'react';
import Table from 'react-bootstrap/Table'

export default (props) => {
        return (
          
            <div >
                <h3>TableView</h3>
                        <Table striped bordered>
                        <thead>
                        <tr>
                            <th></th>
                            <th>Metric</th>
                            <th>Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        { props.data.map((data, index)=>  {
                            return  (<tr key={index}>
                                <td>
                                <input type="checkbox" onChange={props.handleCheck} id={data["key"]} defaultChecked={data["isEnabled"]}/> 
                                </td>
                                <td>{data["key"]}</td>
                                <td>{data["value"]}</td>
                            </tr>)
                            }
        
                        )}

                        </tbody>
                        </Table>
                </div>
        );
}  
