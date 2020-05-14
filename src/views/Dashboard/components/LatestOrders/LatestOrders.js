import React, { forwardRef } from 'react';
import moment from 'moment'
import MaterialTable from 'material-table';
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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const tableIcons = {
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'ref', field: 'ref' },
      { title: 'Customer', field: 'customer' },
      { title: 'requtedAt', field: 'requestAt' },
      { title: 'Vehile No', field: 'vehicle_no' },
      { title: 'status', field: 'status' }
    ],
    data: [
      {
        ref:'3243242',
        customer:'monu kumar',
        requestAt:moment(Date.now()).format('LT'),
        staus:"serviced",
        vehicle_no:'3434KL45',
      }
    ]
  });
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4caf50'
      },
      secondary: {
        main: '#ff9100'
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <MaterialTable
        title="Store Shedule"
        columns={state.columns}
        icons={tableIcons}
        data={state.data}
        options={{
          search: false,
          actionsColumnIndex: -1
        }}
        actions={[
          {
            icon: Check,
            tooltip: 'Check',
            onClick: (event, rowdata) => { 
               let T = state.data.find((t)=>t.ref===rowdata.ref) ;
               T.customer="monu";
               let ts = state.data;
               ts.splice(ts.findIndex(t=>t.ref===rowdata.ref),1,T);
               setState(state=>({
                 ...state,
                 data:ts
               }))
            }
  
          },
          {
            icon:DeleteOutline,
            onClick:(event,rowData)=>{ alert('hi') }
          }
        ]}
      />
    </MuiThemeProvider>
  );
}
