import { isAxiosError } from "axios"
import api from "../config/axios"
import { User, UserHandle } from "../types"

export const getUser = async () => {
    try {
        const { data } = await api<User>('/user')
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateProfile = async (formData: User) => {
    try {
        const { data } = await api.patch<string>('/user', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const uploadImage = async (file: File) => {
    let formData = new FormData()
    formData.append('file', file);
    try {
        const { data } = await api.post('/user/image', formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}

export const getUserByHandle = async (handle: string) => {
    try {
        console.log(handle)
        const { data } = await api<UserHandle>(`/${handle}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }

}