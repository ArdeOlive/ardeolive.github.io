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
