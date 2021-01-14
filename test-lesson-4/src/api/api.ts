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
export type FollowOrUnfollowType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}
export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean | string) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`))
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

export type GetCaptchaType = {
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
    data: {
        photos: PhotosType
    }
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


export type DeleteMessageType = {
    data: {} 
    fieldsErrors?: Array<string>
    messages?:  Array<string>
    resultCode?: ResultCodesEnum
}
export type getSelectedChatMessagesType = {
    items: Array<MessagesDataType>
    totalCount: number
    error: null | string
}

export type SendedMessageToUserType = {
    data:{message: MessagesDataType} 
    fieldsErrors?: Array<string>
    messages?: null | Array<string>
    resultCode?: ResultCodesEnum
}
export type MessagesDataType = {
    id: string
    body: string
    translatedBody: null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
    deletedByRecipient?: boolean
    distributionId?: null | number
    recipientName?: string
    isSpam?: boolean
}
export type getDialogsAPIResponseType<D> = {
    data: Array<D> 
    fieldsErrors?: Array<string>
    messages?: null | Array<string>
    resultCode?: ResultCodesEnum
}
export type DataType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
}

export const dialogsAPI = {
    getAlldialogs(){
        return instance.get(`/dialogs`)
        .then(response => response.data)
    },
    startChat(userId: number){
        return instance.put<getDialogsAPIResponseType<{}>>(`/dialogs/${userId}`)
        .then(response => response.data)
    },
    selectChat(userId: number, pageNumber: number = 1){
        return instance.get<getSelectedChatMessagesType>(`dialogs/${userId}/messages?count=20&page=${pageNumber}`)
        .then(response => response.data)
    },
    sendMessageToUser(userId: number, message: string){
        return instance.post<SendedMessageToUserType>(`dialogs/${userId}/messages`, {body: message })
        .then(response => response.data)
    },
    deleteMessage(messageId: string){
        return instance.delete<DeleteMessageType>(`dialogs/messages/${messageId}`)
        .then(response => response.data)
    },
    
}

//++ dialogs/{userId}	
//++ dialogs
//++ post dialogs/{userId}/messages
//++ get dialogs/{userId}/messages
// dialogs/messages/{messageId}/viewed
// dialogs/messages/{messageId}/spam
//++ dialogs/messages/{messageId}
// dialogs/messages/{messageId}/restore
// dialogs/{userId}/messages/new?newerThen={date}
// dialogs/messages/new/count	




