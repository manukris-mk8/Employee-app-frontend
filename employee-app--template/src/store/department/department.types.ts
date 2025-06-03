import type { Employee } from "../employee/employee.types"; // assuming you have Employee types

export interface Department {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  name: string;
  employees: Employee[];
}

export interface DepartmentState {
  departments: Department[];
}