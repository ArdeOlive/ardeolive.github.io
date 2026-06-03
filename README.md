# Site oficial — Arnaldo de Oliveira

Site reorganizado em estrutura multipáginas para GitHub Pages.

## Estrutura

```txt
index.html
livro.html
personagens.html
galeria.html
contato.html
style.css
script.js
README.md
favicon.svg
images/
  logo.png
  autor.jpg
  capa.png
  logolivro.png
  fundo.jpg
  contatos01.png
  contatos02.png
  contatos03.png
  midias00.png
  midias01.png
  midias02.png
  midias04.png
  midias12.png
```

## Organização do menu

- Início
- Autor
- Livros
  - O Arquiteto do Caos
    - Livro
    - Personagens
    - Galeria
- Contato

## Publicação no GitHub Pages

Envie todos os arquivos e a pasta `images` para a raiz do repositório.


## Ajuste aplicado no menu

O submenu **Livros** agora funciona como lista suspensa em cascata:

- Ao passar o mouse sobre **Livros**, aparece **O Arquiteto do Caos**.
- Ao passar o mouse sobre **O Arquiteto do Caos**, aparecem:
  - Livro
  - Personagens
  - Galeria

O menu foi ajustado no `style.css` usando regras de `:hover`.


## Ajuste aplicado no menu

O menu suspenso foi alterado para ficar em lista vertical:

- Ao passar o mouse em **Livros**, aparece **O Arquiteto do Caos** logo abaixo.
- Ao passar o mouse em **O Arquiteto do Caos**, aparecem **Livro**, **Personagens** e **Galeria** logo abaixo dele.
- Nenhum submenu abre mais para a direita ou esquerda.


## Ajuste aplicado

- Removidos os botões "Conheça o Livro" e "Conheça o Autor" da página inicial.
- Reduzida a camada escura/transparência sobre o fundo para deixar a imagem `images/fundo.jpg` mais aparente.


## Ajustes aplicados

- Texto da página Autor justificado.
- Texto da página Livro justificado.
- Conteúdo da página Personagens reposicionado para iniciar a 5mm da borda superior.


## Ajuste aplicado

- Na página Contato, a divisória superior do rodapé e o texto dos direitos autorais foram elevados em 3cm.


## Ajuste aplicado

- A seção Autor foi removida da página inicial.
- Foi criada a página separada `autor.html`.
- O menu **Autor** agora aponta diretamente para `autor.html`.
- A página inicial ficou somente com a seção principal de abertura.


## Ajuste aplicado

- Na página Contato, o rodapé foi baixado 1cm em relação ao ajuste anterior.


## Ajuste aplicado

- Todos os rodapés do site foram alinhados na mesma altura do rodapé da página Contato.
- O ajuste agora é global no `style.css`, aplicado à classe `.footer`.


## Ajuste aplicado

- Os dados da página Personagens foram reposicionados para 30mm da borda superior.
- A fonte dos textos de cada personagem dentro das molduras foi reduzida em 1 ponto.


## Ajuste aplicado

- A foto do autor na página Autor foi reduzida em 10%, mantendo a proporção e a moldura alinhada ao novo tamanho.


## Ajuste aplicado

- Todas as páginas foram ajustadas para visualização flexível em computadores, laptops, tablets e celulares.
- Foram adicionadas regras responsivas para cabeçalho, menu, imagens, seção do autor, seção do livro, galeria, personagens e contato.


## Ajuste aplicado

- A foto do autor na página Autor foi reduzida em mais 10%, mantendo responsividade.


## Ajuste aplicado

- O rodapé da página Personagens foi elevado em 5mm.


## Ajuste aplicado

- O submenu **O Arquiteto do Caos** deixou de responder ao clique.
- Agora ele apenas abre os submenus Livro, Personagens e Galeria ao passar o mouse.

## Ajuste aplicado

- A moldura de texto da página inicial foi reduzida em 1cm em relação ao ajuste anterior.
- A moldura agora fica flexível em altura, sem limite fixo, para comportar todo o texto sem cortar conteúdo.


## Ajuste aplicado

- Os menus da página inicial foram movimentados 1,5cm para a esquerda.
- O ajuste foi aplicado somente na página inicial, mantendo a responsividade em tablets e celulares.
