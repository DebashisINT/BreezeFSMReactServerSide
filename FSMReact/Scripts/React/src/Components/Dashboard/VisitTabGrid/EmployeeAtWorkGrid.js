import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import axios from 'axios';
import $ from 'jquery';
import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import ShopVisitDetailsGrid from './ShopVisitDetailsGrid';

export default function EmployeeAtWorkGrid() {

     // const [productData, setProductData] = useState({ products: [] });
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%',  width: '100%' }), []);
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

  const [showShopVisitGrid, setShowShopVisitGrid] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();

  const [totalVisitGridText, setTotalVisitGridText] = useState("");

  // const [filterData, setFilterData] = useState({
  //   branchIds: "1,118,119,120,121,122,123,124,125,127,128",
  //   stateIds: "15,3,35,1,24,19,16,2,28,8",
  //   filterName: "AT_WORK",
  //   type: "Attendance",
  //   userId: "378"
  // });

  

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'Employee', filter: true, autoHeight: true, floatingFilter: true},
    { field: 'Designation', filter: 'agTextColumnFilter', autoHeight: true, floatingFilter: true },
    { field: 'Branch', width: 120, filter: true, autoHeight: true, floatingFilter: true },
    { field: 'Department', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'ContactNo', width: 120, filter: true, autoHeight: true, floatingFilter: true },
    { field: 'FirstInTime', width: 130, filter: true, autoHeight: true, floatingFilter: true },
    { field: 'LastLogoutTime', width: 150, filter: true, autoHeight: true, floatingFilter: true },
    { field: 'CurrentStatus', width: 130, filter: true, autoHeight: true, floatingFilter: true },
    { field: 'GPSInactivity', width: 130, filter: true, autoHeight: true, floatingFilter: true },
    { field: 'ShopsVisited', width: 130, filter: true, 
      autoHeight: true, floatingFilter: true, cellClass: "text-center", 
      cellRenderer: params => {
        const shopsVisited = params.value; 
    
        if (shopsVisited > 0) {
          return (
            <button className="infoButton" onClick={() => shopclick(params.data.EMPID, params.data.Employee)}>
              {shopsVisited}
            </button>
          );
        } else {
          return shopsVisited.toString(); // Display the numeric value as text if it's not greater than 0
        }
      },
    },
    { field: 'OrderValue', width: 130, filter: true, autoHeight: true, floatingFilter: true },
    { field: 'CollectionAmt', width: 130, filter: true, autoHeight: true, floatingFilter: true }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    sortable: true,
    editable: true,
    resizable: true,
    wrapText: true,
  }));

  // const onGridReady = useCallback((params) => {
  //   params.api.sizeColumnsToFit();
  //   window.addEventListener('resize', function () {
  //     setTimeout(function () {
  //       params.api.sizeColumnsToFit();
  //     });
  //   });

  //   // gridRef.current.api.sizeColumnsToFit();
  // }, []);

  // enables pagination in the grid
const pagination = true;

// sets 10 rows per page (default is 100)
const paginationPageSize = 10;

  // Example of consuming Grid Event
  // const cellClickedListener = useCallback( event => {
  //   console.log('cellClicked', event);
  // }, []);

  const branchIds = "1,118,119,120,121,122,123,124,125,127,128";
  const stateIds = "15,3,35,1,24,19,16,2,28,8";
  const filterName = "AT_WORK";
  const type = "Attendance";
  const userId= "378"

  

  useEffect(() => {
    // axios.post('http://localhost:5738/DashboardMenu/DashboardGridView', {
    //   params: {
    //     stateid: stateIds,
    //     branchid: branchIds,
    //     filterName: filterName,
    //     type: type,
    //     userId: userId,
    //   }
    // })
    // axios.post('http://localhost:5738/DashboardMenu/DashboardGridView?branchid=1,118,119,120,121,122,123,124,125,127,128&stateid=15,3,35,1,24,19,16,2,28,8&FilterName=AT_WORK&Type=Attendance&userid=378')
    axios.post(`http://localhost:5738/DashboardMenu/DashboardGridView?branchid=${branchIds}&stateid=${stateIds}&FilterName=${filterName}&Type=${type}&userid=${userId}`)
      .then(function (response) {
        
        setRowData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }, []);

    // var todaysvisitgrid = document.getElementById("todaysvisitgrid");
    // var employeesatworkgrid = document.getElementById("employeesatworkgrid");

    const shopclick = useCallback((EMPID, Employee) => {
      setShowShopVisitGrid(true);
      setSelectedEmployee({ empId: EMPID, employee: Employee });
      setTotalVisitGridText(Employee);
      // var spanElement = document.getElementById("gridshoptext");
      // spanElement.textContent = `Todays visit of ${Employee}`;

      // todaysvisitgrid.style.display = "block";
      // employeesatworkgrid.style.display = "none";

      console.log(EMPID, Employee)
    }, []);

    const TodaysVisitBack = () => {
      
      setShowShopVisitGrid(false);
      // todaysvisitgrid.style.display = "none";
      // employeesatworkgrid.style.display = "block";
    }

  return (
    <>
    <div id='employeesatworkgrid' style={{ display: showShopVisitGrid ? 'none' : 'block' }}>
    <h4 className='mb-4'>Employee Attendance details - Employees At Work</h4>
    <div style={containerStyle}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ overflow: 'hidden', flexGrow: '1' }}>
        <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
                ref={gridRef}
                rowData={rowData} // Row Data for Rows
                overlayLoadingTemplate={
                  '<span class="ag-overlay-loading-center">Data loading...</span>'
                }
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                cacheBlockSize={10}
                domLayout={'autoHeight'}
                
                // onGridReady={onGridReady}
                
            />
          </div>
        </div>

      </div>
    </div>
  </div>             
    
    {showShopVisitGrid && (
                // <ShopVisitDetailsGrid onEmployeeDetails={shopclick}/>
                <div id='todaysvisitgrid'>
                  {/* <h4 className='mb-4'>Todays visit of <span id="gridshoptext"></span></h4> */}
                  <div className='d-flex items-center-spcb'>
                    <h4 className='mb-4' id="gridshoptext">Todays visit of {totalVisitGridText}</h4>
                    <span onClick={TodaysVisitBack} id='todaysvisit-back' className=" clstyle" title="Back"><i className="fa fa-arrow-left"></i> </span>
                  </div>
                  <ShopVisitDetailsGrid 
                  empId={selectedEmployee.empId}
                  employee={selectedEmployee.employee}/>
                </div>
            )}
    </>
  )
}
