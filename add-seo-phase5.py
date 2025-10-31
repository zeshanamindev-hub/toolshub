#!/usr/bin/env python3
"""
Script to add comprehensive SEO content to Phase 5 SEO Tools
"""

import os
import re

# SEO content configurations for Phase 5 tools
PHASE5_CONFIGS = {
    "word-counter": {
        "color": "blue",
        "title": "Word Counter",
        "intro": """The Word Counter is a comprehensive text analysis tool that counts words, characters, sentences, and paragraphs in
                real-time. Whether you're writing blog posts, essays, social media content, or professional documents, this tool
                helps you track word count, reading time, speaking time, and keyword density. Perfect for writers, students,
                marketers, and content creators who need to meet specific word count requirements or optimize content length.""",
        "features": [
            ("Real-time Counting", "Instant word, character, sentence, and paragraph counts as you type"),
            ("Reading Time Estimates", "Calculate reading time based on average reading speed (200 WPM)"),
            ("Speaking Time Estimates", "Estimate speaking duration for presentations (150 WPM)"),
            ("Keyword Density", "Analyze keyword frequency and density for SEO optimization"),
            ("Character Limits", "Check against Twitter, SMS, and meta description character limits"),
            ("Statistics Dashboard", "Comprehensive text statistics including average word length")
        ],
        "steps": [
            "Type or paste your text into the input field",
            "View real-time word count and character count updates",
            "Review reading and speaking time estimates",
            "Check keyword density for important terms",
            "Verify character counts against platform limits",
            "Use statistics to improve content quality"
        ],
        "what_is": """Word counting is the process of tallying the total number of words in a text document. A 'word' is typically defined
                as a sequence of characters separated by whitespace or punctuation. Beyond simple counting, modern word counters
                provide text analysis including character count (with and without spaces), sentence count, paragraph count, average
                word length, and readability metrics. These statistics help writers meet requirements (like 500-word blog posts or
                150-character meta descriptions) and optimize content for readability and engagement.""",
        "use_cases": [
            ("Blog Writing", "Ensure blog posts meet recommended length (1000-2000 words for SEO)"),
            ("Essay Assignments", "Track word count for academic papers with specific requirements"),
            ("Social Media", "Stay within character limits for Twitter (280), Instagram captions, etc."),
            ("SEO Optimization", "Create meta descriptions within 150-160 character limit"),
            ("Content Marketing", "Optimize content length for target audience and platform"),
            ("Speech Writing", "Calculate speaking time for presentations and speeches"),
            ("Resume Writing", "Keep resumes within recommended length (400-600 words)"),
            ("Novel Writing", "Track daily word count goals and overall manuscript length")
        ]
    },
    "meta-tag-preview": {
        "color": "purple",
        "title": "Meta Tag Preview Tool",
        "intro": """The Meta Tag Preview Tool allows you to visualize how your web page will appear in search engine results and social
                media shares before publishing. Generate and preview meta titles, descriptions, Open Graph tags, and Twitter Cards
                in real-time. This tool ensures your metadata is optimized for maximum click-through rates and proper display across
                Google, Facebook, Twitter, LinkedIn, and other platforms.""",
        "features": [
            ("Live Preview", "See real-time previews of Google search results and social media cards"),
            ("Character Counter", "Track title (50-60 chars) and description (150-160 chars) lengths"),
            ("Platform-Specific Previews", "View how meta tags appear on Google, Facebook, Twitter, and LinkedIn"),
            ("Tag Generator", "Auto-generate meta tag HTML code for easy implementation"),
            ("Validation", "Ensure tags meet platform requirements and best practices"),
            ("Mobile Preview", "See how meta information displays on mobile devices")
        ],
        "steps": [
            "Enter your page title (50-60 characters recommended)",
            "Write meta description (150-160 characters optimal)",
            "Add URL and image for social media previews",
            "Review live previews for each platform",
            "Adjust text to optimize click-through rates",
            "Copy generated HTML meta tags for your website"
        ],
        "what_is": """Meta tags are HTML elements that provide metadata about web pages to search engines and social media platforms. The
                most important meta tags include the title tag (appears in search results and browser tabs), meta description (snippet
                text in search results), Open Graph tags (control how content appears on Facebook), and Twitter Card tags (control
                Twitter sharing appearance). Properly optimized meta tags can significantly improve click-through rates from search
                results and social shares, directly impacting website traffic and engagement.""",
        "use_cases": [
            ("SEO Optimization", "Craft compelling titles and descriptions to improve search rankings"),
            ("Social Media Marketing", "Optimize how shared content appears on Facebook, Twitter, LinkedIn"),
            ("E-commerce", "Create product page meta tags that drive clicks and conversions"),
            ("Blog Posts", "Write engaging meta descriptions that increase article traffic"),
            ("Landing Pages", "Optimize campaign landing page metadata for maximum conversions"),
            ("Brand Consistency", "Ensure consistent messaging across search and social platforms"),
            ("A/B Testing", "Test different meta tag variations to optimize CTR"),
            ("Content Audits", "Review and improve existing page meta tags")
        ]
    },
    "open-graph-preview": {
        "color": "indigo",
        "title": "Open Graph Preview Tool",
        "intro": """The Open Graph Preview Tool shows you exactly how your web content will appear when shared on social media platforms
                like Facebook, LinkedIn, and other sites that support Open Graph protocol. Create and preview og:title, og:description,
                og:image, and other Open Graph meta tags to ensure your shared content looks professional and engaging. Perfect for
                marketers, content creators, and web developers optimizing social sharing.""",
        "features": [
            ("Facebook Preview", "See exactly how posts will appear in Facebook feeds"),
            ("LinkedIn Preview", "Visualize LinkedIn post appearance with proper formatting"),
            ("Image Requirements", "Check image dimensions and aspect ratios (1200x630 recommended)"),
            ("Tag Generator", "Auto-generate complete Open Graph meta tag code"),
            ("Validation", "Verify tags meet Open Graph protocol specifications"),
            ("Multiple Platforms", "Preview across Facebook, LinkedIn, Slack, Discord, and more")
        ],
        "steps": [
            "Enter your content title for social shares",
            "Write engaging description (2-3 sentences recommended)",
            "Upload or specify URL for Open Graph image (1200x630px)",
            "Add website URL and optional metadata",
            "Preview how content appears on different platforms",
            "Copy generated Open Graph meta tags to your HTML"
        ],
        "what_is": """The Open Graph protocol is a set of meta tags created by Facebook that allows web pages to become rich objects in
                social graphs. When you share a URL on social media, Open Graph tags control the title, description, image, and other
                information displayed in the preview card. The most important tags are og:title, og:description, og:image, og:url,
                and og:type. Without proper Open Graph tags, social platforms may display incorrect or unattractive previews, reducing
                engagement and click-through rates. The protocol is now supported by Facebook, LinkedIn, Pinterest, Slack, Discord,
                and many other platforms.""",
        "use_cases": [
            ("Social Media Marketing", "Create compelling previews that increase social engagement"),
            ("Content Sharing", "Ensure blog posts and articles look professional when shared"),
            ("Product Launches", "Optimize product page sharing for maximum social impact"),
            ("Event Promotion", "Create attractive event page previews for social sharing"),
            ("News Articles", "Control how news content appears on social media feeds"),
            ("E-commerce", "Showcase products with proper images and descriptions"),
            ("Video Content", "Optimize video page sharing with thumbnails and descriptions"),
            ("Portfolio Sites", "Ensure work samples share beautifully on professional networks")
        ]
    },
    "keyword-density-checker": {
        "color": "green",
        "title": "Keyword Density Checker",
        "intro": """The Keyword Density Checker analyzes your content to show how frequently specific keywords appear, helping you
                optimize for search engines without over-optimization. Calculate keyword density percentages, identify keyword
                stuffing, find related terms, and ensure natural keyword usage. Essential for SEO professionals, content writers,
                and digital marketers creating search-optimized content that ranks well while maintaining readability.""",
        "features": [
            ("Keyword Frequency Analysis", "Count occurrences of single words and phrases"),
            ("Density Percentage", "Calculate keyword density as percentage of total words"),
            ("Multi-word Phrases", "Analyze 2-word and 3-word keyword phrases"),
            ("Top Keywords", "Identify most frequently used words in your content"),
            ("Over-optimization Detection", "Warning when keyword density exceeds recommended levels"),
            ("Related Terms", "Discover semantically related keywords in your text")
        ],
        "steps": [
            "Paste your content into the text area",
            "Enter target keywords or phrases to analyze",
            "View keyword frequency and density percentages",
            "Review top keywords and phrases automatically detected",
            "Check for over-optimization warnings (>2-3% density)",
            "Adjust content to maintain natural keyword distribution"
        ],
        "what_is": """Keyword density is the percentage of times a target keyword appears in content compared to the total word count. For
                example, if a 1000-word article contains a keyword 20 times, the keyword density is 2%. While keyword density was
                historically important for SEO, modern search engines prioritize natural language and semantic relevance over exact
                keyword repetition. The ideal keyword density is 1-2% for primary keywords, though this varies by content length and
                type. Over-optimization (keyword stuffing) can result in search engine penalties, while under-optimization may fail
                to signal relevance.""",
        "use_cases": [
            ("SEO Content Writing", "Ensure proper keyword usage in blog posts and articles"),
            ("Content Optimization", "Improve existing content's keyword targeting"),
            ("Competitor Analysis", "Analyze competitor content's keyword strategy"),
            ("Avoiding Penalties", "Prevent keyword stuffing and over-optimization"),
            ("Product Descriptions", "Optimize e-commerce product pages for search"),
            ("Landing Pages", "Balance conversion copy with SEO keyword requirements"),
            ("Academic Writing", "Analyze term frequency in research papers"),
            ("Quality Assurance", "Review content before publication for keyword balance")
        ]
    },
    "robots-txt-generator": {
        "color": "gray",
        "title": "Robots.txt Generator",
        "intro": """The Robots.txt Generator creates properly formatted robots.txt files that control how search engines crawl and index
                your website. Specify which pages to allow or disallow, set crawl delays, define sitemap locations, and configure
                rules for different user agents (Googlebot, Bingbot, etc.). Essential for SEO professionals and web developers
                managing site crawlability and protecting sensitive pages from indexation.""",
        "features": [
            ("User Agent Rules", "Configure different rules for Google, Bing, and other crawlers"),
            ("Allow/Disallow Paths", "Specify which URLs should be crawled or blocked"),
            ("Sitemap Declaration", "Add sitemap URLs for search engine discovery"),
            ("Crawl Delay", "Set custom crawl delays to manage server load"),
            ("Wildcard Support", "Use wildcards (*) for flexible URL pattern matching"),
            ("Validation", "Verify robots.txt syntax and identify potential issues")
        ],
        "steps": [
            "Select user agents (all, Googlebot, Bingbot, etc.)",
            "Add disallow rules for pages you want to block",
            "Add allow rules for exceptions to disallow rules",
            "Specify sitemap URLs for search engines",
            "Set crawl delay if needed to reduce server load",
            "Download robots.txt file and upload to site root directory"
        ],
        "what_is": """A robots.txt file is a text file placed in a website's root directory that tells search engine crawlers which pages
                they can and cannot access. It uses the Robots Exclusion Protocol to communicate with web robots (also called crawlers
                or spiders). The file uses User-agent directives to specify which crawler the rules apply to, Disallow to block pages,
                Allow to permit exceptions, and Sitemap to declare sitemap locations. While robots.txt provides crawling guidance,
                it doesn't prevent pages from appearing in search results if linked from other sites. For true privacy, use meta
                robots tags or authentication instead.""",
        "use_cases": [
            ("Block Admin Pages", "Prevent search engines from crawling /admin, /login pages"),
            ("Protect Private Content", "Block crawler access to member-only or private sections"),
            ("Prevent Duplicate Content", "Disallow parameter-based URLs that create duplicates"),
            ("Manage Crawl Budget", "Focus crawlers on important pages by blocking low-value content"),
            ("Block Resource Files", "Prevent crawling of CSS, JS, or image directories"),
            ("Development Sites", "Block entire staging or development sites from indexation"),
            ("E-commerce", "Prevent crawling of shopping cart, checkout, and search result pages"),
            ("News Sites", "Control which sections appear in Google News")
        ]
    },
    "sitemap-generator": {
        "color": "teal",
        "title": "XML Sitemap Generator",
        "intro": """The XML Sitemap Generator creates properly formatted XML sitemaps that help search engines discover and index your
                website's pages more efficiently. Generate sitemaps with priority levels, change frequencies, last modification dates,
                and proper URL formatting. Submit generated sitemaps to Google Search Console and Bing Webmaster Tools to improve
                crawling efficiency and search visibility.""",
        "features": [
            ("URL List Input", "Add website URLs manually or import from file"),
            ("Priority Settings", "Set priority levels (0.0-1.0) for different pages"),
            ("Change Frequency", "Specify how often pages update (daily, weekly, monthly)"),
            ("Last Modified Dates", "Include lastmod timestamps for content updates"),
            ("Image Sitemaps", "Generate image sitemap extensions for image search"),
            ("Validation", "Verify sitemap XML syntax and structure")
        ],
        "steps": [
            "Add website URLs (manually or import from list)",
            "Set priority for each URL (1.0 for homepage, 0.8 for key pages, etc.)",
            "Specify change frequency (daily for blogs, monthly for static pages)",
            "Add last modification dates if known",
            "Generate and preview XML sitemap",
            "Download sitemap.xml and upload to website root, then submit to search engines"
        ],
        "what_is": """An XML sitemap is a file that lists all important pages on a website to help search engines discover and index them.
                It uses XML (Extensible Markup Language) format and includes metadata like priority (importance 0.0-1.0), changefreq
                (how often content updates), and lastmod (last modification date). Sitemaps are especially important for large sites,
                sites with poor internal linking, new sites with few backlinks, and sites with frequently updated content. While not
                a ranking factor, sitemaps help search engines crawl sites more intelligently and discover new or updated content faster.""",
        "use_cases": [
            ("New Websites", "Help search engines discover all pages on newly launched sites"),
            ("Large Websites", "Ensure deep pages are found even with limited crawl budget"),
            ("E-commerce Sites", "Help product pages get indexed quickly"),
            ("News Sites", "Speed up indexation of time-sensitive articles"),
            ("Blog Sites", "Notify search engines about new blog posts"),
            ("Image Galleries", "Create image sitemaps for better image search visibility"),
            ("Video Content", "Generate video sitemaps for YouTube and Google Video"),
            ("International Sites", "Create hreflang sitemaps for multi-language content")
        ]
    },
    "utm-link-generator": {
        "color": "orange",
        "title": "UTM Link Builder",
        "intro": """The UTM Link Builder creates trackable URLs with UTM parameters for accurate campaign tracking in Google Analytics
                and other analytics platforms. Add utm_source, utm_medium, utm_campaign, utm_term, and utm_content parameters to
                track which marketing channels, campaigns, and content drive traffic and conversions. Essential for digital marketers,
                social media managers, and anyone running online marketing campaigns.""",
        "features": [
            ("Campaign Tracking", "Add UTM parameters for source, medium, campaign, term, and content"),
            ("URL Encoding", "Automatically encode parameters for safe URL usage"),
            ("Link Preview", "See generated UTM link before using"),
            ("Bulk Generation", "Create multiple UTM links at once"),
            ("Parameter Validation", "Ensure parameters follow naming conventions"),
            ("QR Code Generation", "Create QR codes for UTM-tracked URLs")
        ],
        "steps": [
            "Enter your destination URL",
            "Add UTM source (e.g., facebook, newsletter, google)",
            "Specify UTM medium (e.g., social, email, cpc)",
            "Name your campaign (e.g., spring_sale, product_launch)",
            "Optionally add utm_term (keywords) and utm_content (ad variation)",
            "Copy generated UTM link and use in marketing campaigns"
        ],
        "what_is": """UTM parameters are tags added to URLs that track campaign performance in analytics platforms. UTM stands for Urchin
                Tracking Module (from Urchin Software Corporation, acquired by Google). The five UTM parameters are: utm_source
                (traffic source like 'facebook'), utm_medium (marketing medium like 'social'), utm_campaign (campaign name like
                'spring_sale'), utm_term (paid keywords), and utm_content (ad variation). When users click UTM-tagged links, analytics
                platforms capture these parameters, allowing marketers to attribute traffic and conversions to specific campaigns,
                channels, and content pieces.""",
        "use_cases": [
            ("Email Marketing", "Track which email campaigns drive website traffic and sales"),
            ("Social Media", "Measure ROI from Facebook, Instagram, LinkedIn, Twitter posts"),
            ("Paid Advertising", "Track Google Ads, Facebook Ads, and other paid campaigns"),
            ("Influencer Marketing", "Measure traffic from individual influencer partnerships"),
            ("Affiliate Marketing", "Track performance of different affiliate partners"),
            ("Offline Marketing", "Use QR codes with UTM parameters on print materials"),
            ("A/B Testing", "Track performance of different ad creatives and copy"),
            ("Partner Links", "Monitor referral traffic from partner websites")
        ]
    }
}

def add_seo_to_tool(tool_key, config):
    """Add comprehensive SEO content to an SEO tool"""
    file_path = f"src/app/tools/{tool_key}/client.tsx"

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if already has comprehensive SEO content
    if 'Full-width SEO Content Section' in content or 'About ' + config['title'] in content:
        print(f"✓ {tool_key} already has SEO content")
        return True

    # Add Info import if not present
    if ', Info ' not in content and 'Info, ' not in content and ', Info}' not in content:
        content = re.sub(
            r'(from ["\']lucide-react["\'])',
            r', Info \1',
            content,
            count=1
        )

    # Build SEO section
    features_html = "\n".join([
        f'''                    <li className="flex items-start gap-2">
                      <span className="text-{config['color']}-600 mt-1">•</span>
                      <span><strong>{title}:</strong> {desc}</span>
                    </li>'''
        for title, desc in config['features']
    ])

    steps_html = "\n".join([
        f'''                    <li className="flex items-start gap-2">
                      <span className="font-bold text-{config['color']}-600">{i}.</span>
                      <span>{step}</span>
                    </li>'''
        for i, step in enumerate(config['steps'], 1)
    ])

    use_cases_html = "\n".join([
        f'''                <li className="flex items-start gap-2">
                  <span className="text-{config['color']}-600 mt-1">•</span>
                  <span><strong>{title}:</strong> {desc}</span>
                </li>'''
        for title, desc in config['use_cases']
    ])

    seo_section = f'''
        {{/* Full-width SEO Content Section */}}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200">
          <div className="max-w-full">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-{config['color']}-600" />
              <h2 className="text-2xl font-bold text-gray-900">About {config['title']}</h2>
            </div>

            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="mb-4">
                {config['intro']}
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Key Features</h3>
                  <ul className="space-y-2">
{features_html}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">How to Use</h3>
                  <ol className="space-y-2">
{steps_html}
                  </ol>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-3">What is it?</h3>
              <p className="mb-4">
                {config['what_is']}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">Common Use Cases</h3>
              <ul className="space-y-2 mb-4">
{use_cases_html}
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Privacy & Security</h3>
                <p>
                  All processing happens entirely in your browser using client-side JavaScript.
                  Your data never leaves your device and is not transmitted to any server. This ensures
                  complete privacy and security for all your content analysis and generation.
                </p>
              </div>
            </div>
          </div>
        </div>'''

    # Find insertion point (before closing divs)
    match = re.search(r'(\s*</div>\s*</div>\s*</div>\s*\)\s*})\s*$', content)
    if match:
        insertion_point = match.start()
        new_content = content[:insertion_point] + seo_section + '\n      ' + content[insertion_point:]

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✓ Added SEO content to {tool_key}")
        return True
    else:
        print(f"⚠️  Could not find insertion point in {tool_key}")
        return False

def main():
    """Add SEO content to all Phase 5 SEO tools"""
    print("=" * 70)
    print("Adding Comprehensive SEO Content to Phase 5 SEO Tools")
    print("=" * 70)

    success_count = 0
    for tool_key, config in PHASE5_CONFIGS.items():
        if add_seo_to_tool(tool_key, config):
            success_count += 1

    print("=" * 70)
    print(f"✓ Successfully updated {success_count}/{len(PHASE5_CONFIGS)} Phase 5 tools")
    print("=" * 70)

if __name__ == "__main__":
    main()
