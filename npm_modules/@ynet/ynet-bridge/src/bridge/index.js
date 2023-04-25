import { ready, unready } from './helper'

// 路由管理
import * as route from './api/route'

// 缓存管理
import * as cache from './api/cache'

// 设备管理
import * as device from './api/device'

// 交互管理
import * as interactive from './api/interactive'

// 客户端native能力管理
import * as native from './api/native'

// 用户信息管理
import * as user from './api/user'

// 第三方管理
import * as third from './api/third'

// 业务能力管理
import * as business from './api/business'

export default {
    ready,
    unready,
    ...route,
    ...cache,
    ...device,
    ...interactive,
    ...native,
    ...user,
    ...third,
    ...business
}