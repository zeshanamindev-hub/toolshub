import { ALL_TOOLS, CATEGORIES, SITE_CONFIG } from '@/lib/constants'

export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const baseUrl = SITE_CONFIG.url

  const content = `# ${SITE_CONFIG.name}

> ${SITE_CONFIG.description}

## About

${SITE_CONFIG.name} is a comprehensive collection of ${SITE_CONFIG.toolCount}+ free online tools for text manipulation, development, security, SEO, and content creation. All tools run client-side in the browser for maximum privacy and speed.

## Categories

${Object.values(CATEGORIES).map(category =>
  `- **${category.name}**: ${category.description} (${baseUrl}${category.href})`
).join('\n')}

## Available Tools (${ALL_TOOLS.length} total)

${ALL_TOOLS.map(tool =>
  `- **${tool.name}**: ${tool.description} (${baseUrl}${tool.href})`
).join('\n')}

## Key Features

- 🔒 Privacy-first: All processing happens in your browser
- ⚡ Fast: No server round-trips required
- 🆓 Completely free with no registration required
- 📱 Mobile-friendly responsive design
- 🎨 Clean, intuitive user interface
- 🔐 No data storage or transmission to servers
- ⚙️ No API keys or rate limits

## Important Pages

- Homepage: ${baseUrl}
- All Tools: ${baseUrl}/tools
- Categories: ${baseUrl}/categories
- About: ${baseUrl}/about
- Contact: ${baseUrl}/contact
- Privacy Policy: ${baseUrl}/privacy
- Terms of Service: ${baseUrl}/terms

## Technical Stack

- Framework: Next.js 15 (App Router)
- Runtime: React 19
- Language: TypeScript 5
- Styling: Tailwind CSS v4
- Components: shadcn/ui with Radix UI
- Icons: Lucide React

## Usage

Visit ${baseUrl} to access any of the ${SITE_CONFIG.toolCount}+ tools. Simply select a tool from the homepage or navigation menu and start using it immediately. No registration or sign-up required.

## Resources

- Sitemap: ${baseUrl}/sitemap.xml
- Robots.txt: ${baseUrl}/robots.txt
- Contact: ${baseUrl}/contact

---

Last updated: ${new Date().toISOString()}
Total tools: ${ALL_TOOLS.length}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
