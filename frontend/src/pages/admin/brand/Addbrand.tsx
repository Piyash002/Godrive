import { Button } from "@/components/ui/button";
import { InputField } from "@/components/user/input/Input";
import { useAddBrnadMutation } from "@/redux/features/cars/brand.api";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
type FormValues = {
  brand: string;
  image: FileList;
};
const AddBrand = () => {
  const [addBrand] = useAddBrnadMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append("brand", data.brand);
    formData.append("image", data.image[0]); // only one image

    try {
      const res = await addBrand(formData).unwrap();
        if (res.success) toast.success("Brand Name added successfully");
      reset();
    } catch (err) {
      console.error("Error adding brand:", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Add a Brand</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Brand"
          name="brand"
          register={register}
          placeholder="Brand Name"
          rules={{ required: "Brand name is required" }}
          error={errors.brand?.message}
        />
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
          />
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Add Brand
        </Button>
      </form>
    </div>
  );
};

export default AddBrand;
