import { ProductCategory } from '@prisma/client'
import { groq } from '../groq'

export const generateProductWithAi = async (rawText: string) => {
  const prompt = `
  Usuário digitou o nome de um produto. Sua tarefa é:
  
  1. Dado o nome de um produto digitado por um usuário, corrija-o para o nome real
  e padronizado do produto (ex: corrigir capitalização, remover abreviações, deixar claro), se possível.
  Se o nome do produto não puder ser corrigido ou identificado com segurança,
  apenas repita o que foi fornecido.
  
  2. Atribuir **exatamente uma** categoria da lista abaixo. Se não tiver certeza, chute a mais provável.
  
  Retorne apenas um JSON neste formato (sem texto adicional):
  { "name": "NOME_PADRONIZADO", "category": "CATEGORIA_ESCOLHIDA" }
  
  Categorias permitidas:
  - HORTIFRUTI
  - CARNES_PEIXES
  - FRIOS_LATICINIOS
  - PADARIA_CONFEITARIA
  - BEBIDAS
  - MERCEARIA
  - ENLATADOS_CONSERVAS
  - SNACKS_DOCES
  - CONGELADOS
  - TEMPEROS_CONDIMENTOS
  - MASSAS_MOLHOS
  - PRODUTOS_NATURAIS
  - HIGIENE_PESSOAL
  - CUIDADOS_CABELO
  - DESODORANTES
  - CUIDADOS_PELE
  - BARBEARIA
  - HIGIENE_BUCAL
  - ABSORVENTES_FRALDAS
  - LIMPEZA_GERAL
  - UTENSILIOS_LIMPEZA
  - INSETICIDAS
  - INFANTIL_FRALDAS
  - INFANTIL_PAPINHAS
  - INFANTIL_HIGIENE
  - COSTURA
  - ARTESANATO
  - TECIDOS
  - ESCOLAR
  - PAPELARIA
  - DESCARTAVEIS
  - UTENSILIOS_COZINHA
  - ELETRICOS_BASICOS
  - LIMPEZA_CASA
  - TEXTIL_CASA
  - PET_RACAO
  - PET_HIGIENE
  - PET_ACESSORIOS
  
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

  try {
    const parsed: { name: string; category: ProductCategory } =
      JSON.parse(resposta)
    return parsed
  } catch (e) {
    console.log(e)
    console.error('Erro ao parsear JSON da IA:', resposta)
    throw new Error('Erro ao interpretar resposta da IA.')
  }
}
