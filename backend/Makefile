mod:
	rm go.mod || true && \
	rm go.sum || true && \
	go mod init github.com/aceberg/WatchYourNuts && \
	go mod tidy

run:
	cd cmd/WatchYourNuts/ && \
	go run . 

fmt:
	go fmt ./...

lint:
	golangci-lint run
	golint ./...

check: fmt lint