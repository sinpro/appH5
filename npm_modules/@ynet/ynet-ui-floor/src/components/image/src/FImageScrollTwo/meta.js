export default {

    name: '侧滑两组',

    className: 'FImageScrollTwo',

    icon: require('../../../../assets/images/meta/image/icon_image_scrollone.png'),

    properties: [
        {
            itemId: '001',
            itemType: 'BusinessForm',
            itemKey: 'images',
            itemOption: {
                businessType: '009'
            },
            itemWatch: {imageSize: 'imageSize'},
            itemDefaultValue: [
                {
                    title: '标题一', 
                    imageUrl: '@floorstatic/gray.jpg'
                },
                {
                    title: '标题二', 
                    imageUrl: '@floorstatic/blue.jpg'
                },
                {
                    title: '标题三', 
                    imageUrl: '@floorstatic/gray.jpg'
                },
                {
                    title: '标题四', 
                    imageUrl: '@floorstatic/blue.jpg'
                }
            ],
            itemShare: true,
        },
        {
            itemId: '002',
            itemName: '图片圆角',
            itemType: 'RadiusStyle',
            itemKey: 'roundCorner',
            itemOption: {},
            itemDefaultValue: '0',
        },
        {
            itemId: '003',
            itemName: '上间距',
            itemType: 'Slider',
            itemKey: 'topMargin',
            itemOption: {},
            itemDefaultValue: '0',
        },
        {
            itemId: '004',
            itemName: '下间距',
            itemType: 'Slider',
            itemKey: 'bottomMargin',
            itemOption: {},
            itemDefaultValue: '0',
        },
        {
            itemId: '008',
            itemName: '图片大小',
            itemType: 'Select',
            itemKey: 'imageSize',
            itemOption: {
                iParamList: [
                    {key: '142*94', value: '142*94@x3'},
                    {key: '142*142', value: '142*1420@x3'},
                    {key: '142*178', value: '142*178@x3'},
                ]
            },
            itemDefaultValue: '142*94',
        }
    ]
}