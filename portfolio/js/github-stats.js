const GITHUB_USERNAME = 'edumelob';

async function loadGithubStats() {
  try {
    const userRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const userData = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
    const reposData = await reposRes.json();

    const totalStars = Array.isArray(reposData)
      ? reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
      : 0;

    const langCount = {};
    if (Array.isArray(reposData)) {
      reposData.forEach(repo => {
        if (repo.language) {
          langCount[repo.language] = (langCount[repo.language] || 0) + 1;
        }
      });
    }
    const topLang = Object.keys(langCount).length
      ? Object.entries(langCount).sort((a, b) => b[1] - a[1])[0][0]
      : '—';

    animateNumber('statRepos', userData.public_repos || 0);
    animateNumber('statStars', totalStars);
    animateNumber('statFollowers', userData.followers || 0);
    document.getElementById('statLang').textContent = topLang;

  } catch (err) {
    console.error('Erro ao carregar dados do GitHub:', err);
    document.getElementById('statRepos').textContent = '—';
    document.getElementById('statStars').textContent = '—';
    document.getElementById('statFollowers').textContent = '—';
    document.getElementById('statLang').textContent = '—';
  }
}

function animateNumber(elementId, target) {
  const el = document.getElementById(elementId);
  let current = 0;
  const duration = 900;
  const stepTime = 30;
  const steps = duration / stepTime;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, stepTime);
}

loadGithubStats();