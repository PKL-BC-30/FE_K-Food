import { createSignal, onMount } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './usermanagement.css';

const UserManagement = () => {
  const [rowData, setRowData] = createSignal([]);
  const [showForm, setShowForm] = createSignal(false);
  const [newUser, setNewUser] = createSignal({ namadepan: '', namabelakang: '', email: '', katasandi: '', role: 'User' });

  onMount(() => {
    const savedData = localStorage.getItem('users');
    if (savedData) {
      setRowData(JSON.parse(savedData));
    }
  });

  const updateRowData = (newData) => {
    setRowData(newData);
    localStorage.setItem('users', JSON.stringify(newData));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser(), [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const updatedData = [...rowData(), newUser()];
    updateRowData(updatedData);
    setNewUser({ namadepan: '', namabelakang: '', email: '', katasandi: '', role: 'User' });
    setShowForm(false);
  };

  const columnDefs = [
    { field: 'namadepan', headerName: 'Nama Depan', editable: true },
    { field: 'namabelakang', headerName: 'Nama Belakang', editable: true },
    { field: 'email', headerName: 'Email', editable: true },
    { field: 'katasandi', headerName: 'Kata Sandi', editable: false },
    {
      headerName: 'Role',
      field: 'role',
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Admin', 'User']
      }
    },
    {
      headerName: 'Actions',
      cellRenderer: (params) => {
        const container = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.classList.add('action-button', 'edit-button');
        editButton.addEventListener('click', () => editUser(params));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('action-button', 'delete-button'); 
        deleteButton.addEventListener('click', () => deleteUser(params.data));

        const updateButton = document.createElement('button');
        updateButton.innerText = 'Update';
        updateButton.classList.add('action-button', 'update-button');
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
    params.api.startEditingCell({
      rowIndex: params.rowIndex,
      colKey: params.column.colId,
    });
  };

  const deleteUser = (userToDelete) => {
    const updatedData = rowData().filter((user) => user.email !== userToDelete.email);
    updateRowData(updatedData);
  };

  const updateUser = (params) => {
    console.log('Update user:', params.data);
    params.api.stopEditing();
    const updatedData = rowData().map((user) =>
      user.email === params.data.email ? { ...params.data } : user
    );
    updateRowData(updatedData);
  };

  return (
    <div class="ag-theme-alpine" style={{ height: '1000px', width: '100%' }}>
      <button onClick={() => setShowForm(true)} class='btn-tambah'>Tambah User</button>
      {showForm() && (
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            name="namadepan"
            placeholder="Nama Depan"
            value={newUser().namadepan}
            onInput={handleInputChange}
            required
          />
          <input
            type="text"
            name="namabelakang"
            placeholder="Nama Belakang"
            value={newUser().namabelakang}
            onInput={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser().email}
            onInput={handleInputChange}
            required
          />
          <input
            type="password"
            name="katasandi"
            placeholder="Kata Sandi"
            value={newUser().katasandi}
            onInput={handleInputChange}
            required
          />
          <button type="submit">Tambahkan</button>
        </form>
      )}
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

export default UserManagement;
