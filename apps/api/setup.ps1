Write-Host "🚀 Setting up Generic Nest Prisma..." -ForegroundColor Green

# Copy environment file
if (-not (Test-Path .env)) {
  Write-Host "📄 Creating .env file..." -ForegroundColor Cyan
  Copy-Item .env.example .env
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Cyan
npm run prisma:generate

# Ask if user wants to run migrations
Write-Host ""
$runMigrations = Read-Host "Do you want to run database migrations? (y/n)"
if ($runMigrations -eq "y" -or $runMigrations -eq "Y") {
  Write-Host "🗄️  Running migrations..." -ForegroundColor Cyan
  npm run prisma:migrate
  
  Write-Host ""
  $seedDatabase = Read-Host "Do you want to seed the database? (y/n)"
  if ($seedDatabase -eq "y" -or $seedDatabase -eq "Y") {
    Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
    npm run prisma:seed
  }
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Update .env with your credentials"
Write-Host "   2. Run: npm run start:dev"
Write-Host "   3. Open: http://localhost:3000/api/docs"
Write-Host ""
