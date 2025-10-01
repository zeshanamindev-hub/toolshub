"use client"

import { useState, useMemo } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ToolPageLayout from "@/components/layout/tool-page-layout"
import { ToolStructuredData } from "@/components/seo/tool-seo"
import {
  Smile,
  RefreshCcw,
  Copy,
  Trash2,
  Check,
  Zap,
  FileText,
  Search,
  Shuffle
} from "lucide-react"

// Expanded emoji mappings for better coverage
const emojiToTextMap: Record<string, string> = {
  "😀": "grinning face",
  "😂": "face with tears of joy",
  "❤️": "red heart",
  "👍": "thumbs up",
  "🎉": "party popper",
  "😢": "crying face",
  "🔥": "fire",
  "😊": "smiling face with smiling eyes",
  "😎": "smiling face with sunglasses",
  "🤔": "thinking face",
  "⭐": "star",
  "🌟": "glowing star",
  "✨": "sparkles",
  "💖": "sparkling heart",
  "😍": "smiling face with heart eyes",
  "🙌": "raising hands",
  "👏": "clapping hands",
  "🎊": "confetti ball",
  "🎈": "balloon",
  "🎂": "birthday cake",
  "😘": "face blowing a kiss",
  "😉": "winking face",
  "😜": "winking face with tongue",
  "😝": "squinting face with tongue",
  "😋": "face savoring food",
  "😛": "face with tongue",
  "😴": "sleeping face",
  "😪": "sleepy face",
  "😵": "dizzy face",
  "🤐": "zipper-mouth face",
  "🤗": "hugging face",
  "🤭": "face with hand over mouth",
  "🤫": "shushing face",
  "🤥": "lying face",
  "😶": "face without mouth",
  "😐": "neutral face",
  "😑": "expressionless face",
  "😬": "grimacing face",
  "🙄": "face with rolling eyes",
  "😯": "hushed face",
  "😦": "frowning face with open mouth",
  "😧": "anguished face",
  "😮": "face with open mouth",
  "😲": "astonished face",
  "😱": "face screaming in fear",
  "😨": "fearful face",
  "😰": "anxious face with sweat",
  "😥": "sad but relieved face",
  "😭": "loudly crying face",
  "😤": "face with steam from nose",
  "😠": "angry face",
  "😡": "pouting face",
  "🤬": "face with symbols on mouth",
  "😈": "devil face",
  "👿": "angry face with horns",
  "💀": "skull",
  "☠️": "skull and crossbones",
  "👻": "ghost",
  "👽": "alien",
  "🤖": "robot face",
  "😺": "grinning cat face",
  "😸": "grinning cat face with smiling eyes",
  "😹": "cat face with tears of joy",
  "😻": "smiling cat face with heart eyes",
  "😼": "cat face with wry smile",
  "😽": "kissing cat face",
  "🙀": "weary cat face",
  "😿": "crying cat face",
  "😾": "pouting cat face",
  "🐱": "cat face",
  "🐶": "dog face",
  "🐭": "mouse face",
  "🐹": "hamster face",
  "🐰": "rabbit face",
  "🦊": "fox face",
  "🐻": "bear face",
  "🐼": "panda face",
  "🐨": "koala face",
  "🐯": "tiger face",
  "🦁": "lion face",
  "🐮": "cow face",
  "🐷": "pig face",
  "🐽": "pig nose",
  "🐸": "frog face",
  "🐵": "monkey face",
  "🙈": "see-no-evil monkey",
  "🙉": "hear-no-evil monkey",
  "🙊": "speak-no-evil monkey",
  "🐒": "monkey",
  "🐔": "chicken",
  "🐧": "penguin",
  "🐦": "bird",
  "🐤": "baby chick",
  "🐣": "hatching chick",
  "🐥": "front-facing baby chick",
  "🦆": "duck",
  "🦅": "eagle",
  "🦉": "owl",
  "🦇": "bat",
  "🐺": "wolf face",
  "🐗": "boar",
  "🐴": "horse face",
  "🦄": "unicorn face",
  "🐝": "honeybee",
  "🐛": "bug",
  "🦋": "butterfly",
  "🐌": "snail",
  "🐞": "lady beetle",
  "🐜": "ant",
  "🦗": "cricket",
  "🕷️": "spider",
  "🦂": "scorpion",
  "🐢": "turtle",
  "🐍": "snake",
  "🦎": "lizard",
  "🦖": "t-rex",
  "🦕": "sauropod",
  "🐙": "octopus",
  "🦑": "squid",
  "🦐": "shrimp",
  "🦞": "lobster",
  "🦀": "crab",
  "🐡": "blowfish",
  "🐠": "tropical fish",
  "🐟": "fish",
  "🐬": "dolphin",
  "🐳": "spouting whale",
  "🐋": "whale",
  "🦈": "shark",
  "🐊": "crocodile",
  "🐅": "tiger",
  "🐆": "leopard",
  "🦓": "zebra",
  "🦍": "gorilla",
  "🐘": "elephant",
  "🦛": "hippopotamus",
  "🦏": "rhinoceros",
  "🐪": "camel",
  "🐫": "two-hump camel",
  "🦒": "giraffe",
  "🐃": "water buffalo",
  "🐂": "ox",
  "🐄": "cow",
  "🐎": "horse",
  "🐖": "pig",
  "🐏": "ram",
  "🐑": "sheep",
  "🦙": "llama",
  "🐐": "goat",
  "🐉": "dragon",
  "🐲": "dragon face",
  "🌸": "cherry blossom",
  "🌺": "hibiscus",
  "🌻": "sunflower",
  "🌹": "rose",
  "🥀": "wilted flower",
  "🌷": "tulip",
  "🌼": "blossom",
  "🌿": "herb",
  "🍀": "four leaf clover",
  "🎋": "tanabata tree",
  "🎍": "pine decoration",
  "🌾": "sheaf of rice",
  "🌵": "cactus",
  "🎄": "christmas tree",
  "🌲": "evergreen tree",
  "🌳": "deciduous tree",
  "🌴": "palm tree",
  "🌱": "seedling",
  "☘️": "shamrock",
  "🍄": "mushroom",
  "🌰": "chestnut",
  "🍞": "bread",
  "🥐": "croissant",
  "🥖": "baguette bread",
  "🥨": "pretzel",
  "🥯": "bagel",
  "🧀": "cheese wedge",
  "🥚": "egg",
  "🍳": "cooking",
  "🧈": "butter",
  "🥞": "pancakes",
  "🧇": "waffle",
  "🥓": "bacon",
  "🥩": "cut of meat",
  "🍗": "poultry leg",
  "🍖": "meat on bone",
  "🌭": "hot dog",
  "🍔": "hamburger",
  "🍟": "french fries",
  "🍕": "pizza",
  "🌮": "taco",
  "🌯": "burrito",
  "🥙": "stuffed flatbread",
  "🥘": "shallow pan of food",
  "🍝": "spaghetti",
  "🍜": "steaming bowl",
  "🍲": "pot of food",
  "🍛": "curry rice",
  "🍣": "sushi",
  "🍱": "bento box",
  "🥟": "dumpling",
  "🦪": "oyster",
  "🍤": "fried shrimp",
  "🍙": "rice ball",
  "🍚": "cooked rice",
  "🍘": "rice cracker",
  "🍥": "fish cake with swirl",
  "🥠": "fortune cookie",
  "🥮": "moon cake",
  "🍢": "oden",
  "🍡": "dango",
  "🍧": "shaved ice",
  "🍨": "ice cream",
  "🍦": "soft ice cream",
  "🥧": "pie",
  "🧁": "cupcake",
  "🍰": "shortcake",
  "🎂": "birthday cake",
  "🍮": "custard",
  "🍭": "lollipop",
  "🍬": "candy",
  "🍫": "chocolate bar",
  "🍿": "popcorn",
  "🍩": "doughnut",
  "🍪": "cookie",
  "🥜": "peanuts",
  "🍯": "honey pot",
  "🥛": "glass of milk",
  "🍼": "baby bottle",
  "☕": "hot beverage",
  "🫖": "teapot",
  "🍵": "teacup without handle",
  "🧃": "beverage box",
  "🥤": "cup with straw",
  "🧋": "bubble tea",
  "🍶": "sake",
  "🍺": "beer mug",
  "🍻": "clinking beer mugs",
  "🥂": "clinking glasses",
  "🍷": "wine glass",
  "🥃": "tumbler glass",
  "🍸": "cocktail glass",
  "🍹": "tropical drink",
  "🧉": "mate",
  "🍾": "champagne",
  "🧊": "ice",
  "🥄": "spoon",
  "🍴": "fork and knife",
  "🍽️": "fork and knife with plate",
  "🥣": "bowl with spoon",
  "🥡": "takeout box",
  "🥢": "chopsticks",
  "🧂": "salt",
  "⚽": "soccer ball",
  "🏀": "basketball",
  "🏈": "american football",
  "⚾": "baseball",
  "🥎": "softball",
  "🎾": "tennis",
  "🏐": "volleyball",
  "🏉": "rugby football",
  "🥏": "flying disc",
  "🎱": "pool 8 ball",
  "🪀": "yo-yo",
  "🏓": "ping pong",
  "🏸": "badminton",
  "🏒": "ice hockey",
  "🏑": "field hockey",
  "🥍": "lacrosse",
  "🏏": "cricket game",
  "🪃": "boomerang",
  "🥅": "goal net",
  "⛳": "flag in hole",
  "🪁": "kite",
  "🏹": "bow and arrow",
  "🎣": "fishing pole",
  "🤿": "diving mask",
  "🥊": "boxing glove",
  "🥋": "martial arts uniform",
  "🎽": "running shirt",
  "🛹": "skateboard",
  "🛷": "sled",
  "⛸️": "ice skate",
  "🥌": "curling stone",
  "🎿": "skis",
  "⛷️": "skier",
  "🏂": "snowboarder",
  "🪂": "parachute",
  "🏋️": "person lifting weights",
  "🤸": "person cartwheeling",
  "⛹️": "person bouncing ball",
  "👨": "man",
  "👩": "woman",
  "🧑": "person",
  "👨‍🦱": "man curly hair",
  "👩‍🦱": "woman curly hair",
  "👨‍🦰": "man red hair",
  "👩‍🦰": "woman red hair",
  "👨‍🦳": "man white hair",
  "👩‍🦳": "woman white hair",
  "👨‍🦲": "man bald",
  "👩‍🦲": "woman bald",
  "🧔": "man beard",
  "👱": "person blond hair",
  "👨‍⚕️": "man health worker",
  "👩‍⚕️": "woman health worker",
  "👨‍🎓": "man student",
  "👩‍🎓": "woman student",
  "👨‍🏫": "man teacher",
  "👩‍🏫": "woman teacher",
  "👨‍⚖️": "man judge",
  "👩‍⚖️": "woman judge",
  "👨‍🌾": "man farmer",
  "👩‍🌾": "woman farmer",
  "👨‍🍳": "man cook",
  "👩‍🍳": "woman cook",
  "👨‍🔧": "man mechanic",
  "👩‍🔧": "woman mechanic",
  "👨‍🏭": "man factory worker",
  "👩‍🏭": "woman factory worker",
  "👨‍💼": "man office worker",
  "👩‍💼": "woman office worker",
  "👨‍🔬": "man scientist",
  "👩‍🔬": "woman scientist",
  "👨‍💻": "man technologist",
  "👩‍💻": "woman technologist",
  "👨‍🎤": "man singer",
  "👩‍🎤": "woman singer",
  "👨‍🎨": "man artist",
  "👩‍🎨": "woman artist",
  "👨‍✈️": "man pilot",
  "👩‍✈️": "woman pilot",
  "👨‍🚀": "man astronaut",
  "👩‍🚀": "woman astronaut",
  "👨‍🚒": "man firefighter",
  "👩‍🚒": "woman firefighter",
  "👮": "police officer",
  "🕵️": "detective",
  "💂": "guard",
  "🥷": "ninja",
  "👷": "construction worker",
  "🤴": "prince",
  "👸": "princess",
  "👳": "person wearing turban",
  "👲": "person with skullcap",
  "🧕": "woman with headscarf",
  "🤵": "person in tuxedo",
  "🤰": "pregnant woman",
  "🤱": "breast-feeding",
  "👼": "baby angel",
  "🎅": "santa claus",
  "🤶": "mrs claus",
  "🦸": "superhero",
  "🦹": "supervillain",
  "🧙": "mage",
  "🧚": "fairy",
  "🧛": "vampire",
  "🧜": "merperson",
  "🧝": "elf",
  "🧞": "genie",
  "🧟": "zombie",
  "💆": "person getting massage",
  "💇": "person getting haircut",
  "🚶": "person walking",
  "🧍": "person standing",
  "👨‍🦯": "man with white cane",
  "👩‍🦯": "woman with white cane",
  "👨‍🦼": "man in motorized wheelchair",
  "👩‍🦼": "woman in motorized wheelchair",
  "👨‍🦽": "man in manual wheelchair",
  "👩‍🦽": "woman in manual wheelchair",
  "🏃": "person running",
  "💃": "woman dancing",
  "🕺": "man dancing",
  "🕴️": "person in suit levitating",
  "👯": "people with bunny ears",
  "🧖": "person in steamy room",
  "🧗": "person climbing",
  "🏇": "horse racing",
  "⛷️": "skier",
  "🏂": "snowboarder",
  "🏌️": "person golfing",
  "🏄": "person surfing",
  "🚣": "person rowing boat",
  "🏊": "person swimming",
  "🚴": "person biking",
  "🚵": "person mountain biking",
  "🤸": "person cartwheeling",
  "🤼": "people wrestling",
  "🤽": "person playing water polo",
  "🤹": "person juggling",
  "🛀": "person taking bath",
  "🛌": "person in bed",
  "👭": "women holding hands",
  "👫": "woman and man holding hands",
  "👬": "men holding hands",
  "💏": "kiss",
  "👨‍❤️‍💋‍👨": "kiss man man",
  "👩‍❤️‍💋‍👩": "kiss woman woman",
  "💑": "couple with heart",
  "👨‍❤️‍👨": "couple with heart man man",
  "👩‍❤️‍👩": "couple with heart woman woman",
  "👪": "family",
  "👨‍👩‍👦": "family man woman boy",
  "👨‍👩‍👧": "family man woman girl",
  "👨‍👩‍👧‍👦": "family man woman girl boy",
}

export default function EmojiTranslatorClient() {
  const [inputText, setInputText] = useState("")
  const [outputText, setOutputText] = useState("")
  const [mode, setMode] = useState<"emojiToText" | "textToEmoji">("emojiToText")
  const [copied, setCopied] = useState(false)

  const textToEmojiMap = useMemo(() => {
    return Object.entries(emojiToTextMap).reduce((acc, [emoji, text]) => {
      acc[text] = emoji
      return acc
    }, {} as Record<string, string>)
  }, [])

  const translateEmojiToText = (text: string): string => {
    // Replace emojis with text descriptions using regex for better emoji detection
    let result = text
    for (const [emoji, description] of Object.entries(emojiToTextMap)) {
      const escapedEmoji = emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      result = result.replace(new RegExp(escapedEmoji, 'g'), ` ${description} `)
    }
    return result.trim()
  }

  const translateTextToEmoji = (text: string): string => {
    // Replace known text phrases with emojis
    const words = text.toLowerCase().split(/\s+/)
    return words.map(word => {
      // Try exact match first
      if (textToEmojiMap[word]) return textToEmojiMap[word]
      // Try partial matches for common words
      for (const [phrase, emoji] of Object.entries(textToEmojiMap)) {
        if (phrase.includes(word) || word.includes(phrase.split(' ')[0])) {
          return emoji
        }
      }
      return word
    }).join(" ")
  }

  const handleTranslate = () => {
    if (mode === "emojiToText") {
      setOutputText(translateEmojiToText(inputText))
    } else {
      setOutputText(translateTextToEmoji(inputText))
    }
    setCopied(false)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  const handleClear = () => {
    setInputText("")
    setOutputText("")
    setCopied(false)
  }

  const handleRandomExample = () => {
    const examples = mode === "emojiToText"
      ? ["😀😂❤️", "👍🎉🔥", "😊😎🤔"]
      : ["grinning face party popper fire", "thumbs up red heart", "thinking face smiling face with sunglasses"]
    const randomExample = examples[Math.floor(Math.random() * examples.length)]
    setInputText(randomExample)
  }

  const getStats = () => {
    const emojis = inputText.split("").filter(char => emojiToTextMap[char]).length
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0
    const characters = inputText.length
    return { emojis, words, characters }
  }

  const stats = getStats()

  const features = [
    "Translate emojis to descriptive text",
    "Convert text descriptions back to emojis",
    "Toggle between emoji-to-text and text-to-emoji modes",
    "Real-time translation with instant preview",
    "Copy translated text to clipboard",
    "Statistics showing emoji count and text metrics",
    "Random example generator for testing",
    "Support for common emojis and phrases"
  ]

  const useCases = [
    "Understanding emoji meanings in messages",
    "Creating accessible text alternatives for emojis",
    "Learning emoji descriptions and names",
    "Converting emoji-based communication to text",
    "Educational purposes in emoji studies",
    "Making content more accessible for screen readers",
    "Translating emoji-heavy social media posts",
    "Creating emoji-based puzzles and games"
  ]

  const tips = [
    "Use the mode toggle to switch between translation directions",
    "Try combining multiple emojis for interesting translations",
    "Use random examples to discover new emoji meanings",
    "Copy the translated text for use in other applications",
    "Experiment with different emoji combinations",
    "Use for creating emoji-based secret messages",
    "Perfect for understanding international emoji usage"
  ]

  const relatedTools = [
    {
      name: "Text to ASCII",
      href: "/tools/text-to-ascii",
      icon: FileText,
      description: "Convert text to ASCII codes"
    },
    {
      name: "Case Converter",
      href: "/tools/case-converter",
      icon: RefreshCcw,
      description: "Change text case"
    },
    {
      name: "Reverse Text",
      href: "/tools/reverse-text",
      icon: RefreshCcw,
      description: "Reverse text characters"
    }
  ]

  const faqs = [
    {
      question: "How does the emoji translation work?",
      answer: "The tool uses a dictionary of common emojis and their text descriptions. It can translate emojis to descriptive text or convert text descriptions back to emojis."
    },
    {
      question: "What emojis are supported?",
      answer: "Currently supports common face emojis, hearts, gestures, and symbols. More emojis will be added in future updates."
    },
    {
      question: "Can I translate multiple emojis at once?",
      answer: "Yes! You can input multiple emojis and they'll all be translated to their text descriptions."
    },
    {
      question: "Is this tool free to use?",
      answer: "Yes, the Emoji Translator is completely free with no limitations on usage."
    }
  ]

  return (
    <>
      <ToolStructuredData
        toolName="Emoji Translator"
        toolDescription="Translate emojis to text and text to emojis instantly. Supports common emojis and phrases for fun and expressive communication."
        category="Text & Writing"
        toolPath="/tools/emoji-translator"
      />

      <ToolPageLayout
        toolName="Emoji Translator"
        toolDescription="Translate emojis to descriptive text and convert text back to emojis. Perfect for understanding emoji meanings and creating accessible content."
        toolIcon={Smile}
        category="Text & Writing"
        categoryHref="/categories/text-writing"
        features={features}
        useCases={useCases}
        relatedTools={relatedTools}
        tips={tips}
        faqs={faqs}
      >
        <div className="space-y-6">
          {/* Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Translation Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant={mode === "emojiToText" ? "default" : "outline"}
                  onClick={() => setMode("emojiToText")}
                  className="flex items-center gap-2"
                >
                  <Smile className="h-4 w-4" />
                  Emojis to Text
                </Button>
                <Button
                  variant={mode === "textToEmoji" ? "default" : "outline"}
                  onClick={() => setMode("textToEmoji")}
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Text to Emojis
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {mode === "emojiToText"
                  ? "Convert emojis to their descriptive text equivalents"
                  : "Convert text descriptions back to emojis"
                }
              </p>
            </CardContent>
          </Card>

          {/* Input and Output */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Input {mode === "emojiToText" ? "Emojis" : "Text"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={mode === "emojiToText"
                    ? "Enter emojis to translate to text..."
                    : "Enter text descriptions to convert to emojis..."
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
                <div className="flex gap-2 flex-wrap">
                  <Button
                    onClick={handleTranslate}
                    className="flex items-center gap-2"
                    disabled={!inputText}
                  >
                    <RefreshCcw className="h-4 w-4" />
                    Translate
                  </Button>

                  <Button
                    onClick={handleCopy}
                    className="flex items-center gap-2"
                    disabled={!outputText}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy Result
                      </>
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleClear}
                    className="flex items-center gap-2"
                    disabled={!inputText && !outputText}
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleRandomExample}
                    className="flex items-center gap-2"
                  >
                    <Shuffle className="h-4 w-4" />
                    Random Example
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Translated Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg min-h-[200px]">
                  <div className="whitespace-pre-wrap break-words">
                    {outputText || "Translated text will appear here..."}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Input Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.emojis}</div>
                  <div className="text-sm text-gray-600">Emojis Detected</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="font-semibold text-gray-900">Emojis to Text:</div>
                  {[
                    { input: "😀❤️", output: "grinning face red heart" },
                    { input: "👍🎉", output: "thumbs up party popper" },
                    { input: "😊🔥", output: "smiling face with smiling eyes fire" }
                  ].map((example, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg mb-1">{example.input}</div>
                      <div className="text-sm text-blue-600">→ {example.output}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="font-semibold text-gray-900">Text to Emojis:</div>
                  {[
                    { input: "grinning face red heart", output: "😀❤️" },
                    { input: "thumbs up party popper", output: "👍🎉" },
                    { input: "star", output: "⭐" }
                  ].map((example, index) => (
                    <div key={index} className="p-3 bg-green-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{example.input}</div>
                      <div className="text-lg text-green-600">→ {example.output}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolPageLayout>
    </>
  )
}
