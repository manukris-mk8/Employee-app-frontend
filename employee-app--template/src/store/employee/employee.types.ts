export interface Address {
  houseNo: string;
  line1: string;
  line2: string;
  pincode: string;
}

export const EmployeeRole = {
  UI: "UI",
  UX: "UX",
  DEVELOPER: "DEVELOPER",
  HR: "HR",
} as const;

export type Role = (typeof EmployeeRole)[keyof typeof EmployeeRole];

export const EmployeeStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  PROBATION: "PROBATION",
} as const;

export type Status = (typeof EmployeeStatus)[keyof typeof EmployeeStatus];

export interface Employee {
    id:number
  employeeId: string;
  email: string;
  name: string;
  age: number;
  address: Address;
  password: string;
  role: string;
  dateOfJoining: string;
  experience: number;
  status: string;
  department: {
    name: string,
    id: number
  };
}

export const EMPLOYEE_ACTION_TYPES = {
  DELETE: "employee/DELETE",
  UPDATE: "employee/UPDATE",
  ADD: "employee/ADD"
} as const;

export type EmployeeActionTypes =
  (typeof EMPLOYEE_ACTION_TYPES)[keyof typeof EMPLOYEE_ACTION_TYPES];

export interface EmployeeState {
  employees: Employee[];
}

export interface DeleteEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.DELETE;
  payload: string; // employee id
}

export interface UpdateEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.UPDATE;
  payload: Employee;
}
export interface AddEmployeeAction {
  type: typeof EMPLOYEE_ACTION_TYPES.ADD;
  payload: Employee;
}

export type EmployeeAction = DeleteEmployeeAction | UpdateEmployeeAction | AddEmployeeAction;
