import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import axios from 'axios';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

export default function EmployeeNotLoggedInGrid() {
  // const [productData, setProductData] = useState({ products: [] });
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%',  width: '100%' }), []);
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'Employee', filter: true, autoHeight: true, floatingFilter: true},
    { field: 'Designation', filter: 'agTextColumnFilter', autoHeight: true, floatingFilter: true },
    { field: 'Branch', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'Department', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'State', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'Supervisor', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'ContactNo', filter: true, autoHeight: true, floatingFilter: true }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    sortable: true,
    // editable: true,
    resizable: true,
    wrapText: true,
  }));

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });

    gridRef.current.api.sizeColumnsToFit();
  }, []);

  // enables pagination in the grid
  const pagination = true;

  // sets 10 rows per page (default is 100)
  const paginationPageSize = 10;

  // Example of consuming Grid Event
  // const cellClickedListener = useCallback( event => {
  //   console.log('cellClicked', event);
  // }, []);
  useEffect(() => {
    axios.post('http://localhost:5738/DashboardMenu/DashboardGridView?branchid=1,118,119,120,121,122,123,124,125,127,128&stateid=15,3,35,1,24,19,16,2,28,8&FilterName=NOT_LOGIN&Type=Attendance&userid=378')
      .then(function (response) {
        // handle success
        // const dataArray = Array.isArray(response.data) ? response.data : [];
        
        setRowData(response.data);
        console.log('EMP-data', response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);



  return (
    <>
    <div style={containerStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ overflow: 'hidden', flexGrow: '1' }}>
        <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
                ref={gridRef}
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                cacheBlockSize={10}
                domLayout={'autoHeight'}
                overlayLoadingTemplate={
                  '<span className="ag-overlay-loading-center">Data loading...</span>'
                }
                onGridReady={onGridReady}
                
            />
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
