import { Box } from '@mui/material'
import { DataGrid, GridActionsCellItem, GridColDef, GridEventListener, GridRowEditStopReasons, GridRowId, GridRowModel, GridRowModes, GridRowModesModel, GridToolbar, GridValidRowModel } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import React from 'react';

type Props = {
    columns: GridColDef[],
    rows: any[]
    setRows: React.Dispatch<React.SetStateAction<any[]>>
    rowModesModel: GridRowModesModel
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>
    handleDeleteClick(id:GridRowId): React.MouseEventHandler<HTMLButtonElement>
    processRowUpdate(newRow:GridRowModel):GridValidRowModel
}

export default function EditableDataGrid({columns, rows, setRows, handleDeleteClick, processRowUpdate}:Props) 
{
    //hooks
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    //functions
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };
    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rows.find((row) => row.id === id);
        
        if (editedRow!.isNew) {
          setRows(rows.filter((row) => row.id !== id));
        }
        
    };

    //cols
    const cols:GridColDef[] = [
        ...columns,
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

                if(isInEditMode){
                    return [
                        <GridActionsCellItem 
                            icon={<SaveIcon />}
                            label='Guardar'
                            sx={{color: 'primary.main'}}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem 
                            icon={<CancelIcon />}
                            label='Cancelar'
                            className='textPrimary'
                            onClick={handleCancelClick(id)}
                            color='inherit'
                        />,
                    ]
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Editar"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Borrar"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ]
            },
        }
    ]

    return (
        <Box minHeight={400} sx={{
            width: '100%',
            height: '72vh',
            '& .actions': {
                color: 'text.secondary',
            },
            '& .textPrimary': {
                color: 'text.primary',
            },
        }}>
            <DataGrid 
                rows={rows}
                columns={cols}
                editMode='row'
                slots={{toolbar:GridToolbar}}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                initialState={{
                    pagination:{paginationModel:{pageSize:10}}
                }}
                pageSizeOptions={[10,25,100]}
            />
        </Box>
    )
}
