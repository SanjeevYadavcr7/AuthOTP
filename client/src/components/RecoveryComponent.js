import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import styles from '../styles/style.module.css'
import { passwordValidate } from '../utils/formValidate';

const RecoveryComponent = () => {

  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: passwordValidate,
    onSubmit: async values => {
      console.log(values);
    }
  });

  return (
    <div className="container mx-auto">
      
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}> 

            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address
                </span>  
                <input className={styles.textbox} type="text" placeholder="OTP" />
              </div>
              <button className={styles.btn} type="submit">Sign In</button>  
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">Didn't receive OTP?   
                <button className="text-red-500 px-2" to="/recovery">Resend</button>
              </span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default RecoveryComponent