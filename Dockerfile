FROM --platform=$BUILDPLATFORM tonistiigi/xx AS xx

FROM --platform=$BUILDPLATFORM golang:alpine AS builder

COPY --from=xx / /

WORKDIR /src

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/ .

ARG TARGETPLATFORM
RUN CGO_ENABLED=0 xx-go build -trimpath -ldflags='-w -s' -o /WatchYourNuts ./cmd/WatchYourNuts


FROM scratch

WORKDIR /data/WatchYourNuts
WORKDIR /app

COPY --from=builder /WatchYourNuts /app/

ENTRYPOINT ["./WatchYourNuts"]