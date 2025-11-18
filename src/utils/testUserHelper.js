// Test User Helper for Development
// Run this in your browser console to set up test users for different roles

// Set Admin Test User
window.setTestAdmin = () => {
  localStorage.setItem('__login_user_token__', 'dev-test-token');
  localStorage.setItem('__user__', JSON.stringify({
    id: 'test-admin-id',
    _id: 'test-admin-id',
    name: 'Test Admin',
    email: 'admin@test.com',
    role: 'admin',
    token: 'dev-test-token'
  }));
  window.location.href = '/admin/dashboard';
};

// Set Affiliate Test User
window.setTestAffiliate = () => {
  localStorage.setItem('__login_user_token__', 'dev-test-token');
  localStorage.setItem('__user__', JSON.stringify({
    id: 'test-affiliate-id',
    _id: 'test-affiliate-id',
    name: 'Test Affiliate',
    email: 'affiliate@test.com',
    role: 'affiliate',
    token: 'dev-test-token'
  }));
  window.location.href = '/affiliate/dashboard';
};

// Clear test user (logout)
window.clearTestUser = () => {
  localStorage.clear();
  window.location.href = '/login';
};

console.log('%cTest User Helpers Loaded!', 'color: #1ec8c8; font-size: 14px; font-weight: bold;');
console.log('%cAvailable commands:', 'color: #1ec8c8; font-weight: bold;');
console.log('  • setTestAdmin() - Set admin test user');
console.log('  • setTestAffiliate() - Set affiliate test user');
console.log('  • clearTestUser() - Clear test user and logout');

