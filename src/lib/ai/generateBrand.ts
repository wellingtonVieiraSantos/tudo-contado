import { groq } from '../groq'

export const generateBrandWithAi = async (rawText: string) => {
  const prompt = `
  Dado o nome de uma marca digitado por um usuário, corrija-o para o nome real
  e padronizado da marca, se possível.
  
  Se o nome da marca não puder ser corrigido ou identificado com segurança,
  apenas repita o que foi fornecido.
  
  Retorne **apenas o JSON**, sem explicações ou código, no formato:
  {"name": "nome da marca padronizado"}
  
  Exemplos:
  Entrada: "pacoquita"
  Saída: { "name": "Paçoquita" }
  
  Entrada: "nestlé"
  Saída: { "name": "Nestlé" }
  
  Entrada: "poçao quita"
  Saída: { "name": "Paçoquita" }
  
  Entrada: "marrrca desconhecida"
  Saída: { "name": "marrrca desconhecida" }
  
  Entrada: "${rawText}"
  Saída:
  `

  const completion = await groq.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3
  })

  const resposta = completion.choices[0].message.content?.trim()

  if (!resposta) throw new Error('Sem resposta da IA.')

  const match = resposta.match(/{[\s\S]*}/)
  if (!match) throw new Error('JSON não encontrado na resposta da IA')

  try {
    const parsed: { name: string } = JSON.parse(match[0])
    return parsed
  } catch (e) {
    console.log(e)
    console.error('Erro ao parsear JSON da IA:', resposta)
    throw new Error('Erro ao interpretar resposta da IA.')
  }
}
