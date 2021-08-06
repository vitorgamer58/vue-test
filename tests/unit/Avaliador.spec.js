import Avaliador from '../../src/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  {
    produto: 'Livro do Mises',
    lanceInicial: 50,
    descricao: 'Livro de Economia'
  },
  {
    produto: 'Livro Algoritmo e Lógica de Programação com Javascript',
    lanceInicial: 30,
    descricao: 'Javascript para web sem uso de framework'
  }
]

describe('Um avaliador que se conecta com a API', () => {
  test('Garantir que ele mostra todos os leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })

    await flushPromises()
    const totalDeLeiloesExibidos = wrapper.findAll('.leilao')
    expect(totalDeLeiloesExibidos.length).toBe(leiloes.length)
  })
  test('Não há leilões retornados pela API', async () => {
    getLeiloes.mockResolvedValueOnce([])

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    // Stubs são usados para dublar dependências para os testes.

    await flushPromises()
    const totalDeLeiloesExibidos = wrapper.findAll('.leilao')
    expect(totalDeLeiloesExibidos.length).toBe(0)
  })
})
