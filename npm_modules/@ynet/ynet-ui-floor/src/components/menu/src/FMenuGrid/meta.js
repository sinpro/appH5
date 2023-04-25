export default {

    name: '宫格菜单',

    className: 'FMenuGrid',

    icon: require('../../../../assets/images/meta/icon_magic.png'),

    properties: [

        {
            itemId: '001',
            itemType: 'BusinessForm',
            itemKey: 'menus',
            itemOption: {
                businessType: '007'
            },
            itemDefaultValue: [
                {
                    title: '宫格一',
                    imageUrl: '@floorstatic/gray.jpg',
                },
                {
                    title: '宫格二',
                    imageUrl: '@floorstatic/gray.jpg',
                },
                {
                    title: '宫格三',
                    imageUrl: '@floorstatic/gray.jpg',
                },
                {
                    title: '宫格四',
                    imageUrl: '@floorstatic/gray.jpg',
                }
            ],
        },
        {
            itemId: '008',
            itemName: '视图类型',
            itemType: 'Select',
            itemKey: 'menuStyle',
            itemOption: {
                iParamList: [
                    {key: '01', value: '平铺视图'},
                    {key: '02', value: '圆角矩形视图'},
                ]
            },
            itemDefaultValue: '01',
            itemGroup: 'menuStyle'
        },
        {
            itemId: '002',
            itemName: '布局列数',
            itemType: 'Select',
            itemKey: 'columns',
            itemOption: {
                iParamList: [
                    {key: '2', value: '两列'},
                    {key: '3', value: '三列'},
                    {key: '4', value: '四列'},
                    {key: '5', value: '五列'}
                ]
            },
            itemDefaultValue: '4',
            itemGroup: 'menuStyle.01'
        },
        {
            itemId: '009',
            itemName: '布局列数',
            itemType: 'Select',
            itemKey: 'columns',
            itemOption: {
                iParamList: [
                    {key: '2', value: '两列'},
                    {key: '3', value: '三列'},
                    {key: '4', value: '四列'}
                ]
            },
            itemDefaultValue: '4',
            itemGroup: 'menuStyle.02'
        },
        {
            itemId: '003',
            itemName: '背景颜色',
            itemType: 'Color',
            itemKey: 'bgColor',
            itemOption: {},
            itemDefaultValue: '#00FFFFFF',
        },
        {
            itemId: '004',
            itemName: '文字颜色',
            itemType: 'Color',
            itemKey: 'titleColor',
            itemOption: {},
            itemDefaultValue: '#FF323C41',
        },
        {
            itemId: '005',
            itemName: '上间距',
            itemType: 'Slider',
            itemKey: 'topMargin',
            itemOption: {
                min: 0,
                max: 100
            },
            itemDefaultValue: '10',
        },
        {
            itemId: '006',
            itemName: '下间距',
            itemType: 'Slider',
            itemKey: 'bottomMargin',
            itemOption: {
                min: 0,
                max: 100
            },
            itemDefaultValue: '10',
        },
        {
            itemId: '007',
            itemName: '阴影',
            itemType: 'Switcher',
            itemKey: 'shadow',
            itemOption: {},
            itemDefaultValue: '0',
        }
    ]
}