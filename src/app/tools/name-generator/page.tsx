"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Copy, RotateCcw, User, Users } from "lucide-react"
import StructuredData from "@/components/structured-data"

const firstNames = {
  male: [
    "Alexander", "Andrew", "Anthony", "Benjamin", "Charles", "Christopher", "Daniel", "David",
    "Edward", "Ethan", "Frank", "George", "Henry", "Jack", "James", "John", "Joseph", "Joshua",
    "Kevin", "Liam", "Lucas", "Mark", "Matthew", "Michael", "Nicholas", "Noah", "Oliver",
    "Patrick", "Paul", "Peter", "Richard", "Robert", "Ryan", "Samuel", "Stephen", "Thomas",
    "Timothy", "William", "Zachary", "Adrian", "Austin", "Brandon", "Brian", "Caleb", "Connor",
    "Derek", "Eric", "Gabriel", "Ian", "Jacob", "Jason", "Jonathan", "Jordan", "Kyle", "Logan",
    "Mason", "Nathan", "Owen", "Sean", "Tyler", "Victor", "Wesley", "Xavier", "Zane"
  ],
  female: [
    "Abigail", "Alice", "Amanda", "Amy", "Angela", "Anna", "Ashley", "Barbara", "Betty",
    "Brenda", "Carol", "Catherine", "Charlotte", "Christina", "Christine", "Deborah", "Diana",
    "Donna", "Dorothy", "Elizabeth", "Emily", "Emma", "Eva", "Frances", "Grace", "Hannah",
    "Helen", "Isabella", "Jennifer", "Jessica", "Joan", "Julia", "Karen", "Katherine", "Laura",
    "Linda", "Lisa", "Margaret", "Maria", "Marie", "Martha", "Mary", "Michelle", "Nancy",
    "Nicole", "Olivia", "Patricia", "Rachel", "Rebecca", "Ruth", "Sandra", "Sarah", "Sharon",
    "Sophia", "Susan", "Teresa", "Victoria", "Virginia", "Chloe", "Megan", "Samantha", "Taylor"
  ]
}

const lastNames = [
  "Anderson", "Brown", "Clark", "Davis", "Garcia", "Harris", "Jackson", "Johnson", "Jones",
  "Lee", "Lewis", "Martin", "Miller", "Moore", "Rodriguez", "Smith", "Taylor", "Thomas",
  "Thompson", "White", "Williams", "Wilson", "Young", "Adams", "Allen", "Baker", "Campbell",
  "Carter", "Collins", "Cooper", "Edwards", "Evans", "Green", "Hall", "Hill", "King",
  "Lopez", "Mitchell", "Nelson", "Parker", "Perez", "Phillips", "Roberts", "Robinson",
  "Scott", "Turner", "Walker", "Ward", "Watson", "Wood", "Wright", "Bell", "Brooks",
  "Butler", "Cook", "Foster", "Gray", "Henderson", "Howard", "Hughes", "Kelly", "Long",
  "Morgan", "Murphy", "Perry", "Powell", "Price", "Reed", "Richardson", "Rivera", "Rogers",
  "Ross", "Sanders", "Stewart", "Sullivan", "Torres", "Washington", "Wells", "West"
]

const usernameAdjectives = [
  "Cool", "Super", "Mega", "Ultra", "Epic", "Awesome", "Amazing", "Fantastic", "Incredible",
  "Mighty", "Power", "Thunder", "Lightning", "Fire", "Ice", "Shadow", "Golden", "Silver",
  "Dark", "Bright", "Swift", "Quick", "Smart", "Clever", "Brave", "Bold", "Strong", "Wild",
  "Free", "Happy", "Lucky", "Magic", "Mystic", "Cosmic", "Stellar", "Neon", "Cyber", "Digital"
]

const usernameNouns = [
  "Warrior", "Knight", "Hunter", "Ranger", "Wizard", "Mage", "Dragon", "Phoenix", "Tiger",
  "Wolf", "Eagle", "Falcon", "Lion", "Bear", "Shark", "Ninja", "Samurai", "Pirate", "Hero",
  "Legend", "Champion", "Master", "Ace", "Star", "Comet", "Storm", "Thunder", "Lightning",
  "Blade", "Arrow", "Hammer", "Shield", "Crown", "Gem", "Crystal", "Fire", "Ice", "Wind",
  "Ocean", "Mountain", "Forest", "River", "Moon", "Sun", "Galaxy", "Planet", "Rocket", "Robot"
]

type NameType = "first" | "last" | "full" | "username" | "business"
type Gender = "male" | "female" | "any"

export default function NameGenerator() {
  const [nameType, setNameType] = useState<NameType>("full")
  const [gender, setGender] = useState<Gender>("any")
  const [count, setCount] = useState("5")
  const [generatedNames, setGeneratedNames] = useState<string[]>([])

  const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const generateFirstName = (selectedGender: Gender): string => {
    if (selectedGender === "any") {
      const allNames = [...firstNames.male, ...firstNames.female]
      return getRandomItem(allNames)
    }
    return getRandomItem(firstNames[selectedGender])
  }

  const generateLastName = (): string => {
    return getRandomItem(lastNames)
  }

  const generateFullName = (selectedGender: Gender): string => {
    return `${generateFirstName(selectedGender)} ${generateLastName()}`
  }

  const generateUsername = (): string => {
    const patterns = [
      () => `${getRandomItem(usernameAdjectives)}${getRandomItem(usernameNouns)}`,
      () => `${getRandomItem(usernameAdjectives)}${getRandomItem(usernameNouns)}${Math.floor(Math.random() * 999) + 1}`,
      () => `${getRandomItem(usernameNouns)}${getRandomItem(usernameAdjectives)}`,
      () => `${getRandomItem(firstNames.male.concat(firstNames.female))}${getRandomItem(usernameNouns)}`,
      () => `${getRandomItem(usernameAdjectives)}_${getRandomItem(usernameNouns)}`,
      () => `${getRandomItem(usernameNouns)}_${Math.floor(Math.random() * 9999) + 1}`
    ]
    
    return getRandomItem(patterns)()
  }

  const generateBusinessName = (): string => {
    const businessTypes = [
      "Solutions", "Systems", "Technologies", "Innovations", "Dynamics", "Enterprises",
      "Group", "Corporation", "Industries", "Services", "Consulting", "Partners",
      "Associates", "Holdings", "Ventures", "Labs", "Studios", "Works", "Co", "Inc"
    ]
    
    const businessAdjectives = [
      "Global", "Advanced", "Premier", "Elite", "Prime", "Alpha", "Beta", "Quantum",
      "Digital", "Smart", "Pro", "Max", "Ultra", "Next", "Future", "Modern", "Swift",
      "Bright", "Clear", "Pure", "True", "Core", "Peak", "Edge", "Apex", "Vertex"
    ]
    
    const patterns = [
      () => `${getRandomItem(businessAdjectives)} ${getRandomItem(businessTypes)}`,
      () => `${generateLastName()} ${getRandomItem(businessTypes)}`,
      () => `${getRandomItem(businessAdjectives)} ${generateLastName()} ${getRandomItem(businessTypes)}`,
      () => `${getRandomItem(usernameNouns)} ${getRandomItem(businessTypes)}`,
      () => `${getRandomItem(businessAdjectives)} ${getRandomItem(usernameNouns)} ${getRandomItem(businessTypes)}`
    ]
    
    return getRandomItem(patterns)()
  }

  const generateNames = () => {
    const nameCount = Math.min(Math.max(parseInt(count) || 1, 1), 50)
    const names: string[] = []
    
    for (let i = 0; i < nameCount; i++) {
      let name = ""
      
      switch (nameType) {
        case "first":
          name = generateFirstName(gender)
          break
        case "last":
          name = generateLastName()
          break
        case "full":
          name = generateFullName(gender)
          break
        case "username":
          name = generateUsername()
          break
        case "business":
          name = generateBusinessName()
          break
      }
      
      names.push(name)
    }
    
    setGeneratedNames(names)
  }

  const handleCopyAll = async () => {
    if (generatedNames.length > 0) {
      await navigator.clipboard.writeText(generatedNames.join('\n'))
    }
  }

  const handleCopyName = async (name: string) => {
    await navigator.clipboard.writeText(name)
  }

  const handleClear = () => {
    setGeneratedNames([])
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Random Name Generator",
    "description": "Generate random names including first names, last names, full names, usernames, and business names with customizable options.",
    "url": "https://toolshub.com/tools/name-generator",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Generate first names, last names, and full names",
      "Create unique usernames",
      "Generate business names",
      "Gender-specific name options",
      "Bulk name generation",
      "Copy individual names or all at once"
    ]
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Random Name Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate random names for characters, usernames, businesses, or any creative project. 
            Choose from different name types and customize your preferences.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Name Generation Settings
            </CardTitle>
            <CardDescription>
              Customize your name generation preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="nameType">Name Type</Label>
                <Select value={nameType} onValueChange={(value: NameType) => setNameType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first">First Names</SelectItem>
                    <SelectItem value="last">Last Names</SelectItem>
                    <SelectItem value="full">Full Names</SelectItem>
                    <SelectItem value="username">Usernames</SelectItem>
                    <SelectItem value="business">Business Names</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(nameType === "first" || nameType === "full") && (
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={(value: Gender) => setGender(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="count">Number of Names</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  placeholder="Enter count"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={generateNames} className="flex-1">
                <Users className="h-4 w-4 mr-2" />
                Generate Names
              </Button>
              <Button onClick={handleClear} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedNames.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Names ({generatedNames.length})</CardTitle>
                <Button onClick={handleCopyAll} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <CardDescription>
                Click on any name to copy it individually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {generatedNames.map((name, index) => (
                  <button
                    key={index}
                    onClick={() => handleCopyName(name)}
                    className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    <span className="font-medium text-gray-900">{name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Name Types Explained</CardTitle>
            <CardDescription>
              Understanding different name generation options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Personal Names</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>First Names:</strong> Common given names</li>
                    <li>• <strong>Last Names:</strong> Family surnames</li>
                    <li>• <strong>Full Names:</strong> Complete first + last name combinations</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Creative Names</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <strong>Usernames:</strong> Unique online identifiers</li>
                    <li>• <strong>Business Names:</strong> Professional company names</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Use Cases</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Character names for stories or games</li>
                    <li>• Placeholder names for testing</li>
                    <li>• Creative writing inspiration</li>
                    <li>• Business name brainstorming</li>
                    <li>• Username suggestions</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Tips</h4>
                  <ul className="text-sm text-orange-800 space-y-1">
                    <li>• Generate multiple options to choose from</li>
                    <li>• Mix and match different combinations</li>
                    <li>• Use as inspiration for your own variations</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}