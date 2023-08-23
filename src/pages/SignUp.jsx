import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibiltiyIcon from '../assets/svg/visibilityIcon.svg'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify'
import { db } from '../firebase.config'

function SignUp() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const { name, email, password } = formData
    const navigate = useNavigate()
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value

        }))


    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            const formDataCopy = { ...formData }
            delete formDataCopy.password
            formDataCopy.createdAt = serverTimestamp()

            await setDoc(doc(db, 'users', user.uid), formDataCopy)

            navigate('/')

            updateProfile(auth.currentUser, {
                displayName: name,
            })

        } catch (error) {
            toast.error('Bad credentials')

        }

    }

    return (
        <>
            <div className="pageContainer">
                <header>
                    <p className="pageHeader">Welcome back!</p>
                </header>
                <main>
                    <form onSubmit={onSubmit}>
                        <input className='nameInput' type="text" id="name" placeholder='Name' value={name} onChange={onChange} />
                        <input className='emailInput' type="email" id="email" placeholder='Email' value={email} onChange={onChange} />
                        <div className="passwordInputDiv">
                            <input type={showPassword ? 'text' : 'password'} className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange} />
                            <img src={visibiltiyIcon} alt="Show password" className='showPassword' onClick={() => setShowPassword((prevState) => !prevState)} />

                        </div>
                        <Link to={`/forgot-password`} className='forgotPasswordLink' >Forgot password?</Link>
                        <div className="signInBar">
                            <p className="signInText">
                                Sign In

                            </p>
                            <button className='signInButton'><ArrowRight fill="#fff" width="34px" height="34px" /></button>
                        </div>


                    </form>
                    {/* Google login component */}
                    <Link className='registerLink' to={`/sign-up`}>Sign Up Instead</Link>
                </main>
            </div>
        </>
    )
}

export default SignUp