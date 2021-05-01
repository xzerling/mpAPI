import React from 'react';
import { forwardRef } from 'react';
import MedicionDataService from "../services/medicion.service";
//import {Link} from "react-router-dom";
import {Modal, TextField, Button} from '@material-ui/core'
import{makeStyles} from '@material-ui/core/styles'


//import DataTable from 'react-data-table-component';
import MaterialTable from 'material-table';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


const columnas = [
  {
    title: 'SensorRegistradoID',
    field: 'sr_id',
    sortable: true,
  },
  {
    title: 'ID medicion asociada',
    field: 'm_id',
    sortable: true,
  },
  {
    title: 'Nombre',
    field: 'nombre',
    sortable: true,
  },
  {
    title: 'Cultivo',
    field: 'cultivo',
    sortable: true,
  },
  {
    title: 'Ubicación',
    field: 'ubicacion',
    sortable: true
  },
  {
    title: 'Valor minimo',
    field: 'valorMinimo',
    sortable: true
  },
  {
    title: 'valor maximo',
    field: 'valorMaximo',
    sortable: true
  },
];

const paginacion={
  rowsPerPageText:'Filas por Página',
  rangeSeparatorText: 'de',
  selectAllRowsText: 'Todos',
  selectAllRowsItem: true
}





export default class SensoresTable extends React.Component {

  constructor(props){
    super(props);
    //this.retriveMedicion = this.retriveMedicion.bind(this);

    this.state = {
      sensores: []
    };

    
  }

  componentDidMount() {

    MedicionDataService.getAllSen()
      .then(res => {
        const sensores = res.data;
        this.setState({ sensores });
      })
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    return (
    <div>
        <MaterialTable
        columns={columnas}
        data={this.state.sensores}
        icons={tableIcons}
        actions={[
            {
              icon: 'edit',
              tooltip: 'Editar Sensor',
            },
            {
              icon: 'delete',
              tooltip: 'Eliminar Sensor',
            }
          ]}
        />
    </div>
    )
  }
}
