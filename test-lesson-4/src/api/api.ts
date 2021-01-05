import { PhotosType, ProfileType, UsersDataType } from './../types/types';
import axios from 'axios';


export enum ResultCodesEnum {
    Success = 0, 
    Error = 1
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '30bffa88-490b-405c-83b6-e6b58d235873'
    }
});


type GetUsersType = {
    items: Array<UsersDataType>
    totalCount: number
    error: null | string
}
type FollowOrUnfollowType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    setFollow(id: number) {
        return instance.post<FollowOrUnfollowType>(`follow/${id}`)
        .then(response => response.data);
    },
    setUnfollow(id: number){
        return instance.delete<FollowOrUnfollowType>(`follow/${id}`)
        .then(response => response.data);
    }
}



type AuthMeType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
type LoginType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
type ExitType = {
    data: {
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
    messages: Array<string>
}
export const headerAPI = {
    login() {
        return instance.get<AuthMeType>(`auth/me`)
        .then(response => response.data);
    },
    LoginTo(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<LoginType>(`auth/login`, {
            email, password, rememberMe, captcha
        })
        .then(response => response.data);
    },
    Exit(){
        return instance.delete<ExitType>(`auth/login`)
        .then(response => response.data);
    }
}

type GetCaptchaType = {
    url: string
}
export const securityAPI = {
    getCapchaUrl() {
        return instance.get<GetCaptchaType>('security/get-captcha-url');
    }
}

type UpdateStatusType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
type SavePhotoType = {
    photos: PhotosType
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type UpdateProfileType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
export const profileAPI = {
    profilesData(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusType>(`profile/status`, {status: status});
    },
    savePhoto(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile);

        return instance.put<SavePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType){
        return instance.put<UpdateProfileType>('/profile',profile)
        .then(response => response.data);
    }
}