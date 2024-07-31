import * as React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Inputs from '../inputs/inputs';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

const FormSchema = z.object({
  first_name: z
  .string()
  .min(2,"First name must be more than 2 character")
  .max(32,"ชื่อต้องน้อยกว่า 32 อักขระ")
  .regex(new RegExp("^[a-zA-Z]+$"),"No special character"),
  last_name: z
  .string()
  .min(2,"Last name must be more than 2 character")
  .max(32,"สกุลต้องน้อยกว่า 32 อักขระ")
  .regex(new RegExp("^[a-zA-Z]+$"),"No special character"),
  email: z.string().email('กรุณาป้อน email ให้ถูกต้อง'),
  password: z
  .string()
  .min(6,"ไม่น้อยกว่า 6 ตัวอักษร")
  .max(12,"ไม่เกิน 12 อักขระ")  
})

type FormSchemaType = z.infer<typeof FormSchema>
interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema)
  });


  const onSubmit: SubmitHandler<FormSchemaType> = (data)=> console.log(data)
  

  return (
    <>
      <h1>Register Form</h1>
      <form onSubmit = {handleSubmit(onSubmit)}>
      <Inputs 
      name='first_name'
      label='First Name'
      type='text'
      placeholder='First Name'
      register = {register}
      error={errors?.first_name?.message}
      disable={isSubmitting}
      />
       <Inputs 
      name='last_name'
      label='Last Name'
      type='text'
      placeholder='Last Name'
      register = {register}      
      error={errors?.last_name?.message}
      disable={isSubmitting}
      />
      <Inputs 
      name='email'
      label='Email'
      type='text'
      placeholder='Email'
      register = {register}      
      error={errors?.email?.message}
      disable={isSubmitting}
      />
     <Inputs 
      name='password'
      label='Password'
      type='text'
      placeholder='Password'
      register = {register}      
      error={errors?.password?.message}
      disable={isSubmitting}
      />
      <button>Submit</button>
      </form>
    </>
  );
};

export default Register;
