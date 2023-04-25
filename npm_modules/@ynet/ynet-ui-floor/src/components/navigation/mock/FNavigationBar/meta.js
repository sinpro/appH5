export default {

    name: '导航栏',

    className: 'FNavigationBar',

    icon: require('../../../../assets/images/meta/icon_magic.png'),

    properties: [
        {
            itemId: '002',
            itemType: 'BusinessForm',
            itemKey: 'options',
            itemOption: {
                businessType: '010'
            },
            itemDefaultValue: {},
        },
        {
            itemId: '001',
            itemType: 'NavigationForm',
            itemKey: 'options',
            itemOption: {},
            itemDefaultValue: {
                navigationBarFloat: '0',
                statusBarStyle: '0',
                navigationBarBgColor: '#00FFFFFF',
                navigationBarDivideColor: '#00FFFFFF'
            },
        }
    ]
}