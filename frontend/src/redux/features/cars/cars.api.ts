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
       getallUser:builder.query({
        query:()=>({
            url:'/user',
            method:"GET",
            
        }),
        providesTags:['Users']
       })
    }),
})
export const {useCreteAcarMutation,useRegistrationMutation,useGetallUserQuery} = carApi