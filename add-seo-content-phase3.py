#!/usr/bin/env python3
"""
Script to add comprehensive SEO content to Phase 3 converter tools
"""

import os
import re

# SEO content templates for each tool
TOOL_CONFIGS = {
    "html-entities": {
        "color": "orange",
        "title": "HTML Entities Encoder/Decoder",
        "intro": """The HTML Entities Encoder/Decoder is an essential web development tool that converts special characters and symbols into
                their corresponding HTML entity representations and vice versa. HTML entities are used to display reserved characters
                in HTML (like <, >, &) and to represent characters that aren't easily typed on a keyboard (like ©, ®, €). This tool
                ensures your HTML content displays correctly across all browsers while preventing security vulnerabilities like XSS attacks.""",
        "features": [
            ("Bidirectional Conversion", "Seamlessly encode text to HTML entities or decode entities back to characters"),
            ("Multiple Entity Formats", "Support for named entities (&amp;copy;), decimal (&#169;), and hexadecimal (&#xA9;)"),
            ("XSS Prevention", "Encode user input to prevent cross-site scripting vulnerabilities"),
            ("Real-time Processing", "Instant conversion as you type with no delays"),
            ("Copy & Download", "Easy copying and downloading of converted results")
        ],
        "steps": [
            "Select 'Encode' to convert characters to entities, or 'Decode' for the reverse",
            "Paste or type your HTML text into the input field",
            "View the converted result instantly in the output area",
            "Review the entity mappings in the reference table",
            "Copy the result with one click or download for later use"
        ],
        "what_is": """HTML entities are sequences of characters that begin with an ampersand (&) and end with a semicolon (;). They are
                used to represent special characters in HTML that would otherwise be interpreted as code. For example, the less-than
                sign (<) must be written as &amp;lt; in HTML to prevent it from being treated as the start of an HTML tag. There are
                three types of HTML entities: named entities (like &amp;copy; for ©), decimal entities (like &#169; for ©), and
                hexadecimal entities (like &#xA9; for ©).""",
        "use_cases": [
            ("Display Code Snippets", "Show HTML, XML, or code examples on web pages without them being interpreted"),
            ("XSS Attack Prevention", "Encode user-generated content to prevent malicious script injection"),
            ("Special Characters", "Display copyright symbols, mathematical symbols, and foreign characters reliably"),
            ("Email HTML Content", "Encode HTML for email clients that have strict character requirements"),
            ("Database Storage", "Store HTML content safely in databases that may not support all character sets"),
            ("SEO Meta Tags", "Properly encode special characters in meta descriptions and titles")
        ]
    },
    "text-to-morse": {
        "color": "indigo",
        "title": "Text to Morse Code Converter",
        "intro": """The Text to Morse Code Converter is a specialized tool that translates plain text into Morse code, the time-honored
                communication system of dots and dashes. Invented by Samuel Morse in the 1830s, Morse code remains relevant today
                for emergency communications, amateur radio, aviation, and accessibility applications. Our converter supports both
                International Morse Code and provides visual and audio representations of the encoded message.""",
        "features": [
            ("International Standard", "Uses standard International Morse Code (ITU) for accuracy"),
            ("Visual Representation", "Clear dots (·) and dashes (−) display"),
            ("Audio Playback", "Listen to your Morse code message (if audio feature enabled)"),
            ("Character Support", "Supports letters, numbers, and common punctuation"),
            ("Copy & Share", "Easily copy Morse code for use in other applications")
        ],
        "steps": [
            "Type or paste your text message into the input field",
            "View the converted Morse code instantly with dots and dashes",
            "Review the character-by-character breakdown in the reference table",
            "Copy the Morse code output to your clipboard",
            "Use the examples to learn common Morse code patterns"
        ],
        "what_is": """Morse code is a method of encoding text characters as sequences of two different signal durations, called dots (·)
                and dashes (−). Each character is represented by a unique combination of dots and dashes. For example, the letter 'A'
                is represented as '·−' (dot-dash), while 'SOS' (the universal distress signal) is '··· −−− ···'. International
                Morse Code includes representations for the 26 letters of the Latin alphabet, Arabic numerals, and a small set of
                punctuation and procedural signals.""",
        "use_cases": [
            ("Amateur Radio (Ham Radio)", "Communicate over long distances using CW (continuous wave) transmission"),
            ("Emergency Communications", "Send distress signals when voice communication isn't possible"),
            ("Accessibility", "Assistive technology for individuals with speech or hearing impairments"),
            ("Aviation", "Navigate using radio beacons and communicate in noisy environments"),
            ("Education", "Learn Morse code for historical understanding or personal skill development"),
            ("Puzzle Solving", "Decode Morse code puzzles, geocaching clues, and escape room challenges")
        ]
    },
    "morse-to-text": {
        "color": "cyan",
        "title": "Morse Code to Text Decoder",
        "intro": """The Morse Code to Text Decoder translates Morse code (dots and dashes) back into readable text. Whether you're
                decoding messages from amateur radio transmissions, solving puzzles, or learning Morse code, this tool provides
                instant, accurate decoding with support for standard International Morse Code notation. The decoder handles various
                input formats and provides helpful error detection for invalid Morse sequences.""",
        "features": [
            ("Flexible Input", "Accepts dots/dashes (· −), periods/hyphens (. -), or dit/dah text"),
            ("Auto-Detection", "Automatically detects word and letter separators"),
            ("Error Handling", "Identifies and highlights invalid Morse code sequences"),
            ("Real-time Decoding", "Instant conversion as you input Morse code"),
            ("Character Map", "Shows the Morse-to-text mapping for reference")
        ],
        "steps": [
            "Enter Morse code using dots (· or .) and dashes (− or -)",
            "Separate letters with spaces and words with slashes (/) or multiple spaces",
            "View the decoded text message instantly in the output area",
            "Check the character reference to verify Morse code patterns",
            "Copy the decoded message with one click"
        ],
        "what_is": """Morse code decoding is the process of translating sequences of dots and dashes back into alphabetic and numeric
                characters. A dot (dit) is a short signal, while a dash (dah) is a long signal equal to three dots in duration.
                Letters are separated by gaps equal to one dash, and words are separated by gaps equal to seven dots. The decoder
                must correctly interpret these timing differences to accurately reconstruct the original message.""",
        "use_cases": [
            ("Ham Radio Reception", "Decode CW (continuous wave) transmissions from amateur radio operators"),
            ("Historical Research", "Decode archived Morse code messages from telegrams and military communications"),
            ("Puzzle Solving", "Solve Morse code puzzles in escape rooms, ARGs, and treasure hunts"),
            ("Learning Tool", "Practice Morse code recognition and improve decoding speed"),
            ("Emergency Signals", "Decode SOS and other distress signals"),
            ("Audio Analysis", "Convert recorded Morse code audio into readable text")
        ]
    },
    "timestamp-converter": {
        "color": "teal",
        "title": "Unix Timestamp Converter",
        "intro": """The Unix Timestamp Converter is a powerful tool for converting between Unix timestamps (epoch time) and human-readable
                dates. Unix timestamps represent the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC (the Unix
                epoch). This format is widely used in programming, databases, and APIs for storing and manipulating date/time data.
                Our converter supports milliseconds, handles timezone conversions, and provides bidirectional conversion.""",
        "features": [
            ("Bidirectional Conversion", "Convert from timestamp to date and vice versa"),
            ("Multiple Formats", "Support for seconds and milliseconds timestamps"),
            ("Timezone Support", "Convert between different timezones with UTC offset display"),
            ("Current Timestamp", "Quick access to the current Unix timestamp"),
            ("Relative Time", "See how long ago or how far in the future a timestamp is")
        ],
        "steps": [
            "Enter a Unix timestamp or select the current time",
            "View the converted human-readable date and time",
            "Adjust timezone settings if needed for local time display",
            "Reverse the process by entering a date to get its timestamp",
            "Copy the converted value for use in your application"
        ],
        "what_is": """A Unix timestamp (also called Epoch time or POSIX time) is a system for describing a point in time as the number of
                seconds that have elapsed since the Unix epoch (00:00:00 UTC on January 1, 1970), not counting leap seconds. This
                makes it a simple and unambiguous way to represent time across different systems and timezones. For example, the
                timestamp 1640995200 represents January 1, 2022, 00:00:00 UTC. Timestamps are stored as integers, making them
                efficient for calculations and comparisons.""",
        "use_cases": [
            ("API Development", "Work with timestamps in REST APIs and web services"),
            ("Database Operations", "Convert between database timestamps and display formats"),
            ("Log File Analysis", "Decode timestamps in server logs and debugging output"),
            ("Programming", "Test and debug time-based features in applications"),
            ("Data Migration", "Convert dates between different systems and formats"),
            ("Scheduling", "Calculate exact times for cron jobs and scheduled tasks")
        ]
    },
    "html-escape-unescape": {
        "color": "rose",
        "title": "HTML Escape/Unescape Tool",
        "intro": """The HTML Escape/Unescape Tool provides quick conversion between plain text and HTML-escaped text. HTML escaping
                (also called HTML encoding) converts special characters like <, >, &, and quotes into their safe HTML representations.
                This is crucial for displaying user-generated content safely on web pages and preventing XSS (Cross-Site Scripting)
                vulnerabilities. The tool works bidirectionally, allowing you to both escape and unescape HTML content.""",
        "features": [
            ("Bidirectional Processing", "Both escape (encode) and unescape (decode) HTML"),
            ("XSS Protection", "Safely escape user input to prevent script injection attacks"),
            ("Quote Handling", "Properly escapes both single and double quotes"),
            ("Real-time Conversion", "Instant processing as you type"),
            ("Bulk Processing", "Handle large amounts of text efficiently")
        ],
        "steps": [
            "Select 'Escape' to convert special characters to HTML entities, or 'Unescape' for the reverse",
            "Paste or type your text into the input field",
            "View the escaped or unescaped result instantly",
            "Review which characters were converted in the output",
            "Copy the result for use in your HTML code or database"
        ],
        "what_is": """HTML escaping is the process of converting characters that have special meaning in HTML into their corresponding HTML
                entities. The five main characters that must be escaped are: < becomes &amp;lt;, > becomes &amp;gt;, & becomes &amp;amp;,
                " becomes &amp;quot;, and ' becomes &amp;#39; or &amp;apos;. This ensures that when the text is rendered in a browser,
                these characters are displayed as-is rather than being interpreted as HTML markup.""",
        "use_cases": [
            ("Web Security", "Escape user input before displaying on web pages to prevent XSS attacks"),
            ("Content Management", "Store and display user-generated content safely in CMS systems"),
            ("Code Examples", "Display HTML code examples on documentation pages"),
            ("Form Validation", "Process and sanitize form submissions before storage"),
            ("JSON in HTML", "Safely embed JSON data in HTML attributes or script tags"),
            ("Email Templates", "Escape special characters in HTML email content")
        ]
    }
}

def add_seo_content(tool_key, config):
    """Add comprehensive SEO content to a tool's client.tsx file"""
    file_path = f"src/app/tools/{tool_key}/client.tsx"

    if not os.path.exists(file_path):
        print(f"❌ File not found: {file_path}")
        return False

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if SEO content already exists
    if 'Full-width SEO Content Section' in content:
        print(f"✓ {tool_key} already has SEO content")
        return True

    # Check if Info is already imported
    if ', Info ' not in content and 'Info, ' not in content and ', Info}' not in content:
        # Add Info to imports
        content = re.sub(
            r'(from "lucide-react")',
            r', Info \1',
            content,
            count=1
        )

    # Generate SEO content
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
                  All conversions are performed entirely in your browser using client-side JavaScript.
                  Your data never leaves your device and is not transmitted to any server. This ensures
                  complete privacy and security for all your conversions.
                </p>
              </div>
            </div>
          </div>
        </div>'''

    # Find the closing tags and insert before them
    # Look for the pattern: closing </div></div></div>)
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
    """Add SEO content to all Phase 3 tools"""
    print("Adding comprehensive SEO content to Phase 3 tools...")
    print("=" * 60)

    success_count = 0
    for tool_key, config in TOOL_CONFIGS.items():
        if add_seo_content(tool_key, config):
            success_count += 1

    print("=" * 60)
    print(f"✓ Successfully updated {success_count}/{len(TOOL_CONFIGS)} tools")

if __name__ == "__main__":
    main()
