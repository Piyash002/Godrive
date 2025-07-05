import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { RiAccountCircleFill } from "react-icons/ri";

const Register = () => {
    return (
        <div>
        <Dialog>
      <DialogTrigger asChild>
        <RiAccountCircleFill/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>SignUp</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Email" className="text-right">
              Email
            </Label>
            <Input id="Email"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="Password"  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmpassword" className="text-right">
              Confirm password
            </Label>
            <Input id="confirm password"  className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full bg-amber-500">SignUp</Button>
        </DialogFooter>
           <h1>Account created? </h1>
      </DialogContent>
   
    </Dialog>
        </div>
    );
};

export default Register;