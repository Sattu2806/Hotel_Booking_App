"use client";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Container from "../components/Container";
import { categories } from "../components/Modals/CategoryModal";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import ClientOnly from "../components/ClientOnly";
import CategoryBox from "../components/Inputs/CategoryMox";
import { useForm,FieldValues, SubmitHandler } from "react-hook-form";
import CountrySelect from "../components/Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../components/Inputs/Counter";
import ImageUpload from "../components/Inputs/ImageUpload";
import Input from "../components/Inputs/Input";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";


const AddPlace= () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors = {} } = {},
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount= watch("guestCount");
  const roomCount= watch("roomCount");
  const bathroomCount= watch("bathroomCount");
  const imageSrc= watch("imageSrc");

  const setCustomValue = (id:string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const Map = useMemo(
    () =>
      dynamic(() => import("../components/Map"), {
        ssr: false,
      }),
    [location]
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) =>{
    setIsLoading(true)

    axios.post('api/listings', data)
    .then(() =>{
      toast.success('Listing Created')
      router.refresh();
      router.push('/')
      reset();
    })
    .catch(() =>{
      toast.error('Something went wrong')
    })
    .finally(() =>{
      setIsLoading(false)
    })
  }


  return (
    <ClientOnly>
      <Container>
        <div className="pt-24">
          <div className="flex flex-col gap-8">
            <Heading
              title="What describes your place?"
              subtitle="Pick a category"
            />
            <div
              className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            lg:grid-clos-3
            xl:grid-cols-4
            gap-3
            max-h-[80vh]
            overflow-y-auto
          "
            >
              {categories.map((item) => (
                <div key={item.label} className="col-span-1">
                  <CategoryBox
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="space-y-10">
              <Heading
                title="Where is your place located?"
                subtitle="Help your guests"
              />
              <CountrySelect
                value={location}
                onChange={(value) => setCustomValue("location", value)}
              />
            </div>
            <Map center={location?.latlng} />
          </div>
          <div className="flex flex-col gap-8">
              <Heading 
                title="Basic information about your place "
                subtitle="What amenities do you have?"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Counter value={guestCount}  
                title="Guests" 
                subtitle="How many guests do you allowed?"
                onChange={(value) => setCustomValue('guestCount', value)}
                />
                <Counter value={roomCount}  
                title="Rooms" 
                subtitle="How many Rooms do you have?"
                onChange={(value) => setCustomValue('roomCount', value)}
                />
                <Counter value={bathroomCount}  
                title="bathroomCount" 
                subtitle="How many Bathrooms do you have?"
                onChange={(value) => setCustomValue('bathroomCount', value)}
                />
              </div>
          </div>
          <div className="flex flex-col gap-8">
              <Heading 
                title="Add a photo of your place"
                subtitle="Show your place to your guests!"
              />
              <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
          </div>
          <div className="flex flex-col gap-8">
              <Heading 
                title="How would you describe you place"
                subtitle="short and sweet works best"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Input id="title" label="title" disabled={isLoading} register={register} errors={errors} required/>
              <Input id="desciption" label="description" disabled={isLoading} register={register} errors={errors} required/>
              </div>
          </div>
          <div className="flex flex-col gap-8">
              <Heading 
                title="Set Your Price"
                subtitle="How much you charge?"
              />
              <Input 
                id="price"
                label = "Price"
                formatPrice
                type = "number"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
              />
          </div>
          </div>
          <div className="mt-10 mb-20">
            <Button label="Submit" onClick={handleSubmit(onSubmit)}/>
            </div>
        </div>
      </Container>
    </ClientOnly>
  );
};

export default AddPlace;
