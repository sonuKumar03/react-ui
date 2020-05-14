import React , {forwardRef} from 'react';
import {useDispatch} from  'react-redux';
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
import { selectShedule, addShedule } from 'app/Garage/store/storeSlice';
import { useSelector } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
const tableIcons = {
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
export default function MaterialTableDemo() {
  const dispatch = useDispatch();
  const [state] = React.useState({
    columns: [
      { title: 'Day', field: 'day' },
      { title: 'From', field: 'from' },
      { title: 'To', field: 'to' },
    ],
    data:useSelector(selectShedule).map(o=>({...o})),
  });
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#ff9100',
      },
    },

  });

  return (
    <MuiThemeProvider theme={theme}>
    <MaterialTable
      title="Store Shedule"
      columns={state.columns}
      icons={tableIcons}
      data={state.data}
      options={{
        search:false,
          actionsColumnIndex: -1
      }}
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            console.log(oldData);
            let shedules = state.data;
            shedules = shedules.filter((data)=>oldData.day!==data.day);
            dispatch(addShedule(shedules));
            resolve();
          }),
      }}
    />
    </MuiThemeProvider>
  );
}
