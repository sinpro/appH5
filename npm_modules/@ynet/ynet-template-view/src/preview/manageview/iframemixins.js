let g_eventcounter = 0
let g_instancecounter = 0
let callbackPool = {}
let messagePool = {}

export default [{

    mounted () {
        this._channel = ''
        this._channelName = ''
        this._instanceId = ''
        this._targetInstanceId = ''
        this._entity = null
        this._messageHandler = this._onMessage.bind(this)
        window.addEventListener("message", this._messageHandler, false)
    },

    destroyed () {
        this._messageHandler && window.removeEventListener('message', this._messageHandler)
    },

    methods: {

        initMessageChannel (entity, name = '', channel = '') {
            //初始化通道
            this._instanceId = `${name}_${g_instancecounter++}`
            this._entity = entity
            this._channelName = name
            this._channel = channel
        },

        sendInitMessage (callback) {
            //发起消息握手
            this.sendMessage('_onInit', {instanceId: this._instanceId}, (eventData = {}) => {
                //握手成功
                this._targetInstanceId = eventData.instanceId
                callback && callback()
            })
        },

        sendMessage (event, data = {}, callback, origin = '*', entity) {
            //回调ID
            let callbackId = this._getCallbackId()
            //事件唯一编号，防重
            let eventId = this._getEventId()
            //组装事件对象
            let messageEvent = {
                channel: this._channel,
                eventId,
                event,
                callbackId,
                data,
                instanceId: this._targetInstanceId
            }

            if(callback) callbackPool[callbackId] = callback

            //发出消息
            entity = entity || this._entity
            entity && entity.postMessage && entity.postMessage(JSON.stringify(messageEvent), origin)
        },

        _getEventId () {
          return 'event_' + (new Date()).getTime() + '_' + g_eventcounter++
        },

        _getCallbackId () {
            return 'callback_' + (new Date()).getTime() + '_' + g_eventcounter++
        },

        _resolveEventFuncName (event) {
            return event ? (/^_on/.test(event) ? event : `on${event.substr(0, 1).toUpperCase()}${event.substring(1)}`) : ''
        },

        _onMessage (e = {}) {
            let data = e.data
            let dataObj, callback, callbackId, eventId, event, eventData, eventFuncName
            
            try{
                dataObj = JSON.parse(data)
            }catch(evt){
                dataObj = {}
            }
            
            //非目标消息不处理
            if(dataObj.channel != this._channel) return

            if(!/^_on/.test(dataObj.event) && dataObj.instanceId != this._instanceId) return

            callbackId = dataObj.callbackId
            eventId = dataObj.eventId
            event = dataObj.event
            eventFuncName = this._resolveEventFuncName(event)
            eventData = dataObj.data

            callback = (callbackData) => {
                if(callbackId){
                    this.sendMessage('_onCallback', {callbackId, data: callbackData}, null, e.origin, e.source)
                }
            }

            if(messagePool[eventId]){
              //已经处理过的消息，抛弃（防重）
              return
            }else{
              messagePool[eventId] = true
            }

            //事件回调
            event && this[eventFuncName] && this[eventFuncName](eventData, callback)
        },

        _onCallback (event) {
            callbackPool[event.callbackId] && callbackPool[event.callbackId](event.data)
        },

        _onInit (eventData = {}, callback) {
            this._targetInstanceId = eventData.instanceId
            callback && callback({instanceId: this._instanceId})
        }
    }
}]
