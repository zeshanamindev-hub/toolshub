#!/usr/bin/env python3
"""
Script to add comprehensive SEO content to Phase 4 generator tools
"""

import os
import re

# SEO content configurations for Phase 4 tools
PHASE4_CONFIGS = {
    "password-generator": {
        "color": "red",
        "title": "Password Generator",
        "intro": """The Password Generator creates strong, random passwords that help protect your online accounts from unauthorized access.
                With cyber attacks and data breaches becoming increasingly common, using unique, complex passwords for each account
                is essential for digital security. Our password generator creates cryptographically secure passwords with customizable
                length, character types, and complexity options to meet any security requirement.""",
        "features": [
            ("Customizable Length", "Generate passwords from 8 to 128 characters to meet any requirement"),
            ("Multiple Character Sets", "Include uppercase, lowercase, numbers, and special symbols"),
            ("Cryptographically Secure", "Uses secure random number generation for unpredictable passwords"),
            ("Instant Generation", "Create new passwords with a single click"),
            ("Copy to Clipboard", "Quickly copy generated passwords for immediate use"),
            ("No Storage", "Passwords are generated locally and never saved or transmitted")
        ],
        "steps": [
            "Select desired password length (8-128 characters recommended minimum 12)",
            "Choose character types: uppercase, lowercase, numbers, symbols",
            "Click 'Generate Password' to create a secure password",
            "Review the password strength indicator",
            "Copy the password to your clipboard",
            "Use immediately in your account or password manager"
        ],
        "what_is": """A strong password is a sequence of characters that is difficult for humans or computers to guess. It should be long
                (at least 12-16 characters), use a mix of character types (uppercase, lowercase, numbers, symbols), and be unique
                for each account. The Password Generator uses cryptographically secure random number generation to create passwords
                that are virtually impossible to guess through brute force attacks. Each password is generated with true randomness,
                ensuring maximum security.""",
        "use_cases": [
            ("New Account Creation", "Generate strong passwords when signing up for new online services"),
            ("Password Reset", "Create secure replacement passwords when changing compromised credentials"),
            ("Password Manager", "Generate unique passwords to store in password management applications"),
            ("Application Secrets", "Create API keys, tokens, and secret keys for applications"),
            ("Database Credentials", "Generate secure passwords for database user accounts"),
            ("WiFi Networks", "Create strong WPA2/WPA3 passwords for wireless networks")
        ]
    },
    "hash-generator": {
        "color": "violet",
        "title": "Hash Generator",
        "intro": """The Hash Generator creates cryptographic hash values from text using industry-standard algorithms like MD5, SHA-1,
                SHA-256, and SHA-512. Hashing is a one-way cryptographic function that converts input data of any size into a
                fixed-size string of characters, which acts as a unique digital fingerprint. This tool is essential for developers,
                security professionals, and anyone needing to verify data integrity or create checksums.""",
        "features": [
            ("Multiple Algorithms", "Support for MD5, SHA-1, SHA-256, SHA-512, and more"),
            ("Real-time Hashing", "Instant hash generation as you type"),
            ("File Hashing", "Generate hashes from uploaded files for verification"),
            ("Comparison Mode", "Compare hashes to verify data integrity"),
            ("Uppercase/Lowercase", "Choose hash output format preference"),
            ("Copy & Download", "Easy copying and downloading of hash values")
        ],
        "steps": [
            "Select your preferred hashing algorithm (SHA-256 recommended)",
            "Enter text or upload a file to hash",
            "View the generated hash value instantly",
            "Copy the hash for verification or storage purposes",
            "Optionally compare with an expected hash value",
            "Download results for record keeping"
        ],
        "what_is": """A cryptographic hash function is a mathematical algorithm that maps data of arbitrary size to a fixed-size string
                of bytes. The output (hash value or digest) has several important properties: it's deterministic (same input always
                produces same output), it's quick to compute, it's infeasible to reverse (one-way function), and small changes to
                input produce drastically different output (avalanche effect). Common algorithms include SHA-256 (256-bit output)
                used in Bitcoin, and MD5 (128-bit) used for checksums despite known vulnerabilities.""",
        "use_cases": [
            ("File Integrity Verification", "Verify downloaded files haven't been tampered with by comparing checksums"),
            ("Password Storage", "Hash passwords before storing in databases (use bcrypt for production)"),
            ("Digital Signatures", "Create unique identifiers for documents and files"),
            ("Blockchain & Cryptocurrency", "Generate addresses and validate transactions"),
            ("Data Deduplication", "Identify duplicate files or content using hash comparison"),
            ("Git Commits", "Understand how version control systems use SHA-1 hashes")
        ]
    },
    "qr-generator": {
        "color": "blue",
        "title": "QR Code Generator",
        "intro": """The QR Code Generator creates scannable QR (Quick Response) codes from text, URLs, contact information, and more.
                QR codes are two-dimensional barcodes that can store up to 4,296 alphanumeric characters and can be scanned by
                smartphones to instantly access information. Perfect for marketing materials, business cards, product packaging,
                event tickets, and contactless information sharing.""",
        "features": [
            ("Multiple Data Types", "Generate QR codes for URLs, text, emails, phone numbers, WiFi, and vCards"),
            ("Customizable Size", "Choose from multiple size options for different use cases"),
            ("Error Correction", "Built-in error correction ensures scannability even if partially damaged"),
            ("Download Options", "Export as PNG, SVG, or other formats for print and digital use"),
            ("Instant Preview", "See your QR code generated in real-time"),
            ("High Quality", "Generate high-resolution codes suitable for printing")
        ],
        "steps": [
            "Choose the type of data (URL, text, contact info, WiFi, etc.)",
            "Enter your content in the input field",
            "Select QR code size and error correction level",
            "Preview the generated QR code",
            "Download in your preferred format (PNG, SVG)",
            "Print or share digitally as needed"
        ],
        "what_is": """QR codes (Quick Response codes) are two-dimensional matrix barcodes invented in 1994 by Denso Wave for tracking
                automotive parts. They can store significantly more information than traditional barcodes—up to 4,296 characters
                compared to about 20 digits. QR codes use Reed-Solomon error correction, allowing them to be read even if up to
                30% of the code is damaged or obscured. They're read by smartphones and dedicated scanners, which decode the
                pattern of black and white squares into usable data like URLs, text, or contact information.""",
        "use_cases": [
            ("Website Links", "Direct users to websites, landing pages, or product pages instantly"),
            ("Business Cards", "Share contact information without manual entry (vCard QR codes)"),
            ("Product Packaging", "Link to product manuals, recipes, assembly instructions, or authenticity verification"),
            ("Event Management", "Create scannable tickets, registration codes, and check-in systems"),
            ("WiFi Sharing", "Generate QR codes that automatically connect devices to WiFi networks"),
            ("Payment Systems", "Enable contactless payments and cryptocurrency transactions"),
            ("Marketing Campaigns", "Track campaign engagement and provide instant access to promotions")
        ]
    },
    "lorem-ipsum-generator": {
        "color": "gray",
        "title": "Lorem Ipsum Generator",
        "intro": """The Lorem Ipsum Generator creates placeholder text for design mockups, prototypes, and development projects.
                Lorem ipsum is the standard dummy text used in the printing and typesetting industry since the 1500s. It allows
                designers and developers to focus on visual elements and layout without being distracted by meaningful content,
                while maintaining realistic text flow and word distribution.""",
        "features": [
            ("Multiple Units", "Generate by paragraphs, sentences, or words"),
            ("Adjustable Length", "Specify exactly how much text you need"),
            ("Classic Lorem Ipsum", "Uses traditional Latin-based placeholder text"),
            ("HTML Formatted", "Option to wrap paragraphs in <p> tags for web development"),
            ("Instant Generation", "Create placeholder text with one click"),
            ("Copy & Download", "Easy copying and downloading for immediate use")
        ],
        "steps": [
            "Select the unit type (paragraphs, sentences, or words)",
            "Specify how many units you need",
            "Choose whether to include HTML paragraph tags",
            "Click 'Generate' to create the placeholder text",
            "Copy to clipboard or download as a text file",
            "Paste into your design or development project"
        ],
        "what_is": """Lorem ipsum is scrambled Latin text derived from Cicero's 'de Finibus Bonorum et Malorum' (The Extremes of Good
                and Evil) written in 45 BC. The text has been used as placeholder text since the 1500s when an unknown printer
                scrambled a galley of type to make a type specimen book. It's become the industry standard because it has a
                normal distribution of letters (unlike 'Test test test'), looks like readable English, and doesn't distract
                reviewers with meaningful content. The most common Lorem ipsum passage begins: 'Lorem ipsum dolor sit amet,
                consectetur adipiscing elit...'""",
        "use_cases": [
            ("Web Design Mockups", "Fill layouts with realistic text before content is finalized"),
            ("Print Design", "Test typography, spacing, and layout in brochures and magazines"),
            ("App Development", "Populate UI elements during development and testing"),
            ("Client Presentations", "Demonstrate design concepts without final copy"),
            ("Typography Testing", "Evaluate font choices with varied text lengths"),
            ("Content Planning", "Visualize content areas and plan information architecture")
        ]
    },
    "lorem-ipsum-custom-generator": {
        "color": "slate",
        "title": "Lorem Ipsum Custom Generator",
        "intro": """The Lorem Ipsum Custom Generator creates placeholder text with advanced customization options including custom word
                lists, sentence structure control, and formatting preferences. Unlike standard Lorem ipsum generators, this tool
                allows you to create context-appropriate placeholder text that better represents your final content while maintaining
                the benefits of non-meaningful filler text.""",
        "features": [
            ("Custom Word Lists", "Use your own vocabulary or industry-specific terms"),
            ("Sentence Length Control", "Adjust average sentence length for realistic variation"),
            ("Paragraph Sizing", "Control how many sentences appear in each paragraph"),
            ("HTML/Markdown Support", "Format output for web or documentation use"),
            ("Capitalization Rules", "Apply proper title case and sentence capitalization"),
            ("Save Presets", "Store custom configurations for repeated use")
        ],
        "steps": [
            "Configure text generation settings (paragraphs, sentences, words)",
            "Optionally provide custom word list or use defaults",
            "Adjust sentence and paragraph length preferences",
            "Select output format (plain text, HTML, or Markdown)",
            "Generate customized placeholder text",
            "Copy, download, or save configuration for future use"
        ],
        "what_is": """Custom Lorem ipsum generation extends the traditional placeholder text concept by allowing specific parameters and
                custom vocabulary. This is useful when you need placeholder text that matches the tone, length, or technical level
                of your final content. For example, a medical website might use medical terminology in its placeholder text, or
                a technical documentation project might use programming-related words. The generator maintains proper capitalization,
                punctuation, and paragraph structure while using your specified vocabulary.""",
        "use_cases": [
            ("Industry-Specific Mockups", "Use relevant terminology for medical, legal, or technical designs"),
            ("Localization Testing", "Generate text with character sets and lengths matching target languages"),
            ("Content Strategy", "Create realistic placeholder text matching tone and reading level"),
            ("A/B Testing", "Generate varied text lengths to test responsive layouts"),
            ("Documentation Templates", "Create boilerplate text for technical documentation"),
            ("SEO Mockups", "Generate keyword-rich placeholder content for SEO optimization testing")
        ]
    },
    "dummy-json-generator": {
        "color": "emerald",
        "title": "Dummy JSON Generator",
        "intro": """The Dummy JSON Generator creates realistic JSON data for testing, development, and prototyping. Generate arrays of
                objects with customizable schemas including names, emails, addresses, dates, numbers, and more. Perfect for populating
                databases, testing APIs, creating mockups, and developing applications without real data. All data is randomly
                generated and fictional.""",
        "features": [
            ("Realistic Data Types", "Names, emails, phone numbers, addresses, dates, URLs, and more"),
            ("Customizable Schema", "Define your own JSON structure and field types"),
            ("Array Generation", "Create arrays with specified number of items"),
            ("Nested Objects", "Support for complex nested JSON structures"),
            ("Data Validation", "Generated JSON is valid and ready to use"),
            ("Export Options", "Copy, download, or use directly in your application")
        ],
        "steps": [
            "Define your JSON schema or use a preset template",
            "Specify field types (name, email, number, date, etc.)",
            "Set the number of records to generate",
            "Configure any nested objects or arrays",
            "Click 'Generate' to create random JSON data",
            "Copy or download the generated JSON for use in your project"
        ],
        "what_is": """Dummy JSON data is randomly generated JSON (JavaScript Object Notation) that follows a specified schema but contains
                fictional information. It's used during development when real data isn't available or when you need large datasets
                for testing without privacy concerns. The generator uses algorithms to create realistic-looking data like names
                (from common name lists), emails (formatted correctly), phone numbers (following regional formats), and addresses
                (with proper structure). This allows developers to test application functionality, UI layouts, and data processing
                logic before integrating with real data sources.""",
        "use_cases": [
            ("API Testing", "Test REST APIs and GraphQL queries with realistic mock data"),
            ("Database Seeding", "Populate development databases with test records"),
            ("Frontend Development", "Build and test UI components without backend integration"),
            ("Load Testing", "Generate large datasets to test application performance"),
            ("Demo Applications", "Create realistic demos without exposing real customer data"),
            ("Documentation Examples", "Provide example API responses in technical documentation")
        ]
    },
    "random-string": {
        "color": "amber",
        "title": "Random String Generator",
        "intro": """The Random String Generator creates random character sequences for various purposes including testing, unique identifiers,
                tokens, and placeholder data. Generate strings with custom length and character sets including letters, numbers,
                symbols, and special characters. Perfect for creating test data, session tokens, API keys, and unique identifiers
                in development and testing environments.""",
        "features": [
            ("Customizable Length", "Generate strings from 1 to 1000+ characters"),
            ("Multiple Character Sets", "Choose from letters, numbers, symbols, or custom characters"),
            ("Case Control", "Use uppercase, lowercase, or mixed case"),
            ("Bulk Generation", "Create multiple random strings at once"),
            ("Pattern Support", "Generate strings following specific patterns"),
            ("Cryptographic Security", "Option for cryptographically secure random generation")
        ],
        "steps": [
            "Specify the desired string length",
            "Select character types to include (letters, numbers, symbols)",
            "Choose case preference (upper, lower, or mixed)",
            "Set the number of strings to generate",
            "Click 'Generate' to create random strings",
            "Copy individual strings or download all as a file"
        ],
        "what_is": """Random string generation creates sequences of characters selected randomly from a specified character set. These can be
                truly random (using cryptographic randomness for security applications) or pseudo-random (using mathematical algorithms
                for general purposes). The randomness ensures that each generated string is unique and unpredictable. Common character
                sets include alphanumeric (A-Z, a-z, 0-9), hexadecimal (0-9, A-F), or custom sets. The length and character diversity
                determine the total number of possible combinations, affecting uniqueness and security strength.""",
        "use_cases": [
            ("Session Tokens", "Generate unique session identifiers for web applications"),
            ("Test Data", "Create random strings for testing form inputs and validation"),
            ("Unique IDs", "Generate identifiers for database records or file names"),
            ("API Keys", "Create placeholder API keys during development"),
            ("Coupon Codes", "Generate unique promotional codes for marketing campaigns"),
            ("Reference Numbers", "Create order numbers, tracking IDs, or confirmation codes")
        ]
    },
    "favicon-generator": {
        "color": "pink",
        "title": "Favicon Generator",
        "intro": """The Favicon Generator creates favicons (favorite icons) for websites in all required sizes and formats. Favicons are
                small icons that appear in browser tabs, bookmarks, and mobile home screens. This tool converts your image or design
                into properly formatted favicons including .ico files, PNG images in multiple sizes, and generates the necessary
                HTML code for implementation across all browsers and devices.""",
        "features": [
            ("Multiple Formats", "Generate .ico, PNG, and SVG favicon files"),
            ("All Standard Sizes", "Create 16×16, 32×32, 180×180, 192×192, 512×512 and more"),
            ("Auto-Resizing", "Automatically resize your source image to all required sizes"),
            ("HTML Code Generation", "Get ready-to-use HTML link tags for implementation"),
            ("Preview Mode", "See how your favicon looks across different contexts"),
            ("Batch Download", "Download all favicon sizes in a single ZIP file")
        ],
        "steps": [
            "Upload your source image (PNG, JPG, or SVG recommended)",
            "Preview how the favicon looks at different sizes",
            "Customize settings if needed (background color, padding)",
            "Generate favicons in all required formats and sizes",
            "Download the favicon package as a ZIP file",
            "Copy the provided HTML code and add to your website's <head>"
        ],
        "what_is": """A favicon (short for 'favorite icon') is a small icon associated with a particular website, displayed in browser tabs,
                bookmark lists, and mobile home screens. The traditional favicon is a 16×16 pixel .ico file, but modern websites
                require multiple sizes and formats: 16×16 and 32×32 for browser tabs, 180×180 for Apple Touch Icon, 192×192 and
                512×512 for Android, and SVG for scalable displays. Proper favicon implementation requires linking to these files
                in the HTML <head> section with appropriate rel attributes like 'icon', 'apple-touch-icon', and 'manifest'.""",
        "use_cases": [
            ("Website Branding", "Add professional branding to browser tabs and bookmarks"),
            ("Mobile Home Screens", "Create app-like icons when users save your site to their home screen"),
            ("Browser Tab Identification", "Help users quickly identify your site among many open tabs"),
            ("Bookmark Recognition", "Make your site easily recognizable in bookmark lists"),
            ("Progressive Web Apps", "Provide required icons for PWA manifests"),
            ("Email Signatures", "Include favicons in HTML email signatures for brand recognition")
        ]
    }
}

def add_seo_to_tool(tool_key, config):
    """Add comprehensive SEO content to a generator tool"""
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
                  All generation happens entirely in your browser using client-side JavaScript.
                  No data is transmitted to any server. Generated content remains private on your device.
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
    """Add SEO content to all Phase 4 generator tools"""
    print("=" * 70)
    print("Adding Comprehensive SEO Content to Phase 4 Generator Tools")
    print("=" * 70)

    success_count = 0
    for tool_key, config in PHASE4_CONFIGS.items():
        if add_seo_to_tool(tool_key, config):
            success_count += 1

    print("=" * 70)
    print(f"✓ Successfully updated {success_count}/{len(PHASE4_CONFIGS)} Phase 4 tools")
    print("=" * 70)

if __name__ == "__main__":
    main()
