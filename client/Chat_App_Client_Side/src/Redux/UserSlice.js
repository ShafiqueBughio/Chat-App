import {createSlice} from "@reduxjs/toolkit"

  const initialSelectedColor = localStorage.getItem("selectedChatColor");

  const initialBgColor = localStorage.getItem('selectedBgColor');


const Initialstate = {
    _id:"",
    name:"",
    email:"",
    profile_pic : "",
    token : "",
    onlineUser : [],
    socketConnection : null,
    darkMode : localStorage.getItem('theme') === "dark" ? true : false,
    chatColor : false,
    selectedColor : initialSelectedColor,
    chatOption : false,
    clearChat : false,
    ClearChat_Choice : false,
}

const User_Slice = createSlice({
    name:"user",
    initialState:Initialstate,

    reducers:{
        SetUser:(state,action)=>{
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.profile_pic = action.payload.profile_pic
        },
        SetToken:(state,action)=>{
            state.token = action.payload

        },
        Logout:(state,action)=>{
            state._id = ""
            state.name = ""
            state.email = ""
            state.profile_pic = ""
            state.socketConnection = null
        },
        SetOnlineUser:(state,action)=>{
            state.onlineUser = action.payload
        },
        SetSocketConnection:(state,action)=>{
            state.socketConnection = action.payload;
        },
        toggleTheme:(state)=>{
            state.darkMode = !state.darkMode
            localStorage.setItem('theme',state.darkMode ? "dark" : "light");
        },
        changeColor:(state,action)=>{
            state.selectedColor = action.payload;
            localStorage.setItem('selectedChatColor',action.payload);
        },
        toggleChatColor : (state)=>{
            state.chatColor = !state.chatColor
        },
        toggleChatOption : (state)=>{
            state.chatOption = !state.chatOption
        },
        toggleClearChat : (state,action)=>{
            state.clearChat = !state.clearChat
        },
        toggleClearChat_Choice : (state)=>{
            state.ClearChat_Choice = !state.ClearChat_Choice
        },
    }
})

export const {SetUser,SetToken,Logout,SetOnlineUser,SetSocketConnection,toggleTheme,changeColor,toggleChatColor,toggleChatOption,toggleClearChat,toggleClearChat_Choice} = User_Slice.actions;

export default User_Slice.reducer;