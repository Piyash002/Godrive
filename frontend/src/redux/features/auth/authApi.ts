import { baseApi } from "../api/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
       login:builder.mutation({
        query:(body)=>({
            url:"/user/login-user",
            method:"POST",
            body
        }),
        invalidatesTags:["Users"]
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
export const {useLoginMutation,useRegistrationMutation,useGetallUserQuery} = authApi