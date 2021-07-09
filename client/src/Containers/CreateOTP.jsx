import React from 'react';
import {useForm} from 'react-hook-form';
import './CreateOTP.css';

const CreateOTP = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="Container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="FormItem"
          type="text"
          placeholder="Mnemonic"
          required={false}
          {...register('mnemonic')}
        />
        <input
          className="FormItem"
          type="text"
          placeholder="Address"
          required={true}
          {...register('address')}
        />
        {errors.address && <span>This field is required</span>}
        <button className="FormButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateOTP;
