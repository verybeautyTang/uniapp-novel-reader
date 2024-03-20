export default {
  // storage key
  storage_key: 'book_menu_config',
  // 菜单样式配置
  menuStyleConfig: {
    height: '220px',
    color: '#000',
    backgroundColor: '#fff',
    zIndex: 9
  },
  // 参数配置
  cfg: {
    // 如果有顶部导航栏的话
    navigationBarbackgroundColor: '#ffffff',
    navigationBarFrontColor: '#000000',
    // 正文字体大小
    fontSize: 18,
    minFontSize: '12', // 必须 为字符串
    maxFontSize: '50', // 必须 为字符串
    // 正文行间距
    lineHeight: 26,
    minLineHeight: '14', // 必须 为字符串
    maxLineHeight: '58', // 必须 为字符串
    // 正文背景颜色
    pageBg: '#eee',
    // 字体颜色
    color: '#000',
    // 主题名
    theme: 'default',
    // 菜单主题背景颜色
    menuBg: '#eee',
    menuBlockColor: '#fff',
    menuBlockactiveColor: '#000',
    menuBlockBackgroundColor: '#000',
    // 
    mlistSwitchActiveColor: '#3246dc',
  },
  menuStyleColor: {
    // color theme
    theme: 'default',
    titleIconSize: '22px',
    // color
    bgColor: '#eff1f1',
    blockColor: '#fff',
    blockActiveColor: '#3246dc',
    blockBackgroundColor: '#fff',
    borderActiveColor: '#000',
  },
  theme: {
    list: [{
      name: 'default',
      color: '#000',
      bgColor: '#eff1f1',
      navigationBarbackgroundColor: '#ffffff',
      navigationBarFrontColor: '#000000',
      menuColor: '#1a1d1d',
      menuBlockColor: '#fff',
      menuBlockActiveColor: '#3246dc',
      menuBlockBackgroundColor: '#fff',
      menuBorderActiveColor: '#000',
      menuBgColor1: '#fff',
      menuBgColor2: '#f5eef2',
    }, {
      name: 'wood',
      color: '#000',
      bgColor: '#f8e1b9',
      navigationBarbackgroundColor: '#ffffff',
      navigationBarFrontColor: '#000000',
      menuColor: '#000',
      menuBlockColor: '#fff',
      menuBlockActiveColor: '#e88959',
      menuBlockBackgroundColor: '#fff',
      menuBorderActiveColor: '#633a26',
      menuBgColor1: '#f7f1e6',
      menuBgColor2: '#f5d0be',
    }, {
      name: 'sakura',
      color: '#000',
      bgColor: '#f6dcdf',
      navigationBarbackgroundColor: '#ffffff',
      navigationBarFrontColor: '#000000',
      menuColor: '#000',
      menuBlockColor: '#fff',
      menuBlockActiveColor: '#eb77fa',
      menuBlockBackgroundColor: '#fff',
      menuBorderActiveColor: '#1f0f21',
      menuBgColor1: '#f7f1e6',
      menuBgColor2: '#ebe0e5',
    }, {
      name: 'eye',
      color: '#000000',
      bgColor: '#cae7bd',
      navigationBarbackgroundColor: '#000000',
      navigationBarFrontColor: '#ffffff',
      menuColor: '#e6e6e6',
      menuBlockColor: '#cae7bd',
      menuBlockActiveColor: '#14ffb9',
      menuBlockBackgroundColor: '#9d9d9d',
      menuBorderActiveColor: '#99faff',
      menuBgColor1: '#000000',
      menuBgColor2: '#333b30',
    }, {
      name: 'night',
      color: '#8a8a8a',
      bgColor: '#04051f',
      navigationBarbackgroundColor: '#000000',
      navigationBarFrontColor: '#ffffff',
      menuColor: '#e6e6e6',
      menuBlockColor: '#707398',
      menuBlockActiveColor: '#8877eb',
      menuBlockBackgroundColor: '#c3c3c3',
      menuBorderActiveColor: '#99faff',
      menuBgColor1: '#282861',
      menuBgColor2: '#101428',
    }, {
      name: 'sky',
      color: '#260a5e',
      bgColor: '#38e6ef',
      navigationBarbackgroundColor: '#ffffff',
      navigationBarFrontColor: '#000000',
      menuColor: '#000',
      menuBlockColor: '#fff',
      menuBlockActiveColor: '#6e3ee6',
      menuBlockBackgroundColor: '#fff',
      menuBorderActiveColor: '#1f0f21',
      menuBgColor1: '#d1f7f6',
      menuBgColor2: '#add9eb',
    }]
  }
}
