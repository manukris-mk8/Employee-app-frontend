//  import { EMPLOYEE_ACTION_TYPES, type EmployeeAction, type EmployeeState} from "./employee.types"

// const initialState = {employees:[]}

// function employeeReducer(state:EmployeeState = initialState , action:EmployeeAction): EmployeeState {
//     switch (action.type) {
//         case EMPLOYEE_ACTION_TYPES.DELETE :
//             return {
//                 ...state,
//                 employees: [...state.employees.filter((employee) => employee.employeeId ! == action.payload)]
//             }
//         case EMPLOYEE_ACTION_TYPES.UPDATE :
//             console.log("update called");

//             return {
//                 ...state,
//                 employees : state.employees.map(
//                     (emp) => {
//                         if(emp.employeeId === action.payload.employeeId){
//                             return action.payload
//                         }
//                         else{
//                             return emp
//                         }
//                     })
//             }
//         case EMPLOYEE_ACTION_TYPES.ADD :
//             console.log("add called");

//             return {
//                 ...state,
//                 employees: [...state.employees,action.payload]
//             }
//         default: return state;
//     }
// }

// export default employeeReducer;





import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Employee, EmployeeState } from './employee.types';

const initialState: EmployeeState = {
    employees: [],
};

export const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<Employee>) => {
            state.employees.push(action.payload);
        },
    },
});

export const { addEmployee } = employeeSlice.actions
export default employeeSlice.reducer;