#!/usr/bin/env bash
# Aplica o tema institucional (cosmetico) ao codigo-fonte do DWAgent.
# Uso: ./aplicar-tema.sh /caminho/para/agent
# Se nenhum caminho for dado, clona o repositorio oficial em ./agent.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
PATCH="$HERE/patches/monitor-tema-institucional.patch"
TARGET="${1:-}"

if [ -z "$TARGET" ]; then
  echo "Nenhum caminho informado; clonando o repositorio oficial em ./agent ..."
  git clone https://github.com/dwservice/agent.git
  TARGET="./agent"
fi

if [ ! -f "$TARGET/ui/monitor.py" ]; then
  echo "ERRO: $TARGET nao parece ser o fonte do DWAgent (falta ui/monitor.py)." >&2
  exit 1
fi

cd "$TARGET"
echo "Verificando se o patch aplica..."
if git apply --check "$PATCH" 2>/dev/null; then
  git apply "$PATCH"
  echo "OK: tema aplicado em $TARGET/ui/monitor.py"
  echo "Edite BRAND_PRIMARY / BRAND_ON_PRIMARY no topo de ui/monitor.py com as cores desejadas."
else
  echo "O patch nao casou com esta versao do monitor.py." >&2
  echo "Use a secao 'Aplicacao manual' do README (sao 4 pontos)." >&2
  exit 2
fi
