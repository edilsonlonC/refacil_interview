run-docker:
	docker compose down 
	docker compose up --build -d
run-database:
	$(MAKE) down-database-test > /dev/null
	docker compose up -d db
down-database:
	docker compose down db
exec-database:
	docker compose exec db psql -U postgres
run-database-test:
	$(MAKE) down-database > /dev/null
	docker compose -f docker-compose-test.yml up db_test -d
down-database-test:
	docker compose  -f docker-compose-test.yml down db_test 

start-minikube:
	minikube start
load-image:
	minikube image load refacil-app:latest
build-kubernetes:
	 docker build -t refacil-app:latest .
	$(MAKE) start-minikube
	$(MAKE) load-image
	kubectl apply -f configmap.yml -f postgres-secret.yml -f deployment.yml





