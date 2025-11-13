import { ALL_TOOLS, CATEGORIES, SITE_CONFIG } from '@/lib/constants'

export async function GET() {
  const content = `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

## About

${SITE_CONFIG.name} is a comprehensive collection of ${SITE_CONFIG.toolCount}+ free online tools for text manipulation, development, security, SEO, and content creation. All tools run client-side in the browser for maximum privacy and speed.

## Categories

${Object.values(CATEGORIES).map(category =>
  `- **${category.name}**: ${category.description} (${SITE_CONFIG.url}${category.href})`
).join('\n')}

## Available Tools

${ALL_TOOLS.map(tool =>
  `- **${tool.name}**: ${tool.description} (${SITE_CONFIG.url}${tool.href})`
).join('\n')}

## Features

- 🔒 Privacy-first: All processing happens in your browser
- ⚡ Fast: No server round-trips required
- 🆓 Completely free with no registration required
- 📱 Mobile-friendly responsive design
- 🎨 Clean, intuitive user interface

## Usage

Visit ${SITE_CONFIG.url} to access any of the ${SITE_CONFIG.toolCount}+ tools. Simply select a tool from the homepage or navigation menu and start using it immediately.

## Contact

For questions or support, visit ${SITE_CONFIG.url}/contact
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
