/* eslint-disable quote-props */
import { getLeiloes, getLeilao } from '@/http'
import axios from 'axios'

jest.mock('axios')

describe('Text HTTP requests', () => {
  test('geiLeiloes', async () => {
    const response = {
      data: [
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
    }
    axios.get.mockImplementationOnce(() => Promise.resolve(response))
    await expect(getLeiloes()).resolves.toEqual(response.data)
  })
  test('getLeilao', async () => {
    const response = {
      data: [
        {
          'id': 1,
          'produto': 'Video Game',
          'descricao': 'Um video game bem bacana, com vários jogos exclusivos.',
          'lanceInicial': 1000
        }
      ]
    }
    axios.get.mockImplementationOnce(() => Promise.resolve(response))
    await expect(getLeilao()).resolves.toEqual(response.data)
  })
})
