# Nombre del archivo Makefile: Makefile

# Comando predeterminado que se ejecutará cuando solo se llame `make`
default: help

# Objetivo para agregar, confirmar y enviar cambios a Git
commit-and-push:
	@read -p "Enter your commit message: " MESSAGE; \
	git add .; \
	git commit -m "$$MESSAGE"; \
	git push

# Objetivo de ayuda que muestra las opciones disponibles
help:
	@echo "Uso: make <comando>"
	@echo ""
	@echo "Comandos disponibles:"
	@echo "  commit-and-push  Agrega, confirma y envía los cambios a Git (requiere ingresar un mensaje de confirmación)"

.PHONY: help commit-and-push
