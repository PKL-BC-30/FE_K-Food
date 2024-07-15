import { createSignal, onMount, Component } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './useradm.css';

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
    // Assign 'User' role to new entries
    newData.forEach(entry => {
      if (!entry.role) { // Only assign role if it's not already set
        entry.role = 'User';
      }
    });
    setRowData(newData);
    localStorage.setItem('users', JSON.stringify(newData));
  };

  const columnDefs = [
    { field: 'namadepan', headerName: 'Nama Depan', editable: true },
    { field: 'namabelakang', headerName: 'Nama Belakang', editable: true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'katasandi', headerName: 'Kata Sandi', editable: false }, // Kata Sandi tidak dapat diubah
    {
      headerName: 'Role',
      field: 'role',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Admin', 'User']
      }
    },
  ];

  const defaultColDef = {
    flex: 1,
    minWidth: 150,
  };

  return (
    <div class="ag-theme-alpine" style={{ height: '1500px', width: '100%' }}>
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
