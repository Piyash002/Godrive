import { baseApi } from "../api/baseApi";

export const brandApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
       addBrnad:builder.mutation({
        query:(body)=>({
            url:"/brands/add-brand",
            method:"POST",
            body
        }),
        invalidatesTags:["Brands"]
       }),
    //    registration:builder.mutation({
    //     query:(body)=>({
    //         url:'/user/register-user',
    //         method:"POST",
    //         body
    //     }),
    //     invalidatesTags:['Users']
    //    }),
       getallBrand:builder.query({
        query:()=>({
            url:`/brands`,
            method:"GET",
        }),
        providesTags:['Brands']
       }),
    //    getSingleCars:builder.query({
    //     query:(id)=>({
    //         url:`/cars/${id}`,
    //         method:"GET",
            
    //     }),
    //     providesTags:['Cars']
    //    })
    }),
})
export const {useAddBrnadMutation, useGetallBrandQuery} = brandApi