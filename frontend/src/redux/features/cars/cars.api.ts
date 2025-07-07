import { baseApi } from "../api/baseApi";

export const carApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
       creteAcar:builder.mutation({
        query:(body)=>({
            url:"/cars/create-car",
            method:"POST",
            body
        }),
        invalidatesTags:["Cars"]
       }),
       registration:builder.mutation({
        query:(body)=>({
            url:'/user/register-user',
            method:"POST",
            body
        }),
        invalidatesTags:['Users']
       }),
       getallCars:builder.query({
        query:({searchParams})=>({
            url:`/cars/get-allcar?${searchParams}`,
            method:"GET",
            
        }),
        providesTags:['Cars']
       })
    }),
})
export const {useCreteAcarMutation,useRegistrationMutation,useGetallCarsQuery} = carApi