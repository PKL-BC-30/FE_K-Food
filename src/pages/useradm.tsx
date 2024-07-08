import { createSignal, onMount, Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const UserAdmin: Component = () => {
  const [rowData, setRowData] = createSignal([]);

  // Load data from local storage on component mount
  onMount(() => {
    const savedData = localStorage.getItem('users');
    if (savedData) {
      setRowData(JSON.parse(savedData));
    }
  });

  // Save data to local storage whenever it changes
  const updateRowData = (newData) => {
    setRowData(newData);
    localStorage.setItem('users', JSON.stringify(newData));
  };

  const columnDefs = [
    { field: 'namadepan', headerName: 'Nama Depan', editable: true },
    { field: 'namabelakang', headerName: 'Nama Belakang', editable: true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'katasandi', headerName: 'Kata Sandi', editable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params) => {
        const container = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => editUser(params));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteUser(params.data));

        const updateButton = document.createElement('button');
        updateButton.innerText = 'Update';
        updateButton.addEventListener('click', () => updateUser(params));

        container.appendChild(editButton);
        container.appendChild(deleteButton);
        container.appendChild(updateButton);

        return container;
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
  };

  const editUser = (params) => {
    console.log('Edit user:', params.data);
    // Implement edit user logic here
  };

  const deleteUser = (userToDelete) => {
    const updatedData = rowData().filter((user) => user.email !== userToDelete.email);
    updateRowData(updatedData);
  };

  const updateUser = (params) => {
    console.log('Update user:', params.data);
    const updatedData = rowData().map((user) =>
      user.email === params.data.email ? { ...params.data } : user
    );
    updateRowData(updatedData);
  };

  return (
    <div class="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      {/* Ensure Ag-Grid is properly initialized */}
      {rowData().length > 0 ? (
        <AgGridSolid
          columnDefs={columnDefs}
          rowData={rowData()}
          defaultColDef={defaultColDef}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserAdmin;
