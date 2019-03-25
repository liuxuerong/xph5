import Vue from 'vue'
import Index from '@/Index'

describe('Component.Index', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.tabbar h1').textContent)
      .toEqual('1111')
  })
})
