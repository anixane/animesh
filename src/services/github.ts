import { GithubRepo } from '../types';

// Function to fetch pinned GitHub repositories using GraphQL API
export async function fetchGitHubRepos(username: string): Promise<GithubRepo[]> {
  try {
    // GitHub GraphQL API request to get pinned repositories
    const query = `
      {
        user(login: "${username}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                name
                description
                url
                stargazerCount
                forkCount
                primaryLanguage {
                  name
                  color
                }
                diskUsage
              }
            }
          }
        }
      }
    `;

    // Get token from environment variables
    const token = process.env.REACT_APP_GITHUB_TOKEN || '';

    // If no token is provided, return hardcoded data
    if (!token || token === 'your_github_token_here') {
      console.log('No GitHub token provided, using hardcoded data');
      return getHardcodedPinnedRepos();
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      console.error('GraphQL API request failed, falling back to hardcoded data');
      return getHardcodedPinnedRepos();
    }

    const data = await response.json();
    const pinnedRepos = data.data?.user?.pinnedItems?.nodes || [];

    if (!pinnedRepos || pinnedRepos.length === 0) {
      console.log('No pinned repositories found in API response, using hardcoded data');
      return getHardcodedPinnedRepos();
    }

    return pinnedRepos.map((repo: any) => ({
      id: repo.name,
      name: repo.name,
      description: repo.description || 'No description provided',
      language: repo.primaryLanguage ? repo.primaryLanguage.name : 'Not specified',
      languageColor: repo.primaryLanguage ? repo.primaryLanguage.color : null,
      stars: repo.stargazerCount,
      forks: repo.forkCount,
      size: repo.diskUsage,
      url: `https://github.com/${username}/${repo.name}`
    }));
  } catch (error) {
    console.error('Error fetching pinned repositories:', error);
    return getHardcodedPinnedRepos();
  }
}

// Function to provide hardcoded pinned repos based on user's screenshot
function getHardcodedPinnedRepos(): GithubRepo[] {
  return [
    {
      id: 'google-store-locator',
      name: 'Google-Store-Locator',
      description: 'A single page web-app which shows real-time stores in nearby area sorted by distance. Developed with NodeJS, MongoDB & GoogleMapsAPI. MongoDB being the storage for sorting Geo-JSON.',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 2,
      forks: 0,
      size: 22806,
      url: 'https://github.com/anixane/Google-Store-Locator'
    },
    {
      id: 'instagram-reactjs-clone',
      name: 'Instagram-ReactJS-Clone',
      description: 'A full stack, Instagram CLONE using ReactJS, Firebase & Material-UI. Deployed a React app with Firebase Hosting, Handled authentication with Firebase.',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 1,
      forks: 0,
      size: 37375,
      url: 'https://github.com/anixane/Instagram-ReactJS-Clone'
    },
    {
      id: 'spotify-reactjs-clone',
      name: 'Spotify-ReactJS-Clone',
      description: 'A full stack, Spotify CLONE using ReactJS, Firebase & Material-UI. Handled authentication with Spotify\'s Native AUth. Fetches Real-time playlists and the song playing & embedded with clean multimed...',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 5,
      forks: 3,
      size: 3689,
      url: 'https://github.com/anixane/Spotify-ReactJS-Clone'
    },
    {
      id: 'orchestration-api',
      name: 'Orchestration-API',
      description: 'A web interface for reducing manual ADF work of 2 hours to 10 minutes. Handled authentication with Azure\'s Native AUth. Collects real-time information through user and deploy entire ADF on the fly ...',
      language: 'CSS',
      languageColor: '#563d7c',
      stars: 1,
      forks: 1,
      size: 3689,
      url: 'https://github.com/anixane/Orchestration-API'
    },
    {
      id: 'sudokuvizualizationbacktracking',
      name: 'SudokuVizualizationBacktracking',
      description: 'This is a sudoku solver using the backtracking algorithm. It includes a graphical GUI as well as a text based version.',
      language: 'Python',
      languageColor: '#3572A5',
      stars: 5,
      forks: 0,
      size: 3689,
      url: 'https://github.com/anixane/SudokuVizualizationBacktracking'
    },
    {
      id: 'amazon-reactjs-clone',
      name: 'Amazon-ReactJS-Clone',
      description: 'Amazon e-commerce website clone. Frontend in ReactJS, ContextAPI, Firebase Authentication for SignUp/SignIn. Deployed a React app with Firebase Hosting. Payment Gateway (stripe) is yet to be implem...',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 0,
      forks: 0,
      size: 21083,
      url: 'https://github.com/anixane/Amazon-ReactJS-Clone'
    }
  ];
}

// Fallback function to fetch top repositories using REST API
async function fetchTopRepos(username: string): Promise<GithubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`);
    
    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((repo: any) => ({
      id: repo.id.toString(),
      name: repo.name,
      description: repo.description || 'No description provided',
      language: repo.language || 'Not specified',
      languageColor: null, // REST API doesn't provide language color
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      size: repo.size,
      url: repo.html_url
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
} 