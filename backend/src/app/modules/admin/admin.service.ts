import { StatusCodes } from "http-status-codes";
import { AppError } from "../../error/AppError";
import { User } from "../user/user.model";

const getallUser = async(searchQuery:Record<string,unknown>)=>{
    const search = searchQuery?.search || '';
    const page = searchQuery?.page || 1;
    const limit = searchQuery?.limit || 10;
    let query = {}
    if (search){
    query = {
        $or:[
            { email:{ $regex:search, $options:'i'} },
            { name:{ $regex:search, $options:'i'} },
        ]
    }
    }
    const skip = (Number(page) - 1) * Number(limit);
    const [data, total] = await Promise.all ([
        User.find(query).skip(skip).limit(Number(limit)).sort({_id:-1}),
        User.countDocuments(query)
    ])
    return{
      meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
    data,
  };
    }
const updateUserRole = async(id:string, role:string)=>{
 const user = await User.findById(id);
 if(!user){
    throw new AppError(StatusCodes.NOT_FOUND, "user not found")
 }
 const result = await User.findByIdAndUpdate(id, { role }, { new: true });
 return result;
}
export const adminService ={
    getallUser,
    updateUserRole
}