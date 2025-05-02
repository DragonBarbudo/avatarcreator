
// Simple deploy script for GitHub Pages
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Make sure the dist directory exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.log('Building the project first...');
  execSync('npm run build', { stdio: 'inherit' });
}

// Create or update .nojekyll file to prevent Jekyll processing
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), '');

// Determine the repository URL
let repoUrl = '';
try {
  repoUrl = execSync('git config --get remote.origin.url').toString().trim();
  console.log(`Deploying to GitHub repository: ${repoUrl}`);
} catch (error) {
  console.error('Could not determine repository URL. Make sure this is a git repository connected to GitHub.');
  console.error('Error:', error.message);
  process.exit(1);
}

// Deploy using gh-pages
try {
  console.log('Deploying to GitHub Pages...');
  // We need to use require here since we don't have direct access to modify package.json scripts
  const ghpages = require('gh-pages');
  
  ghpages.publish('dist', {
    branch: 'gh-pages',
    repo: repoUrl,
    message: 'Auto-deploy from Lovable script',
    user: {
      name: 'Lovable Auto Deploy',
      email: 'auto-deploy@example.com'
    }
  }, function(err) {
    if (err) {
      console.error('Deployment failed:', err);
      process.exit(1);
    } else {
      console.log('Deployment successful!');
      
      // Extract the repository name for the GitHub Pages URL
      const repoName = repoUrl.split('/').pop().replace('.git', '');
      const username = repoUrl.split('/').slice(-2)[0].replace('git@github.com:', '');
      
      console.log('\nYour site is published at:');
      console.log(`https://${username}.github.io/${repoName}/`);
    }
  });
} catch (error) {
  console.error('Error during deployment:', error.message);
}
