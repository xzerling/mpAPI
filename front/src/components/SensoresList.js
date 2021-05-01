import React, { Component} from 'react';
import MedicionDataService from "../services/medicion.service";
//import {Link} from "react-router-dom";
import API from '../api';
import ReactSpeedometer from "react-d3-speedometer"
//import { medicion } from '../../../back/models';


export default class SensoresList extends React.Component {

  constructor(props){
    super(props);
    //this.retriveMedicion = this.retriveMedicion.bind(this);

    this.state = {
      sensores: [],
      medicion: [],
      lastMedicion: [],
      senmed: []
    };
  }



  componentDidMount() {


    //this.retriveMedicion();

    //API.get('/medicion/')
    /*  
    const q1 = MedicionDataService.getAllSen()
      .then(res => {
        const sensores = res.data;
        this.setState({ sensores });
      })
      const q2 = MedicionDataService.get(q1)
      .then(res => {
        const lastMedicion =res.data;
        this.setState({lastMedicion});
      })
*/
    MedicionDataService.senMed().
    then(res =>{
      const senmed = res.data.result;
      console.log(senmed.result);
      this.setState({senmed});
    })
  }

  retrieveMedicion() {
    MedicionDataService.getAll()
      .then(response => {
        this.setState({
          medicion: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*
  asdf(id){

    API.get('/medicion/'+id)
    .then(res => {
      const lastMedicion = res.data;
      this.setState({ lastMedicion });
      console.log(res.data.valor);
      console.log(this.state.lastMedicion.valor)
      return res.data.valor;
    })



    console.log("asdf")
    console.log(this.state);
    if(this.state.sensores.m_id==id)
    {
      return this.state.sensores.valor
    }
    else
      return null
  }*/

  render() {

    return (
      <ul>
          
        { this.state.senmed.map(sensor =>
        <li>
          <button>Modificar valores</button>
            <ReactSpeedometer 
              id={sensor.idMedicion}
              currentValueText={sensor.nombre+": "+sensor.cultivo}
              value={sensor.valor}
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