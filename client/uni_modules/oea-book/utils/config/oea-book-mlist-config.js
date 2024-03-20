export default {
  btnList: [
    {
      name: 'open',
      text: '打开',
      icon: 'open',
      emit: 'openFile',
      emitData: '',
      show: true
    }, {
      name: 'help',
      text: '帮助',
      icon: 'help',
      emit: 'openFile',
      emitData: {
        title: '帮助',
        url: '/book/static/readme.md'
      },
      show: true
    }, {
      name: 'help',
      text: '测试',
      icon: 'help',
      emit: 'openFile',
      emitData: {
        title: '测试',
        url: '/book/static/test.txt'
        // url: 'tools.ofrt.top/book/static/test.txt'
      },
      show: true
    }, {
      name: 'help',
      text: '更新记录',
      icon: 'list',
      emit: 'openFile',
      emitData: {
        title: '更新记录',
        url: '/book/static/changelog.md'
      },
      show: true
    }
  ]
}
