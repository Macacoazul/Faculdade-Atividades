# DWAgent — tema institucional (ajuste cosmético)

Personalização **somente visual** da janela do *monitor* do
[DWAgent / DWService](https://github.com/dwservice/agent): cor institucional e
um "cartão" mais bonito para o quadro que mostra o **nome do agente** e o status.

## O que este ajuste faz

- Define uma paleta editável no topo de `ui/monitor.py` (`BRAND_PRIMARY`,
  `BRAND_ON_PRIMARY`).
- Transforma a barra de status (onde aparece o nome do agente) num cartão de cor
  sólida institucional, com o texto em cor contrastante e legível.
- Faz as faixas superior/inferior (que indicam o status: online/offline/etc.)
  se fundirem na cor do cartão, em vez de desbotarem para branco.

As cores de **status** continuam com o mesmo significado de sempre
(verde = online, cinza = offline, vermelho = desativado, etc.) — só o
enquadramento visual do nome muda.

## O que este ajuste **NÃO** faz (de propósito)

Para manter o software honesto e dentro da lei:

- **Não** remove nem oculta a tela/opção de **consentimento** ("Notificação na
  área de trabalho") — o usuário monitorado continua podendo ser avisado. O
  próprio código do DWService traz um aviso de que acessar um computador sem
  consentimento pode infringir a lei (e a LGPD, no Brasil).
- **Não** adiciona brasão/logotipo nem faz o app se passar por um sistema
  "oficial" de qualquer órgão. Se quiser usar o brasão da prefeitura, isso
  precisa de autorização formal do órgão e deve ser feito mantendo claro ao
  usuário o que o programa é.
- **Não** altera o instalador, atalhos, serviço ou modo de acesso.

## Como aplicar

Pré-requisito: ter o código-fonte do agente (o mesmo que vocês já usam) ou
cloná-lo:

```bash
git clone https://github.com/dwservice/agent.git
cd agent
git apply /caminho/para/dwagent-tema-camboriu/patches/monitor-tema-institucional.patch
```

Ou use o script utilitário:

```bash
./dwagent-tema-camboriu/aplicar-tema.sh /caminho/para/agent
```

Se o seu `monitor.py` for de uma versão diferente e o `git apply` recusar, veja
a seção **Aplicação manual** abaixo — são só 4 pontos.

## Definindo as cores

Edite o bloco no topo de `ui/monitor.py`:

```python
BRAND_PRIMARY    = "1f4e79"   # cor do cartão do nome do agente / faixas
BRAND_ON_PRIMARY = "ffffff"   # cor do texto sobre o cartão
```

Use o hex **sem** `#`. `1f4e79` é apenas um azul neutro de exemplo — troque pelos
valores oficiais que vocês usarem. Garanta contraste suficiente entre
`BRAND_PRIMARY` e `BRAND_ON_PRIMARY` para o nome ficar legível.

## Build

O tema é só Python; não muda o processo de build. Siga as instruções do
repositório oficial (`README.md` + wiki do DWService) para gerar o agente
para Windows a partir do fonte já modificado.

## Aplicação manual (se o patch não casar)

Em `ui/monitor.py`:

1. Logo após as constantes `COLOR_*`, adicione:
   ```python
   BRAND_PRIMARY    = "1f4e79"
   BRAND_ON_PRIMARY = "ffffff"
   ```
2. Nas duas linhas que fazem `set_background_gradient(bground, "ffffff", ...)`
   (dentro de `Main`), troque `"ffffff"` por `BRAND_PRIMARY`.
3. Em `prepare_window`, nas duas linhas
   `set_background_gradient("ffffff", "ffffff", ...)`, troque as duas `"ffffff"`
   por `BRAND_PRIMARY`.
4. Em `prepare_window`, na linha `self._lbl_status.set_background("ffffff")`,
   troque por `BRAND_PRIMARY` e adicione logo abaixo
   `self._lbl_status.set_foreground(BRAND_ON_PRIMARY)`.
