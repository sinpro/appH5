export function indexOf(list, obj){
    let tList = list || []
    let index = 0
    let len = tList.length

    for(index = 0; index < len; index++){
        if(tList[index] === obj){
            return index
        }
    }
    return -1
}

export function parseItem (itemInfo) {
    let kind = itemInfo.floorType || itemInfo.menuType
    let name = itemInfo.floorName || itemInfo.menuName
    let subkind = itemInfo.styleType || itemInfo.menuDefault 
    let top = itemInfo.floorTop || itemInfo.menuTop
    let type = subkind ? (kind + '-' + subkind) : kind

    return {
        name,
        kind,
        subkind,
        top,
        type
    }
}

export function getItemTop (itemInfo) {
    return itemInfo.floorTop || itemInfo.menuTop
}