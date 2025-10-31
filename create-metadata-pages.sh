#!/bin/bash
# Script to create metadata page.tsx files for remaining tools

cd /home/mobeen/Desktop/Work/Personal/timio/src/app/tools

# Helper function to create metadata page
create_metadata_page() {
    local tool_dir=$1
    local tool_name=$2
    local description=$3
    local category=$4
    local keywords=$5

    cat > "$tool_dir/page.tsx" << EOF
import { generateToolMetadata } from "@/components/seo/tool-seo"
import ${tool_name}Client from "./client"

export const metadata = generateToolMetadata({
  toolName: "$tool_name",
  toolDescription: "$description",
  category: "$category",
  keywords: [
$keywords
  ],
  toolPath: "/tools/$tool_dir"
})

export default function ${tool_name}Page() {
  return <${tool_name}Client />
}
EOF
}

# Batch 3 - Text tools
create_metadata_page "text-to-ascii" "Text to ASCII" "Convert text to ASCII codes instantly. Generate decimal, hexadecimal, or binary ASCII values with custom separators. Free online text to ASCII converter." "Converters & Encoding" '    "text to ascii",
    "ascii converter",
    "text to ascii code",
    "ascii generator",
    "text to decimal",
    "text to hex",
    "character to ascii",
    "ascii encoder"'

create_metadata_page "morse-to-text" "Morse to Text" "Convert Morse code to text instantly. Decode Morse code with dots, dashes, and spaces. Free online Morse code decoder with audio support." "Converters & Encoding" '    "morse to text",
    "morse code decoder",
    "decode morse code",
    "morse translator",
    "morse code converter",
    "morse to english",
    "morse decoder online",
    "morse code reader"'

create_metadata_page "lorem-ipsum-generator" "Lorem Ipsum Generator" "Generate Lorem Ipsum placeholder text instantly. Customize paragraphs, words, and sentences. Free online Lorem Ipsum generator for designers and developers." "Generators" '    "lorem ipsum",
    "lorem ipsum generator",
    "placeholder text",
    "dummy text",
    "fake text generator",
    "lorem ipsum dolor",
    "text generator",
    "lorem generator"'

create_metadata_page "lorem-ipsum-custom-generator" "Custom Lorem Ipsum" "Generate custom Lorem Ipsum text with your own words. Create personalized placeholder text with custom word lists. Free online custom Lorem generator." "Generators" '    "custom lorem ipsum",
    "lorem ipsum custom",
    "custom placeholder text",
    "custom dummy text",
    "personalized lorem",
    "custom text generator",
    "lorem with custom words",
    "custom filler text"'

create_metadata_page "password-generator" "Password Generator" "Generate strong, secure passwords instantly. Customize length, character types, and security level. Free online random password generator with strength meter." "Generators" '    "password generator",
    "strong password",
    "random password",
    "secure password generator",
    "password maker",
    "generate password",
    "password creator",
    "password strength"'

# Batch 4 - Generators & Dev Tools
create_metadata_page "hash-generator" "Hash Generator" "Generate MD5, SHA-1, SHA-256, SHA-512 hashes instantly. Create cryptographic hashes from text or files. Free online hash generator for developers." "Generators" '    "hash generator",
    "md5 generator",
    "sha256 generator",
    "hash calculator",
    "checksum generator",
    "crypto hash",
    "hash function",
    "hash online"'

create_metadata_page "qr-generator" "QR Code Generator" "Generate QR codes for URLs, text, emails, and more. Customize size and download as PNG. Free online QR code generator with instant preview." "Generators" '    "qr code generator",
    "qr generator",
    "create qr code",
    "qr code maker",
    "generate qr code",
    "qr code creator",
    "free qr code",
    "qr code online"'

create_metadata_page "json-formatter" "JSON Formatter" "Format, validate, and beautify JSON instantly. Minify JSON and fix syntax errors. Free online JSON formatter and validator with syntax highlighting." "Developer Tools" '    "json formatter",
    "json beautifier",
    "json validator",
    "format json",
    "json pretty print",
    "json minifier",
    "json viewer",
    "validate json"'

create_metadata_page "regex-tester" "Regex Tester" "Test regular expressions with real-time matching. Debug regex patterns with highlighted matches and detailed explanations. Free online regex tester for developers." "Developer Tools" '    "regex tester",
    "regular expression tester",
    "regex validator",
    "test regex",
    "regex debugger",
    "regex online",
    "regex checker",
    "regex tool"'

create_metadata_page "css-minifier" "CSS Minifier" "Minify CSS code instantly. Compress and optimize CSS for faster loading. Free online CSS minifier and compressor for web developers." "Developer Tools" '    "css minifier",
    "minify css",
    "css compressor",
    "compress css",
    "css optimizer",
    "reduce css size",
    "css minification",
    "optimize css"'

create_metadata_page "js-minifier" "JS Minifier" "Minify JavaScript code instantly. Compress and optimize JS for better performance. Free online JavaScript minifier and compressor." "Developer Tools" '    "js minifier",
    "minify javascript",
    "javascript minifier",
    "compress js",
    "js compressor",
    "javascript optimizer",
    "minify js online",
    "reduce js size"'

create_metadata_page "javascript-obfuscator" "JS Obfuscator" "Obfuscate JavaScript code to protect source code. Make JS harder to reverse engineer with variable renaming and code transformation. Free online JS obfuscator." "Developer Tools" '    "javascript obfuscator",
    "js obfuscator",
    "obfuscate javascript",
    "protect js code",
    "javascript protection",
    "code obfuscation",
    "obfuscate js online",
    "javascript security"'

# Batch 5 - Converters & Calculators
create_metadata_page "timestamp-converter" "Timestamp Converter" "Convert Unix timestamps to human-readable dates and vice versa. Support for milliseconds, timezones, and multiple formats. Free online timestamp converter." "Converters & Encoding" '    "timestamp converter",
    "unix timestamp",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "unix time converter",
    "epoch time",
    "timestamp online"'

create_metadata_page "text-diff-checker" "Text Diff Checker" "Compare two texts and find differences instantly. Highlight additions, deletions, and changes side-by-side. Free online text diff tool for comparing documents." "Developer Tools" '    "text diff",
    "compare text",
    "text difference",
    "diff checker",
    "text comparison",
    "compare documents",
    "file diff",
    "text compare tool"'

create_metadata_page "text-extractor" "Text Extractor" "Extract text from files, PDFs, and images instantly. Copy plain text from formatted documents. Free online text extraction tool." "Text & Writing" '    "text extractor",
    "extract text",
    "text from pdf",
    "text from image",
    "copy text",
    "extract content",
    "text extraction tool",
    "get text from file"'

create_metadata_page "line-sorter" "Line Sorter" "Sort lines alphabetically, numerically, or by length instantly. Reverse sort and remove duplicates. Free online text line sorting tool." "Text & Writing" '    "line sorter",
    "sort lines",
    "alphabetical sort",
    "sort text",
    "line organizer",
    "text sorter",
    "sort alphabetically",
    "sort lines online"'

create_metadata_page "random-string" "Random String Generator" "Generate random strings with custom length and character sets. Create secure tokens, IDs, and test data. Free online random string generator." "Generators" '    "random string",
    "random string generator",
    "generate random string",
    "random text generator",
    "string generator",
    "random id generator",
    "random token",
    "random characters"'

create_metadata_page "dummy-json-generator" "Dummy JSON Generator" "Generate realistic dummy JSON data instantly. Create mock APIs and test data with customizable schemas. Free online JSON data generator." "Generators" '    "dummy json",
    "json generator",
    "fake json data",
    "mock json",
    "json test data",
    "json data generator",
    "dummy data generator",
    "mock api generator"'

create_metadata_page "bmi-calculator" "BMI Calculator" "Calculate Body Mass Index (BMI) instantly. Get BMI classification and health recommendations. Free online BMI calculator with metric and imperial units." "Calculators" '    "bmi calculator",
    "body mass index",
    "calculate bmi",
    "bmi checker",
    "bmi calculator online",
    "weight calculator",
    "bmi index",
    "health calculator"'

create_metadata_page "percentage-calculator" "Percentage Calculator" "Calculate percentages, increases, decreases, and ratios instantly. Multiple calculation modes for all your percentage needs. Free online percentage calculator." "Calculators" '    "percentage calculator",
    "calculate percentage",
    "percent calculator",
    "percentage increase",
    "percentage decrease",
    "percent of",
    "percentage change",
    "percentage online"'

create_metadata_page "html-character-counter" "HTML Character Counter" "Count characters in HTML content, excluding or including tags. Analyze text length in HTML documents. Free online HTML character counter for web developers." "Text & Writing" '    "html character counter",
    "count html characters",
    "html text counter",
    "html length",
    "count characters in html",
    "html text length",
    "html character count",
    "html word counter"'

echo "✓ All metadata pages created successfully!"
