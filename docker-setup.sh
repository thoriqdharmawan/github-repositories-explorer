#!/bin/bash

set -e

echo "🐳 GitHub Repositories Explorer Docker Setup"
echo "============================================"

show_help() {
    echo "Usage: $0 [OPTION]"
    echo ""
    echo "Options:"
    echo "  dev         Start development server with hot reload"
    echo "  build       Build production Docker image"
    echo "  start       Start production server"
    echo "  stop        Stop all containers"
    echo "  clean       Remove all containers and images"
    echo "  logs        Show container logs"
    echo "  shell       Access container shell"
    echo "  help        Show this help message"
    echo ""
}

start_dev() {
    echo "🚀 Starting development server..."
    docker-compose --profile dev up dev --build
}

build_prod() {
    echo "🔨 Building production image..."
    docker-compose build app
}

start_prod() {
    echo "🚀 Starting production server..."
    docker-compose up app -d
    echo "✅ Production server started at http://localhost:3000"
}

stop_containers() {
    echo "🛑 Stopping containers..."
    docker-compose down
}

clean_up() {
    echo "🧹 Cleaning up containers and images..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
}

show_logs() {
    echo "📋 Showing container logs..."
    docker-compose logs -f
}

access_shell() {
    echo "🐚 Accessing container shell..."
    docker-compose exec app sh
}

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

case "${1:-help}" in
    dev)
        start_dev
        ;;
    build)
        build_prod
        ;;
    start)
        start_prod
        ;;
    stop)
        stop_containers
        ;;
    clean)
        clean_up
        ;;
    logs)
        show_logs
        ;;
    shell)
        access_shell
        ;;
    help|*)
        show_help
        ;;
esac
