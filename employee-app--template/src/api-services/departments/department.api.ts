import type { Department } from "../../store/department/department.types";
import baseApi from "../api";

export const departmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDepartments: builder.query<Department[], void>({
            query: () => "/department/",
            providesTags: ['DEPARTMENTS']
        }),
    }),
});

export const { useGetDepartmentsQuery } = departmentApi;