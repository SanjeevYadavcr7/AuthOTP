import { useState } from "react";
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import avatar from '../assets/profile.png';
import styles from '../styles/style.module.css'
import extend from '../styles/profile.module.css';
import { profileValidation } from '../utils/formValidate';
import convertToBase64 from '../utils/convertImage';

const ProfileComponent = () => {

  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      address: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: profileValidation,
    onSubmit: async values => {
      values = await Object.assign(values, {profile: file || ''});
      console.log(values);
    }
  });

  // formik doesn't support file upload hence creating a handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">
      
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: '55%', paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              You can update your details here.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img className={` ${styles.profile_img} ${extend.profile_img}`} src={file || avatar} alt="avatar" />
              </label>

              <input onChange={onUpload} type="file" id="profile" name="profile" />

            </div>
          
            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('firstName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="FirstName" />
                <input {...formik.getFieldProps('lastName')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="LastName" />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input {...formik.getFieldProps('mobile')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Phone" />
                <input {...formik.getFieldProps('email')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Email" />
              </div>

              <input {...formik.getFieldProps('address')} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder="Address" />
              <button className={styles.btn} type="submit">Update</button>  

            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">Come back later?   
                <button className="text-red-500 px-2" to="/">Logout</button>
              </span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default ProfileComponent