import React, { useState, useEffect } from "react";
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'login', headerName: 'Login', width: 130 },
  { field: 'salary', headerName: 'Salary', type: 'double',width: 130 }
];

const StyledTextField = styled(TextField)`
	margin: 10px 0;
	width: 30%;
`;

function App() {
  const [users, setUsers] = useState([]);
  // const [searchWord, setSearchWord] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.data))
      .catch(err => console.log(err));
  }, []);

  // const globalSearch = () => {
	// 	const filteredRepositories = users.filter((value) => {
	// 		return (
	// 			value?.id?.toLowerCase().includes(searchWord?.toLowerCase()) ||
  //       value?.name?.toLowerCase().includes(searchWord?.toLowerCase()) ||
	// 			value?.login?.toLowerCase().includes(searchWord?.toLowerCase()) ||
	// 			value?.salary?.toString().includes(searchWord?.toLowerCase())
	// 		);
	// 	});
	// 	return filteredRepositories;
	// };

  const salarySearch = () => {
		const filteredRepositories = users.filter((value) => {
			return (
				parseFloat(value?.salary?.toString()) >= parseFloat(minSalary?.toLowerCase()) &&
        parseFloat(value?.salary?.toString()) <= parseFloat(maxSalary?.toLowerCase())
			);
		});
		return filteredRepositories;
	};

  const filterRepositoryList = minSalary && maxSalary ? salarySearch() : users;

  return (
    <div style={{ height: '100%', width: '80%', margin: '0% 10% 0% 10%'}}>
      <div style={{width: '100%', display: 'flex', float: 'left'}}>
        <StyledTextField
          value={minSalary}
          onChange={(event) => setMinSalary(event.target.value)}
          label="Minimum Salary"
          variant="outlined"
        />
        <p style={{margin: '25px 3% 25px 3%'}}>-</p>
        <StyledTextField
          value={maxSalary}
          onChange={(event) => setMaxSalary(event.target.value)}
          label="Maximum Salary"
          variant="outlined"
        />
      </div>
      <div>
        <h1>Employees</h1>
      </div>
      <div>
        <DataGrid 
          rows={filterRepositoryList && filterRepositoryList}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 6 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
  </div>
  );
}

export default App;