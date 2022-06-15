/*用户*/
export interface User {
    id: number,
    username: string,
    password?: string,
    realName?: string,
    nickName: string,
    gender: number,
    phone?: number,
    email: string,
    avatar?: string,
    isAdmin?: number,
    isDelete?: number,
    createTime: string,
    updateTime?: string
}

/*角色*/
export interface Role {
    id: number,
    name: string,
    remark: string,
    isDelete?: number,
    createUser: number,
    createTime: string,
    updateTime: string
}