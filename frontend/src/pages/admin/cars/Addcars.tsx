/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/user/input/Input";
import { useCreteAcarMutation } from "@/redux/features/cars/Cars.api";
import type { TCar } from "@/types/types";
import { uploadToCloudinary } from "@/utils/Cloudinary";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

const Addcars = () => {
 const [mainImageIndex, setMainImageIndex] = useState(0);
 const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [addCar] = useCreteAcarMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCar>();

  const onSubmit: SubmitHandler<TCar> = async (data) => {
    try {
      const fileList = (data as any).images as FileList;
      if (!fileList || fileList.length === 0) {
        toast.error("Please select at least one image");
        return;
      }

      const cloudinaryUploads = await Promise.all(
        Array.from(fileList).map((file, i) =>
          uploadToCloudinary(file).then((url: any) => ({
            url,
            isMain: i === mainImageIndex,
          }))
        )
      );

      const carPayload = {
        name: data.name,
        type: data.type,
        brand: data.brand,
        modelYear: Number(data.modelYear),
        pricePerDay: Number(data.pricePerDay),
        rating: 0,
        images: cloudinaryUploads,
        description: data.description,
         features: data.features|| [], 
        addOns: {
          insurance: data.addOns?.insurance || false,
          gps: data.addOns?.gps || false,
          childSeat: data.addOns?.childSeat || false,
          additionalDriver: data.addOns?.additionalDriver || false,
        },
      };

      const res = await addCar(carPayload).unwrap();
      console.log(res)
      if (res.success) toast.success("Car added successfully");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Add a Car</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <InputField
          label="Car Name"
          name="name"
          register={register}
          rules={{ required: "Car name is required" }}
          error={errors.name?.message}
        />

        <InputField
          label="Brand"
          name="brand"
          register={register}
          rules={{ required: "Brand is required" }}
          error={errors.brand?.message}
        />

        <label className="block text-sm font-medium">Car Type</label>
        <select {...register("type", { required: "Type is required" })} className="w-full border px-3 py-2 rounded">
          <option value="">Select Type</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
          <option value="Luxury">Luxury</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}

        <InputField
          label="Model Year"
          name="modelYear"
          type="number"
          register={register}
          rules={{ required: "Model year is required" }}
          error={errors.modelYear?.message}
        />

        <InputField
          label="Price Per Day"
          name="pricePerDay"
          type="number"
          register={register}
          rules={{ required: "Price is required" }}
          error={errors.pricePerDay?.message}
        />

        <InputField
          label="Description"
          name="description"
          register={register}
          rules={{ required: "Description is required" }}
          error={errors.description?.message}
        />

        <InputField
          label="Features (comma-separated)"
          name="features"
          register={register}
          placeholder="Bluetooth, AC, Automatic"
        />
       <div>
  <label className="block text-sm font-medium">Images</label>
  <input
    type="file"
    multiple
    accept="image/*"
    {...register("images", { required: "At least one image is required" })}
    onChange={(e) => {
      const files = e.target.files;
      if (files) {
        const previews = Array.from(files).map((file) => URL.createObjectURL(file));
        setPreviewImages(previews); // set state for previews
      }
    }}
  />
  {errors.images && <p className="text-red-500 text-sm">{errors.images.message}</p>}

  {previewImages.length > 0 && (
    <div className="grid grid-cols-3 gap-2 mt-2">
      {previewImages.map((img, i) => (
        <div key={i}>
          <img
            src={img}
            onClick={() => setMainImageIndex(i)}
            className={`cursor-pointer w-full h-24 object-cover rounded ${
              mainImageIndex === i ? "border-4 border-green-500" : "border"
            }`}
          />
          <p className="text-xs text-center">
            {mainImageIndex === i ? "Main Image ✅" : "Click to set as main"}
          </p>
        </div>
      ))}
    </div>
  )}
      </div>


        <div className="grid grid-cols-2 gap-2">
          <label><input type="checkbox" {...register("addOns.insurance")} /> Insurance</label>
          <label><input type="checkbox" {...register("addOns.gps")} /> GPS</label>
          <label><input type="checkbox" {...register("addOns.childSeat")} /> Child Seat</label>
          <label><input type="checkbox" {...register("addOns.additionalDriver")} /> Additional Driver</label>
        </div>

        <Button onClick={()=>reset} type="submit" className="w-full">Add Car</Button>
      </form>
    </div>
  );
};

export default Addcars;
