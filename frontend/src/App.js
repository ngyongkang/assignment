import React, { useState, useEffect } from "react";
import './App.css';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'login', headerName: 'Login', width: 130 },
  { field: 'salary', headerName: 'Salary', type: 'double',width: 130 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch(err => console.log(err));
  }, []);
  
  // return (
  //   <div className="App">
  //     {users.map((list, index) => (
  //       <li key={index}>{list.id} | {list.name}</li>
  //     ))}
  //   </div>
  // );

  return (
    <div style={{ height: 430, width: '100%', 'margin-right': '10px' ,'marign-left': 'right' }}>
      <h1>Employees</h1>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
  </div>
  );
}

export default App;
