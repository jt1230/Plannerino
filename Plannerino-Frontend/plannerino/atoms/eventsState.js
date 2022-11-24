import { atom } from "recoil"

const eventsState = atom({
	key: 'events',
	default: [],
})
export default eventsState