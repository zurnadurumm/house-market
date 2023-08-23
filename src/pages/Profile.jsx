import React from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore'

function Profile() {

    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setformData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,

    })

    const { name, email } = formData

    const navigate = useNavigate()

    const onLogOut = () => {
        auth.signOut()
        navigate('/')
    }
    const onSubmit = (e) => {
        console.log(123)

    }
    const onChange = (e) => {
        setformData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return (
        <div className='profile'>
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button className="logOut" type='button' onClick={onLogOut}>Log Out</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">
                        Profile Details
                    </p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit();
                        setChangeDetails((prevState) => !prevState)
                    }} > {changeDetails ? 'done' : 'change'}</p>
                </div>
                <div className="profileCard">
                    <form>
                        <input type="text" id='name' className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange} />
                    </form>
                </div>
            </main >
        </div >
    )
}

export default Profile