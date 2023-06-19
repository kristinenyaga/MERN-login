import create from 'zustand'

export const useAuthStore = create((set) => ({
  // initial state
  auth: {
    username: "",
    
  },
  // setUsername
  // set is used to update the state
  setUsername:(name)=>set((state)=>({auth:{...state.auth,username:name}}))
}))