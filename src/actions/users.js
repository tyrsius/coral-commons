import action from './actionCreator'
import Firebase, {CHILD_ADDED, CHILD_REMOVED, CHILD_CHANGED } from 'services/firebase'


export const USER_ADDED = 'USER_ADDED'
export const USER_REMOVED = 'USER_REMOVED'
export const USER_UPDATED = 'USER_UPDATED'

const userAdded = action(USER_ADDED)
const userRemoved = action(USER_REMOVED)
const userUpdated = action(USER_REMOVED)


export function startListeningToUsers(dispatch) {
	const users = Firebase.child('users')
	users.on(CHILD_ADDED, snapshot => 
		dispatch(userAdded({id: snapshot.key(), value: snapshot.val()})))
	users.on(CHILD_REMOVED, snapshot => 
		dispatch(userRemoved({id: snapshot.key()})))
	users.on(CHILD_CHANGED, snapshot => 
		dispatch(userUpdated({id: snapshot.key(), value: snapshot.val()})))
}

export function stopListeningToUsers() {
	const users = Firebase.child('users')
	users.off(userAdded)
	users.off(userRemoved)
	users.off(userUpdated)
}