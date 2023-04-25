
import {menuTreeInfo} from '../../config/components'

var templateMap = {};

(function initialize(){
    var menuList = menuTreeInfo || [];

    //一级菜单
    menuList.forEach((menuItem) => {
        var list = menuItem.menuList || []
        //二级菜单
        list.forEach((menu) => {
            templateMap[menu.menuType] = menu
        })
    })

})();

export function getMenuInfo(menuType) {
    return (templateMap[menuType])
}

