"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  Building,
  Calendar,
  Clock,
  Command,
  FileText,
  Globe,
  Home,
  Info,
  Languages,
  LineChart,
  ListTodo,
  MessageCircle,
  MessageSquare,
  Mic,
  Moon,
  Phone,
  PieChart,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  ImportIcon as Translate,
  type LucideIcon,
  UserPlus,
  Users,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [clientEngagement, setClientEngagement] = useState(85)
  const [followupRate, setFollowupRate] = useState(72)
  const [responseTime, setResponseTime] = useState(88)
  const [conversionRate, setConversionRate] = useState(62)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [activeLanguage, setActiveLanguage] = useState("all")

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setFollowupRate(Math.floor(Math.random() * 15) + 65)
      setResponseTime(Math.floor(Math.random() * 10) + 80)
      setClientEngagement(Math.floor(Math.random() * 10) + 80)
      setConversionRate(Math.floor(Math.random() * 15) + 55)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (!canvas) return;
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-teal-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-teal-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-teal-500 font-mono text-sm tracking-wider">INITIALIZING ASSISTANT</div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-teal-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
              REAL ESTATE ASSISTANT
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients or properties..."
                className="bg-transparent border-none focus:outline-none text-sm w-48 placeholder:text-slate-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-teal-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback className="bg-slate-700 text-teal-500">RA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem icon={Command} label="Dashboard" active />
                  <NavItem icon={MessageCircle} label="Conversations" />
                  <NavItem icon={Users} label="Clients" />
                  <NavItem icon={Building} label="Properties" />
                  <NavItem icon={Calendar} label="Appointments" />
                  <NavItem icon={ListTodo} label="Follow-ups" />
                  <NavItem icon={Languages} label="Translations" />
                  <NavItem icon={Settings} label="Settings" />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">PERFORMANCE METRICS</div>
                  <div className="space-y-3">
                    <StatusItem label="Client Engagement" value={clientEngagement} color="teal" />
                    <StatusItem label="Follow-up Rate" value={followupRate} color="green" />
                    <StatusItem label="Response Time" value={responseTime} color="blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              {/* Conversation overview */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Activity className="mr-2 h-5 w-5 text-teal-500" />
                      Conversation Overview
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Select value={activeLanguage} onValueChange={setActiveLanguage}>
                        <SelectTrigger className="w-[140px] h-8 bg-slate-800/50 border-slate-700/50 text-xs">
                          <SelectValue placeholder="Filter by language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Languages</SelectItem>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="hindi">Hindi</SelectItem>
                          <SelectItem value="marathi">Marathi</SelectItem>
                          <SelectItem value="telugu">Telugu</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge variant="outline" className="bg-slate-800/50 text-teal-400 border-teal-500/50 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal-500 mr-1 animate-pulse"></div>
                        LIVE
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                      title="Active Conversations"
                      value={12}
                      icon={MessageCircle}
                      trend="up"
                      color="teal"
                      detail="4 new today"
                      isCount
                    />
                    <MetricCard
                      title="Conversion Rate"
                      value={conversionRate}
                      icon={PieChart}
                      trend="stable"
                      color="purple"
                      detail="Leads to clients"
                    />
                    <MetricCard
                      title="Pending Follow-ups"
                      value={8}
                      icon={Clock}
                      trend="down"
                      color="blue"
                      detail="3 high priority"
                      isCount
                    />
                  </div>

                  <div className="mt-8">
                    <Tabs defaultValue="conversations" className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <TabsList className="bg-slate-800/50 p-1">
                          <TabsTrigger
                            value="conversations"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-teal-400"
                          >
                            Recent Conversations
                          </TabsTrigger>
                          <TabsTrigger
                            value="languages"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-teal-400"
                          >
                            Language Distribution
                          </TabsTrigger>
                          <TabsTrigger
                            value="insights"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-teal-400"
                          >
                            Insights
                          </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-teal-500 mr-1"></div>
                            English
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                            Hindi
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-blue-500 mr-1"></div>
                            Others
                          </div>
                        </div>
                      </div>

                      <TabsContent value="conversations" className="mt-0">
                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="col-span-3">Client</div>
                            <div className="col-span-2">Language</div>
                            <div className="col-span-3">Key Points</div>
                            <div className="col-span-2">Time</div>
                            <div className="col-span-2">Actions</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            <ConversationRow
                              client="Rahul Sharma"
                              language="Hindi/English"
                              keyPoints="3BHK in Andheri, Budget 1.5Cr, Ready to move"
                              time="10 min ago"
                              status="new"
                            />
                            <ConversationRow
                              client="Priya Patel"
                              language="Marathi"
                              keyPoints="2BHK in Pune, School nearby, Max 80L"
                              time="45 min ago"
                              status="followup"
                            />
                            <ConversationRow
                              client="Venkat Rao"
                              language="Telugu"
                              keyPoints="Commercial space, 1000 sq ft, Hyderabad"
                              time="2 hours ago"
                              status="completed"
                            />
                            <ConversationRow
                              client="Sarah Johnson"
                              language="English"
                              keyPoints="Villa, gated community, 2Cr budget"
                              time="Yesterday"
                              status="new"
                            />
                            <ConversationRow
                              client="Amit Desai"
                              language="Hindi/Marathi"
                              keyPoints="Investment property, rental income focus"
                              time="Yesterday"
                              status="followup"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="languages" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <LanguageDistributionChart />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Most Common</div>
                            <div className="text-lg font-mono text-teal-400">Hindi/English</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="insights" className="mt-0">
                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                          <div className="space-y-4">
                            <InsightItem
                              title="Most Requested Property Type"
                              value="2BHK Apartments"
                              trend="+12% from last month"
                              icon={Home}
                            />
                            <InsightItem
                              title="Common Budget Range"
                              value="₹80L - ₹1.2Cr"
                              trend="Stable"
                              icon={BarChart3}
                            />
                            <InsightItem
                              title="Top Location Interest"
                              value="Powai, Mumbai"
                              trend="New trending area"
                              icon={Globe}
                            />
                            <InsightItem
                              title="Conversion Bottleneck"
                              value="Price Negotiation"
                              trend="Needs attention"
                              icon={AlertCircle}
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              {/* Follow-ups & Translation Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <ListTodo className="mr-2 h-5 w-5 text-green-500" />
                      Follow-up Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FollowupItem
                        client="Rahul Sharma"
                        task="Send 3BHK options in Andheri"
                        dueTime="Today, 5:00 PM"
                        priority="high"
                      />
                      <FollowupItem
                        client="Priya Patel"
                        task="Schedule site visit in Pune"
                        dueTime="Tomorrow, 11:00 AM"
                        priority="medium"
                      />
                      <FollowupItem
                        client="Venkat Rao"
                        task="Share commercial space documents"
                        dueTime="Wed, 2:00 PM"
                        priority="medium"
                      />
                      <FollowupItem
                        client="Sarah Johnson"
                        task="Confirm budget details and preferences"
                        dueTime="Thu, 10:00 AM"
                        priority="low"
                      />

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Follow-up Completion</div>
                          <div className="text-sm text-teal-400">{followupRate}%</div>
                        </div>
                        <Progress value={followupRate} className="h-2 bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full"
                            style={{ width: `${followupRate}%` }}
                          />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Translate className="mr-2 h-5 w-5 text-blue-500" />
                      Translation Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-slate-300">Quick Translate</div>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                            Real-time
                          </Badge>
                        </div>
                        <div className="flex space-x-2 mb-3">
                          <Select defaultValue="hindi">
                            <SelectTrigger className="w-[100px] bg-slate-700/50 border-slate-600/50 text-xs">
                              <SelectValue placeholder="From" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="hindi">Hindi</SelectItem>
                              <SelectItem value="marathi">Marathi</SelectItem>
                              <SelectItem value="telugu">Telugu</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="english">
                            <SelectTrigger className="w-[100px] bg-slate-700/50 border-slate-600/50 text-xs">
                              <SelectValue placeholder="To" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="hindi">Hindi</SelectItem>
                              <SelectItem value="marathi">Marathi</SelectItem>
                              <SelectItem value="telugu">Telugu</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-xs text-slate-400 mb-1">Original (Hindi):</div>
                        <div className="text-sm text-slate-300 mb-2">
                          "मुझे अंधेरी में 3BHK अपार्टमेंट चाहिए, मेरा बजट 1.5 करोड़ है"
                        </div>
                        <div className="text-xs text-slate-400 mb-1">Translation (English):</div>
                        <div className="text-sm text-blue-300">
                          "I want a 3BHK apartment in Andheri, my budget is 1.5 crore"
                        </div>
                      </div>

                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium text-slate-300">Common Phrases</div>
                          <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400">
                            View All
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs">
                            <span className="text-slate-400">English: </span>
                            <span className="text-slate-300">What is your budget range?</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-slate-400">Hindi: </span>
                            <span className="text-slate-300">आपका बजट रेंज क्या है?</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-slate-400">Marathi: </span>
                            <span className="text-slate-300">तुमचे बजेट रेंज काय आहे?</span>
                          </div>
                          <div className="text-xs">
                            <span className="text-slate-400">Telugu: </span>
                            <span className="text-slate-300">మీ బడ్జెట్ పరిధి ఏమిటి?</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="text-xs border-slate-700 bg-slate-800/50">
                          <Mic className="h-3 w-3 mr-1" />
                          Voice Translation
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs border-slate-700 bg-slate-800/50">
                          <FileText className="h-3 w-3 mr-1" />
                          Document Translation
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Live Conversation Assistant */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
                    Live Conversation Assistant
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-blue-400 border-blue-500/50">
                    Active Call
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Client" />
                          <AvatarFallback className="bg-slate-700 text-teal-500">RS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-slate-200">Rahul Sharma</div>
                          <div className="text-xs text-slate-500">Hindi/English • 3 min</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 px-2 text-xs border-slate-700 bg-slate-800/50"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          End Call
                        </Button>
                        <Button size="sm" className="h-7 px-2 text-xs bg-teal-600 hover:bg-teal-700">
                          <Plus className="h-3 w-3 mr-1" />
                          Add Notes
                        </Button>
                      </div>
                    </div>

                    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-3 h-48 overflow-y-auto">
                      <div className="space-y-3">
                        <ConversationMessage
                          speaker="Client"
                          message="मुझे अंधेरी में एक 3BHK अपार्टमेंट चाहिए"
                          translation="I want a 3BHK apartment in Andheri"
                          time="3:42 PM"
                          language="Hindi"
                        />
                        <ConversationMessage
                          speaker="You"
                          message="Sure, I can help you find a 3BHK in Andheri. What's your budget range?"
                          time="3:43 PM"
                          language="English"
                        />
                        <ConversationMessage
                          speaker="Client"
                          message="मेरा बजट 1.5 करोड़ तक है और मुझे ready to move चाहिए"
                          translation="My budget is up to 1.5 crore and I need ready to move in"
                          time="3:44 PM"
                          language="Hindi"
                        />
                        <ConversationMessage
                          speaker="You"
                          message="Great. Do you have any specific requirements for amenities or location within Andheri?"
                          time="3:45 PM"
                          language="English"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-3">
                      <div className="text-xs text-slate-400 mb-2">Real-time Suggestions:</div>
                      <div className="space-y-2">
                        <SuggestionItem
                          text="We have 5 properties matching your criteria in Andheri East"
                          type="property"
                        />
                        <SuggestionItem
                          text="Ask about preferred floor level and parking requirements"
                          type="question"
                        />
                        <SuggestionItem
                          text="Mention the new Gardenia Heights project with 3BHK at ₹1.4Cr"
                          type="recommendation"
                        />
                      </div>
                    </div>

                    <div className="flex items-center w-full space-x-2 mt-3">
                      <input
                        type="text"
                        placeholder="Type your response..."
                        className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      />
                      <Button size="icon" className="bg-blue-600 hover:bg-blue-700">
                        <Mic className="h-4 w-4" />
                      </Button>
                      <Button size="icon" className="bg-teal-600 hover:bg-teal-700">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* Agent stats */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">AGENT DASHBOARD</div>
                      <div className="text-3xl font-mono text-teal-400 mb-1">{formatTime(currentTime)}</div>
                      <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Today's Calls</div>
                        <div className="text-sm font-mono text-slate-200">
                          12 / 20 <span className="text-xs text-slate-500">target</span>
                        </div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Conversion</div>
                        <div className="text-sm font-mono text-slate-200">
                          {conversionRate}% <span className="text-xs text-green-500">↑ 4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={UserPlus} label="New Client" />
                    <ActionButton icon={Phone} label="Start Call" />
                    <ActionButton icon={Calendar} label="Schedule" />
                    <ActionButton icon={FileText} label="Templates" />
                  </div>
                </CardContent>
              </Card>

              {/* Client Insights */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Client Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Language Preferences</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-slate-400">Hindi</div>
                          <div className="text-xs text-teal-400">42%</div>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                            style={{ width: "42%" }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-slate-400">English</div>
                          <div className="text-xs text-purple-400">28%</div>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                            style={{ width: "28%" }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-slate-400">Mixed</div>
                          <div className="text-xs text-blue-400">18%</div>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                            style={{ width: "18%" }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-slate-400">Others</div>
                          <div className="text-xs text-green-400">12%</div>
                        </div>
                        <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            style={{ width: "12%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Property Preferences</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-400">2BHK</div>
                            <div className="text-xs text-teal-400">45%</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-400">3BHK</div>
                            <div className="text-xs text-teal-400">32%</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-400">Villa</div>
                            <div className="text-xs text-teal-400">15%</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-slate-400">Commercial</div>
                            <div className="text-xs text-teal-400">8%</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-slate-400">Client Satisfaction</div>
                        <div className="flex items-center">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${star <= 4 ? "text-amber-400" : "text-slate-600"}`}
                                fill={star <= 4 ? "currentColor" : "none"}
                              />
                            ))}
                          </div>
                          <span className="text-amber-400 ml-1 text-xs">4.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Language Settings */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Language Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="text-teal-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Auto-Detect Language</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageCircle className="text-teal-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Real-time Translation</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="text-teal-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Save Transcripts</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="text-teal-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">AI Suggestions</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-teal-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "teal":
        return "from-teal-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-teal-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  isCount = false,
}: {
  title: string
  value: number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  isCount?: boolean
}) {
  const getColor = () => {
    switch (color) {
      case "teal":
        return "from-teal-500 to-blue-500 border-teal-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-teal-500 to-blue-500 border-teal-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <BarChart3 className="h-4 w-4 text-amber-500" />
      case "down":
        return <BarChart3 className="h-4 w-4 rotate-180 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {isCount ? value : `${value}%`}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-teal-500 to-blue-500"></div>
    </div>
  )
}

// Language distribution chart component
function LanguageDistributionChart() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-48 h-48">
          {/* Hindi/English (Mixed) - 45% */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
            style={{ clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)" }}
          ></div>

          {/* Hindi - 25% */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ clipPath: "polygon(50% 50%, 100% 100%, 50% 100%)" }}
          ></div>

          {/* English - 15% */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            style={{ clipPath: "polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)" }}
          ></div>

          {/* Marathi - 10% */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
            style={{ clipPath: "polygon(50% 50%, 0% 50%, 0% 0%, 25% 0%)" }}
          ></div>

          {/* Telugu - 5% */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            style={{ clipPath: "polygon(50% 50%, 25% 0%, 50% 0%)" }}
          ></div>

          {/* Center circle */}
          <div className="absolute inset-[25%] bg-slate-900 rounded-full flex items-center justify-center text-xs text-slate-300 font-mono">
            Language
            <br />
            Distribution
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
        <div className="text-xs text-slate-400 mb-1">Languages</div>
        <div className="space-y-1">
          <div className="flex items-center text-xs">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 mr-1"></div>
            <span className="text-slate-300">Hindi/English (45%)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-1"></div>
            <span className="text-slate-300">Hindi (25%)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mr-1"></div>
            <span className="text-slate-300">English (15%)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mr-1"></div>
            <span className="text-slate-300">Marathi (10%)</span>
          </div>
          <div className="flex items-center text-xs">
            <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mr-1"></div>
            <span className="text-slate-300">Telugu (5%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Conversation row component
function ConversationRow({
  client,
  language,
  keyPoints,
  time,
  status,
}: {
  client: string
  language: string
  keyPoints: string
  time: string
  status: "new" | "followup" | "completed"
}) {
  const getStatusBadge = () => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">New</Badge>
      case "followup":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Follow-up</Badge>
      case "completed":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-3 text-slate-300">{client}</div>
      <div className="col-span-2 text-slate-400">{language}</div>
      <div className="col-span-3 text-slate-300 truncate" title={keyPoints}>
        {keyPoints}
      </div>
      <div className="col-span-2 text-slate-500">{time}</div>
      <div className="col-span-2 flex items-center space-x-2">{getStatusBadge()}</div>
    </div>
  )
}

// Insight item component
function InsightItem({
  title,
  value,
  trend,
  icon: Icon,
}: {
  title: string
  value: string
  trend: string
  icon: LucideIcon
}) {
  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <Icon className="h-4 w-4 text-teal-500 mr-2" />
          <div className="text-sm text-slate-300">{title}</div>
        </div>
      </div>
      <div className="text-base font-medium text-slate-200 mb-1">{value}</div>
      <div className="text-xs text-slate-500">{trend}</div>
    </div>
  )
}

// Follow-up item component
function FollowupItem({
  client,
  task,
  dueTime,
  priority,
}: {
  client: string
  task: string
  dueTime: string
  priority: "high" | "medium" | "low"
}) {
  const getPriorityBadge = () => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">High</Badge>
      case "medium":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Low</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex items-start space-x-3">
      <div className="mt-0.5">
        <Avatar className="h-6 w-6">
          <AvatarImage src="/placeholder.svg?height=24&width=24" alt={client} />
          <AvatarFallback className="bg-slate-700 text-teal-500 text-xs">{client.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{client}</div>
          {getPriorityBadge()}
        </div>
        <div className="text-xs text-slate-400 mt-1">{task}</div>
        <div className="flex items-center justify-between mt-1">
          <div className="text-xs text-slate-500">
            <Clock className="inline h-3 w-3 mr-1" />
            {dueTime}
          </div>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100">
            Complete
          </Button>
        </div>
      </div>
    </div>
  )
}

// Conversation message component
function ConversationMessage({
  speaker,
  message,
  translation,
  time,
  language,
}: {
  speaker: string
  message: string
  translation?: string
  time: string
  language: string
}) {
  const isClient = speaker === "Client"

  return (
    <div className={`flex ${isClient ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[80%] ${isClient ? "bg-slate-800/70" : "bg-teal-900/50"} rounded-lg p-2`}>
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-medium text-slate-300">{speaker}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-sm text-slate-200">{message}</div>
        {translation && (
          <div className="mt-1 text-xs text-blue-400 border-t border-slate-700/50 pt-1">
            <Translate className="inline h-3 w-3 mr-1" />
            {translation}
          </div>
        )}
        {language && !translation && (
          <div className="mt-1 text-xs text-slate-500 pt-1">
            <Globe className="inline h-3 w-3 mr-1" />
            {language}
          </div>
        )}
      </div>
    </div>
  )
}

// Suggestion item component
function SuggestionItem({
  text,
  type,
}: {
  text: string
  type: "property" | "question" | "recommendation"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "property":
        return { icon: Building, color: "text-teal-500 bg-teal-500/10 border-teal-500/30" }
      case "question":
        return { icon: MessageCircle, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "recommendation":
        return { icon: Star, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      default:
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div
      className={`flex items-center space-x-2 p-1.5 rounded-md ${color.split(" ")[1]} ${color.split(" ")[2]} border cursor-pointer hover:bg-slate-700/30`}
    >
      <Icon className={`h-3.5 w-3.5 ${color.split(" ")[0]}`} />
      <div className="text-xs text-slate-300">{text}</div>
    </div>
  )
}

// Action button component
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-teal-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

