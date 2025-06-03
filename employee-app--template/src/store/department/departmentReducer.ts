
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Department, DepartmentState } from './department.types';

const initialState: DepartmentState = {
    departments: [],
};

export const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
        addDepartment: (state, action: PayloadAction<Department>) => {
            state.departments.push(action.payload);
        },
    },
});

export const { addDepartment } = departmentSlice.actions
export default departmentSlice.reducer;