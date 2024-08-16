#!/bin/bash

# Проверяем, переданы ли аргументы
if [ $# -eq 0 ]; then
  echo "No arguments provided. Please pass at least one argument."
  exit 1
fi

# Выводим переданные аргументы
echo "Script executed successfully!"
echo "First argument: $1"
echo "Second argument: $2"

# Выводим текущее время
echo "Current date and time: $(date)"