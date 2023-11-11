import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { addDetailsThunk, deleteDetailsThunk, getDetailsThunk, updateDetailsThunk } from '../../store/middleware';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import ConfirmationDialog from '../../components/dialog';
import { DataGrid } from '@mui/x-data-grid';

const Home = () => {
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [editedData, setEditedData] = useState({
    });
    const [filteredRows, setFilteredRows] = useState([]);
    const { getDetails, deleteDetails, updateDetails, addDetails } = useSelector((state) => state.application);
    const prevGetStateRef = useRef(null);
    const prevDeleteStateRef = useRef(null);
    const prevUpdateStateRef = useRef(null);
    const prevAddStateRef = useRef(null);

    useEffect(() => {
        dispatch(getDetailsThunk())
    }, []);

    useEffect(() => {
        if (prevGetStateRef.current && prevGetStateRef.current.status !== getDetails.status) {
            const newData = {
                Id: 0,
                FirstName: '',
                LastName: '',
                City: '',
            };
            setRows((prevRows) => [...getDetails.response, newData]);
        }

        if (prevAddStateRef.current && prevAddStateRef.current.status !== addDetails.status) {
            dispatch(getDetailsThunk());
        }

        if (prevDeleteStateRef.current && prevDeleteStateRef.current.status !== deleteDetails.status) {
            dispatch(getDetailsThunk());
        }

        if (prevUpdateStateRef.current && prevUpdateStateRef.current.status !== updateDetails.status) {
            dispatch(getDetailsThunk());
        }

        prevGetStateRef.current = { ...getDetails };
        prevAddStateRef.current = { ...addDetails };
        prevDeleteStateRef.current = { ...deleteDetails };
        prevUpdateStateRef.current = { ...updateDetails };
    }, [dispatch, getDetails, addDetails, deleteDetails, updateDetails]);



    const handleRemove = async (id) => {
        setSelectedRowId(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (selectedRowId !== null && selectedRowId !== undefined) {
            const data = {
                id: selectedRowId,
            };
            try {
                await dispatch(deleteDetailsThunk(data));
                setDeleteDialogOpen(false);
                toast.success("Data deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete data");
            }
        } else {
            console.error('Selected row ID is undefined or null.');
        }
    };


    const handleDeleteCanceled = () => {
        setDeleteDialogOpen(false);
    };

    const handleAdd = async (rowData) => {
        if (rowData.FirstName && rowData.LastName && rowData.City) {
            try {
                const add = {
                    FirstName: rowData.FirstName,
                    LastName: rowData.LastName,
                    City: rowData.City,
                };
                await dispatch(addDetailsThunk(add)); 
                toast.success("Data inserted successfully!");
            } catch (error) {
                toast.error("Failed to add record. Please try again.");
            }
        }
    };
    


    useEffect(() => {
        const newFilteredRows = rows.filter((row) =>
            Object.values(row).some((value) => {
                if (typeof value === 'string' || typeof value === 'number') {
                    const lowercasedValue = String(value).toLowerCase();
                    const lowercasedSearchText = searchText.toLowerCase();
                    return lowercasedValue.includes(lowercasedSearchText);
                }
                return false;
            })
        );

        setFilteredRows(newFilteredRows);
    }, [rows, searchText]);

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const columns = [
        { field: 'Id', headerName: 'ID', flex: 1 },
        { field: 'FirstName', headerName: 'First Name', flex: 1, editable: true },
        { field: 'LastName', headerName: 'Last Name', flex: 1, editable: true },
        { field: 'City', headerName: 'City', flex: 1, editable: true },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => {
                if (params.row.Id === 0) {
                    return (
                        <div>
                            <button
                                onClick={() => handleAdd(params.row)}
                                style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    padding: '10px 15px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Add
                            </button>

                        </div>
                    );
                }
                return (
                    <div>
                        <button
                            onClick={() => handleRemove(params.row.Id)}
                            style={{
                                backgroundColor: 'red',
                                color: 'white',
                                padding: '10px 15px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            Remove
                        </button>
                    </div>
                );
            },
        },
    ];

    const containerStyle = {
        height: 400,
        width: '100%',

    };

    const getRowId = (row) => row.Id;

    const [editedDataIndex, setEditedDataIndex] = useState(null);

    useEffect(() => {
        if (editedDataIndex !== null) {
            console.log('Edited Data Index:', editedDataIndex);
            console.log('Edited Data:', editedData[editedDataIndex]);
    
            const editedItem = editedData[editedDataIndex];
            if (editedItem.Id !== 0) {
                const edit = {
                    FirstName: editedItem.FirstName,
                    LastName: editedItem.LastName,
                    City: editedItem.City,
                    id: editedItem.Id,
                };
    
                dispatch(updateDetailsThunk(edit))
                    .then(() => {
                        toast.success("Data updated successfully!");
                    })
                    .catch((error) => {
                        toast.error(error);
                    });
            }
        }
    }, [editedDataIndex, editedData, dispatch]);
    


    const handleProcessRowUpdate = (updatedRow, originalRow) => {
        if (updatedRow.Id !== undefined && updatedRow.Id !== null) {
            const rowIndex = rows.findIndex((row) => row.Id === updatedRow.Id);
            if (rowIndex !== -1) {
                const updatedRows = [...rows];
                updatedRows[rowIndex] = {
                    ...updatedRows[rowIndex],
                    Id: updatedRow.Id,
                    FirstName: updatedRow.FirstName !== undefined ? updatedRow.FirstName : originalRow.FirstName,
                    LastName: updatedRow.LastName !== undefined ? updatedRow.LastName : originalRow.LastName,
                    City: updatedRow.City !== undefined ? updatedRow.City : originalRow.City,
                };

                setEditedData(updatedRows);
                setEditedDataIndex(rowIndex);

                return updatedRows[rowIndex];
            } else {
                console.error('Row not found with Id:', updatedRow.Id);
                return originalRow;
            }
        } else {
            console.error('Invalid Id in the updated row');
            return originalRow;
        }
    };

    const Header = styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.primary.main,
        padding: theme.spacing(2),
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: 10
    }));
    return (
        <div style={{ justifyContent: '', alignItems: 'center', height: "100%", width: '100%' }}>
            <Header>{"CRUD Operation Using Node.js with Mysql"}</Header>;
            <TextField
                label="Search"
                value={searchText}
                onChange={handleSearchTextChange}
            />
            <div style={containerStyle}>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    loading={getDetails.loading}
                    getRowId={getRowId}
                    showCellVerticalBorder={true}
                    showColumnVerticalBorder={true}
                    processRowUpdate={handleProcessRowUpdate}
                />
            </div>
            <ToastContainer />
            <ConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleDeleteCanceled}
                onConfirm={handleDeleteConfirmed}
                message="Are you sure you want to delete Record?"
            />
        </div>
    );
};

export default Home;
