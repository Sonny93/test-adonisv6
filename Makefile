dev:
	@docker compose down
	@docker compose -f dev.compose.yml up -d --wait
	@node ace migration:fresh
	@node ace db:seed
	@pnpm run dev

down:
	@-docker compose -f dev.compose.yml down
