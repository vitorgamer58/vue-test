import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Lance sem valor mínimo', () => {
  test('Componente deve ser montado', () => {
    const wrapperLance = mount(Lance)
    expect(wrapperLance).toBeTruthy()
  })

  test('Não deve aceitar valores menores que zero', () => {
    const wrapperLance = mount(Lance)
    const input = wrapperLance.find('input')
    input.setValue(-100)
    wrapperLance.trigger('submit') // Ativa o submit do formulário
    const lancesEmitidos = wrapperLance.emitted('novo-lance')
    expect(lancesEmitidos).toBeUndefined()
    // Espera que os lances emitidos seja undefined, pois um lance de valor negativo não deve ser válido.
  })

  test('Emite um lance quando o valor é maior que zero', () => {
    const wrapperLance = mount(Lance)
    const input = wrapperLance.find('input')
    input.setValue(100)
    wrapperLance.trigger('submit')
    const lancesEmitidos = wrapperLance.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Emite um valor esperado de um lance válido', () => {
    const wrapperLance = mount(Lance)
    const input = wrapperLance.find('input')
    input.setValue(150)
    wrapperLance.trigger('submit')
    const lancesEmitidos = wrapperLance.emitted('novo-lance')
    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(150)
    expect(parseInt(lancesEmitidos[0][0])).toBe(150)
  })
})

describe('Lance com valor mínimo', () => {
  test('Todos os lances devem possuir um valor maior do que o mínimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: { lanceMinimo: 300 }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Emite um valor esperado de um lance válido', () => {
    const wrapper = mount(Lance, {
      propsData: { lanceMinimo: 300 }
    })
    const input = wrapper.find('input')
    input.setValue(400)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const valorDoLance = parseInt(lancesEmitidos[0][0])
    expect(valorDoLance).toBe(400)
  })

  test('Lances inválidos não devem ser aceitos', async () => {
    const wrapper = mount(Lance, {
      propsData: { lanceMinimo: 300 }
    })
    const input = wrapper.find('input')
    input.setValue(100)
    wrapper.trigger('submit')
    await wrapper.vm.$nextTick() // Espera que o DOM tenha sido atualizado
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toBeUndefined()
    const msgErro = wrapper.find('p.alert').element.textContent
    expect(msgErro).toBeTruthy()
    expect(msgErro).toContain('O valor mínimo para o lance é de R$ 300')
  })
})
