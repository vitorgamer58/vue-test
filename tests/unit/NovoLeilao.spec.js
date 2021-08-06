import NovoLeilao from '../../src/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = {
  push: jest.fn()
}

describe('Um novo leilao deve ser criado', () => {
  test('Com o formulário preenchido, um leilão deve ser criado', async () => {
    createLeilao.mockResolvedValueOnce()

    const wrapper = mount(NovoLeilao, {
      mocks: {
        $router
      }
    })
    wrapper.find('.produto').setValue('Um livro de economia')
    wrapper.find('.descricao').setValue('Conteudo de primeira')
    wrapper.find('.valor').setValue(50)
    wrapper.find('form').trigger('submit')

    expect(createLeilao).toHaveBeenCalled()
  })
})
