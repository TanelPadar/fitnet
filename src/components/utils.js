import axios from "axios";

const api = process.env.REACT_APP_API_KEY;

export const getUser = (userId) => axios.get(api + `/trainers/${userId}`)
export const getTrainerClients = (userId) => axios.get(api + `/trainer/clients/${userId}`)
export const RegisterUser = (name,email,password,phone) => axios.post(api + '/register', {
    name: name,
    email: email,
    password: password,
    phone: phone
})
export const LoginUser =  (email,password) => axios.post(api + '/login', {
    email: email,
    password: password
})
export const UpdateUser = (userId,updatedFields) => axios.put(api + `/trainers/${userId}`, updatedFields)
export const removeClient = (trainerId,clientId) => axios.put(api + `/remove_client/${trainerId}/${clientId}`)

export const getWorkouts = (userId) => axios.get(api + `/schedule/${userId}`)

export const postWorkout = (newWorkoutUser,newWorkoutTime,newWorkoutDescription) => axios.post(api + '/add-workout', {
    userId: newWorkoutUser,
    date: newWorkoutTime,
    description: newWorkoutDescription
})

export const deleteWorkoutById = (workoutId) => axios.delete(api + `/delete-workout=${workoutId}`);

export const getExercisesById = (workoutId) => axios.get(api + `/get-exercises/${workoutId}`)
export const postExercise =  (workoutId,exerciseName) => axios.post(api + `/add-exercise/${workoutId}`, {
    exerciseName: exerciseName
})