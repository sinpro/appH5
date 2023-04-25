export default {

  name: '左右',

  className: 'FTitleHorizontal',

  icon: require('../../../../assets/images/meta/title/icon_title_lr.png'),

  properties: [
    {
      itemId: '001',
      itemType: 'TitleForm',
      itemKey: 'options',
      itemOption: {
        textAlignment: true
      },
      itemDefaultValue: {
        titleContent: '标题内容',
        textContent: '文本内容',
        hasLeftImage: '0',
        hasRightImage: '0',
        titleSize: '16',
        titleBold: '0',
        titleColor: '#FF333333',
        textAlignment: '1',
        textSize: '12',
        textBold: '0',
        textColor: '#FF666666',
        bottomLine: '0'
      },
    },
  ]
}