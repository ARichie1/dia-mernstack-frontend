import React, { useEffect, useState } from "react";
import CustomForm from "../reuseable/form_elements/CustomForm";
import ProfileImageSelector from "../settings_pages/profile_boxes/ProfileImageSelector";
import ProfileBiosAndSocials from "./profile_boxes/ProfileBiosAndSocials";
import ProfileAssets from "./profile_boxes/ProfileAssets";
import ProfileSinglePlayerHistory from "./profile_boxes/ProfileSinglePlayerHistory";
import ProfileMultiplayerHistory from "./profile_boxes/ProfileMultiplayerHistory";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUserContext } from "../../hooks/useUserContext";

const ProfileSettings = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("guest")
    const [country, setCountry] = useState("USWTF")

    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    
    const updateFormInputs = [
        {type: 'email', name:'email', title: 'email', value: email, setValue: setEmail, id: 1},
        {type: 'username', name:'username', title: 'username', value: username, setValue: setUsername, id: 2},
        {type: 'country', name:'country', title: 'country', value: country, setValue: setCountry, id: 3}
    ]

    const passwordResetFormInputs = [
        {type: 'password', name:'newPassword', title: 'New Password', value: newPassword, setValue: setNewPassword, id: 1},
        {type: 'password', name:'comfirmNewPassword', title: 'Comfirm New Passord', value: confirmNewPassword, setValue: setConfirmNewPassword, id: 2}
    ]

    const {currentUser} = useUserContext()
    
    return (
        <div className="settingsProfile wrapper">
            <h4 className="settingsHeader">Profile</h4>
            {/*<ProfileImageSelector/>*/}
            <ProfileBiosAndSocials currentUser={currentUser}/>
            <ProfileAssets />
            <ProfileSinglePlayerHistory />
            <ProfileMultiplayerHistory />
            <CustomForm
                formAttr={{title : 'User Update Form', 
                    class: "profileBox", width: "95%"}}  
                formInputs={updateFormInputs} 
                buttonAtrributes={{title: "Update"}} 
            />

            <CustomForm 
                formAttr={{title : 'Reset Password Form', 
                    class: "profileBox", width: "95%"}}  
                formInputs={passwordResetFormInputs} 
                buttonAtrributes={{title: "Reset"}} 
            />
            
            <div className="profileInfoDisplay profileHistoryReset profileBox">
                <div className="profileHistoryResetButton deleteDisplay">🗑 Reset History</div>
            </div>
        </div> 
    )
}

export default ProfileSettings