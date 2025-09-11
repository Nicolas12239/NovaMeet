#!/bin/bash

# NovaMeet+ Database Setup Script
echo "🚀 Setting up NovaMeet+ Database..."

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    echo "   On macOS: brew install mysql"
    echo "   On Ubuntu: sudo apt install mysql-server"
    exit 1
fi

# Database configuration
DB_NAME="novameet_plus"
DB_USER="novameet_user"
DB_PASS="secure_password_123"

echo "📝 Creating database and user..."

# Create database and user (run as root or with sudo)
mysql -u root -p << EOF
CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database and user created successfully!"
    echo "📋 Database details:"
    echo "   Database: $DB_NAME"
    echo "   User: $DB_USER"
    echo "   Password: $DB_PASS"
    echo ""
    echo "🔧 Update your .env.local file with:"
    echo "   DATABASE_URL=\"mysql://$DB_USER:$DB_PASS@localhost:3306/$DB_NAME\""
    echo ""
    echo "📄 Now run the SQL script:"
    echo "   mysql -u $DB_USER -p $DB_NAME < ../database.sql"
    echo ""
    echo "🎯 Then run Prisma commands:"
    echo "   npx prisma generate"
    echo "   npx prisma db push"
else
    echo "❌ Failed to create database. Please check your MySQL root password."
    exit 1
fi
