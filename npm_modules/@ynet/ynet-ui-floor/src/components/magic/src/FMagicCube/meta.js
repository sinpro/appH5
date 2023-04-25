export default {

    name: '魔方',

    className: 'FMagicCube',

    icon: require('../../../../assets/images/meta/icon_magic.png'),

    properties: [
        {
            itemId: '001',
            itemType: 'MagicForm',
            itemKey: 'data',
            itemOption: {},
            itemDefaultValue: {
                density: '4x4',
                itemList: []
            },
        },
        {
            itemId: '002',
            itemName: '图片间距',
            itemType: 'Slider',
            itemKey: 'itemMargin',
            itemOption: {},
            itemDefaultValue: '0',
        },
        {
            itemId: '004',
            itemName: '左右间距',
            itemType: 'Slider',
            itemKey: 'pageLeftRightMargin',
            itemOption: {},
            itemDefaultValue: '0',
        },
        {
            itemId: '005',
            itemName: '上下间距',
            itemType: 'Slider',
            itemKey: 'pageTopBottomMargin',
            itemOption: {},
            itemDefaultValue: '0',
        },
        
    ]
}