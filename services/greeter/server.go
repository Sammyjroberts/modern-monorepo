package main

import (
	"context"
	"fmt"
	"log"
	"net"

	greeterv1 "github.com/sammyjroberts/modern-monorepo/types/proto/greeter"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

// server is used to implement the GreeterService
type server struct {
	greeterv1.UnimplementedGreeterServiceServer
}

// SayHello implements the SayHello RPC method
func (s *server) SayHello(ctx context.Context, req *greeterv1.HelloRequest) (*greeterv1.HelloResponse, error) {
	log.Printf("Received: %v", req.GetName())
	return &greeterv1.HelloResponse{
		Greeting: fmt.Sprintf("Hello, %s!", req.GetName()),
	}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	s := grpc.NewServer()
	greeterv1.RegisterGreeterServiceServer(s, &server{})

	log.Printf("Server listening on %s", port)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
}
