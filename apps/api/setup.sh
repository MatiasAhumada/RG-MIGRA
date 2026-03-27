#!/bin/bash

echo "🚀 Setting up Generic Nest Prisma..."

# Copy environment file
if [ ! -f .env ]; then
  echo "📄 Creating .env file..."
  cp .env.example .env
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run prisma:generate

# Ask if user wants to run migrations
echo ""
read -p "Do you want to run database migrations? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🗄️  Running migrations..."
  npm run prisma:migrate
  
  echo ""
  read -p "Do you want to seed the database? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npm run prisma:seed
  fi
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Update .env with your credentials"
echo "   2. Run: npm run start:dev"
echo "   3. Open: http://localhost:3000/api/docs"
echo ""
