"use client";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

interface FormValues {
  username: string;
  email: string;
  channel: string;
  age: number | null;
  birthday: Date;
  social: {
    instagram: string;
    github: string;
  };
  // phoneNumbers: string[],
  phoneNumbers: { number: string }[];
}

function YouTubeForm() {
  const form = useForm<FormValues>({
    mode: "onBlur" ,

    // -------*hard code*------
    defaultValues: {
      username: "danial",
      email: "danial@gmail.com",
      channel: "danialm123",
      age: null,
      birthday: new Date(),
      social: {
        instagram: "",
        github: "",
      },
      // phoneNumbers: ["" , ""]
      phoneNumbers: [
        {
          number: "",
        },
      ],
    },

    // --------*dynamic code*---------
    // defaultValues: async () => {
    //   const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
    //   const data = await res.json()

    //   return {
    //     username: data.username,
    //     email: data.email,
    //     channel: data.name
    //   }
    // }
  });

  const { register, control, handleSubmit, formState: { errors , isValid , isSubmitSuccessful }, getValues, setValue, reset} = form;

  const { fields, append, remove } = useFieldArray({ name: "phoneNumbers", control: control });
  // console.log(fields)

  const getValuesHandler = () => {
    console.log("getValues" , getValues(["username" , "email" , "channel"]))
  }

  const setValuesHandler = () => {
    setValue("username" , "tina")
    setValue("email" , "tina@gmail.com")
  }

  const submitHandler = (data: FormValues) => {
    console.log(data);
  };

  // برای مدیریت error ها وقتی فرم را ارسال میکنیم
  const errorHandler = (errors : FieldErrors<FormValues>) => {
    console.log(errors)
  }

  useEffect( ()=> {
    if(isSubmitSuccessful){
      reset()
    }
  } , [isSubmitSuccessful])


  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(submitHandler , errorHandler)}
        className="youtube__form"
      >
        {/* username field */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", { required: "نام کاربری الزامی است" })}
            className={`border ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
        <p>{errors.username?.message}</p>

        {/* email field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "ایمیل الزامی است",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "فرمت صحیح ایمیل را وارد کنید",
              },
              validate: {
                notAdmin: (field) => {
                  return field !== "admin@gmail.com" || "ایمیل دیگری وارد کنید";
                },
                existingEmail: async(field) => {
                  const res = await fetch(`https://jsonplaceholder.typicode.com/users?email=${field}`)
                  const data = await res.json()
                  if(data.length !== 0) {
                    return "ایمیل قبلا ثبت شده است"
                  }
                }
              },
            })}
            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
        <p>{errors.email?.message}</p>

        {/* channel field */}
        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "وارد کردن نام کانال الزامی است",
            })}
            className={`border ${errors.channel ? 'border-red-500' : 'border-gray-300'}`}
          />
        </div>
        <p>{errors.channel?.message}</p>

        {/* age field */}
        <div>
          <label htmlFor="age">age</label>
          <input
            type="text"
            id="age"
            {...register("age", {
              required: "وارد کردن سن الزامی است",
              valueAsNumber: true,
            })}
            className={`border ${errors.age ? 'border-red-500' : 'border-gray-300'}`}/>
        </div>
        <p>{errors.age?.message}</p>

        {/* birthday field */}
        <div>
          <label htmlFor="birthday">date of birthday</label>
          <input
            type="date"
            id="birthday"
            {...register("birthday", { valueAsDate: true })}
          />
        </div>

        {/* social fields */}
        <div>
          <label htmlFor="insta">instagram</label>
          <input type="text" id="insta" {...register("social.instagram")} />
        </div>

        <div>
          <label htmlFor="github">github</label>
          <input type="text" id="github" {...register("social.github")} />
        </div>

        {/* phoneNumbers fields */}

        {/* <div>
            <label htmlFor="primaryMobile">primary mobile</label>
            <input
              type="text"
              id="primaryMobile"
              {...register("phoneNumbers.0")}
            />
          </div>

          <div>
            <label htmlFor="secondaryMobile">secondary mobile</label>
            <input
              type="text"
              id="secondaryMobile"
              {...register("phoneNumbers.1")}
            />
          </div> */}

        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNumbers">phone Numbers</label>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                type="text"
                id={`phoneNumbers.${index}`}
                {...register(`phoneNumbers.${index}.number`)}
              />
              {index > 0 && (
                <button
                  className="!bg-orange-400 text-white p-1 text-xs mx-2"
                  onClick={() => remove(index)}
                >
                  حذف
                </button>
              )}
            </div>
          ))}

          <button
            className="!bg-green-400 text-white p-1 text-xs"
            onClick={() => append({ number: "" })}
          >
            افزودن
          </button>
        </div>

        <button disabled={!isValid} type="submit">submit</button>

        <button className="!bg-yellow-500" type="button" onClick={getValuesHandler}>get value</button>
        <button className="!bg-yellow-500" type="button" onClick={setValuesHandler}>set value</button>
      </form>
      <DevTool control={control} />
    </>
  );
}

export default YouTubeForm;
