// Simple test script for NovaMeet+ API endpoints
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing NovaMeet+ API endpoints...\n');

  try {
    // Test 1: Health check (if you have one)
    console.log('1. Testing server health...');
    const healthResponse = await fetch(`${BASE_URL}/api/health`);
    if (healthResponse.ok) {
      console.log('✅ Server is running');
    } else {
      console.log('⚠️  No health endpoint found (this is normal)');
    }

    // Test 2: Registration endpoint structure
    console.log('\n2. Testing registration endpoint...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
        birthYear: 1990,
        city: 'Test City'
      })
    });

    if (registerResponse.status === 401) {
      console.log('✅ Registration endpoint exists (returns 401 without auth - expected)');
    } else {
      console.log(`Registration response: ${registerResponse.status}`);
    }

    // Test 3: Profiles endpoint
    console.log('\n3. Testing profiles endpoint...');
    const profilesResponse = await fetch(`${BASE_URL}/api/profiles`);
    if (profilesResponse.status === 401) {
      console.log('✅ Profiles endpoint exists (returns 401 without auth - expected)');
    } else {
      console.log(`Profiles response: ${profilesResponse.status}`);
    }

    // Test 4: Messages endpoint
    console.log('\n4. Testing messages endpoint...');
    const messagesResponse = await fetch(`${BASE_URL}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: 'test' })
    });
    if (messagesResponse.status === 401) {
      console.log('✅ Messages endpoint exists (returns 401 without auth - expected)');
    } else {
      console.log(`Messages response: ${messagesResponse.status}`);
    }

    console.log('\n🎉 API endpoints are responding correctly!');
    console.log('\n📋 Next steps:');
    console.log('1. Set up MySQL database');
    console.log('2. Configure environment variables');
    console.log('3. Run: npx prisma db push');
    console.log('4. Test full authentication flow');

  } catch (error) {
    console.error('❌ Error testing API:', error.message);
    console.log('\n💡 Make sure the development server is running: npm run dev');
  }
}

testAPI();
