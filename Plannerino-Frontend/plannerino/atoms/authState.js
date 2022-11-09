import { atom } from "recoil"

const authState = atom({
	key: 'auth',
	default: null,
})
export default authState