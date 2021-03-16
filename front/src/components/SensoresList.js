import React from 'react';
import API from '../api';
import ReactSpeedometer from "react-d3-speedometer"
 


export default class SensoresList extends React.Component {
  state = {
    sensores: [],
    medicion: []
  }

  componentDidMount() {
    //API.get('/medicion/')
    API.get('/sensores/')
      .then(res => {
        const sensores = res.data;
        this.setState({ sensores });
      })
    //API.get('/medicion/'+this.state.sensores.)
  }

  render() {
    return (
      <ul>
          
        { this.state.sensores.map(sensor => 
        <li>
          <button>Modificar valores</button>
            <ReactSpeedometer 
              id={sensor.idMedicion}
              currentValueText={sensor.nombre+": "+sensor.cultivo}
              value={120.5}
              minValue={sensor.valorMinimo}
              maxValue={sensor.valorMaximo}
              colors={['#5BE12C', '#F5CD19', '#EA4228']}
              percent={sensor.valor}
              arcPadding={0.02}
              textcolor={'#FFFFFF'}
            />
            
            </li>
            )}
            
      </ul>
    )
  }
}